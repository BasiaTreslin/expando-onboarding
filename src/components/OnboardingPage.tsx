'use client';

import { LanguageProvider } from '@/i18n/LanguageContext';
import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/sections/HeroSection';
import { OurDNASection } from '@/components/sections/OurDNASection';
import { MeetTheTribeSection } from '@/components/sections/MeetTheTribeSection';
import { RoadToDay1Section } from '@/components/sections/RoadToDay1Section';
import { WhyCoolSection } from '@/components/sections/WhyCoolSection';
import { Journey90DaySection } from '@/components/sections/Journey90DaySection';
import { CTASection } from '@/components/sections/CTASection';
import type { NewHireConfig } from '@/types';

interface OnboardingPageProps {
  config: NewHireConfig;
}

export function OnboardingPage({ config }: OnboardingPageProps) {
  return (
    <LanguageProvider defaultLanguage={config.language}>
      <Navigation />
      <main>
        <HeroSection config={config} />
        <OurDNASection config={config} />
        <MeetTheTribeSection config={config} />
        <RoadToDay1Section config={config} />
        <WhyCoolSection />
        <Journey90DaySection />
        <CTASection config={config} />
      </main>
    </LanguageProvider>
  );
}
