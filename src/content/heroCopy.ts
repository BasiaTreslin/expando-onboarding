// Owned by People team. Changes approved by COO.
// Edit kicker / subtext here to update the hero copy for any of the 9
// journey states. {X} is replaced at render time with the absolute number
// of days (days-until-start for pre-start states).

import type { JourneyState } from '@/lib/journey';
import type { Language } from '@/types';

export interface HeroCopy {
  kicker: string;
  subtext: string;
}

export const heroCopy: Record<JourneyState, Record<Language, HeroCopy>> = {
  'pre-start-14plus': {
    en: {
      kicker: 'Welcome,',
      subtext:
        'You start in {X} days. Grab a coffee and take your time — go through it whenever you have a moment.',
    },
    cs: {
      kicker: 'Vítej,',
      subtext:
        'Za {X} dní nastupuješ. Uvař si kafe a až budeš mít chvilku, vše si postupně projdi.',
    },
  },
  'pre-start-week': {
    en: {
      kicker: 'Welcome,',
      subtext: '{X} days until Day 1. This is your personal guide for the first days.',
    },
    cs: {
      kicker: 'Vítej,',
      subtext: '{X} dní do nástupu. Tohle je tvůj osobní průvodce pro první dny.',
    },
  },
  'pre-start-tomorrow': {
    en: {
      kicker: 'Welcome,',
      subtext: "Take a deep breath — tomorrow's the day. We can't wait for you.",
    },
    cs: {
      kicker: 'Vítej,',
      subtext: 'Z hluboka se nadechni, zítra začínáš. Už se na tebe těšíme.',
    },
  },
  'day-1': {
    en: {
      kicker: 'Welcome,',
      subtext: "Enjoy your first day. Your team, your schedule, your guide — it's all ready.",
    },
    cs: {
      kicker: 'Vítej,',
      subtext:
        'Užij si první den. Tady máš svůj tým, svůj rozpis, rozcestník — vše je připravené.',
    },
  },
  'week-1': {
    en: {
      kicker: 'Hey,',
      subtext:
        "Your first week at EXPANDO — how are you feeling? Observe, ask, take notes. No question is stupid — we've all been new once.",
    },
    cs: {
      kicker: 'Ahoj,',
      subtext:
        'První týden v EXPANDO — jak se cítíš? Pozoruj, ptej se, piš si. Žádná otázka není hloupá, všichni jsme byli jednou nováčci.',
    },
  },
  'month-1': {
    en: {
      kicker: 'Hey,',
      subtext: 'Month 1 — learn, soak it in, map how things work, find your rhythm.',
    },
    cs: {
      kicker: 'Ahoj,',
      subtext:
        'První měsíc — uč se, nasávej informace, mapuj, co jak funguje, a najdi si tempo.',
    },
  },
  'month-2': {
    en: {
      kicker: 'Hey,',
      subtext:
        "Month 2 — you're contributing now. Test, try, don't be afraid to make mistakes — that's where you learn the most. Then build on what works for you.",
    },
    cs: {
      kicker: 'Ahoj,',
      subtext:
        'Druhý měsíc — už přispíváš. Testuj, zkoušej, neboj se udělat chyby — na nich se učíš nejvíc. A postupně stavěj na tom, co ti funguje.',
    },
  },
  'month-3': {
    en: {
      kicker: 'Hey,',
      subtext:
        "Month 3 — the home stretch. You're running on your own now and the team counts on you. Great work.",
    },
    cs: {
      kicker: 'Ahoj,',
      subtext:
        'Třetí měsíc — finální rovinka. Už jedeš samostatně a tým s tebou počítá. Dobrá práce.',
    },
  },
  graduated: {
    en: {
      kicker: 'Welcome back,',
      subtext:
        "That's it! Onboarding's done. Bookmark this page — it's your cheat sheet whenever you need to come back to something.",
    },
    cs: {
      kicker: 'Vítej zpět,',
      subtext:
        'A je to! Onboarding máš za sebou. Tuhle stránku si ulož do záložek — je to tvůj tahák, kdykoliv se k něčemu budeš potřebovat vracet.',
    },
  },
};

export function renderSubtext(template: string, x: number): string {
  return template.replace(/\{X\}/g, String(x));
}
