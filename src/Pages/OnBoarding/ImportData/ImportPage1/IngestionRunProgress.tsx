import React, { useEffect, useState } from 'react';
import { Loader2, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

interface IngestionEvent {
  id: string;
  timestamp: string;
  level: 'info' | 'warning' | 'error';
  stage: string;
  message: string;
  details?: Record<string, unknown>;
}

interface IngestionRunProgressProps {
  runId: string;
  onComplete?: () => void;
  onError?: (err: any) => void;
}

export const IngestionRunProgress: React.FC<IngestionRunProgressProps> = ({ runId, onComplete, onError }) => {
  const [events, setEvents] = useState<IngestionEvent[]>([]);
  const [status, setStatus] = useState<'connecting' | 'processing' | 'completed' | 'failed'>('connecting');
  const [currentStage, setCurrentStage] = useState<string>('Initializing');

  useEffect(() => {
    if (!runId) return;

    setStatus('connecting');
    const token = sessionStorage.getItem('follei_access_token');

    // Create EventSource with token in URL if backend supports it, 
    // or standard if backend uses cookie. Assuming standard EventSource for now.
    // Ideally this endpoint should support auth token either via cookie or query param
    // The prompt says GET /api/v1/onboarding/runs/{run_id}/events
    const eventSourceUrl = `/api/v1/onboarding/runs/${runId}/events${token ? `?token=${token}` : ''}`;
    const eventSource = new EventSource(eventSourceUrl);

    eventSource.onopen = () => {
      setStatus('processing');
    };

    eventSource.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        if (data.type === 'progress') {
          setCurrentStage(data.stage || currentStage);
          setEvents(prev => [...prev, data]);
        } else if (data.type === 'complete') {
          setStatus('completed');
          eventSource.close();
          if (onComplete) onComplete();
        } else if (data.type === 'error') {
          setStatus('failed');
          eventSource.close();
          if (onError) onError(new Error(data.message));
        }
      } catch (err) {
        console.error('Failed to parse SSE message', err);
      }
    };

    eventSource.onerror = (err) => {
      console.error('SSE Error', err);
      setStatus('failed');
      eventSource.close();
      if (onError) onError(err);
    };

    return () => {
      eventSource.close();
    };
  }, [runId, onComplete, onError]);

  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-[#16171A] flex items-center gap-2">
            {status === 'processing' || status === 'connecting' ? (
              <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
            ) : status === 'completed' ? (
              <CheckCircle2 className="w-4 h-4 text-green-500" />
            ) : (
              <XCircle className="w-4 h-4 text-red-500" />
            )}
            Ingestion Progress
          </h3>
          <p className="text-xs text-gray-500 mt-1">Run ID: {runId}</p>
        </div>
        <div className="text-xs font-medium px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 uppercase tracking-wide">
          {status}
        </div>
      </div>

      <div className="mb-4">
        <p className="text-sm font-medium text-gray-800">Current Stage: <span className="font-normal text-gray-600">{currentStage}</span></p>
      </div>

      <div className="bg-gray-50 border border-gray-100 rounded-md p-3 max-h-48 overflow-y-auto space-y-2">
        {events.length === 0 && status === 'connecting' && (
          <p className="text-xs text-[#717378] italic">Connecting to live stream...</p>
        )}
        {events.length === 0 && status === 'processing' && (
          <p className="text-xs text-[#717378] italic">Waiting for events...</p>
        )}
        {events.map((ev, i) => (
          <div key={i} className="flex gap-2 items-start text-xs">
            <span className="text-[#717378] shrink-0 mt-0.5">
              {ev.timestamp ? new Date(ev.timestamp).toLocaleTimeString() : '-'}
            </span>
            <div className={`flex-1 ${ev.level === 'error' ? 'text-red-600 font-medium' : ev.level === 'warning' ? 'text-yellow-600' : 'text-gray-700'}`}>
              <span className="font-semibold text-[#16171A] mr-2">[{ev.stage}]</span>
              {ev.message}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
