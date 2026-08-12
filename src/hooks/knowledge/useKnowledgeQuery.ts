import { useState, useCallback } from 'react';
import { getAccessToken } from '../../lib/auth';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export interface StreamResponse {
  type: 'token' | 'sources' | 'done' | 'error';
  content?: string;
  sources?: any[];
  error?: string;
}

export const useKnowledgeQuery = () => {
  const [isStreaming, setIsStreaming] = useState(false);
  const [response, setResponse] = useState<string>('');
  const [sources, setSources] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const queryStream = useCallback(async (query: string) => {
    setIsStreaming(true);
    setResponse('');
    setSources([]);
    setError(null);

    const token = getAccessToken();

    try {
      const res = await fetch(`${BASE_URL}/api/v1/knowledge/query/stream`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ query }),
      });

      if (!res.ok) {
        throw new Error(`Stream error: ${res.status}`);
      }

      if (!res.body) {
        throw new Error('ReadableStream not supported by response');
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { value, done } = await reader.read();
        
        if (done) {
          break;
        }

        buffer += decoder.decode(value, { stream: true });
        
        const lines = buffer.split('\n');
        // Keep the last incomplete line in the buffer
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const dataStr = line.slice(6).trim();
            if (!dataStr) continue;
            
            try {
              const parsed: StreamResponse = JSON.parse(dataStr);
              
              if (parsed.type === 'token' && parsed.content) {
                setResponse((prev) => prev + parsed.content);
              } else if (parsed.type === 'sources' && parsed.sources) {
                setSources(parsed.sources);
              } else if (parsed.type === 'error') {
                setError(parsed.error || 'Unknown streaming error');
              } else if (parsed.type === 'done') {
                // Done event explicitly sent by server
                setIsStreaming(false);
              }
            } catch (e) {
              console.warn('Failed to parse SSE data:', dataStr);
            }
          }
        }
      }
    } catch (err: any) {
      setError(err.message || 'Stream failed');
    } finally {
      setIsStreaming(false);
    }
  }, []);

  return {
    queryStream,
    isStreaming,
    response,
    sources,
    error
  };
};
