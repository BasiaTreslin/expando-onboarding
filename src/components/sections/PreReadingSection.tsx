'use client';

import { BookOpen, Book, Building2, Mail, Map, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import type { NewHireConfig } from '@/types';

const ICON_MAP: Record<string, React.ElementType> = {
  'book-open': BookOpen,
  'book': Book,
  'building-2': Building2,
  'mail': Mail,
  'map': Map,
};

interface PreReadingLink {
  icon: string;
  label: string;
  desc: string;
}

interface PreReadingProps {
  config: NewHireConfig;
}

export function PreReadingSection({ config }: PreReadingProps) {
  const { t, messages } = useLanguage();
  const links = messages.prereading.links as PreReadingLink[];

  // Map hrefs — link the last one to the role-specific resource map if available
  const hrefs = [
    '#',
    '#',
    '#',
    '#',
    config.resourceMapUrl ?? '#',
  ];

  return (
    <SectionWrapper id="pre-reading" className="py-20 sm:py-28 bg-expando-gray-50">
      <div className="section-container">
        {/* Heading */}
        <div className="mb-10">
          <div className="orange-line mb-4" />
          <h2 className="section-heading">{t('prereading.title')}</h2>
          <p className="section-subheading max-w-2xl">{t('prereading.subtitle')}</p>
        </div>

        {/* Links */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl">
          {links.map((link, i) => {
            const Icon = ICON_MAP[link.icon] ?? BookOpen;
            const href = hrefs[i];

            return (
              <a
                key={i}
                href={href}
                target={href !== '#' ? '_blank' : undefined}
                rel="noopener noreferrer"
                className={`group flex gap-4 p-4 bg-white rounded-xl border border-expando-gray-200
                           hover:border-expando-orange/40 hover:shadow-sm transition-all duration-200
                           ${href === '#' ? 'pointer-events-none opacity-75' : 'cursor-pointer'}`}
              >
                <div className="w-10 h-10 rounded-xl bg-expando-orange-soft flex items-center justify-center flex-shrink-0">
                  <Icon size={18} className="text-expando-orange" strokeWidth={1.5} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-1">
                    <p className="font-semibold text-expando-gray-900 text-sm leading-snug">{link.label}</p>
                    {href !== '#' && (
                      <ArrowUpRight
                        size={14}
                        className="text-expando-orange opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-0.5"
                      />
                    )}
                  </div>
                  <p className="text-expando-gray-600 text-xs mt-1 leading-relaxed">{link.desc}</p>
                </div>
              </a>
            );
          })}
        </div>

        <p className="mt-6 text-xs text-expando-gray-600">
          Links to Notion and Google Drive will be shared by your buddy on Day 1 if not already received.
        </p>
      </div>
    </SectionWrapper>
  );
}
