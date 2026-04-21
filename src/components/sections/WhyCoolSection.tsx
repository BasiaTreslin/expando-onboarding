'use client';

import { Quote } from 'lucide-react';
import Image from 'next/image';
import { useLanguage } from '@/i18n/LanguageContext';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { CountUp } from '@/components/ui/CountUp';
import { metrics, techStack, recentMilestones } from '@/data/metrics';

export function WhyCoolSection() {
  const { t } = useLanguage();

  return (
    <SectionWrapper id="why-cool" className="py-20 sm:py-28 bg-expando-gray-50 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none">
        <Image
          src="/photos/team-laptop3.jpg"
          alt=""
          fill
          className="object-cover object-center"
          loading="lazy"
          aria-hidden="true"
        />
      </div>

      <div className="relative z-10 section-container">
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <div className="orange-line mx-auto mb-4" />
          <h2 className="section-heading">{t('whyCool.title')}</h2>
          <p className="section-subheading">{t('whyCool.subtitle')}</p>
        </div>

        {/* Metrics */}
        <div className="mb-16">
          <p className="text-xs font-semibold text-expando-gray-600 uppercase tracking-wider mb-5 text-center">
            {t('whyCool.statsLabel')}
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {metrics.map((stat, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 text-center border border-expando-gray-200 hover:border-expando-orange/40 hover:shadow-sm transition-all"
              >
                {typeof stat.numeric === 'number' ? (
                  <p className="text-3xl sm:text-4xl font-bold text-expando-orange tabular-nums">
                    <CountUp
                      end={stat.numeric}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                    />
                  </p>
                ) : (
                  <p className="text-3xl sm:text-4xl font-bold text-expando-orange">{stat.value}</p>
                )}
                <p className="text-xs sm:text-sm text-expando-gray-600 mt-2">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Recent milestones ticker */}
          {recentMilestones.length > 0 && (
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {recentMilestones.map((m, i) => (
                <div
                  key={i}
                  className="bg-white rounded-full px-4 py-2 border border-expando-gray-200 text-xs sm:text-sm text-expando-gray-700"
                >
                  {m.text}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Tech stack */}
        <div className="mb-16 max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-expando-gray-900 mb-1">{t('whyCool.techTitle')}</h3>
            <p className="text-sm text-expando-gray-600">{t('whyCool.techSubtitle')}</p>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {techStack.map((tool) => (
              <span
                key={tool.name}
                className="px-3 py-1.5 bg-white border border-expando-gray-200 rounded-lg text-sm text-expando-gray-700 hover:border-expando-orange hover:text-expando-orange transition-colors cursor-default"
                title={tool.category}
              >
                {tool.name}
              </span>
            ))}
          </div>
        </div>

        {/* Pullquote */}
        <div className="relative max-w-3xl mx-auto">
          <div className="bg-expando-gray-900 rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden">
            <div className="absolute top-6 left-6 opacity-20">
              <Quote size={48} className="text-expando-orange" />
            </div>
            <p className="relative text-2xl sm:text-3xl font-bold text-white leading-snug mb-4">
              &ldquo;{t('whyCool.pullquote')}&rdquo;
            </p>
            <p className="relative text-white/60 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
              {t('whyCool.pullquoteSub')}
            </p>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
