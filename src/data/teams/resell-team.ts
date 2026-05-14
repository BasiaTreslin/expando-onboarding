import type { Team } from '@/types';

export const resellTeam: Team = {
  id: 'resell-team',
  name: 'Resell Team',
  tagline: 'Svět, kde o prodeji rozhoduje pár centů a viditelnost na prvních pozicích.',
  taglineEn: 'A world where sales are decided by a few cents and visibility on top positions.',
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
      bio: `I'm an Account Manager at EXPANDO, taking care of clients and making sure the resell side runs smoothly.

In my free time I've been renovating my friend's boat and building a "summer resort" with my dad at Slapy. I love bodyweight training, yoga, and meditation — and I keep trying running, though it's a real challenge (anyone want to join?). Travel is the third pillar — never easy these days, but "where there's a will, there's a way". And family time? Always the best part.`,
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
