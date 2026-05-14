import type { Team } from '@/types';

export const leadershipTeam: Team = {
  id: 'leadership-team',
  name: 'Leadership',
  tagline: 'Svět, kde se rozhoduje o směru firmy a o tom, kam Expando poroste dál.',
  taglineEn: 'A world where the direction of the company is decided — and where Expando grows next.',
  members: [
    {
      id: 'dominik-hegedus',
      name: 'Dominik Hegedüs',
      role: 'CEO',
      photo: '/team/dominik-hegedus.png',
      location: 'Praha',
      email: 'dominik.hegedus@expan.do',
    },
    {
      id: 'dana-kovacik',
      name: 'Dana Kováčik',
      role: 'COO',
      photo: '/team/dana-kovacik.png',
      location: 'Praha',
      email: 'dana.kovacik@expan.do',
    },
    {
      id: 'lukas-doskocil',
      name: 'Lukáš Doskočil',
      role: 'Head of Agency',
      photo: '/team/lukas-doskocil.png',
      location: 'Amsterdam',
      email: 'lukas.doskocil@expan.do',
      bio: `Hi, I'm Lukáš — Head of Agency at EXPANDO. Originally from Nový Bor, a little glass-making town in Bohemia, currently based in Milan, Italy.

I love travel and history (ancient Egypt is the best!), I'm seriously into books — Terry Pratchett's Discworld series tops the list — and a massive sports fan: West Ham United and Bílí Tygři Liberec all the way.`,
    },
    {
      id: 'ilona-medova',
      name: 'Ilona Medová',
      role: 'Growth Manager',
      photo: '/team/ilona-medova.png',
      location: 'Praha',
      email: 'ilona.medova@expan.do',
    },
  ],
};
