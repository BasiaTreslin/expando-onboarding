'use client';

import { LanguageProvider } from '@/i18n/LanguageContext';
import { Navigation } from '@/components/Navigation';
import { CelebrationPreview } from '@/components/CelebrationPreview';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutYouSection } from '@/components/sections/about-you/AboutYouSection';
import { AboutYourTeamSection } from '@/components/sections/about-your-team/AboutYourTeamSection';
import { StorySection } from '@/components/sections/StorySection';
import { ValuesSection } from '@/components/sections/ValuesSection';
import { WhatWeDoSection } from '@/components/sections/WhatWeDoSection';
import { ClientJourneySection } from '@/components/sections/ClientJourneySection';
import { OurWaysOfWorkSection } from '@/components/sections/ways-of-work/OurWaysOfWorkSection';
import { Day1ScheduleSection } from '@/components/sections/Day1ScheduleSection';
import { Journey90DaySection } from '@/components/sections/Journey90DaySection';
import { ToolsSection } from '@/components/sections/ToolsSection';
import { GlossarySection } from '@/components/sections/GlossarySection';
import { SupportContactsSection } from '@/components/sections/SupportContactsSection';
import { PreReadingSection } from '@/components/sections/PreReadingSection';
import { FinalCTASection } from '@/components/sections/FinalCTASection';
import type { NewHireConfig } from '@/types';

interface OnboardingPageProps {
  config: NewHireConfig;
}

export function OnboardingPage({ config }: OnboardingPageProps) {
  const hasTasks = !!(config.profileTasks && config.profileTasks.length > 0);

  return (
    <LanguageProvider defaultLanguage={config.language}>
      <Navigation />
      <main>
        <HeroSection config={config} />
        <AboutYouSection config={config} />
        <AboutYourTeamSection config={config} />
        <StorySection />
        <ValuesSection />
        <WhatWeDoSection />
        <ClientJourneySection />
        <OurWaysOfWorkSection />
        <Day1ScheduleSection config={config} />
        <Journey90DaySection />
        <ToolsSection />
        <GlossarySection />
        <SupportContactsSection config={config} />
        <PreReadingSection config={config} />
        <FinalCTASection config={config} />
      </main>
      <CelebrationPreview config={config} />
    </LanguageProvider>
  );
}
