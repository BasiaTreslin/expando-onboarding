'use client';

import { useEffect, useState } from 'react';
import { CheckCircle2, ClipboardList } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { getCompletedTasks } from '@/lib/taskStorage';
import type { ProfileTask } from '@/types';

interface TasksProgressProps {
  slug: string;
  tasks: ProfileTask[];
}

export function TasksProgress({ slug, tasks }: TasksProgressProps) {
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [completed, setCompleted] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setMounted(true);
    setCompleted(getCompletedTasks(slug));

    const onTasksUpdated = (e: Event) => {
      const detail = (e as CustomEvent<{ slug?: string }>).detail;
      if (!detail || detail.slug === slug) {
        setCompleted(getCompletedTasks(slug));
      }
    };
    window.addEventListener('tasks-updated', onTasksUpdated);
    return () => window.removeEventListener('tasks-updated', onTasksUpdated);
  }, [slug]);

  if (!tasks.length) return null;

  const total = tasks.length;
  const doneCount = tasks.filter((task) => completed[task.id]).length;
  const allDone = doneCount === total;

  // Render a stable placeholder before mount to avoid SSR/CSR flash
  const label = !mounted
    ? t('gamification.progress.inProgress', { done: 0, total })
    : allDone
      ? t('gamification.progress.allDone')
      : t('gamification.progress.inProgress', { done: doneCount, total });

  const pillClass = allDone && mounted
    ? 'bg-green-50 border-green-200 text-green-800'
    : 'bg-white border-orange-200 text-expando-gray-900';

  const iconColor = allDone && mounted ? 'text-green-600' : 'text-expando-orange';

  return (
    <div
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border shadow-sm
                  text-sm font-semibold transition-colors ${pillClass}`}
      aria-live="polite"
    >
      <span className={iconColor} aria-hidden="true">
        {allDone && mounted ? <CheckCircle2 size={16} /> : <ClipboardList size={16} />}
      </span>
      <span>{label}</span>
    </div>
  );
}
