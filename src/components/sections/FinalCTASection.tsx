'use client';

import { useState, useRef } from 'react';
import { Play, Linkedin } from 'lucide-react';
import Image from 'next/image';
import { useLanguage } from '@/i18n/LanguageContext';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import type { NewHireConfig } from '@/types';

interface FinalCTAProps {
  config: NewHireConfig;
}

function VideoPlaceholder({ hasVideo, videoUrl }: { hasVideo: boolean; videoUrl?: string }) {
  const { t } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setPlaying(true);
    }
  };

  if (hasVideo && videoUrl) {
    return (
      <div className="relative rounded-2xl overflow-hidden aspect-video bg-expando-gray-900">
        <video
          ref={videoRef}
          src={videoUrl}
          poster="/photos/team-laptop4.jpg"
          controls={playing}
          preload="metadata"
          playsInline
          className="w-full h-full object-cover"
        />
        {!playing && (
          <div className="absolute inset-0 flex items-center justify-center bg-expando-gray-900/40">
            <button
              onClick={handlePlay}
              className="w-16 h-16 rounded-full bg-expando-orange hover:bg-expando-orange-hover
                         flex items-center justify-center shadow-xl transition-transform duration-200 hover:scale-110"
              aria-label={t('cta.videoPlay')}
            >
              <Play size={24} className="text-white ml-1" fill="white" />
            </button>
          </div>
        )}
      </div>
    );
  }

  // Placeholder — video coming soon
  return (
    <div className="relative rounded-2xl overflow-hidden aspect-video bg-expando-gray-900">
      <Image
        src="/photos/team-laptop4.jpg"
        alt="Welcome from the EXPANDO team"
        fill
        className="object-cover object-center opacity-50"
        loading="lazy"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center">
        <div className="w-16 h-16 rounded-full border-2 border-white/40 flex items-center justify-center">
          <Play size={24} className="text-white/70 ml-1" />
        </div>
        <p className="text-white/80 text-sm font-medium">{t('cta.videoComingSoon')}</p>
      </div>
    </div>
  );
}

export function FinalCTASection({ config }: FinalCTAProps) {
  const { t } = useLanguage();

  return (
    <SectionWrapper id="welcome" className="py-20 sm:py-28 bg-expando-gray-900 relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 30% 50%, #FF4D00 0%, transparent 50%),
                            radial-gradient(circle at 70% 20%, #FF4D00 0%, transparent 40%)`
        }} />
      </div>

      <div className="relative z-10 section-container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: message */}
          <div>
            {/* Orange accent */}
            <div className="w-12 h-1 bg-expando-orange rounded-full mb-6" />

            <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-4">
              {t('cta.title')}
            </h2>
            <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-lg">
              {t('cta.subtitle')}
            </p>

            {/* Team signature */}
            <div className="mb-8">
              <p className="text-expando-orange font-bold text-xl">{t('cta.signature')}</p>
            </div>

            {/* Social links */}
            <div className="flex gap-3">
              <a
                href="https://www.linkedin.com/company/expandoglobal/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/20 text-white/70
                           hover:bg-white/10 hover:text-white transition-colors text-sm font-medium"
              >
                <Linkedin size={16} />
                {t('cta.linkedin')}
              </a>
            </div>
          </div>

          {/* Right: video */}
          <div>
            <VideoPlaceholder
              hasVideo={config.hasWelcomeVideo ?? false}
              videoUrl={config.welcomeVideoUrl}
            />

            {/* Team photo below video on mobile */}
            <div className="mt-6 relative rounded-2xl overflow-hidden h-48 lg:hidden">
              <Image
                src="/photos/team-laptop2.jpg"
                alt="EXPANDO team"
                fill
                className="object-cover object-center"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-expando-gray-900/40" />
            </div>
          </div>
        </div>

        {/* Bottom: EXPANDO brand stamp */}
        <div className="mt-16 pt-8 border-t border-white/10 flex items-center justify-between gap-4 flex-wrap">
          <Image
            src="/logo/expando-logo-white.png"
            alt="EXPANDO"
            width={168}
            height={32}
            className="h-8 w-auto"
          />
          <p className="text-white/40 text-xs">
            onboarding.expando.com · &copy; {new Date().getFullYear()} EXPANDO. All rights reserved.
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
