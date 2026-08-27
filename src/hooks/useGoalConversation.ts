/**
 * Phase 3 -- the goal. A conversation, not a form: the user says what they
 * want, Follei reflects back what it understood, and the goal is only
 * finalized when the backend says it is.
 */

import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { errorMessage } from '../lib/axios';
import {
  getGoalSuggestions,
  listGoalMessages,
  sendGoalMessage,
  type GoalTurn,
} from '../api/setup/setup.api';

export const useGoalConversation = (workspaceId: string | undefined) => {
  const [turns, setTurns] = useState<GoalTurn[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [understanding, setUnderstanding] = useState('');
  const [goalText, setGoalText] = useState<string | null>(null);
  const [isFinalized, setIsFinalized] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!workspaceId) {
      setIsLoading(false);
      return;
    }
    let cancelled = false;
    (async () => {
      // Suggestions are generated from the workspace's own documents, so they
      // are only meaningful once ingestion has produced something.
      const [history, suggested] = await Promise.all([
        listGoalMessages(workspaceId).catch(() => [] as GoalTurn[]),
        getGoalSuggestions(workspaceId)
          .then((r) => r.suggestions)
          .catch(() => [] as string[]),
      ]);
      if (cancelled) return;
      setTurns(history);
      setSuggestions(suggested);
      const lastAssistant = [...history].reverse().find((t) => t.role === 'ASSISTANT');
      if (lastAssistant) setUnderstanding(lastAssistant.message);
      setIsLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [workspaceId]);

  const send = useCallback(
    async (message: string) => {
      if (!workspaceId || !message.trim()) return null;
      setIsSending(true);
      // Show the user's own turn immediately; waiting for the round trip
      // makes the conversation feel broken on a slow model.
      setTurns((prev) => [...prev, { role: 'USER', message }]);
      try {
        const result = await sendGoalMessage(workspaceId, message);
        setTurns((prev) => [...prev, { role: 'ASSISTANT', message: result.reply }]);
        setUnderstanding(result.reply);
        setIsFinalized(result.goal_finalized);
        setGoalText(result.goal_text);
        return result;
      } catch (error) {
        // Roll the optimistic turn back so the transcript matches the server.
        setTurns((prev) => prev.slice(0, -1));
        toast.error(errorMessage(error, 'Could not send that'));
        return null;
      } finally {
        setIsSending(false);
      }
    },
    [workspaceId],
  );

  return {
    turns,
    suggestions,
    understanding,
    goalText,
    isFinalized,
    isSending,
    isLoading,
    send,
  };
};
