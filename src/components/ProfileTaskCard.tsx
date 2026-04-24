'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Check, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { getCompletedTasks, markTaskCompleted } from '@/lib/taskStorage';
import { CelebrationModal } from '@/components/CelebrationModal';
import type { ProfileTask } from '@/types';

interface ProfileTaskCardProps {
  tasks: ProfileTask[];
  slug: string;
  firstName: string;
}

export function ProfileTaskCard({ tasks, slug, firstName }: ProfileTaskCardProps) {
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  const [activeTask, setActiveTask] = useState<ProfileTask | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

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

  const handleMarkDone = (task: ProfileTask, btn: HTMLButtonElement) => {
    triggerRef.current = btn;
    markTaskCompleted(slug, task.id);
    setActiveTask(task);
  };

  const closeModal = () => {
    setActiveTask(null);
    // restore focus to the originating trigger if still in DOM
    setTimeout(() => triggerRef.current?.focus?.(), 0);
  };

  return (
    <>
      <div className="space-y-3">
        {tasks.map((task) => {
          const isDone = mounted && !!completed[task.id];
          const isCompletable = task.completable !== false;

          return (
            <div
              key={task.id}
              className={`relative overflow-hidden rounded-2xl shadow-sm p-5 sm:p-6
                         flex flex-col sm:flex-row sm:items-center gap-4 transition-colors
                         ${
                           isDone
                             ? 'bg-white border border-green-200'
                             : 'bg-gradient-to-br from-expando-orange-soft to-white border border-orange-200'
                         }`}
            >
              {task.icon && (
                <div
                  className={`relative w-12 h-12 flex-shrink-0 rounded-xl shadow-sm
                             flex items-center justify-center text-2xl
                             ${isDone ? 'bg-green-50' : 'bg-white'}`}
                  aria-hidden="true"
                >
                  {isDone ? (
                    <CheckCircle2 className="text-green-600" size={24} />
                  ) : (
                    task.icon
                  )}
                </div>
              )}

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4
                    className={`font-bold leading-tight ${
                      isDone
                        ? 'text-expando-gray-600'
                        : 'text-expando-gray-900'
                    }`}
                  >
                    {t(task.titleKey)}
                  </h4>
                  {isDone && (
                    <span
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs
                                 font-semibold bg-green-100 text-green-700 border border-green-200"
                    >
                      <Check size={12} />
                      {t('gamification.task.completed')}
                    </span>
                  )}
                </div>
                <p
                  className={`text-sm mt-1 leading-relaxed ${
                    isDone ? 'text-expando-gray-500' : 'text-expando-gray-700'
                  }`}
                >
                  {t(task.descriptionKey)}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 flex-shrink-0">
                <a
                  href={task.actionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={isDone ? 'btn-secondary' : 'btn-primary'}
                >
                  {t(task.actionLabelKey)}
                  <ArrowUpRight size={16} />
                </a>
                {isCompletable && !isDone && (
                  <button
                    type="button"
                    onClick={(e) => handleMarkDone(task, e.currentTarget)}
                    className="inline-flex items-center gap-1.5 text-sm font-medium
                               text-expando-gray-700 hover:text-expando-orange transition-colors
                               px-3 py-2 rounded-lg hover:bg-white/70"
                  >
                    <Check size={14} />
                    {t('gamification.task.markDone')}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <CelebrationModal
        open={!!activeTask}
        onClose={closeModal}
        firstName={firstName}
        celebrationMediaUrl={activeTask?.celebrationMediaUrl}
        celebrationPoster={activeTask?.celebrationPoster}
        celebrationMessageKey={activeTask?.celebrationMessageKey}
      />
    </>
  );
}
