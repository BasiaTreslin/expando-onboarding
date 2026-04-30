'use client';

import { useMemo, useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { ProfileCard } from './ProfileCard';
import { StatusPill } from './StatusPill';
import { PracticalInfoModal } from './PracticalInfoModal';
import { QuestionnaireModal } from './QuestionnaireModal';
import { ContractModal } from './ContractModal';
import { PerformanceReviewCard } from './PerformanceReviewCard';
import { ReferralProgramCard } from './ReferralProgramCard';
import { ContactsBlock } from './ContactsBlock';
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
  const [contractOpen, setContractOpen] = useState(false);

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
            onContractClick={() => setContractOpen(true)}
            onQuestionnaireClick={() => setQuestionnaireOpen(true)}
          />

          {/* Below-the-fold: secondary info + contacts */}
          <div className="mt-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <PerformanceReviewCard />
              <ReferralProgramCard />
            </div>
            <ContactsBlock />
          </div>
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

      <ContractModal
        open={contractOpen}
        onClose={() => setContractOpen(false)}
        reviewed={tasks.contractDone}
        firstName={config.name}
        onReview={tasks.markContractReviewed}
      />
    </SectionWrapper>
  );
}
