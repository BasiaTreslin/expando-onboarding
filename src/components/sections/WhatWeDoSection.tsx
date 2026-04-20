'use client';

import { Check } from 'lucide-react';
import Image from 'next/image';
import { useLanguage } from '@/i18n/LanguageContext';
import { SectionWrapper } from '@/components/ui/SectionWrapper';

export function WhatWeDoSection() {
  const { t, messages } = useLanguage();
  const capabilities = messages.services.capabilities as string[];

  return (
    <SectionWrapper id="services" className="py-20 sm:py-28 bg-white">
      <div className="section-container">
        {/* Heading */}
        <div className="mb-12">
          <div className="orange-line mb-4" />
          <h2 className="section-heading">{t('services.title')}</h2>
          <p className="section-subheading max-w-2xl">{t('services.subtitle')}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left: service cards + capabilities */}
          <div>
            {/* Two service cards */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {/* Reseller */}
              <div className="bg-expando-orange-soft border border-orange-200 rounded-2xl p-6">
                <span className="tag mb-3 inline-block">EAN Model</span>
                <h3 className="text-xl font-bold text-expando-gray-900 mb-3">{t('services.resellerTitle')}</h3>
                <p className="text-expando-gray-700 text-sm leading-relaxed">{t('services.resellerDesc')}</p>
              </div>

              {/* Private Label */}
              <div className="bg-expando-gray-50 border border-expando-gray-200 rounded-2xl p-6">
                <span className="tag mb-3 inline-block" style={{ background: '#f5f0ff', borderColor: '#ddd6fe', color: '#7c3aed' }}>UNIQ Model</span>
                <h3 className="text-xl font-bold text-expando-gray-900 mb-3">{t('services.privateLabelTitle')}</h3>
                <p className="text-expando-gray-700 text-sm leading-relaxed">{t('services.privateLabelDesc')}</p>
              </div>
            </div>

            {/* Capabilities list */}
            <div>
              <p className="text-sm font-semibold text-expando-gray-600 uppercase tracking-wider mb-4">
                {t('services.whatWeDo')}
              </p>
              <ul className="space-y-3">
                {capabilities.map((cap, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-expando-orange-soft flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check size={11} className="text-expando-orange" strokeWidth={2.5} />
                    </div>
                    <span className="text-expando-gray-700 text-sm leading-relaxed">{cap}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: team photo */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
              <Image
                src="/photos/team-laptop.jpg"
                alt="EXPANDO team working on client accounts"
                fill
                className="object-cover object-center"
                loading="lazy"
              />
            </div>
            {/* Floating stat card */}
            <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg px-5 py-4 border border-expando-gray-200">
              <p className="text-3xl font-bold text-expando-orange">€75M+</p>
              <p className="text-xs text-expando-gray-600 mt-0.5">GMV for clients</p>
            </div>
            <div className="absolute -top-4 -right-4 bg-expando-orange rounded-xl shadow-lg px-5 py-4">
              <p className="text-3xl font-bold text-white">90+</p>
              <p className="text-xs text-white/80 mt-0.5">Seller accounts</p>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
