import type { Team } from '@/types';

export const gtmTeam: Team = {
  id: 'gtm-team',
  name: 'Go-to-Market',
  tagline: 'Svět, kde o klientovi rozhoduje umění vyjednávat a ukázat naši hodnotu.',
  taglineEn: 'A world where landing a client comes down to the art of negotiation and showing our value.',
  members: [
    {
      id: 'karolina-masinova',
      name: 'Karolína Mašinová',
      role: 'Sales Manager',
      photo: '/team/karolina-masinova.png',
      location: 'Praha',
      email: 'karolina.masinova@expan.do',
    },
    {
      id: 'jakub-simunek',
      name: 'Jakub Šimůnek',
      role: 'Sales Specialist',
      photo: '/team/jakub-simunek.jpg',
      location: 'Praha',
      email: 'jakub.simunek@expan.do',
    },
    {
      id: 'ira-mavrodii',
      name: 'Ira Mavrodii',
      role: 'Sales Manager',
      photo: '/team/ira-mavrodii.png',
      location: 'Praha',
      email: 'iryna.mavrodii@expan.do',
    },
  ],
};
