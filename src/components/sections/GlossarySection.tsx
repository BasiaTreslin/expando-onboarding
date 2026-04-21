'use client';

import { useState, useMemo } from 'react';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { SectionWrapper } from '@/components/ui/SectionWrapper';

interface GlossaryTerm {
  term: string;
  def: string;
}

function TermCard({ item }: { item: GlossaryTerm }) {
  const [open, setOpen] = useState(false);

  return (
    <button
      onClick={() => setOpen(!open)}
      className="w-full text-left bg-white border border-expando-gray-200 hover:border-expando-orange/40
                 rounded-xl overflow-hidden transition-all duration-200 hover:shadow-sm focus:outline-none
                 focus:ring-2 focus:ring-expando-orange focus:ring-offset-1"
      aria-expanded={open}
    >
      <div className="flex items-center justify-between p-4">
        <span className="font-semibold text-expando-gray-900 text-sm">{item.term}</span>
        {open
          ? <ChevronUp size={16} className="text-expando-orange flex-shrink-0" />
          : <ChevronDown size={16} className="text-expando-gray-600 flex-shrink-0" />
        }
      </div>
      {open && (
        <div className="px-4 pb-4 border-t border-expando-gray-200">
          <p className="text-expando-gray-700 text-sm leading-relaxed pt-3">{item.def}</p>
        </div>
      )}
    </button>
  );
}

export function GlossarySection() {
  const { t, messages } = useLanguage();
  const [query, setQuery] = useState('');

  const terms = messages.glossary.terms as GlossaryTerm[];

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return terms;
    return terms.filter(
      (item) =>
        item.term.toLowerCase().includes(q) ||
        item.def.toLowerCase().includes(q)
    );
  }, [query, terms]);

  return (
    <SectionWrapper id="glossary" className="py-20 sm:py-28 bg-expando-gray-50">
      <div className="section-container">
        {/* Heading */}
        <div className="mb-10">
          <div className="orange-line mb-4" />
          <h2 className="section-heading">{t('glossary.title')}</h2>
          <p className="section-subheading max-w-2xl">{t('glossary.subtitle')}</p>
        </div>

        {/* Search */}
        <div className="relative max-w-md mb-8">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-expando-gray-600 pointer-events-none"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('glossary.searchPlaceholder')}
            className="w-full pl-10 pr-4 py-3 bg-white border border-expando-gray-200 rounded-xl text-sm
                       placeholder:text-expando-gray-600 focus:outline-none focus:ring-2
                       focus:ring-expando-orange focus:border-expando-orange transition-colors"
          />
        </div>

        {/* Terms grid */}
        {filtered.length === 0 ? (
          <p className="text-expando-gray-600 text-sm">
            {t('glossary.noResults', { query })}
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filtered.map((item) => (
              <TermCard key={item.term} item={item} />
            ))}
          </div>
        )}
      </div>
    </SectionWrapper>
  );
}
