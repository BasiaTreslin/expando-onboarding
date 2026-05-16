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
      bio: `Mám psa, kočku a trochu geekovský smysl pro humor. Neumím se fotit a nerad vystupuju před lidmi.

PS: A skvěle maluju 😃`,
    },
    {
      id: 'klara-javorkova',
      name: 'Klára Javorková',
      role: 'Finance & Reporting Specialist',
      photo: '/team/klara-javorkova.jpg',
      location: 'Praha',
      email: 'klara.javorkova@expan.do',
      bio: `Hi, I'm Klára — animal lover, lover of all things outdoors, and sporty (at least in spirit)! As a kid I did a bit of everything: ballet, street dance, flute, tennis, athletics… was I amazing at any of them? Not really. Did I enjoy it all anyway? Absolutely! 😎

These days my biggest passions are the mountains, bouldering, running, and when I'm not moving around I'm probably reading a book or enjoying good food. At EXPANDO I'm officially in the Operations team, but you'll find me jumping into all sorts of areas — Customer Success or anything that needs a helping hand. If you ever need help with a Google Sheet, there's a good chance we'll bump into each other. 📊`,
    },
    {
      id: 'nikol-cerna',
      name: 'Nikol Černá',
      role: 'Operations & Project Manager',
      photo: '/team/nikol-cerna.jpg',
      location: 'Praha',
      email: 'nikol@expan.do',
      bio: `V EXPANDO mám na starosti optimalizaci a automatizaci interních procesů, procurement, HR a operations agendu.

Volný čas: 🛵 cestování — autem na roadtripu nebo někde v Asii na skútru. 🏔️ Hory a pohyb (snowboard v Alpách, v létě běh a výlety). 🐶 Pes Derry, se kterým trávím spoustu času na procházkách. 🍜 Miluju asijskou kuchyni a neapolskou pizzu. 🥂 Ráno kafe, večer Prosecco nebo Crémant. 🎨 Ráda tvořím — keramika, háčkování, fotky.`,
    },
    {
      id: 'jakub-macalik',
      name: 'Jakub Macalík',
      role: 'Automation Specialist Junior',
      photo: '/team/jakub-macalik.jpg',
      location: 'Praha',
      email: 'jakub.macalik@expan.do',
      bio: `Ahoj, jsem Kuba 👋 Studuju gymnázium v Praze a k EXPANDO jsem se přidal teprve nedávno, takže se zatím "rozhlížím a nasávám" 😄.

Co mě baví: vaření (občas experiment, občas "hlavně ať se to dá jíst"), bruslení, fotbal (sleduju ho fakt hodně), a obecně jakýkoliv pohyb a nové sporty. Společenskej typ, bydlím v Dobřichovicích, doma máme dvě kočky 🐱🐱, rád se směju a beru věci s nadhledem.`,
    },
  ],
};
