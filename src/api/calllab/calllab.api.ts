/** Call Lab: realtime voice testing. Mirrors app/domains/calls/router.py. */

import api from '../../lib/axios';

export type CallConnectionState =
  | 'idle'
  | 'connecting'
  | 'listening'
  | 'thinking'
  | 'speaking'
  | 'ended'
  | 'error';

export type LeadTemperature = 'HOT' | 'WARM' | 'COLD';
export type SpeechProviderId = 'ELEVENLABS' | 'FOLLEI';

export interface VoiceOption {
  id: string;
  name: string;
  description: string;
  language: string;
  accent: string;
}

export interface SpeechProviderOption {
  id: SpeechProviderId;
  name: string;
  available: boolean;
  reason?: string | null;
  voices: VoiceOption[];
  default_voice_id: string | null;
  stt_model: string;
  tts_model: string;
  output_sample_rate: number;
}

export interface CallLabConfig {
  available: boolean;
  providers: SpeechProviderOption[];
  default_provider: SpeechProviderId;
  voices: VoiceOption[];
  default_voice_id: string | null;
  stt_model: string;
  tts_model: string;
  output_format: string;
  stability: number;
  similarity: number;
  style: number | null;
  speed: number | null;
  speaker_boost: boolean;
  input_sample_rate: number;
  output_sample_rate: number;
  /** Why voice is unavailable, when it is. */
  reason?: string | null;
}

export interface CallSession {
  id: string;
  workspace_id: string;
  lead_id: string | null;
  status: string;
  language: string;
  speech_provider: SpeechProviderId;
  voice_id: string;
  voice_name: string;
  lead_temperature: LeadTemperature | null;
}

export interface RealtimeTicket {
  ticket: string;
  websocket_path: string;
  expires_in: number;
}

export const getCallLabConfig = async (workspaceId: string): Promise<CallLabConfig> => {
  const { data } = await api.get<CallLabConfig>(`/api/workspaces/${workspaceId}/call-lab/config`);
  return data;
};

export const createCallSession = async (
  workspaceId: string,
  payload: {
    lead_id?: string | null;
    language?: string | null;
    speech_provider?: SpeechProviderId | null;
    voice_id?: string | null;
  } = {},
): Promise<CallSession> => {
  const { data } = await api.post<CallSession>(`/api/workspaces/${workspaceId}/call-sessions`, payload);
  return data;
};

/**
 * A short-lived ticket for the WebSocket.
 *
 * Browsers cannot set an Authorization header on a WebSocket handshake, so
 * the socket authenticates with a single-use ticket in the query string
 * instead of the bearer token.
 */
export const createRealtimeTicket = async (
  workspaceId: string,
  sessionId: string,
): Promise<RealtimeTicket> => {
  const { data } = await api.post<RealtimeTicket>(
    `/api/workspaces/${workspaceId}/call-sessions/${sessionId}/ticket`,
  );
  return data;
};

/**
 * Absolute WebSocket URL for the realtime call.
 *
 * In dev VITE_API_BASE_URL is empty and Vite proxies /api, so the socket
 * goes to the page's own origin; with an explicit API base it must follow
 * that host, swapping http(s) for ws(s).
 */
export const realtimeSocketUrl = (websocketPath: string, ticket: string): string => {
  const base = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');
  const origin = base || window.location.origin;
  const wsOrigin = origin.replace(/^http/, 'ws');
  return `${wsOrigin}${websocketPath}?ticket=${encodeURIComponent(ticket)}`;
};
