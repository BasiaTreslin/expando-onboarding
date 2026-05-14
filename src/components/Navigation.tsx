'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import type { Language } from '@/types';

const NAV_ITEMS = [
  { key: 'nav.profile', anchor: 'about-you' },
  { key: 'nav.team', anchor: 'team' },
  { key: 'nav.story', anchor: 'story' },
  { key: 'nav.values', anchor: 'values' },
  { key: 'nav.waysOfWork', anchor: 'ways-of-work' },
  { key: 'nav.day1', anchor: 'day-1' },
  { key: 'nav.90days', anchor: '90-days' },
  { key: 'nav.tools', anchor: 'tools' },
];

export function Navigation() {
  const { t, language, setLanguage } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => document.getElementById(item.anchor));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-30% 0px -60% 0px' }
    );
    sections.forEach((s) => s && observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (anchor: string) => {
    document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const toggleLang = () => {
    setLanguage((language === 'en' ? 'cs' : 'en') as Language);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-sm shadow-sm border-b border-expando-gray-200'
          : 'bg-transparent'
      }`}
    >
      <div className="section-container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="relative h-8 w-auto transition-opacity hover:opacity-80"
            aria-label="EXPANDO — scroll to top"
          >
            <Image
              src={scrolled ? '/logo/expando-logo-dark.png' : '/logo/expando-logo-white.png'}
              alt="EXPANDO"
              width={168}
              height={32}
              priority
              className="h-8 w-auto"
            />
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.anchor}
                onClick={() => scrollTo(item.anchor)}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeSection === item.anchor
                    ? 'text-expando-orange bg-expando-orange-soft'
                    : 'text-expando-gray-600 hover:text-expando-gray-900 hover:bg-expando-gray-50'
                }`}
              >
                {t(item.key)}
              </button>
            ))}

            {/* Language switcher */}
            <button
              onClick={toggleLang}
              className="ml-2 px-3 py-2 text-sm font-medium border border-expando-gray-200 rounded-lg
                         text-expando-gray-600 hover:border-expando-orange hover:text-expando-orange transition-colors"
              aria-label="Switch language"
            >
              {t('nav.switchLang')}
            </button>
          </div>

          {/* Mobile: lang + hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleLang}
              className="px-3 py-1.5 text-xs font-medium border border-expando-gray-200 rounded-lg
                         text-expando-gray-600 hover:border-expando-orange hover:text-expando-orange transition-colors"
            >
              {t('nav.switchLang')}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-lg text-expando-gray-600 hover:bg-expando-gray-50 transition-colors"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-expando-gray-200 shadow-lg">
          <div className="section-container py-3 flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.anchor}
                onClick={() => scrollTo(item.anchor)}
                className={`text-left px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  activeSection === item.anchor
                    ? 'text-expando-orange bg-expando-orange-soft'
                    : 'text-expando-gray-600 hover:bg-expando-gray-50'
                }`}
              >
                {t(item.key)}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
