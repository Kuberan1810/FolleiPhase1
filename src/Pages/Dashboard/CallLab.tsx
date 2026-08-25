import { useEffect, useRef, useState } from 'react';
import { Mic, MicOff, Phone, PhoneOff, Radio, Volume2 } from 'lucide-react';
import toast from 'react-hot-toast';
import {
  folleiApi,
  type CallConnectionState,
  type CallLabConfig,
  type Lead,
  type LeadTemperature,
  type Language,
  type Workspace,
} from '../../api/follei';

type TranscriptLine = { id: number; role: 'lead' | 'follei'; text: string; spokenText?: string };

const STATE_LABELS: Record<CallConnectionState, string> = {
  idle: 'Ready to connect',
  connecting: 'Connecting securely',
  listening: 'Listening',
  thinking: 'Preparing an answer',
  speaking: 'Follei is speaking',
  ended: 'Session ended',
  error: 'Connection needs attention',
};

function socketUrl(path: string, ticket: string) {
  const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  return `${protocol}//${window.location.host}${path}?ticket=${encodeURIComponent(ticket)}`;
}

export default function CallLab({ workspace, leads }: { workspace: Workspace; leads: Lead[] }) {
  const [config, setConfig] = useState<CallLabConfig | null>(null);
  const [selectedLead, setSelectedLead] = useState(leads[0]?.id || '');
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(workspace.language);
  const [selectedVoiceId, setSelectedVoiceId] = useState('');
  const [state, setState] = useState<CallConnectionState>('idle');
  const [partial, setPartial] = useState('');
  const [transcript, setTranscript] = useState<TranscriptLine[]>([]);
  const [temperature, setTemperature] = useState<LeadTemperature | null>(null);
  const [callLanguage, setCallLanguage] = useState(workspace.language);
  const [lastDecision, setLastDecision] = useState<string | null>(null);

  const socketRef = useRef<WebSocket | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const contextRef = useRef<AudioContext | null>(null);
  const workletRef = useRef<AudioWorkletNode | null>(null);
  const playbackRef = useRef(new Set<AudioBufferSourceNode>());
  const playbackTimeRef = useRef(0);
  const compressedAudioRef = useRef<Uint8Array[]>([]);
  const compressedPlaybackPendingRef = useRef(false);
  const stateRef = useRef<CallConnectionState>('idle');
  const interruptedRef = useRef(false);
  const lineIdRef = useRef(0);

  const changeState = (next: CallConnectionState) => {
    stateRef.current = next;
    setState(next);
    if (next !== 'speaking') interruptedRef.current = false;
  };

  useEffect(() => {
    folleiApi.getCallLabConfig(workspace.id).then((nextConfig) => {
      setConfig(nextConfig);
      setSelectedVoiceId(nextConfig.default_voice_id || nextConfig.voices[0]?.id || '');
    }).catch((error) => {
      setConfig({
        available: false,
        voices: [],
        default_voice_id: null,
        stt_model: '',
        tts_model: '',
        output_format: 'mp3_44100_128',
        stability: 0.85,
        similarity: 0.85,
        style: 0.4,
        speed: 1.12,
        speaker_boost: true,
        input_sample_rate: 16000,
        output_sample_rate: 44100,
        reason: error instanceof Error ? error.message : 'Could not load voice configuration',
      });
    });
  }, [workspace.id]);

  const stopPlayback = () => {
    compressedAudioRef.current = [];
    compressedPlaybackPendingRef.current = false;
    playbackRef.current.forEach((source) => {
      try { source.stop(); } catch { /* already stopped */ }
    });
    playbackRef.current.clear();
    playbackTimeRef.current = contextRef.current?.currentTime || 0;
  };

  const playCompressedAudio = async () => {
    const context = contextRef.current;
    const chunks = compressedAudioRef.current;
    compressedAudioRef.current = [];
    if (!context || !chunks.length || interruptedRef.current) return;

    compressedPlaybackPendingRef.current = true;
    const byteLength = chunks.reduce((total, chunk) => total + chunk.byteLength, 0);
    const merged = new Uint8Array(byteLength);
    let offset = 0;
    chunks.forEach((chunk) => {
      merged.set(chunk, offset);
      offset += chunk.byteLength;
    });

    try {
      const audioBuffer = await context.decodeAudioData(merged.buffer.slice(0));
      if (interruptedRef.current) return;
      const source = context.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(context.destination);
      playbackRef.current.add(source);
      source.onended = () => {
        playbackRef.current.delete(source);
        compressedPlaybackPendingRef.current = false;
        if (!playbackRef.current.size && stateRef.current === 'speaking') changeState('listening');
      };
      source.start();
    } catch {
      compressedPlaybackPendingRef.current = false;
      toast.error('The ElevenLabs audio response could not be decoded.');
      changeState('listening');
    }
  };

  const playPcm = (payload: ArrayBuffer) => {
    const context = contextRef.current;
    if (!context || payload.byteLength < 2) return;
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

  const cleanup = () => {
    stopPlayback();
    workletRef.current?.disconnect();
    workletRef.current = null;
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    if (contextRef.current) void contextRef.current.close();
    contextRef.current = null;
    socketRef.current = null;
    setPartial('');
  };

  const endSession = () => {
    const socket = socketRef.current;
    if (socket?.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ type: 'session.end' }));
      socket.close(1000, 'Call Lab ended');
    }
    cleanup();
    changeState('ended');
  };

  useEffect(() => () => {
    const socket = socketRef.current;
    if (socket?.readyState === WebSocket.OPEN) socket.close(1000, 'Page closed');
    playbackRef.current.forEach((source) => {
      try { source.stop(); } catch { /* already stopped */ }
    });
    playbackRef.current.clear();
    workletRef.current?.disconnect();
    streamRef.current?.getTracks().forEach((track) => track.stop());
    if (contextRef.current) void contextRef.current.close();
  }, []);

  const connect = async () => {
    if (!config?.available) {
      toast.error(config?.reason || 'Realtime voice is not configured.');
      return;
    }
    changeState('connecting');
    setTranscript([]);
    setTemperature(null);
    setLastDecision(null);
    try {
      const media = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true },
      });
      streamRef.current = media;
      const context = new AudioContext();
      contextRef.current = context;
      await context.resume();
      await context.audioWorklet.addModule('/pcm-capture-worklet.js');

      const session = await folleiApi.createCallSession(
        workspace.id,
        selectedLead || null,
        selectedLanguage,
        selectedVoiceId,
      );
      setCallLanguage(session.language);
      const ticket = await folleiApi.createRealtimeTicket(workspace.id, session.id);
      const socket = new WebSocket(socketUrl(ticket.websocket_path, ticket.ticket));
      socket.binaryType = 'arraybuffer';
      socketRef.current = socket;

      socket.onmessage = (event) => {
        if (event.data instanceof ArrayBuffer) {
          if (config.output_format.startsWith('mp3_')) {
            compressedAudioRef.current.push(new Uint8Array(event.data));
          } else {
            playPcm(event.data);
          }
          return;
        }
        const message = JSON.parse(event.data) as Record<string, unknown>;
        if (message.type === 'connected') {
          changeState('listening');
          const source = context.createMediaStreamSource(media);
          const worklet = new AudioWorkletNode(context, 'follei-pcm-capture');
          const mute = context.createGain();
          mute.gain.value = 0;
          source.connect(worklet);
          worklet.connect(mute).connect(context.destination);
          worklet.port.onmessage = ({ data }: MessageEvent<{ type: string; buffer: ArrayBuffer; rms: number }>) => {
            if (data.type !== 'audio' || socket.readyState !== WebSocket.OPEN) return;
            if (stateRef.current === 'speaking') {
              if (data.rms <= 0.035 || interruptedRef.current) return;
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
          const nextState = message.state as CallConnectionState;
          if (!(nextState === 'listening' && compressedPlaybackPendingRef.current)) changeState(nextState);
        } else if (message.type === 'transcript.partial') {
          setPartial(String(message.text || ''));
        } else if (message.type === 'transcript.final') {
          setPartial('');
          setTranscript((current) => [...current, { id: ++lineIdRef.current, role: 'lead', text: String(message.text) }]);
        } else if (message.type === 'assistant.response') {
          compressedAudioRef.current = [];
          compressedPlaybackPendingRef.current = false;
          setTranscript((current) => [...current, {
            id: ++lineIdRef.current,
            role: 'follei',
            text: String(message.canonical_text),
            spokenText: String(message.spoken_text),
          }]);
          setTemperature((message.lead_temperature as LeadTemperature | null) || null);
          if (message.language) setCallLanguage(message.language as Workspace['language']);
        } else if (message.type === 'decision') {
          setTemperature((message.lead_temperature as LeadTemperature | null) || null);
          setLastDecision(String(message.next_action || ''));
          if (message.language) setCallLanguage(message.language as Workspace['language']);
        } else if (message.type === 'assistant.interrupted') {
          stopPlayback();
        } else if (message.type === 'audio.end') {
          if (config.output_format.startsWith('mp3_')) void playCompressedAudio();
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
        if (stateRef.current !== 'ended' && stateRef.current !== 'error') changeState('ended');
        cleanup();
      };
    } catch (error) {
      cleanup();
      changeState('error');
      toast.error(error instanceof Error ? error.message : 'Microphone connection failed.');
    }
  };

  const active = ['connecting', 'listening', 'thinking', 'speaking'].includes(state);
  const selectedLeadRecord = leads.find((lead) => lead.id === selectedLead);
  const selectedVoice = config?.voices.find((voice) => voice.id === selectedVoiceId);

  return (
    <section className="mt-5 border border-[#DDE0DB] bg-white">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#E5E7E3] p-5">
        <div className="flex items-start gap-3">
          <span className="flex size-9 items-center justify-center bg-[#17181B] text-white"><Radio className="size-4" /></span>
          <div>
            <h2 className="text-sm font-semibold">Realtime Call Lab</h2>
            <p className="mt-1 text-xs text-[#777980]">Continuous voice with live transcription and interruption.</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs font-medium">
          <span className={`size-2 rounded-full ${state === 'listening' ? 'bg-emerald-500 animate-pulse' : state === 'speaking' ? 'bg-[#0D9488] animate-pulse' : state === 'thinking' || state === 'connecting' ? 'bg-amber-500 animate-pulse' : state === 'error' ? 'bg-red-500' : 'bg-[#B8BAB6]'}`} />
          {STATE_LABELS[state]}
        </div>
      </div>

      <div className="grid min-h-80 md:grid-cols-[220px_minmax(0,1fr)]">
        <div className="border-b border-[#E5E7E3] p-5 md:border-b-0 md:border-r">
          <label className="text-[11px] font-semibold uppercase text-[#777980]">Practice lead</label>
          <select value={selectedLead} disabled={active} onChange={(event) => setSelectedLead(event.target.value)} className="mt-2 h-10 w-full border border-[#DCDDD9] bg-white px-2 text-xs disabled:bg-[#F5F5F2]">
            <option value="">Unassigned practice</option>
            {leads.map((lead) => <option key={lead.id} value={lead.id}>{lead.name || lead.reference_number}</option>)}
          </select>
          <label className="mt-4 block text-[11px] font-semibold uppercase text-[#777980]">Call language</label>
          <select value={selectedLanguage} disabled={active} onChange={(event) => setSelectedLanguage(event.target.value as Language)} className="mt-2 h-10 w-full border border-[#DCDDD9] bg-white px-2 text-xs disabled:bg-[#F5F5F2]">
            <option value="TAMIL">Tamil / Tanglish</option>
            <option value="ENGLISH">English</option>
            <option value="HINDI">Hindi / Hinglish</option>
          </select>
          <label className="mt-4 block text-[11px] font-semibold uppercase text-[#777980]">Voice</label>
          <div className="mt-2 grid grid-cols-2 border border-[#DCDDD9]" role="group" aria-label="Call voice">
            {config?.voices.map((voice) => {
              const shortName = voice.name.split(/[ –-]/)[0];
              const selected = voice.id === selectedVoiceId;
              return <button key={voice.id} type="button" disabled={active} aria-pressed={selected} title={voice.name} onClick={() => setSelectedVoiceId(voice.id)} className={`h-9 border-b border-r border-[#DCDDD9] px-1 text-[10px] font-medium disabled:cursor-not-allowed ${selected ? 'bg-[#17181B] text-white' : 'bg-white text-[#55575C]'}`}>{shortName}</button>;
            })}
          </div>
          <div className="mt-5 space-y-3 border-t border-[#E5E7E3] pt-4 text-xs">
            <div><span className="text-[#777980]">Selected voice</span><p className="mt-1 font-medium leading-4">{selectedVoice?.name || 'Loading'}</p></div>
            <div className="flex items-center justify-between"><span className="text-[#777980]">Voice model</span><span className="font-medium">Multilingual v2</span></div>
            <div className="flex items-center justify-between"><span className="text-[#777980]">Audio</span><span className="font-medium">MP3 44.1 kHz / 128 kbps</span></div>
            <div className="flex items-center justify-between"><span className="text-[#777980]">Stability</span><span className="font-medium">{Math.round((config?.stability ?? 0) * 100)}%</span></div>
            <div className="flex items-center justify-between"><span className="text-[#777980]">Similarity</span><span className="font-medium">{Math.round((config?.similarity ?? 0) * 100)}%</span></div>
            <div className="flex items-center justify-between"><span className="text-[#777980]">Style</span><span className="font-medium">{config?.style ?? 0}</span></div>
            <div className="flex items-center justify-between"><span className="text-[#777980]">Speed</span><span className="font-medium">{config?.speed ?? 1}x</span></div>
            <div className="flex items-center justify-between"><span className="text-[#777980]">Speaker boost</span><span className="font-medium">{config?.speaker_boost ? 'On' : 'Off'}</span></div>
            <div className="flex items-center justify-between"><span className="text-[#777980]">Language</span><span className="font-medium">{callLanguage.toLowerCase()}</span></div>
            <div className="flex items-center justify-between"><span className="text-[#777980]">Detection</span><span className="font-medium">{callLanguage === 'TAMIL' ? 'Auto + Tamil script' : 'Auto'}</span></div>
            <div className="flex items-center justify-between"><span className="text-[#777980]">Lead</span><span className="max-w-28 truncate font-medium">{selectedLeadRecord?.name || 'Practice'}</span></div>
            <div className="flex items-center justify-between"><span className="text-[#777980]">Temperature</span><span className="font-semibold">{temperature || 'Unclassified'}</span></div>
            {lastDecision && <div><span className="text-[#777980]">Next action</span><p className="mt-1 font-medium">{lastDecision.replaceAll('_', ' ')}</p></div>}
          </div>
          {!config?.available && config && <p className="mt-5 border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-800">{config.reason}</p>}
        </div>

        <div className="flex min-h-80 flex-col">
          <div className="flex-1 space-y-3 overflow-y-auto p-5">
            {!transcript.length && !partial && <div className="flex h-full min-h-40 flex-col items-center justify-center text-center"><Volume2 className="size-5 text-[#A0A29E]" /><p className="mt-3 text-sm font-medium">Connect and speak naturally.</p><p className="mt-1 text-xs text-[#85878B]">Follei listens continuously and replies when you pause.</p></div>}
            {transcript.map((line) => <div key={line.id} className={`flex ${line.role === 'lead' ? 'justify-end' : 'justify-start'}`}><div className={`max-w-[84%] px-3 py-2 text-xs leading-5 ${line.role === 'lead' ? 'bg-[#17181B] text-white' : 'bg-[#F3F3F0] text-[#303238]'}`}><p>{line.role === 'follei' && line.spokenText ? line.spokenText : line.text}</p>{line.role === 'follei' && line.spokenText !== line.text && <p className="mt-1 border-t border-[#DDE0DB] pt-1 text-[10px] text-[#777980]">{line.text}</p>}</div></div>)}
            {partial && <div className="flex justify-end"><div className="max-w-[84%] border border-dashed border-[#B8BAB6] px-3 py-2 text-xs text-[#676970]">{partial}</div></div>}
          </div>
          <div className="flex items-center justify-center gap-3 border-t border-[#E5E7E3] p-4">
            {!active ? <button type="button" onClick={() => void connect()} disabled={!config?.available} className="flex h-10 items-center gap-2 bg-[#17181B] px-5 text-xs font-medium text-white disabled:cursor-not-allowed disabled:opacity-35"><Phone className="size-4" />Connect voice</button> : <><span className={`flex size-10 items-center justify-center rounded-full ${state === 'listening' ? 'bg-emerald-50 text-emerald-700' : 'bg-[#F3F3F0] text-[#676970]'}`}>{state === 'listening' ? <Mic className="size-4" /> : <MicOff className="size-4" />}</span><button type="button" onClick={endSession} className="flex h-10 items-center gap-2 bg-red-600 px-5 text-xs font-medium text-white"><PhoneOff className="size-4" />End</button></>}
          </div>
        </div>
      </div>
    </section>
  );
}
