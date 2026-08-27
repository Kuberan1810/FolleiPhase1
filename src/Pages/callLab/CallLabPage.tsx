import React, { useEffect, useRef, useState } from 'react';
import { Mic, MicOff, Phone, PhoneOff, Volume2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { errorMessage } from '../../lib/axios';
import { useActiveWorkspace } from '../../hooks/useWorkspace';
import {
  createCallSession,
  createRealtimeTicket,
  getCallLabConfig,
  realtimeSocketUrl,
  type CallConnectionState,
  type CallLabConfig,
  type LeadTemperature,
} from '../../api/calllab/calllab.api';

type TranscriptLine = {
  id: number;
  role: 'lead' | 'follei';
  text: string;
  spokenText?: string;
  /** Server-stamped, so both sides share one clock. */
  at?: string;
};

/** Local wall-clock time, to the second -- turn latency is measured in
 *  seconds, so minute precision would hide exactly what we want to see. */
const clockTime = (iso?: string): string =>
  iso ? new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) : '';

const STATE_LABELS: Record<CallConnectionState, string> = {
  idle: 'Ready to connect',
  connecting: 'Connecting securely',
  listening: 'Listening',
  thinking: 'Preparing an answer',
  speaking: 'Follei is speaking',
  ended: 'Session ended',
  error: 'Connection needs attention',
};

// Barge-in sensitivity. The worklet posts one 4096-sample block at a time,
// roughly 85ms of audio. A cough, a keyboard tap, or Follei's own voice
// leaking past echo cancellation clears the threshold for a block or two;
// real speech sustains across several. Requiring consecutive loud blocks
// keeps barge-in responsive (~255ms) without letting a transient cut the
// reply mid-sentence.
const BARGE_IN_RMS = 0.055;
const BARGE_IN_BLOCKS = 3;

/**
 * Realtime voice testing, reachable at /calllab.
 *
 * Deliberately not linked from the sidebar: this is a test surface, not part
 * of the product flow.
 */
export const CallLabPage: React.FC = () => {
  const { workspaceId } = useActiveWorkspace();
  const [config, setConfig] = useState<CallLabConfig | null>(null);
  const [state, setState] = useState<CallConnectionState>('idle');
  const [transcript, setTranscript] = useState<TranscriptLine[]>([]);
  const [partial, setPartial] = useState('');
  const [temperature, setTemperature] = useState<LeadTemperature | null>(null);
  const [selectedVoiceId, setSelectedVoiceId] = useState('');

  const socketRef = useRef<WebSocket | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const contextRef = useRef<AudioContext | null>(null);
  const workletRef = useRef<AudioWorkletNode | null>(null);
  const playbackRef = useRef(new Set<AudioBufferSourceNode>());
  const playbackTimeRef = useRef(0);
  const stateRef = useRef<CallConnectionState>('idle');
  const interruptedRef = useRef(false);
  const loudBlocksRef = useRef(0);
  const lineIdRef = useRef(0);

  const changeState = (next: CallConnectionState) => {
    stateRef.current = next;
    setState(next);
  };

  useEffect(() => {
    if (!workspaceId) return;
    getCallLabConfig(workspaceId)
      .then((next) => {
        setConfig(next);
        setSelectedVoiceId(next.default_voice_id || next.voices[0]?.id || '');
      })
      .catch((error) => toast.error(errorMessage(error, 'Could not load voice configuration')));
  }, [workspaceId]);

  const stopPlayback = () => {
    playbackRef.current.forEach((source) => {
      try {
        source.stop();
      } catch {
        /* already stopped */
      }
    });
    playbackRef.current.clear();
    playbackTimeRef.current = contextRef.current?.currentTime || 0;
  };

  /** PCM streams: each chunk is scheduled as it arrives, gap-free, so audio
   *  starts on the first chunk instead of waiting for the whole reply. */
  const playPcm = (payload: ArrayBuffer) => {
    const context = contextRef.current;
    if (!context || payload.byteLength < 2 || interruptedRef.current) return;
    const view = new DataView(payload);
    const sampleCount = Math.floor(payload.byteLength / 2);
    const audioBuffer = context.createBuffer(1, sampleCount, config?.output_sample_rate || 24000);
    const channel = audioBuffer.getChannelData(0);
    for (let index = 0; index < sampleCount; index += 1) {
      channel[index] = view.getInt16(index * 2, true) / 32768;
    }
    const source = context.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(context.destination);
    const startAt = Math.max(context.currentTime + 0.025, playbackTimeRef.current);
    source.start(startAt);
    playbackTimeRef.current = startAt + audioBuffer.duration;
    playbackRef.current.add(source);
    source.onended = () => playbackRef.current.delete(source);
  };

  const endSession = () => {
    const socket = socketRef.current;
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ type: 'session.end' }));
      socket.close();
    }
    workletRef.current?.disconnect();
    streamRef.current?.getTracks().forEach((track) => track.stop());
    void contextRef.current?.close();
    socketRef.current = null;
    workletRef.current = null;
    streamRef.current = null;
    contextRef.current = null;
    stopPlayback();
    changeState('ended');
  };

  // Tear down only a session that actually started. StrictMode mounts,
  // unmounts and remounts in development, so an unconditional cleanup ran
  // endSession() before the user had connected and left the page reading
  // "Session ended".
  useEffect(
    () => () => {
      if (socketRef.current || contextRef.current) endSession();
    },
    [],
  );

  const connect = async () => {
    if (!workspaceId || !config) return;
    changeState('connecting');
    try {
      const session = await createCallSession(workspaceId, { voice_id: selectedVoiceId || null });
      const ticket = await createRealtimeTicket(workspaceId, session.id);

      const media = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true },
      });
      streamRef.current = media;
      const context = new AudioContext();
      contextRef.current = context;
      await context.audioWorklet.addModule('/pcm-capture-worklet.js');

      const socket = new WebSocket(realtimeSocketUrl(ticket.websocket_path, ticket.ticket));
      socket.binaryType = 'arraybuffer';
      socketRef.current = socket;

      socket.onmessage = (event) => {
        if (event.data instanceof ArrayBuffer) {
          playPcm(event.data);
          return;
        }
        const message = JSON.parse(event.data) as Record<string, unknown>;

        if (message.type === 'connected') {
          changeState('listening');
          const source = context.createMediaStreamSource(media);
          const worklet = new AudioWorkletNode(context, 'follei-pcm-capture');
          // Route capture into a muted gain node: the worklet only runs while
          // it is connected to the graph, but the raw mic must not be audible.
          const mute = context.createGain();
          mute.gain.value = 0;
          source.connect(worklet);
          worklet.connect(mute).connect(context.destination);

          worklet.port.onmessage = ({ data }: MessageEvent<{ type: string; buffer: ArrayBuffer; rms: number }>) => {
            if (data.type !== 'audio' || socket.readyState !== WebSocket.OPEN) return;
            if (stateRef.current === 'speaking') {
              if (interruptedRef.current) return;
              if (data.rms <= BARGE_IN_RMS) {
                loudBlocksRef.current = 0;
                return;
              }
              loudBlocksRef.current += 1;
              if (loudBlocksRef.current < BARGE_IN_BLOCKS) return;
              loudBlocksRef.current = 0;
              interruptedRef.current = true;
              stopPlayback();
              socket.send(JSON.stringify({ type: 'client.interrupt' }));
              changeState('listening');
            }
            socket.send(data.buffer);
          };
          workletRef.current = worklet;
          socket.send(JSON.stringify({ type: 'client.ready' }));
        } else if (message.type === 'state') {
          changeState(message.state as CallConnectionState);
        } else if (message.type === 'transcript.partial') {
          setPartial(String(message.text || ''));
        } else if (message.type === 'transcript.final') {
          setPartial('');
          setTranscript((current) => [
            ...current,
            {
              id: ++lineIdRef.current,
              role: 'lead',
              text: String(message.text),
              at: message.at as string | undefined,
            },
          ]);
        } else if (message.type === 'assistant.response') {
          // A new reply clears the interrupt latch; without this the guard
          // set by a barge-in would suppress the next reply too.
          interruptedRef.current = false;
          loudBlocksRef.current = 0;
          setTranscript((current) => [
            ...current,
            {
              id: ++lineIdRef.current,
              role: 'follei',
              text: String(message.canonical_text),
              spokenText: String(message.spoken_text),
              at: message.at as string | undefined,
            },
          ]);
          setTemperature((message.lead_temperature as LeadTemperature | null) || null);
        } else if (message.type === 'assistant.interrupted') {
          stopPlayback();
        } else if (message.type === 'error') {
          toast.error(String(message.message || 'Realtime voice failed'));
          changeState('error');
        }
      };

      socket.onerror = () => {
        toast.error('The realtime voice connection could not be established.');
        changeState('error');
      };
      socket.onclose = () => {
        if (stateRef.current !== 'ended') changeState('ended');
      };
    } catch (error) {
      toast.error(errorMessage(error, 'Could not start the call'));
      changeState('error');
    }
  };

  const active = ['connecting', 'listening', 'thinking', 'speaking'].includes(state);

  return (
    <div className="min-h-screen bg-[#FDFDFC] p-6 text-[#16171A] antialiased">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
        <header className="flex flex-col gap-1">
          <h1 className="text-[26px] font-semibold tracking-tight">Call Lab</h1>
          <p className="text-[13.5px] text-[#717378]">
            Test the realtime voice against this workspace. Not linked from the app.
          </p>
        </header>

        {!workspaceId && (
          <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-[13px] text-amber-800">
            No workspace selected. Open the app and pick a project first.
          </p>
        )}

        {config && !config.available && (
          <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-[13px] text-amber-800">
            {config.reason || 'Realtime voice is not configured.'}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-[#E6E6E4] bg-white p-4">
          <span
            className={`size-2 rounded-full ${
              state === 'listening'
                ? 'animate-pulse bg-emerald-500'
                : state === 'speaking'
                  ? 'animate-pulse bg-[#0D9488]'
                  : state === 'error'
                    ? 'bg-red-500'
                    : 'bg-[#B8BAB6]'
            }`}
          />
          <span className="text-[13px] font-medium">{STATE_LABELS[state]}</span>

          {config && config.voices.length > 0 && (
            <select
              value={selectedVoiceId}
              onChange={(e) => setSelectedVoiceId(e.target.value)}
              disabled={active}
              className="ml-auto rounded-lg border border-[#E6E6E4] px-2 py-1 text-[12.5px]"
            >
              {config.voices.map((voice) => (
                <option key={voice.id} value={voice.id}>
                  {voice.name}
                </option>
              ))}
            </select>
          )}

          {!active ? (
            <button
              type="button"
              onClick={() => void connect()}
              disabled={!config?.available || !workspaceId}
              className="flex h-10 items-center gap-2 rounded-full bg-[#17181B] px-5 text-[13px] font-medium text-white disabled:cursor-not-allowed disabled:opacity-35"
            >
              <Phone className="size-4" />
              Connect voice
            </button>
          ) : (
            <>
              <span className="flex size-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                {state === 'listening' ? <Mic className="size-4" /> : <MicOff className="size-4" />}
              </span>
              <button
                type="button"
                onClick={endSession}
                className="flex h-10 items-center gap-2 rounded-full bg-red-600 px-5 text-[13px] font-medium text-white"
              >
                <PhoneOff className="size-4" />
                End
              </button>
            </>
          )}
        </div>

        {temperature && (
          <span className="self-start rounded-full bg-[#F3F3F0] px-3 py-1 text-[12px] font-medium">
            Lead reads as {temperature}
          </span>
        )}

        <div className="flex min-h-[240px] flex-col gap-3 rounded-2xl border border-[#E6E6E4] bg-white p-4">
          {transcript.length === 0 && !partial && (
            <p className="text-[13px] text-[#717378]">Transcript will appear here.</p>
          )}
          {transcript.map((line) => (
            <div key={line.id} className={line.role === 'follei' ? 'text-[#16171A]' : 'text-[#2C2E31]'}>
              <span className="mb-0.5 flex items-center gap-2 text-[11px] font-medium uppercase tracking-wider text-[#717378]">
                <span>{line.role === 'follei' ? 'Follei' : 'You'}</span>
                {line.at && <span className="font-normal normal-case tabular-nums">{clockTime(line.at)}</span>}
              </span>
              <p className="text-[14px] leading-relaxed">{line.text}</p>
              {line.spokenText && line.spokenText !== line.text && (
                <p className="mt-0.5 flex items-center gap-1 text-[12px] text-[#717378]">
                  <Volume2 className="size-3" />
                  {line.spokenText}
                </p>
              )}
            </div>
          ))}
          {partial && <p className="text-[14px] italic text-[#717378]">{partial}</p>}
        </div>
      </div>
    </div>
  );
};

export default CallLabPage;
