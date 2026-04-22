import type { Team } from '@/types';

export const resellTeam: Team = {
  id: 'resell-team',
  name: 'Resell Team',
  tagline: 'We buy stock, list it, and scale it across Amazon, Kaufland, Allegro and more.',
  members: [
    {
      id: 'jakub-petrek',
      name: 'Jakub Petřek',
      role: 'Strategic Project Manager',
      photo: '/team/jakub-petrek.png',
      location: 'Praha',
      email: 'jakub@expan.do',
    },
    {
      id: 'jakub-zemlicka',
      name: 'Jakub Žemlička',
      role: 'Key Account Manager',
      photo: '/team/jakub-zemlicka.png',
      location: 'Praha',
      email: 'jakub.zemlicka@expan.do',
    },
    {
      id: 'jan-jenista',
      name: 'Jan Jeništa',
      role: 'Key Account Manager',
      photo: '/team/jan-jenista.png',
      location: 'Praha',
      email: 'jan.jenista@expan.do',
    },
    {
      id: 'michal-mazurek',
      name: 'Michal Mazurek',
      role: 'Key Account Manager',
      photo: '/team/michal-mazurek.png',
      location: 'Praha',
      email: 'michal.mazurek@expan.do',
    },
    {
      id: 'patrik-oramus',
      name: 'Patrik Oramus',
      role: 'Key Account Manager',
      photo: '/team/patrik-oramus.jpg',
      location: 'Praha',
      email: 'patrik.oramus@expan.do',
    },
  ],
};

export const TEAMS_BY_ID: Record<string, Team> = {
  'resell-team': resellTeam,
};

export function getTeamById(id: string | undefined): Team | undefined {
  if (!id) return undefined;
  return TEAMS_BY_ID[id];
}
