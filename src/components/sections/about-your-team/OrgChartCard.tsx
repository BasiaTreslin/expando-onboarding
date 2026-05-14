'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { OrgChartModal } from './OrgChartModal';

export function OrgChartCard() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group text-left w-full bg-white rounded-2xl shadow-sm
                   border border-expando-gray-200 p-6 sm:p-7
                   transition-all duration-200
                   hover:-translate-y-0.5 hover:shadow-md
                   focus:outline-none focus:ring-2 focus:ring-expando-orange focus:ring-offset-2"
      >
        <div className="flex items-start gap-5">
          <div
            className="w-12 h-12 rounded-xl bg-expando-orange-soft
                       flex items-center justify-center flex-shrink-0 text-2xl"
            aria-hidden="true"
          >
            🏢
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-semibold text-expando-gray-900 leading-tight">
              {t('orgChart.cardTitle')}
            </h3>
            <p className="text-sm text-expando-gray-600 mt-1">
              {t('orgChart.cardSubtitle')}
            </p>

            <span
              className="inline-flex items-center gap-1.5 mt-4 text-sm font-medium
                         text-expando-orange group-hover:text-expando-orange-hover
                         transition-colors"
            >
              {t('orgChart.cta')}
              <ArrowRight
                size={14}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </span>
          </div>
        </div>
      </button>

      <OrgChartModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
