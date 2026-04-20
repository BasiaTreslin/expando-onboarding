'use client';

import { useLanguage } from '@/i18n/LanguageContext';
import { SectionWrapper } from '@/components/ui/SectionWrapper';

const TEAM_COLORS: Record<string, string> = {
  GTM: 'bg-blue-100 text-blue-700',
  AM: 'bg-violet-100 text-violet-700',
  CS: 'bg-emerald-100 text-emerald-700',
  Data: 'bg-amber-100 text-amber-700',
};

interface JourneyStep {
  step: string;
  team: string;
  title: string;
  description: string;
}

export function ClientJourneySection() {
  const { t, messages } = useLanguage();
  const steps = messages.journey.steps as JourneyStep[];

  return (
    <SectionWrapper id="client-journey" className="py-20 sm:py-28 bg-expando-gray-50">
      <div className="section-container">
        {/* Heading */}
        <div className="text-center mb-14">
          <div className="orange-line mx-auto mb-4" />
          <h2 className="section-heading">{t('journey.title')}</h2>
          <p className="section-subheading max-w-xl mx-auto">{t('journey.subtitle')}</p>
        </div>

        {/* Desktop: horizontal stepper */}
        <div className="hidden lg:block">
          {/* Connector line */}
          <div className="relative flex items-start gap-0">
            {steps.map((step, index) => (
              <div key={step.step} className="flex-1 relative flex flex-col items-center">
                {/* Connecting line (not on last) */}
                {index < steps.length - 1 && (
                  <div className="absolute top-6 left-1/2 right-0 h-0.5 bg-expando-orange z-0" />
                )}

                {/* Step circle */}
                <div className="relative z-10 w-12 h-12 rounded-full bg-expando-orange text-white flex items-center justify-center font-bold text-sm shadow-md mb-4 flex-shrink-0">
                  {step.step}
                </div>

                {/* Team badge */}
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full mb-2 ${TEAM_COLORS[step.team] || 'bg-gray-100 text-gray-700'}`}>
                  {step.team}
                </span>

                {/* Content */}
                <div className="text-center px-3">
                  <h3 className="font-bold text-expando-gray-900 text-base mb-2">{step.title}</h3>
                  <p className="text-expando-gray-600 text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: vertical */}
        <div className="lg:hidden space-y-0">
          {steps.map((step, index) => (
            <div key={step.step} className="flex gap-4">
              {/* Left: circle + line */}
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-expando-orange text-white flex items-center justify-center font-bold text-sm shadow-md flex-shrink-0">
                  {step.step}
                </div>
                {index < steps.length - 1 && (
                  <div className="w-0.5 flex-1 bg-expando-orange opacity-30 my-2" />
                )}
              </div>

              {/* Right: content */}
              <div className="pb-8">
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full mb-2 inline-block ${TEAM_COLORS[step.team] || 'bg-gray-100 text-gray-700'}`}>
                  {step.team}
                </span>
                <h3 className="font-bold text-expando-gray-900 text-base mb-1">{step.title}</h3>
                <p className="text-expando-gray-600 text-sm leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
