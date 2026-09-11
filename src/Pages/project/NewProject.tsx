/**
 * The empty Home: a plain chat with no project behind it yet. The first message
 * that names a company, website, and the operator's role creates the project
 * and starts research; anything less comes back as a clarifying question.
 */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import Chat, { type Turn } from '../../Component/Chat';
import { coirei } from '../../api/coirei';
import { keys } from '../../hooks/useProjects';

const SUGGESTIONS = [
  'I’m Asha, founder of Acme. We sell an LMS to training institutes in India. Our site is acme.com',
  'I run growth at Northwind. We build warehouse software — northwind.com',
];

export default function NewProject() {
  const navigate = useNavigate();
  const cache = useQueryClient();
  const [message, setMessage] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [turns, setTurns] = useState<Turn[]>([]);
  const [busy, setBusy] = useState(false);

  const submit = async (event?: React.FormEvent) => {
    event?.preventDefault();
    const text = message.trim();
    if (!text && !files.length) return;

    // Everything typed so far is context: the backend needs name, role, company
    // and website together, and the operator may supply them across two turns.
    const history = [...turns, { role: 'user' as const, message: text }];
    setTurns(history);
    setMessage('');
    setBusy(true);
    try {
      const combined = history.filter((turn) => turn.role === 'user').map((turn) => turn.message).join('\n');
      const result = await coirei.intake(combined);

      if (!result.company_id) {
        setTurns([...history, { role: 'assistant', message: result.question || 'Please include your name, role, company and website.' }]);
        return;
      }

      const id = result.company_id;
      for (const file of files) await coirei.uploadDocument(id, file);
      setFiles([]);
      await coirei.act(id, 'start');
      await cache.invalidateQueries({ queryKey: keys.projects });
      navigate(`/p/${id}`, { replace: true });
    } catch (error) {
      toast.error((error as Error).message);
      setTurns(history);
    } finally {
      setBusy(false);
    }
  };

  return (
    <Chat
      turns={turns}
      value={message}
      onChange={setMessage}
      onSubmit={submit}
      files={files}
      onFiles={setFiles}
      busy={busy}
      thinking={busy ? 'Setting up your project…' : undefined}
      suggestions={turns.length ? [] : SUGGESTIONS}
    />
  );
}
