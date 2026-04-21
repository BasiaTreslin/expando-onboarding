import type { TeamMember } from '@/types';

// HR edits this file to add / remove team members.
// Photos live in /public/photos/team/{firstname}.jpg — if missing, initials are rendered.
export const teamMembers: TeamMember[] = [
  { firstName: 'Nikol', fullName: 'Nikol Černá', team: 'GTM', role: 'Senior KAM', hobby: 'dog' },
  { firstName: 'Dana', fullName: 'Dana Kováčik', team: 'GTM', role: 'Head of GTM', hobby: 'book' },
  { firstName: 'Honza', fullName: 'Honza Novák', team: 'GTM', role: 'KAM', hobby: 'surf' },
  { firstName: 'Klára', fullName: 'Klára Svobodová', team: 'AM', role: 'Agency Support', hobby: 'coffee' },
  { firstName: 'Míra', fullName: 'Míra Dvořák', team: 'AM', role: 'KAM', hobby: 'guitar' },
  { firstName: 'Ester', fullName: 'Ester Horáková', team: 'CS', role: 'CS Specialist', hobby: 'plant' },
  { firstName: 'Tomáš', fullName: 'Tomáš Beneš', team: 'Data', role: 'Data Engineer', hobby: 'lego' },
  { firstName: 'Eliška', fullName: 'Eliška Králová', team: 'Data', role: 'Data Analyst', hobby: 'camera' },
  { firstName: 'Petr', fullName: 'Petr Svoboda', team: 'Ops', role: 'Finance', hobby: 'bike' },
  { firstName: 'Lucie', fullName: 'Lucie Marková', team: 'Ops', role: 'HR', hobby: 'gamepad' },
  { firstName: 'David', fullName: 'David Procházka', team: 'AM', role: 'KAM', hobby: 'coffee' },
  { firstName: 'Anna', fullName: 'Anna Bartošová', team: 'CS', role: 'Account Health', hobby: 'dog' },
];
