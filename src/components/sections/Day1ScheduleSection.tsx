'use client';

import { Clock, Lightbulb } from 'lucide-react';
import Image from 'next/image';
import { useLanguage } from '@/i18n/LanguageContext';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import type { NewHireConfig, Day1Session } from '@/types';

interface Day1ScheduleProps {
  config: NewHireConfig;
}

export function Day1ScheduleSection({ config }: Day1ScheduleProps) {
  const { t, messages } = useLanguage();

  const schedule: Day1Session[] =
    config.customDay1Schedule ?? (messages.day1.schedule as Day1Session[]);

  return (
    <SectionWrapper id="day-1" className="py-20 sm:py-28 bg-white relative overflow-hidden">
      <div className="section-container">
        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12 items-start">
          {/* Left: heading + photo */}
          <div>
            <div className="orange-line mb-4" />
            <h2 className="section-heading">{t('day1.title')}</h2>
            <p className="section-subheading">{t('day1.subtitle')}</p>

            {/* Photo */}
            <div className="mt-8 relative rounded-2xl overflow-hidden aspect-[4/3]">
              <Image
                src="/photos/team-laptop3.jpg"
                alt="EXPANDO team all-hands meeting"
                fill
                className="object-cover object-center"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-expando-gray-900/30" />
            </div>

            {/* Mini task callout */}
            <div className="mt-6 bg-expando-orange-soft border border-orange-200 rounded-2xl p-5 flex gap-3">
              <div className="w-8 h-8 rounded-lg bg-expando-orange flex items-center justify-center flex-shrink-0">
                <Lightbulb size={16} className="text-white" />
              </div>
              <div>
                <p className="font-bold text-expando-gray-900 text-sm mb-1">{t('day1.miniTaskLabel')}</p>
                <p className="text-expando-gray-700 text-sm leading-relaxed">{t('day1.miniTask')}</p>
              </div>
            </div>
          </div>

          {/* Right: schedule */}
          <div>
            <div className="space-y-2">
              {schedule.map((session, index) => {
                const isLunch = session.who === 'Everyone' || session.who === 'Všichni';
                return (
                  <div
                    key={index}
                    className={`flex gap-4 p-4 rounded-xl transition-colors ${
                      isLunch
                        ? 'bg-expando-orange-soft border border-orange-200'
                        : 'bg-expando-gray-50 border border-expando-gray-200 hover:border-expando-orange/30'
                    }`}
                  >
                    {/* Time */}
                    <div className="flex items-start gap-1.5 flex-shrink-0 min-w-[80px]">
                      <Clock size={13} className="text-expando-orange mt-0.5" />
                      <span className="text-xs font-mono text-expando-gray-600 leading-relaxed">{session.time}</span>
                    </div>

                    {/* Session info */}
                    <div className="flex-1 min-w-0">
                      <p className={`font-semibold text-sm ${isLunch ? 'text-expando-orange' : 'text-expando-gray-900'}`}>
                        {session.session}
                      </p>
                      <p className="text-xs text-expando-gray-600 mt-0.5">{session.who}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
