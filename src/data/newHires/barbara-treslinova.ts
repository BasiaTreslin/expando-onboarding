import type { NewHireConfig } from '@/types';

export const config: NewHireConfig = {
  slug: 'barbara-treslinova',
  firstName: 'Barbara',
  fullName: 'Barbara Třeslínová',
  role: 'Key Account Manager',
  roleKey: 'KAM',
  team: 'Go-to-Market',
  startDate: '2026-04-27T09:00:00+02:00',
  roleMissionLine:
    'Jako KAM v GTM týmu jsi ten, kdo rozhoduje, které značky vezmeme na palubu a jak je odpálíme.',

  buddy: {
    firstName: 'Nikol',
    fullName: 'Nikol Černá',
    role: 'Senior KAM',
    personalLine: 'Ahoj! Provedu tě prvními obědy, kávovarem a Slackem. Ptej se na cokoli.',
    slackDeepLink: 'slack://user?team=T00000000&id=U00000001',
    email: 'nikol@expando.com',
    linkedin: 'https://linkedin.com/in/',
  },

  teamLeader: {
    firstName: 'Dana',
    fullName: 'Dana Kováčik',
    role: 'Head of GTM',
    personalLine: 'Těším se na tvůj fresh pohled na věc. Pondělí 9:00!',
    slackDeepLink: 'slack://user?team=T00000000&id=U00000002',
    email: 'dana@expando.com',
    linkedin: 'https://linkedin.com/in/',
  },

  contractType: 'ŽL',
  language: 'cs',
  hasWelcomeVideo: false,
  easterEggCode: 'EXP-WELCOME-2026',
  officeAddress: 'EXPANDO HQ, Praha',
  credentials: {
    username: 'barbara',
    password: 'expando-welcome-2026',
  },
};
