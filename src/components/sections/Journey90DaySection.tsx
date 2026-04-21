'use client';

import { Users } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { SectionWrapper } from '@/components/ui/SectionWrapper';

interface MonthData {
  emoji: string;
  label: string;
  theme: string;
  goal: string;
  understand: string[];
  support: string;
}

const MONTH_BORDERS = ['border-blue-200', 'border-violet-200', 'border-orange-300'];
const MONTH_BG = ['bg-blue-50', 'bg-violet-50', 'bg-expando-orange-soft'];
const MONTH_BADGE = [
  'bg-blue-100 text-blue-700',
  'bg-violet-100 text-violet-700',
  'bg-expando-orange text-white',
];

export function Journey90DaySection() {
  const { t, messages } = useLanguage();
  const months = messages.journey90.months as MonthData[];

  return (
    <SectionWrapper id="90-days" className="py-20 sm:py-28 bg-white">
      <div className="section-container">
        <div className="mb-12 max-w-2xl">
          <div className="orange-line mb-4" />
          <h2 className="section-heading">{t('journey90.title')}</h2>
          <p className="section-subheading">{t('journey90.subtitle')}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 max-w-5xl">
          {months.map((month, i) => (
            <div
              key={month.label}
              className={`rounded-2xl border-2 ${MONTH_BORDERS[i]} ${MONTH_BG[i]} p-6 flex flex-col`}
            >
              <div className="mb-4">
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${MONTH_BADGE[i]}`}>
                  {month.label}
                </span>
              </div>

              <div className="text-3xl mb-3">{month.emoji}</div>

              <h3 className="font-bold text-xl text-expando-gray-900 mb-3">{month.theme}</h3>

              <p className="text-sm text-expando-gray-700 leading-relaxed mb-5">{month.goal}</p>

              <div className="mb-5">
                <p className="text-xs font-semibold text-expando-gray-600 uppercase tracking-wider mb-2">
                  Čemu budeš rozumět:
                </p>
                <ul className="space-y-1">
                  {month.understand.map((item, j) => (
                    <li key={j} className="text-sm text-expando-gray-700 flex items-start gap-2">
                      <span className="text-expando-orange mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto pt-4 border-t border-expando-gray-200 flex items-center gap-2">
                <Users size={14} className="text-expando-orange flex-shrink-0" />
                <p className="text-xs text-expando-gray-700 font-medium">{month.support}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-sm text-expando-gray-600 max-w-2xl italic">{t('journey90.mapNote')}</p>
      </div>
    </SectionWrapper>
  );
}
