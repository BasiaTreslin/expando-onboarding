'use client';

import { TrendingUp } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

export function PerformanceReviewCard() {
  const { t, messages } = useLanguage();
  const items = (messages as unknown as {
    performance: { items: string[] };
  }).performance.items;

  return (
    <div
      className="bg-white rounded-xl shadow-sm border border-expando-gray-200
                 p-6 h-full flex flex-col"
    >
      <div className="flex items-start gap-3 mb-4">
        <div
          className="w-10 h-10 rounded-lg bg-expando-orange-soft
                     flex items-center justify-center flex-shrink-0"
        >
          <TrendingUp
            size={20}
            className="text-expando-orange"
            strokeWidth={2}
          />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-semibold text-expando-gray-900 leading-tight">
            {t('performance.title')}
          </h3>
          <p className="text-sm text-expando-gray-600 mt-0.5">
            {t('performance.subtitle')}
          </p>
        </div>
      </div>
      <ul className="space-y-2 text-[14px] text-expando-gray-900 leading-relaxed">
        {items.map((item, i) => (
          <li key={i} className="flex gap-2">
            <span className="text-expando-orange flex-shrink-0">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
