'use client';

import { useLanguage } from '@/i18n/LanguageContext';

interface StatusPillProps {
  doneCount: number;
  total: number;
  mounted: boolean;
}

export function StatusPill({ doneCount, total, mounted }: StatusPillProps) {
  const { t } = useLanguage();

  if (!mounted || doneCount === 0) return null;

  const allDone = doneCount === total;
  const text = allDone
    ? t('aboutYou.pillAllDone')
    : t('aboutYou.pillInProgress', { done: doneCount, total });

  return (
    <span
      key={doneCount}
      className={`inline-flex items-center px-3 py-[5px] rounded-full text-xs font-medium
                  animate-scale-in
                  ${
                    allDone
                      ? 'bg-expando-green-soft text-expando-green-deep'
                      : 'bg-expando-orange-soft text-expando-orange-deep'
                  }`}
      aria-live="polite"
    >
      {text}
    </span>
  );
}
