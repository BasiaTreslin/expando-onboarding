'use client';

import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import type { ProfileTask } from '@/types';

interface ProfileTaskCardProps {
  tasks: ProfileTask[];
}

export function ProfileTaskCard({ tasks }: ProfileTaskCardProps) {
  const { t } = useLanguage();
  if (!tasks.length) return null;

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="relative overflow-hidden bg-gradient-to-br from-expando-orange-soft to-white
                     border border-orange-200 rounded-2xl shadow-sm p-5 sm:p-6
                     flex flex-col sm:flex-row sm:items-center gap-4"
        >
          {task.icon && (
            <div
              className="w-12 h-12 flex-shrink-0 rounded-xl bg-white shadow-sm
                         flex items-center justify-center text-2xl"
              aria-hidden="true"
            >
              {task.icon}
            </div>
          )}

          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-expando-gray-900 leading-tight">
              {t(task.titleKey)}
            </h4>
            <p className="text-sm text-expando-gray-700 mt-1 leading-relaxed">
              {t(task.descriptionKey)}
            </p>
          </div>

          <a
            href={task.actionUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary flex-shrink-0 self-start sm:self-auto"
          >
            {t(task.actionLabelKey)}
            <ArrowUpRight size={16} />
          </a>
        </div>
      ))}
    </div>
  );
}
