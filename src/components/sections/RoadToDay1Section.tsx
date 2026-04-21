'use client';

import { useState } from 'react';
import {
  Clock, Lightbulb, ChevronDown, MapPin, Car, Shirt, Backpack, Coffee, Home,
} from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import type { NewHireConfig, Day1Session } from '@/types';

const PRACTICAL_ICONS: Record<string, React.ElementType> = {
  'map-pin': MapPin,
  'car': Car,
  'shirt': Shirt,
  'backpack': Backpack,
  'coffee': Coffee,
  'home': Home,
};

interface PracticalItem {
  icon: string;
  title: string;
  body: string;
}

function PracticalCard({ item }: { item: PracticalItem }) {
  const [open, setOpen] = useState(false);
  const Icon = PRACTICAL_ICONS[item.icon] ?? MapPin;

  return (
    <button
      onClick={() => setOpen(!open)}
      className="text-left bg-white rounded-2xl border border-expando-gray-200 hover:border-expando-orange/40
                 transition-all hover:shadow-sm p-5 w-full"
      aria-expanded={open}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="w-9 h-9 rounded-lg bg-expando-orange-soft flex items-center justify-center flex-shrink-0">
            <Icon size={17} className="text-expando-orange" strokeWidth={1.5} />
          </div>
          <h3 className="font-semibold text-expando-gray-900 text-sm">{item.title}</h3>
        </div>
        <ChevronDown
          size={16}
          className={`text-expando-gray-600 transition-transform flex-shrink-0 ${open ? 'rotate-180' : ''}`}
        />
      </div>
      {open && (
        <p className="mt-3 text-sm text-expando-gray-700 leading-relaxed pl-12">{item.body}</p>
      )}
    </button>
  );
}

export function RoadToDay1Section({ config }: { config: NewHireConfig }) {
  const { t, messages } = useLanguage();

  const schedule: Day1Session[] =
    config.customDay1Schedule ?? (messages.day1.schedule as Day1Session[]);
  const practical = messages.day1.practical as PracticalItem[];

  return (
    <SectionWrapper id="day-1" className="py-20 sm:py-28 bg-white">
      <div className="section-container">
        <div className="mb-12">
          <div className="orange-line mb-4" />
          <h2 className="section-heading">{t('day1.title')}</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Schedule */}
          <div>
            <div className="mb-6">
              <h3 className="text-xl font-bold text-expando-gray-900 mb-1">{t('day1.scheduleTitle')}</h3>
              <p className="text-sm text-expando-gray-600">{t('day1.scheduleSubtitle')}</p>
            </div>

            <div className="space-y-2">
              {schedule.map((session, index) => {
                const isLunch = /lunch|oběd/i.test(session.session);
                return (
                  <div
                    key={index}
                    className={`flex gap-4 p-4 rounded-xl transition-colors ${
                      isLunch
                        ? 'bg-expando-orange-soft border border-orange-200'
                        : 'bg-expando-gray-50 border border-expando-gray-200 hover:border-expando-orange/30'
                    }`}
                  >
                    <div className="flex items-start gap-1.5 flex-shrink-0 min-w-[60px]">
                      <Clock size={13} className="text-expando-orange mt-0.5" />
                      <span className="text-xs font-mono text-expando-gray-600 leading-relaxed">
                        {session.time}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`font-semibold text-sm ${isLunch ? 'text-expando-orange' : 'text-expando-gray-900'}`}>
                        {session.session}
                      </p>
                      {session.who && <p className="text-xs text-expando-gray-600 mt-0.5">{session.who}</p>}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Mini task */}
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

          {/* Practical */}
          <div>
            <div className="mb-6">
              <h3 className="text-xl font-bold text-expando-gray-900 mb-1">{t('day1.practicalTitle')}</h3>
              <p className="text-sm text-expando-gray-600">{t('day1.practicalSubtitle')}</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              {practical.map((item, i) => (
                <PracticalCard key={i} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
