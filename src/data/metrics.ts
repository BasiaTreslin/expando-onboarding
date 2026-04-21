import type { MetricStat, RecentMilestone } from '@/types';

// HR/Data team updates these numbers. Next step: fetch from METRICS Notion DB.
export const metrics: MetricStat[] = [
  { value: '€75M+', numeric: 75, prefix: '€', suffix: 'M+', label: 'GMV YTD' },
  { value: '300+', numeric: 300, suffix: '+', label: 'clients on our tech' },
  { value: '6', numeric: 6, label: 'countries worldwide' },
  { value: '34', numeric: 34, label: 'people (and growing)' },
];

export const recentMilestones: RecentMilestone[] = [
  { text: 'Tento měsíc jsme expandovali do Rumunska 🇷🇴' },
  { text: 'Naše APP zpracovala miliontou objednávku 🚀' },
  { text: 'Nový klient: česká značka obuvi jde na Amazon.de' },
];

export const techStack = [
  { name: 'Amazon Seller Central', category: 'marketplace' },
  { name: 'Kaufland', category: 'marketplace' },
  { name: 'eBay', category: 'marketplace' },
  { name: 'Allegro', category: 'marketplace' },
  { name: 'EXPANDO APP', category: 'proprietary' },
  { name: 'Looker Studio', category: 'analytics' },
  { name: 'Intercom + AI', category: 'support' },
  { name: 'Slack', category: 'internal' },
  { name: 'ClickUp', category: 'internal' },
  { name: 'Notion', category: 'internal' },
  { name: 'Pipedrive', category: 'crm' },
];
