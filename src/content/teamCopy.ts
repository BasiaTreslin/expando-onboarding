import type { Language } from '@/types';

export interface TeamCopy {
  leaderBuddyHeader: string;
  leaderLabel: string;
  buddyLabel: string;
  teamHeader: string; // {teamName} placeholder
  sayHi: string;
}

export const teamCopy: Record<Language, TeamCopy> = {
  en: {
    leaderBuddyHeader: 'Your leader & buddy',
    leaderLabel: 'Your leader',
    buddyLabel: 'Your buddy',
    teamHeader: 'Meet the {teamName}',
    sayHi: 'Say hi on Slack',
  },
  cs: {
    leaderBuddyHeader: 'Tvá vedoucí & buddy',
    leaderLabel: 'Vedoucí',
    buddyLabel: 'Buddy',
    teamHeader: 'Seznam se s {teamName}',
    sayHi: 'Napiš si',
  },
};

export function renderTeamHeader(template: string, teamName: string): string {
  return template.replace(/\{teamName\}/g, teamName);
}
