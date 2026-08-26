/**
 * Phases 4-7: requirements draft -> gap questions -> sales package -> approve.
 *
 * This is a pipeline, not four screens the user has to find. Confirming the
 * goal starts it, and each stage triggers the next; the only place a human is
 * needed is answering the gap questions (capped at one or two by design) and
 * approving the result.
 */

import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { errorMessage } from '../lib/axios';
import {
  answerGapQuestion,
  generateGapQuestions,
  generateRequirements,
  generateSalesPackage,
  getRequirements,
  getSalesPackage,
  listGapQuestions,
  reviseSalesPackage,
  verifySalesPackage,
  type GapQuestion,
  type RequirementsDraft,
  type SalesPackage,
} from '../api/setup/setup.api';

export type PackageStage =
  | 'idle'
  | 'requirements'
  | 'gap-questions'
  | 'awaiting-answers'
  | 'package'
  | 'review'
  | 'verified';

/** What the user is told while each stage runs. Kept beside the stage union
 *  so a new stage cannot be added without a label. */
export const STAGE_LABELS: Record<PackageStage, string> = {
  idle: '',
  requirements: 'Drafting what success looks like...',
  'gap-questions': 'Working out what else Follei needs to know...',
  'awaiting-answers': 'A couple of questions before Follei can write your pitch',
  package: 'Writing your pitch, strategy and call script...',
  review: 'Review your sales package',
  verified: 'Approved — Follei is ready to start calling',
};

export const useSalesPackageFlow = (workspaceId: string | undefined) => {
  const [stage, setStage] = useState<PackageStage>('idle');
  const [requirements, setRequirements] = useState<RequirementsDraft | null>(null);
  const [gapQuestions, setGapQuestions] = useState<GapQuestion[]>([]);
  const [salesPackage, setSalesPackage] = useState<SalesPackage | null>(null);
  const [isWorking, setIsWorking] = useState(false);

  // Resume where a previous session stopped instead of restarting the
  // pipeline every time the page mounts.
  useEffect(() => {
    if (!workspaceId) return;
    let cancelled = false;
    (async () => {
      const [pkg, draft, questions] = await Promise.all([
        getSalesPackage(workspaceId).catch(() => null),
        getRequirements(workspaceId).catch(() => null),
        listGapQuestions(workspaceId).catch(() => [] as GapQuestion[]),
      ]);
      if (cancelled) return;
      if (pkg) {
        setSalesPackage(pkg);
        setStage(pkg.verified ? 'verified' : 'review');
      } else if (questions.length) {
        setGapQuestions(questions);
        setStage(questions.some((q) => q.status !== 'ANSWERED') ? 'awaiting-answers' : 'gap-questions');
      } else if (draft) {
        setRequirements(draft);
        setStage('gap-questions');
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [workspaceId]);

  const generatePackage = useCallback(async () => {
    if (!workspaceId) return;
    setIsWorking(true);
    setStage('package');
    try {
      setSalesPackage(await generateSalesPackage(workspaceId));
      setStage('review');
    } catch (error) {
      toast.error(errorMessage(error, 'Could not generate your sales package'));
      setStage('awaiting-answers');
    } finally {
      setIsWorking(false);
    }
  }, [workspaceId]);

  /** Runs straight after the goal is confirmed. */
  const start = useCallback(async () => {
    if (!workspaceId) return;
    setIsWorking(true);
    setStage('requirements');
    try {
      setRequirements(await generateRequirements(workspaceId));
      setStage('gap-questions');
      const questions = await generateGapQuestions(workspaceId);
      setGapQuestions(questions);
      if (questions.length === 0) {
        // Nothing genuinely missing, so don't invent a question to ask.
        await generatePackage();
      } else {
        setStage('awaiting-answers');
      }
    } catch (error) {
      toast.error(errorMessage(error, 'Could not draft your requirements'));
      setStage('idle');
    } finally {
      setIsWorking(false);
    }
  }, [workspaceId, generatePackage]);

  const answerQuestion = useCallback(
    async (questionId: string, answer: string) => {
      if (!workspaceId) return;
      setIsWorking(true);
      try {
        const updated = await answerGapQuestion(workspaceId, questionId, answer);
        const next = gapQuestions.map((q) => (q.id === questionId ? updated : q));
        setGapQuestions(next);
        if (next.every((q) => q.status === 'ANSWERED')) await generatePackage();
      } catch (error) {
        toast.error(errorMessage(error, 'Could not save that answer'));
      } finally {
        setIsWorking(false);
      }
    },
    [workspaceId, gapQuestions, generatePackage],
  );

  /** Phase 7: ask for a change rather than accepting as-is. */
  const requestRevision = useCallback(
    async (feedback: string) => {
      if (!workspaceId || !salesPackage) return;
      setIsWorking(true);
      try {
        setSalesPackage(await reviseSalesPackage(workspaceId, salesPackage.id, feedback));
        toast.success('Updated from your feedback');
      } catch (error) {
        toast.error(errorMessage(error, 'Could not apply that feedback'));
      } finally {
        setIsWorking(false);
      }
    },
    [workspaceId, salesPackage],
  );

  const approve = useCallback(async () => {
    if (!workspaceId || !salesPackage) return;
    setIsWorking(true);
    try {
      setSalesPackage(await verifySalesPackage(workspaceId, salesPackage.id));
      setStage('verified');
      toast.success('Approved -- Follei is ready to start calling');
    } catch (error) {
      toast.error(errorMessage(error, 'Could not approve the sales package'));
    } finally {
      setIsWorking(false);
    }
  }, [workspaceId, salesPackage]);

  return {
    stage,
    requirements,
    gapQuestions,
    salesPackage,
    isWorking,
    start,
    answerQuestion,
    requestRevision,
    approve,
  };
};
