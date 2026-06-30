export interface LogItem {
  id: string;
  type: 'call' | 'email' | 'meeting' | 'note' | 'web';
  title: string;
  time: string;
  duration?: string;
  badge?: string;
  details?: string;
  attachedFile?: {
    name: string;
    size: string;
  };
}