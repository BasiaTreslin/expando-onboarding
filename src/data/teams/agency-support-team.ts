import type { Team } from '@/types';

export const agencySupportTeam: Team = {
  id: 'agency-support-team',
  name: 'Agency Support',
  tagline: 'Svět, kde za každým KAMem stojí support, díky kterému se KAM může soustředit na klienta.',
  taglineEn: 'A world where behind every KAM stands a support — so the KAM can focus on the client.',
  members: [
    {
      id: 'jana-drapalova',
      name: 'Jana Drápalová',
      role: 'Agency Support Specialist',
      photo: '/team/jana-drapalova.jpg',
      location: 'Praha',
      email: 'jana.drapalova@expan.do',
    },
    {
      id: 'amjad-aslam',
      name: 'Amjad Aslam',
      role: 'FBA Specialist',
      photo: '/team/amjad-aslam.jpg',
      location: 'Karachi',
      email: 'amjad@expan.do',
    },
    {
      id: 'denisa-sedlakova',
      name: 'Denisa Sedláková',
      role: 'Marketplace Admin Support',
      photo: '/team/denisa-sedlakova.png',
      location: 'Praha',
      email: 'denisa.sedlakova@expan.do',
    },
    {
      id: 'evi-sasinek',
      name: 'Evi Sasínek',
      role: 'KAM Admin Support',
      photo: '/team/evi-sasinek.png',
      location: 'Praha',
      email: 'evi.sasinek@expan.do',
    },
  ],
};
