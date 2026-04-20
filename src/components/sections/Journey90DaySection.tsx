'use client';

import { useState } from 'react';
import { ChevronDown, Check, Award } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { SectionWrapper } from '@/components/ui/SectionWrapper';

interface MonthData {
  label: string;
  period: string;
  theme: string;
  goal: string;
  milestones: string[];
  output: string;
}

const MONTH_COLORS = [
  { bg: 'bg-blue-50', border: 'border-blue-200', badge: 'bg-blue-100 text-blue-700', accent: '#3b82f6' },
  { bg: 'bg-violet-50', border: 'border-violet-200', badge: 'bg-violet-100 text-violet-700', accent: '#7c3aed' },
  { bg: 'bg-expando-orange-soft', border: 'border-orange-200', badge: 'bg-expando-orange text-white', accent: '#FF4D00' },
];

function MonthCard({ month, index }: { month: MonthData; index: number }) {
  const [open, setOpen] = useState(index === 0);
  const colors = MONTH_COLORS[index % MONTH_COLORS.length];
  const { t } = useLanguage();

  return (
    <div className={`rounded-2xl border-2 ${colors.border} overflow-hidden transition-shadow duration-200 hover:shadow-md`}>
      {/* Header */}
      <button
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center justify-between p-5 sm:p-6 text-left ${colors.bg}`}
        aria-expanded={open}
      >
        <div className="flex items-center gap-4">
          <span className={`text-sm font-bold px-3 py-1 rounded-full ${colors.badge}`}>
            {month.label}
          </span>
          <div>
            <p className="text-xs text-expando-gray-600">{month.period}</p>
            <h3 className="font-bold text-expando-gray-900 text-base sm:text-lg">{month.theme}</h3>
          </div>
        </div>
        <ChevronDown
          size={20}
          className={`text-expando-gray-600 transition-transform duration-200 flex-shrink-0 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Body */}
      {open && (
        <div className="p-5 sm:p-6 border-t-2 border-expando-gray-200">
          {/* Goal */}
          <p className="text-expando-gray-700 leading-relaxed mb-5 italic">
            &ldquo;{month.goal}&rdquo;
          </p>

          {/* Milestones */}
          <ul className="space-y-2.5 mb-5">
            {month.milestones.map((milestone, i) => (
              <li key={i} className="flex items-start gap-3">
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ backgroundColor: colors.accent + '20', color: colors.accent }}
                >
                  <Check size={11} strokeWidth={2.5} />
                </div>
                <span className="text-expando-gray-700 text-sm leading-relaxed">{milestone}</span>
              </li>
            ))}
          </ul>

          {/* Output */}
          <div className="flex items-start gap-3 bg-white rounded-xl p-4 border border-expando-gray-200">
            <Award size={18} className="text-expando-orange flex-shrink-0 mt-0.5" />
            <p className="text-sm text-expando-gray-700 leading-relaxed font-medium">{month.output}</p>
          </div>

          {/* Certification badge for last month */}
          {index === 2 && (
            <div className="mt-4 bg-expando-orange text-white rounded-xl p-4 flex items-center gap-3">
              <Award size={24} />
              <div>
                <p className="font-bold">{t('journey90.certified')} 🏅</p>
                <p className="text-white/80 text-sm">Pass all weekly quizzes with ≥80% to unlock</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function Journey90DaySection() {
  const { t, messages } = useLanguage();
  const months = messages.journey90.months as MonthData[];

  return (
    <SectionWrapper id="90-days" className="py-20 sm:py-28 bg-expando-gray-50">
      <div className="section-container">
        {/* Heading */}
        <div className="mb-12">
          <div className="orange-line mb-4" />
          <h2 className="section-heading">{t('journey90.title')}</h2>
          <p className="section-subheading max-w-2xl">{t('journey90.subtitle')}</p>
        </div>

        {/* Month cards */}
        <div className="space-y-4 max-w-3xl">
          {months.map((month, index) => (
            <MonthCard key={month.label} month={month} index={index} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
