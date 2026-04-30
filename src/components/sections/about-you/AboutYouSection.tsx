'use client';

import { useMemo } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { ProfileCard } from './ProfileCard';
import { StatusPill } from './StatusPill';
import { useAboutYouTasks } from './hooks/useAboutYouTasks';
import type { NewHireConfig } from '@/types';

interface AboutYouSectionProps {
  config: NewHireConfig;
}

export function AboutYouSection({ config }: AboutYouSectionProps) {
  const { t, language } = useLanguage();
  const tasks = useAboutYouTasks(config.slug);

  const formattedStartDate = useMemo(() => {
    const d = new Date(config.startDate);
    return d.toLocaleDateString(language === 'cs' ? 'cs-CZ' : 'en-GB', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }, [config.startDate, language]);

  // Step 3: stub handlers. Real modals wire in steps 4–6.
  const noop = () => {};

  return (
    <SectionWrapper
      id="about-you"
      className="py-20 sm:py-28 bg-expando-gray-50"
    >
      <div className="section-container">
        <div className="max-w-3xl mx-auto">
          {/* Heading */}
          <div className="mb-10">
            <div className="orange-line mb-4" />
            <h2 className="section-heading">{t('aboutYou.title')}</h2>
            <p className="section-subheading">{t('aboutYou.subtitle')}</p>
          </div>

          {/* Status pill — right-aligned, reserves space so card doesn't jump */}
          <div className="flex justify-end mb-3 min-h-[28px]">
            <StatusPill
              doneCount={tasks.doneCount}
              total={tasks.total}
              mounted={tasks.mounted}
            />
          </div>

          {/* Main card */}
          <ProfileCard
            config={config}
            formattedStartDate={formattedStartDate}
            contractDone={tasks.contractDone}
            questionnaireDone={tasks.questionnaireDone}
            onPracticalInfoClick={noop}
            onContractClick={noop}
            onQuestionnaireClick={noop}
          />
        </div>
      </div>
    </SectionWrapper>
  );
}
