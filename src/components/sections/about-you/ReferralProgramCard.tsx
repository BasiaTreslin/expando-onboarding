'use client';

import { Gift, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const OPEN_POSITIONS_URL = 'https://www.cocuma.cz/company/expando/jobs/';

export function ReferralProgramCard() {
  const { t, messages } = useLanguage();
  const items = (messages as unknown as {
    referral: { items: string[] };
  }).referral.items;

  return (
    <div
      className="bg-white rounded-xl shadow-sm border border-expando-gray-200
                 overflow-hidden h-full flex flex-col"
    >
      {/* Green top accent — distinguishes from orange action tiles */}
      <div className="h-[3px] bg-expando-green-deep" />
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-start gap-3 mb-4">
          <div
            className="w-10 h-10 rounded-lg bg-expando-green-soft
                       flex items-center justify-center flex-shrink-0"
          >
            <Gift
              size={20}
              className="text-expando-green-deep"
              strokeWidth={2}
            />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-semibold text-expando-gray-900 leading-tight">
              {t('referral.title')}
            </h3>
            <p className="text-sm text-expando-gray-600 mt-0.5">
              {t('referral.subtitle')}
            </p>
          </div>
        </div>
        <ul className="space-y-2 text-[14px] text-expando-gray-900 leading-relaxed flex-1">
          {items.map((item, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-expando-green-deep flex-shrink-0">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <a
          href={OPEN_POSITIONS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 mt-5 text-[14px] font-medium
                     text-expando-green-deep hover:underline transition-colors w-fit"
        >
          {t('referral.cta')}
          <ArrowRight size={14} />
        </a>
      </div>
    </div>
  );
}
