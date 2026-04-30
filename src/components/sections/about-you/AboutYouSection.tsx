'use client';

import { useMemo, useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { ProfileCard } from './ProfileCard';
import { StatusPill } from './StatusPill';
import { PracticalInfoModal } from './PracticalInfoModal';
import { QuestionnaireModal } from './QuestionnaireModal';
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

  const [practicalInfoOpen, setPracticalInfoOpen] = useState(false);
  const [questionnaireOpen, setQuestionnaireOpen] = useState(false);
  // Step 5: contract still stubbed — wires in step 6.
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
            onPracticalInfoClick={() => setPracticalInfoOpen(true)}
            onContractClick={noop}
            onQuestionnaireClick={() => setQuestionnaireOpen(true)}
          />
        </div>
      </div>

      <PracticalInfoModal
        open={practicalInfoOpen}
        onClose={() => setPracticalInfoOpen(false)}
        contractType={config.contractType}
      />

      <QuestionnaireModal
        open={questionnaireOpen}
        onClose={() => setQuestionnaireOpen(false)}
        contractType={config.contractType}
        slug={config.slug}
        firstName={config.name}
        onSubmitted={tasks.markQuestionnaireSubmitted}
      />
    </SectionWrapper>
  );
}
