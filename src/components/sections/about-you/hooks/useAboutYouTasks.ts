'use client';

import { useEffect, useState } from 'react';
import { getCompletedTasks, markTaskCompleted } from '@/lib/taskStorage';

export const ABOUT_YOU_TASK_IDS = {
  contract: 'about-you:contract-reviewed',
  questionnaire: 'about-you:questionnaire-submitted',
} as const;

export interface AboutYouTasksState {
  mounted: boolean;
  contractDone: boolean;
  questionnaireDone: boolean;
  doneCount: number;
  total: number;
  markContractReviewed: () => void;
  markQuestionnaireSubmitted: () => void;
}

export function useAboutYouTasks(slug: string): AboutYouTasksState {
  const [mounted, setMounted] = useState(false);
  const [completed, setCompleted] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setMounted(true);
    setCompleted(getCompletedTasks(slug));

    const onUpdate = (e: Event) => {
      const detail = (e as CustomEvent<{ slug?: string }>).detail;
      if (!detail || detail.slug === slug) {
        setCompleted(getCompletedTasks(slug));
      }
    };
    window.addEventListener('tasks-updated', onUpdate);
    return () => window.removeEventListener('tasks-updated', onUpdate);
  }, [slug]);

  const contractDone = !!completed[ABOUT_YOU_TASK_IDS.contract];
  const questionnaireDone = !!completed[ABOUT_YOU_TASK_IDS.questionnaire];
  const doneCount = (contractDone ? 1 : 0) + (questionnaireDone ? 1 : 0);

  return {
    mounted,
    contractDone,
    questionnaireDone,
    doneCount,
    total: 2,
    markContractReviewed: () => markTaskCompleted(slug, ABOUT_YOU_TASK_IDS.contract),
    markQuestionnaireSubmitted: () =>
      markTaskCompleted(slug, ABOUT_YOU_TASK_IDS.questionnaire),
  };
}
