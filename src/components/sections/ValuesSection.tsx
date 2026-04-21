'use client';

import { useState } from 'react';
import { MessageCircle, BarChart2, Zap, TrendingUp, Heart, ChevronDown, ChevronUp } from 'lucide-react';
import Image from 'next/image';
import { useLanguage } from '@/i18n/LanguageContext';
import { SectionWrapper } from '@/components/ui/SectionWrapper';

const VALUE_ICONS = [MessageCircle, BarChart2, Zap, TrendingUp, Heart];
const VALUE_COLORS = [
  'text-blue-500 bg-blue-50',
  'text-violet-500 bg-violet-50',
  'text-amber-500 bg-amber-50',
  'text-emerald-500 bg-emerald-50',
  'text-expando-orange bg-expando-orange-soft',
];

interface ValueItem {
  id: string;
  name: string;
  tagline: string;
  example: string;
}

function ValueCard({ item, index }: { item: ValueItem; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const { t } = useLanguage();
  const Icon = VALUE_ICONS[index % VALUE_ICONS.length];
  const color = VALUE_COLORS[index % VALUE_COLORS.length];

  return (
    <div className="bg-white rounded-2xl border border-expando-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col">
      {/* Icon */}
      <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center mb-4 flex-shrink-0`}>
        <Icon size={22} strokeWidth={1.5} />
      </div>

      {/* Name */}
      <h3 className="text-lg font-bold text-expando-gray-900 mb-2">{item.name}</h3>
      <p className="text-expando-gray-600 text-sm leading-relaxed flex-1">{item.tagline}</p>

      {/* Expand toggle */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-1.5 mt-4 text-expando-orange text-sm font-medium hover:text-expando-orange-hover transition-colors self-start"
        aria-expanded={expanded}
      >
        {expanded ? (
          <>
            {t('values.collapseExample')} <ChevronUp size={14} />
          </>
        ) : (
          <>
            {t('values.expandExample')} <ChevronDown size={14} />
          </>
        )}
      </button>

      {/* Example */}
      {expanded && (
        <div className="mt-4 pt-4 border-t border-expando-gray-200">
          <p className="text-sm text-expando-gray-700 leading-relaxed italic">
            &ldquo;{item.example}&rdquo;
          </p>
        </div>
      )}
    </div>
  );
}

export function ValuesSection() {
  const { t, messages } = useLanguage();
  const items = messages.values.items as ValueItem[];

  return (
    <SectionWrapper id="values" className="py-20 sm:py-28 bg-expando-gray-50 relative overflow-hidden">
      {/* Background photo accent */}
      <div className="absolute inset-0 z-0 opacity-5">
        <Image
          src="/photos/team-laptop3.jpg"
          alt=""
          fill
          className="object-cover object-center"
          loading="lazy"
          aria-hidden="true"
        />
      </div>

      <div className="relative z-10 section-container">
        {/* Heading */}
        <div className="text-center mb-12">
          <div className="orange-line mx-auto mb-4" />
          <h2 className="section-heading">{t('values.title')}</h2>
          <p className="section-subheading max-w-xl mx-auto">{t('values.subtitle')}</p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 lg:gap-5">
          {items.map((item, i) => (
            <ValueCard key={item.id} item={item} index={i} />
          ))}
        </div>

        {/* Allhands photo callout */}
        <div className="mt-12 relative rounded-2xl overflow-hidden">
          <div className="relative h-48 sm:h-64">
            <Image
              src="/photos/team-laptop3.jpg"
              alt="EXPANDO all-hands meeting — values printed on the office walls"
              fill
              className="object-cover object-center"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-expando-gray-900/60" />
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-white text-lg sm:text-xl font-semibold text-center px-6 max-w-lg">
                Our values aren&apos;t just printed on slides.<br />
                <span className="text-expando-orange">They&apos;re on the walls.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
