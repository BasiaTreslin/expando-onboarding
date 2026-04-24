'use client';

import { useEffect, useState } from 'react';
import { Target, X } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { dismissIntro, isIntroDismissed } from '@/lib/taskStorage';

interface TasksIntroBannerProps {
  slug: string;
  hasTasks: boolean;
}

export function TasksIntroBanner({ slug, hasTasks }: TasksIntroBannerProps) {
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    setMounted(true);
    setDismissed(isIntroDismissed(slug));
  }, [slug]);

  if (!hasTasks) return null;
  if (!mounted) return null;
  if (dismissed) return null;

  const handleDismiss = () => {
    setLeaving(true);
    dismissIntro(slug);
    setTimeout(() => setDismissed(true), 250);
  };

  return (
    <div
      className={`relative z-20 transition-opacity duration-200 ${
        leaving ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="section-container pt-20 pb-2 sm:pt-24">
        <div
          className="bg-expando-orange-soft border border-orange-200 rounded-2xl shadow-sm
                     p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4"
          role="status"
        >
          <div
            className="w-10 h-10 sm:w-11 sm:h-11 flex-shrink-0 rounded-xl bg-white shadow-sm
                       flex items-center justify-center text-expando-orange"
            aria-hidden="true"
          >
            <Target size={20} />
          </div>
          <p className="flex-1 text-sm sm:text-base text-expando-gray-800 leading-relaxed">
            {t('gamification.banner.message')}
          </p>
          <button
            onClick={handleDismiss}
            className="btn-primary text-sm py-2 px-4 self-start sm:self-auto flex-shrink-0"
          >
            {t('gamification.banner.dismiss')}
          </button>
          <button
            onClick={handleDismiss}
            aria-label={t('gamification.banner.dismiss')}
            className="absolute top-2 right-2 sm:hidden p-1 rounded-lg text-expando-gray-500
                       hover:text-expando-gray-800 hover:bg-white/60 transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
