'use client';

import { useState, useEffect } from 'react';
import { Menu, X, LogOut } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import type { Language } from '@/types';

const NAV_ITEMS = [
  { key: 'nav.dna', anchor: 'dna' },
  { key: 'nav.tribe', anchor: 'tribe' },
  { key: 'nav.day1', anchor: 'day-1' },
  { key: 'nav.whyCool', anchor: 'why-cool' },
  { key: 'nav.journey', anchor: '90-days' },
  { key: 'nav.cta', anchor: 'cta' },
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
    setLanguage((language === 'cs' ? 'en' : 'cs') as Language);
  };

  const logout = async () => {
    try {
      await fetch('/api/logout', { method: 'POST' });
    } finally {
      window.location.href = '/login';
    }
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
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={`font-bold text-xl tracking-tight transition-colors ${
              scrolled ? 'text-expando-gray-900 hover:text-expando-orange' : 'text-white hover:text-expando-orange'
            }`}
          >
            EXPANDO
          </button>

          <div className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.anchor}
                onClick={() => scrollTo(item.anchor)}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeSection === item.anchor
                    ? 'text-expando-orange bg-expando-orange-soft'
                    : scrolled
                      ? 'text-expando-gray-600 hover:text-expando-gray-900 hover:bg-expando-gray-50'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                {t(item.key)}
              </button>
            ))}

            <button
              onClick={toggleLang}
              className={`ml-2 px-3 py-2 text-sm font-medium border rounded-lg transition-colors ${
                scrolled
                  ? 'border-expando-gray-200 text-expando-gray-600 hover:border-expando-orange hover:text-expando-orange'
                  : 'border-white/30 text-white/80 hover:border-white hover:text-white'
              }`}
            >
              {t('nav.switchLang')}
            </button>

            <button
              onClick={logout}
              className={`ml-1 p-2 rounded-lg transition-colors ${
                scrolled
                  ? 'text-expando-gray-600 hover:text-expando-orange hover:bg-expando-gray-50'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
              aria-label="Log out"
              title="Log out"
            >
              <LogOut size={16} />
            </button>
          </div>

          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={toggleLang}
              className={`px-3 py-1.5 text-xs font-medium border rounded-lg transition-colors ${
                scrolled
                  ? 'border-expando-gray-200 text-expando-gray-600 hover:border-expando-orange hover:text-expando-orange'
                  : 'border-white/30 text-white/80 hover:border-white hover:text-white'
              }`}
            >
              {t('nav.switchLang')}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`p-2 rounded-lg transition-colors ${
                scrolled
                  ? 'text-expando-gray-600 hover:bg-expando-gray-50'
                  : 'text-white hover:bg-white/10'
              }`}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-expando-gray-200 shadow-lg">
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
            <button
              onClick={logout}
              className="text-left px-4 py-3 text-sm font-medium rounded-lg text-expando-gray-600 hover:bg-expando-gray-50 flex items-center gap-2"
            >
              <LogOut size={14} />
              Log out
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
