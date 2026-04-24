import type { Team } from '@/types';

export const businessOpsTeam: Team = {
  id: 'business-ops-team',
  name: 'Business Operations',
  tagline: 'Svět, kde o tempu firmy rozhoduje neviditelné zákulisí — procesy, reporty a automatizace.',
  taglineEn: 'A world where the pace of the company is set by the invisible backstage — processes, reports, and automations.',
  members: [
    {
      id: 'alex-perekoti',
      name: 'Alex Perekoti',
      role: 'Business Automation & Data Analyst',
      photo: '/team/alex-perekoti.jpg',
      location: 'Praha',
      email: 'alex.perekoti@expan.do',
    },
    {
      id: 'klara-javorkova',
      name: 'Klára Javorková',
      role: 'Finance & Reporting Specialist',
      photo: '/team/klara-javorkova.jpg',
      location: 'Praha',
      email: 'klara.javorkova@expan.do',
    },
    {
      id: 'nikol-cerna',
      name: 'Nikol Černá',
      role: 'Operations & Project Manager',
      photo: '/team/nikol-cerna.jpg',
      location: 'Praha',
      email: 'nikol@expan.do',
    },
    {
      id: 'jakub-macalik',
      name: 'Jakub Macalík',
      role: 'Automation Specialist Junior',
      photo: '/team/jakub-macalik.jpg',
      location: 'Praha',
      email: 'jakub.macalik@expan.do',
    },
  ],
};
