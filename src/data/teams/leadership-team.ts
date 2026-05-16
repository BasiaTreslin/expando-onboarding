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
      bio: `I started at EXPANDO as Head of Customer Success, then Head of Agency Support, and later took charge of the Agency (now Account Management) department. Since January 2025, I've been serving as CEO. Alongside my CEO responsibilities, I stay closely connected to our GTM team, working on acquiring clients who are the right fit for EXPANDO.

In my free time: hiking, traveling, snowboarding, karaoke (I never said I can sing 😀). Most of my time is occupied by my husky, who needs 110% of my attention — or else passports, houses, and furniture suffer. I love him regardless.`,
    },
    {
      id: 'dana-kovacik',
      name: 'Dana Kováčik',
      role: 'COO',
      photo: '/team/dana-kovacik.png',
      location: 'Praha',
      email: 'dana.kovacik@expan.do',
      bio: `Čau, tady Dana. Mojí rolí je zajistit, aby se skvělé nápady a energie v týmech přetavily do fungujících procesů a konkrétních výsledků — aby EXPANDO fungovalo jako jeden celek.

Ve volném čase je všechno propletené: sportuju, cestuju a jím. V létě na kole, v zimě na skialpech, k tomu jóga (cíl: stát vzhůru nohama). Největší výzvou byl třítýdenní trek po Himalájích, nejraději se vracím do Indonésie. A nejvíc mám ráda lepek — pizza, croissant, naan.`,
    },
    {
      id: 'lukas-doskocil',
      name: 'Lukáš Doskočil',
      role: 'Head of Agency',
      photo: '/team/lukas-doskocil.png',
      location: 'Milan',
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
      bio: `Začínala jsem jako Customer Success Agent, posunula se na Head of Customer Success a vedla tým zákaznické podpory. Pak jsem přešla do GTM týmu, kde se věnuju marketingu, partnerstvím i sales aktivitám — zkrátka tam, kde je potřeba získat co nejvíce kvalitních leadů.

Ve volném čase: výlety, AZ-kvíz, Šumava a gin. 🌲🍸`,
    },
  ],
};
