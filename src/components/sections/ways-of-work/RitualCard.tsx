'use client';

import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

export type RitualColor = 'blue' | 'orange' | 'green';

interface RitualCardProps {
  frequencyKey: string;
  icon: string;
  titleKey: string;
  teaserKey: string;
  color: RitualColor;
  onClick: () => void;
}

const COLOR_STYLES: Record<
  RitualColor,
  {
    bg: string;
    border: string;
    badge: string;
    link: string;
  }
> = {
  blue: {
    bg: 'bg-blue-50',
    border: 'border-t-4 border-blue-500',
    badge: 'bg-blue-100 text-blue-700',
    link: 'text-blue-700 hover:text-blue-800',
  },
  orange: {
    bg: 'bg-orange-50',
    border: 'border-t-4 border-orange-500',
    badge: 'bg-orange-100 text-orange-700',
    link: 'text-orange-700 hover:text-orange-800',
  },
  green: {
    bg: 'bg-green-50',
    border: 'border-t-4 border-green-600',
    badge: 'bg-green-100 text-green-700',
    link: 'text-green-700 hover:text-green-800',
  },
};

export function RitualCard({
  frequencyKey,
  icon,
  titleKey,
  teaserKey,
  color,
  onClick,
}: RitualCardProps) {
  const { t } = useLanguage();
  const styles = COLOR_STYLES[color];

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group text-left w-full h-full ${styles.bg} ${styles.border}
                  rounded-xl shadow-sm
                  p-6 flex flex-col cursor-pointer
                  transition-all duration-200
                  hover:shadow-md hover:-translate-y-0.5
                  focus:outline-none focus:ring-2 focus:ring-expando-orange focus:ring-offset-2`}
    >
      <span
        className={`inline-flex items-center self-start px-2.5 py-1 rounded-full
                   text-xs font-semibold ${styles.badge} mb-4`}
      >
        {t(frequencyKey)}
      </span>

      <div className="text-3xl mb-3" aria-hidden="true">
        {icon}
      </div>

      <h3 className="text-lg font-semibold text-expando-gray-900 leading-tight mb-2">
        {t(titleKey)}
      </h3>

      <p className="text-sm text-expando-gray-600 leading-relaxed flex-1">
        {t(teaserKey)}
      </p>

      <span
        className={`inline-flex items-center gap-1.5 mt-5 text-sm font-medium
                    ${styles.link} transition-colors`}
      >
        {t('waysOfWork.learnMore')}
        <ArrowRight
          size={14}
          className="transition-transform group-hover:translate-x-0.5"
        />
      </span>
    </button>
  );
}
