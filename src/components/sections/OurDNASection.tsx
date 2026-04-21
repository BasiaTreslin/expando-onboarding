'use client';

import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import type { NewHireConfig } from '@/types';

interface OurDNAProps {
  config: NewHireConfig;
}

interface DNAStep {
  emoji: string;
  title: string;
  description: string;
}

interface ClientType {
  label: string;
  desc: string;
}

export function OurDNASection({ config }: OurDNAProps) {
  const { t, messages } = useLanguage();
  const steps = messages.dna.steps as DNAStep[];
  const clientTypes = messages.dna.clientTypes as ClientType[];

  return (
    <SectionWrapper id="dna" className="py-20 sm:py-28 bg-white">
      <div className="section-container">
        <div className="mb-12 max-w-3xl">
          <div className="orange-line mb-4" />
          <h2 className="section-heading">{t('dna.title')}</h2>
          <p className="section-subheading text-xl italic">&ldquo;{t('dna.intro')}&rdquo;</p>
        </div>

        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-12 items-start">
          {/* Steps */}
          <div>
            {/* Desktop horizontal */}
            <div className="hidden md:flex items-start gap-3">
              {steps.map((step, i) => (
                <div key={i} className="flex-1 flex items-start gap-2">
                  <div className="flex-1 bg-expando-gray-50 border border-expando-gray-200 rounded-2xl p-5 hover:border-expando-orange/40 hover:shadow-sm transition-all">
                    <div className="text-3xl mb-3">{step.emoji}</div>
                    <h3 className="font-bold text-lg mb-2 text-expando-gray-900">{step.title}</h3>
                    <p className="text-sm text-expando-gray-700 leading-relaxed">{step.description}</p>
                  </div>
                  {i < steps.length - 1 && (
                    <ArrowRight
                      size={18}
                      className="text-expando-orange flex-shrink-0 mt-8"
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Mobile vertical */}
            <div className="md:hidden space-y-4">
              {steps.map((step, i) => (
                <div key={i} className="relative">
                  <div className="bg-expando-gray-50 border border-expando-gray-200 rounded-2xl p-5">
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">{step.emoji}</div>
                      <div>
                        <h3 className="font-bold text-lg mb-1 text-expando-gray-900">{step.title}</h3>
                        <p className="text-sm text-expando-gray-700 leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="flex justify-center py-1">
                      <div className="w-0.5 h-4 bg-expando-orange" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Role mission line */}
            <div className="mt-8 bg-expando-orange-soft border-l-4 border-expando-orange rounded-xl p-5">
              <p className="text-sm text-expando-orange font-semibold uppercase tracking-wider mb-1">
                {t('dna.roleMissionLabel')}
              </p>
              <p className="text-expando-gray-900 text-lg leading-relaxed font-medium">
                {config.roleMissionLine}
              </p>
            </div>

            {/* Client types mini strip */}
            <div className="mt-6 grid sm:grid-cols-2 gap-3">
              {clientTypes.map((type, i) => (
                <div
                  key={i}
                  className="bg-white border border-expando-gray-200 rounded-xl p-4 hover:border-expando-orange/40 transition-colors"
                >
                  <p className="text-xs font-bold text-expando-orange uppercase tracking-wider mb-1">
                    {type.label}
                  </p>
                  <p className="text-sm text-expando-gray-700">{type.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Photo */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5]">
              <Image
                src="/photos/team-laptop.jpg"
                alt="EXPANDO tým pracuje na klientovi"
                fill
                className="object-cover object-center"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-expando-orange text-white rounded-xl shadow-lg px-5 py-4">
              <p className="text-2xl font-bold">12 000</p>
              <p className="text-xs text-white/80">objednávek / 3 měsíce</p>
              <p className="text-xs text-white/60 mt-1">klient Podpal</p>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
