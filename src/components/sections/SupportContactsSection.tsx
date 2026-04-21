'use client';

import { useLanguage } from '@/i18n/LanguageContext';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import type { NewHireConfig } from '@/types';

interface SupportRow {
  situation: string;
  contact: string;
  channel: string;
}

interface SupportContactsProps {
  config: NewHireConfig;
}

export function SupportContactsSection({ config }: SupportContactsProps) {
  const { t, messages } = useLanguage();

  // Inject buddy and leader names into first two rows
  const rows = (messages.support.rows as SupportRow[]).map((row, i) => {
    if (i === 0) return { ...row, contact: config.buddy.name };
    if (i === 1) return { ...row, contact: config.teamLeader.name };
    return row;
  });

  return (
    <SectionWrapper id="support" className="py-20 sm:py-28 bg-white">
      <div className="section-container">
        {/* Heading */}
        <div className="mb-10">
          <div className="orange-line mb-4" />
          <h2 className="section-heading">{t('support.title')}</h2>
          <p className="section-subheading max-w-2xl">{t('support.subtitle')}</p>
        </div>

        {/* Desktop table */}
        <div className="hidden sm:block rounded-2xl border border-expando-gray-200 overflow-hidden shadow-sm max-w-3xl">
          <table className="w-full">
            <thead>
              <tr className="bg-expando-gray-50 border-b border-expando-gray-200">
                <th className="text-left text-xs font-semibold text-expando-gray-600 uppercase tracking-wider px-5 py-3.5">
                  {t('support.situation')}
                </th>
                <th className="text-left text-xs font-semibold text-expando-gray-600 uppercase tracking-wider px-5 py-3.5">
                  {t('support.contact')}
                </th>
                <th className="text-left text-xs font-semibold text-expando-gray-600 uppercase tracking-wider px-5 py-3.5">
                  {t('support.channel')}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-expando-gray-200">
              {rows.map((row, i) => (
                <tr key={i} className="hover:bg-expando-gray-50 transition-colors">
                  <td className="px-5 py-4 text-sm text-expando-gray-700">{row.situation}</td>
                  <td className="px-5 py-4">
                    <span className="text-sm font-semibold text-expando-gray-900">{row.contact}</span>
                  </td>
                  <td className="px-5 py-4">
                    <code className="text-xs bg-expando-orange-soft text-expando-orange px-2 py-1 rounded-lg font-mono">
                      {row.channel}
                    </code>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="sm:hidden space-y-3 max-w-3xl">
          {rows.map((row, i) => (
            <div key={i} className="bg-expando-gray-50 rounded-xl border border-expando-gray-200 p-4">
              <p className="text-sm text-expando-gray-700 mb-2">{row.situation}</p>
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <span className="font-semibold text-expando-gray-900 text-sm">{row.contact}</span>
                <code className="text-xs bg-expando-orange-soft text-expando-orange px-2 py-1 rounded-lg font-mono">
                  {row.channel}
                </code>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
