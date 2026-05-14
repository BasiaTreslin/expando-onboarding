'use client';

import { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { RitualCard, type RitualColor } from './RitualCard';
import { RitualModal, type RitualKey } from './RitualModal';

interface Ritual {
  key: RitualKey;
  color: RitualColor;
  icon: string;
}

const RITUALS: Ritual[] = [
  { key: 'okrs', color: 'blue', icon: '🎯' },
  { key: 'allhands', color: 'orange', icon: '🙌' },
  { key: 'reviews', color: 'green', icon: '🌱' },
];

export function OurWaysOfWorkSection() {
  const { t } = useLanguage();
  const [openRitual, setOpenRitual] = useState<RitualKey | null>(null);

  return (
    <SectionWrapper
      id="ways-of-work"
      className="py-20 sm:py-28 bg-white"
    >
      <div className="section-container">
        <div className="text-center mb-14">
          <div className="orange-line mx-auto mb-4" />
          <h2 className="section-heading">{t('waysOfWork.title')}</h2>
          <p className="section-subheading max-w-xl mx-auto">
            {t('waysOfWork.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {RITUALS.map((ritual) => (
            <RitualCard
              key={ritual.key}
              frequencyKey={`waysOfWork.${ritual.key}.frequency`}
              titleKey={`waysOfWork.${ritual.key}.title`}
              teaserKey={`waysOfWork.${ritual.key}.teaser`}
              icon={ritual.icon}
              color={ritual.color}
              onClick={() => setOpenRitual(ritual.key)}
            />
          ))}
        </div>
      </div>

      {RITUALS.map((ritual) => (
        <RitualModal
          key={ritual.key}
          isOpen={openRitual === ritual.key}
          onClose={() => setOpenRitual(null)}
          ritualKey={ritual.key}
          color={ritual.color}
        />
      ))}
    </SectionWrapper>
  );
}
