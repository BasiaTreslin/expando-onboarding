export interface PersonInfo {
  name: string;
  photo?: string;
  linkedin?: string;
}

export type ContractType = 'HPP' | 'ŽL' | 'DPČ';
export type Language = 'en' | 'cs';
export type RoleKey = 'KAM' | 'AgencySupport' | 'CS' | 'PPCSpecialist' | 'TechData' | 'GTMSales' | 'Operations';

export interface Day1Session {
  time: string;
  session: string;
  who: string;
}

export interface NewHireConfig {
  slug: string;
  name: string;
  fullName: string;
  role: string;
  roleKey?: RoleKey;
  team: string;
  startDate: string; // ISO 8601
  buddy: PersonInfo;
  teamLeader: PersonInfo;
  contractType: ContractType;
  language: Language;
  resourceMapUrl?: string;
  customDay1Schedule?: Day1Session[];
  hasWelcomeVideo?: boolean;
  welcomeVideoUrl?: string;
}
