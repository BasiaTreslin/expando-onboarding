'use client';

import { useEffect, useRef } from 'react';
import { Star, TrendingUp, DollarSign, Globe, Rocket } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { SectionWrapper } from '@/components/ui/SectionWrapper';

const ICONS = [Star, TrendingUp, DollarSign, Globe, Rocket];
const ICON_COLORS = [
  'bg-amber-50 text-amber-500',
  'bg-emerald-50 text-emerald-500',
  'bg-blue-50 text-blue-500',
  'bg-purple-50 text-purple-500',
  'bg-expando-orange-soft text-expando-orange',
];

interface Milestone {
  year: string;
  title: string;
  description: string;
}

function TimelineItem({
  item,
  index,
  isLast,
}: {
  item: Milestone;
  index: number;
  isLast: boolean;
}) {
  const Icon = ICONS[index % ICONS.length];
  const color = ICON_COLORS[index % ICON_COLORS.length];
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = itemRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
          observer.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={itemRef} className="reveal flex gap-4 sm:gap-6" style={{ transitionDelay: `${index * 0.1}s` }}>
      {/* Connector column */}
      <div className="flex flex-col items-center flex-shrink-0">
        <div className={`w-12 h-12 rounded-full ${color} flex items-center justify-center shadow-sm flex-shrink-0 z-10`}>
          <Icon size={20} strokeWidth={1.5} />
        </div>
        {!isLast && <div className="w-0.5 flex-1 bg-expando-gray-200 mt-2" />}
      </div>

      {/* Content */}
      <div className={`pb-10 ${isLast ? '' : ''}`}>
        <span className="text-expando-orange font-bold text-sm tracking-wider">{item.year}</span>
        <h3 className="text-lg sm:text-xl font-bold text-expando-gray-900 mt-1 mb-2">{item.title}</h3>
        <p className="text-expando-gray-600 leading-relaxed text-sm sm:text-base max-w-lg">{item.description}</p>
      </div>
    </div>
  );
}

export function StorySection() {
  const { t, messages } = useLanguage();
  const milestones = messages.story.milestones as Milestone[];

  return (
    <SectionWrapper id="story" className="py-20 sm:py-28 bg-white">
      <div className="section-container">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20 items-start">
          {/* Left: heading */}
          <div className="lg:sticky lg:top-24">
            <div className="orange-line mb-4" />
            <h2 className="section-heading">{t('story.title')}</h2>
            <p className="section-subheading">{t('story.subtitle')}</p>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                { value: '2016', label: 'Founded' },
                { value: '34', label: 'Team members' },
                { value: '6', label: 'Countries' },
                { value: 'Top 20%', label: 'Amazon agencies' },
              ].map((stat) => (
                <div key={stat.label} className="bg-expando-gray-50 rounded-xl p-4">
                  <p className="text-2xl font-bold text-expando-orange">{stat.value}</p>
                  <p className="text-xs text-expando-gray-600 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: timeline */}
          <div className="mt-2">
            {milestones.map((item, index) => (
              <TimelineItem
                key={item.year}
                item={item}
                index={index}
                isLast={index === milestones.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
