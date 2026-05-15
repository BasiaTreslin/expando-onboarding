import {
  Document,
  Paragraph,
  TextRun,
  AlignmentType,
  Packer,
  BorderStyle,
  Table,
  TableRow,
  TableCell,
  WidthType,
  TabStopType,
} from 'docx';

export interface ContractData {
  jmeno_prijmeni: string;
  ico: string;
  misto_podnikani: string;
  email: string;
  hodinova_sazba: string;
  datum_nastupu: string;
}

// Typography constants
const F = 'Calibri';       // body font
const FT = 'Arial';        // title font
const S = 22;              // 11 pt in half-points
const ST = 36;             // 18 pt in half-points
const NUM_INDENT = 720;    // twips — tab stop + left indent for numbered paragraphs
const SUB_INDENT = 1440;   // twips — left indent for sub-items

export async function generateContract(data: ContractData): Promise<Buffer> {

  // ── Counter state (local — safe for concurrent requests) ─────────────
  let secN = 0, paraN = 0, subN = 0;

  // ── Run builders ──────────────────────────────────────────────────────
  const r  = (text: string) => new TextRun({ text, font: F, size: S });
  const rb = (text: string) => new TextRun({ text, font: F, size: S, bold: true });

  // Maps mixed run args: strings → Calibri 11pt, TextRun → pass-through
  const runs = (...args: (string | TextRun)[]) =>
    args.map(a => (typeof a === 'string' ? r(a) : a));

  // ── Paragraph builders ────────────────────────────────────────────────

  // Numbered section heading: "1.  HEADING" — Calibri 11pt bold black centered
  function secH(title: string): Paragraph {
    secN++; paraN = 0; subN = 0;
    return new Paragraph({
      children: [new TextRun({ text: `${secN}.  ${title}`, font: F, size: S, bold: true })],
      alignment: AlignmentType.CENTER,
      spacing: { before: 440, after: 220 },
    });
  }

  // Numbered body paragraph with hanging indent: "1.1⇥ text…"
  function num(...args: (string | TextRun)[]): Paragraph {
    paraN++; subN = 0;
    return new Paragraph({
      children: [
        new TextRun({ text: `${secN}.${paraN}\t`, font: F, size: S, bold: true }),
        ...runs(...args),
      ],
      tabStops: [{ type: TabStopType.LEFT, position: NUM_INDENT }],
      indent: { left: NUM_INDENT, hanging: NUM_INDENT },
      spacing: { after: 140 },
    });
  }

  // Lettered sub-item: "a)⇥ text…" — indented under numbered paragraph
  function item(text: string): Paragraph {
    subN++;
    return new Paragraph({
      children: [
        new TextRun({ text: `${String.fromCharCode(96 + subN)})\t`, font: F, size: S }),
        r(text),
      ],
      tabStops: [{ type: TabStopType.LEFT, position: SUB_INDENT }],
      indent: { left: SUB_INDENT, hanging: 480 },
      spacing: { after: 80 },
    });
  }

  // Plain unnumbered paragraph — Calibri 11pt
  function plain(...args: (string | TextRun)[]): Paragraph {
    return new Paragraph({ children: runs(...args), spacing: { after: 140 } });
  }

  // Sub-section heading for the GDPR annex — bold, no colour
  function annH(title: string): Paragraph {
    return new Paragraph({
      children: [new TextRun({ text: title, font: F, size: S, bold: true })],
      spacing: { before: 320, after: 120 },
    });
  }

  const blank = () => new Paragraph({ spacing: { after: 160 } });

  const centered = (text: string, opts: { bold?: boolean; font?: string; size?: number } = {}) =>
    new Paragraph({
      children: [new TextRun({ text, font: opts.font ?? F, size: opts.size ?? S, bold: opts.bold ?? false })],
      alignment: AlignmentType.CENTER,
      spacing: { after: 100 },
    });

  // ── Signature table ────────────────────────────────────────────────────
  function signatureTable(leftLabel: string, rightLabel: string): Table {
    const cell = (label: string) =>
      new TableCell({
        children: [
          new Paragraph({ children: [rb(label)], spacing: { after: 500 } }),
          new Paragraph({ children: [r('Datum: ___________________________')], spacing: { after: 240 } }),
          new Paragraph({ children: [r('Podpis: __________________________')] }),
        ],
        borders: {
          top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE },
          left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE },
        },
      });
    return new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      borders: {
        top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE },
        left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE },
        insideHorizontal: { style: BorderStyle.NONE }, insideVertical: { style: BorderStyle.NONE },
      },
      rows: [new TableRow({ children: [cell(leftLabel), cell(rightLabel)] })],
    });
  }

  // ════════════════════════════════════════════════════════════════════
  //  DOCUMENT CHILDREN
  // ════════════════════════════════════════════════════════════════════
  const children: (Paragraph | Table)[] = [

    // ── TITLE ──────────────────────────────────────────────────────────
    centered('Rámcová smlouva na dodávky plnění', { bold: true, font: FT, size: ST }),
    centered('pro živnostníky'),
    new Paragraph({
      children: [new TextRun({ text: '(dále jen „Smlouva")', font: F, size: S })],
      alignment: AlignmentType.CENTER,
      spacing: { after: 360 },
    }),

    // ── PARTIES ────────────────────────────────────────────────────────
    plain(rb('EXPANDO COMPANY s.r.o.')),
    plain(r('Níže uvedeného dne, měsíce a roku')),
    plain(rb(data.datum_nastupu)),
    blank(),
    plain(rb('se sídlem:\t\t\t'), r('Poštovní 244, 749 61, Třinec')),
    plain(rb('IČO:\t\t\t\t'), r('22364714')),
    plain(rb('zastoupená:\t\t\t'), r('Mgr. Adamem Kurzokem, jednatelem')),
    plain(rb('e-mail:\t\t\t\t'), r('adam@expan.do')),
    plain(rb('zapsaná v obchodním rejstříku vedeném u Krajského soudu v Ostravě, C 98118')),
    plain(r('(dále jen „'), rb('Objednatel'), r('")')),
    blank(),
    new Paragraph({
      children: [new TextRun({ text: 'a', font: F, size: S })],
      alignment: AlignmentType.CENTER,
      spacing: { after: 160 },
    }),
    blank(),
    plain(rb(data.jmeno_prijmeni)),
    plain(r('fyzická osoba podnikající na základě živnostenského oprávnění')),
    plain(r('místo podnikání: '), rb(data.misto_podnikani)),
    plain(r('IČO: '), rb(data.ico)),
    plain(r('e-mail: '), rb(data.email)),
    plain(r('(dále jen „'), rb('Poskytovatel'), r('")')),
    plain(r('(Objednatel a Poskytovatel společně dále jen „'), rb('Smluvní strany'), r('"),')),
    blank(),
    plain(r('mezi sebou uzavřely v souladu s ust. § 1746 odst. 2 zákona č. 89/2012 Sb., občanský zákoník (dále jen „'), rb('Občanský zákoník'), r('"), tuto')),
    new Paragraph({
      children: [new TextRun({ text: 'RÁMCOVOU SMLOUVU O POSKYTOVÁNÍ SLUŽEB', font: F, size: S, bold: true })],
      alignment: AlignmentType.CENTER,
      spacing: { after: 80 },
    }),
    centered('(dále jen „Smlouva")'),
    blank(),

    // ── 1. PŘEDMĚT A ÚČEL SMLOUVY ──────────────────────────────────────
    secH('PŘEDMĚT A ÚČEL SMLOUVY'),
    num(r('Předmětem této Smlouvy je úprava základních podmínek týkajících se poskytování konzultantských, obchodních, grafických, marketingových, programátorských, příp. jiných služeb (dále jen „'), rb('Služby'), r('") mezi Objednatelem a Poskytovatelem.')),
    num(r('Poskytovatel se zavazuje jako samostatný podnikatel, vlastním jménem a na svou vlastní odpovědnost a náklady, poskytovat Objednateli za podmínek stanovených v této Smlouvě Služby a Objednatel se zavazuje za poskytování Služeb zaplatit Poskytovateli odměnu.')),
    num(r('Podrobný popis realizace jednotlivých činností v rámci poskytování Služeb, způsob jejich plnění a obsah jednotlivých výstupů, bude blíže specifikován v každé dílčí smlouvě či objednávce Objednatele na poskytování Služeb (dále jen „'), rb('Objednávka'), r('").')),

    // ── 2. OBJEDNÁVKY ──────────────────────────────────────────────────
    secH('OBJEDNÁVKY'),
    num(r('Služby dle této Smlouvy budou poskytovány na základě objednávek Objednatele, které budou obsahovat zejména:')),
    item('identifikaci Objednatele a Poskytovatele,'),
    item('odkaz na tuto Smlouvu,'),
    item('číslo Objednávky a datum vystavení Objednávky,'),
    item('specifikaci Služeb, tj. určení konkrétních činností,'),
    item('termín, příp. harmonogram plnění,'),
    item('případně zvláštní podmínky či požadavky k jednotlivé Objednávce či akceptační kritéria,'),
    item('návrh ceny.'),
    num(r('Objednatel zašle Objednávku prostřednictvím e-mailu na e-mailovou adresu Poskytovatele. Objednávka může být učiněna i ústně s tím, že následně bude obsah Objednávky potvrzen prostřednictvím e-mailu. Za platnou objednávku se považuje i v případě, že v dílčí smlouvě či objednávce nebude výslovně uvedeno, že se jedná o Objednávku.')),
    num(r('Poskytovatel je povinen Objednávku bez zbytečného odkladu potvrdit nebo Objednateli sdělit, že Objednávku neprovede. V případě, že Poskytovatel Objednateli do 2 pracovních dnů ode dne obdržení Objednávky nesdělí, že Objednávku neprovede, tak je povinen poskytnout Služby v rozsahu a termínech uvedených v předmětné Objednávce.')),
    num(r('Za akceptaci Objednávky se rovněž považuje započetí s poskytováním Služeb.')),
    num(r('Neobsahuje-li Objednávka cenu, je Objednávka uzavřena dnem, kdy Objednatel akceptuje cenu, která je stanovena Poskytovatelem.')),
    num(r('Akceptací Objednávky jsou Smluvní strany Objednávkou vázány.')),
    num(r('Nestanoví-li Objednávka výslovně jinak, řídí se práva a povinnosti Smluvních stran při realizaci plnění Objednávky touto Smlouvou. V případě rozporu mezi zněním této Smlouvy a zněním Objednávky platí ustanovení Objednávky. Změny provedené Objednávkou oproti ustanovením této Smlouvy se týkají pouze plnění poskytovaného na základě takové Objednávky.')),
    num(r('Objednatel se zavazuje odebírat Služby v minimálním objemu 35 hod/týdně a Poskytovatel se zavazuje Služby alespoň v tomto objemu poskytovat.')),

    // ── 3. ODMĚNA A PLATEBNÍ PODMÍNKY ──────────────────────────────────
    secH('ODMĚNA A PLATEBNÍ PODMÍNKY'),
    num(r('Cena za poskytování Služeb Poskytovatelem bude stanovena v příslušné Objednávce, není-li v Objednávce stanovena cena, počítá se cena '), rb(data.hodinova_sazba + ' Kč / hodinu práce'), r(', překročí-li objem služeb Poskytovatele 150 hodin/měsíc, je povinen o tom Objednatele informovat. Všechny cenové údaje jsou uvedeny bez DPH. Je-li Poskytovatel plátcem DPH, připočítá daň v zákonné výši.')),
    num(r('Cena za plnění Poskytovatele dle Objednávky bude určena jako cena za skutečně poskytnuté plnění podle Objednatelem odsouhlaseného přehledu poskytnutých činností (dále jen „'), rb('Přehled činností'), r('"). Není-li v Objednávce stanoveno jinak, Přehled činností předloží Poskytovatel Objednateli vždy po skončení měsíce, ve kterém bylo plnění poskytnuto a Objednatel se jej zavazuje do 7 pracovních dnů od předložení odsouhlasit, nebo doručit Poskytovateli ve stejné lhůtě písemně (také e-mailem) své výhrady.')),
    num(r('Na základě dohody Smluvních stran je možno v Objednávce stanovit pevnou cenu za přesně specifikované plnění Poskytovatele, kalkulovanou na základě předpokládané náročnosti, jako cenu díla (tzv. „Fix Time & Fix Price").')),
    num(r('Poskytovatel je oprávněn vystavit daňový doklad (dále též „'), rb('faktura'), r('") pouze na základě odsouhlaseného Přehledu činností za plnění v příslušném období, v Objednávce dohodnutém, časovém intervalu, nebo na základě akceptace Díla (jak je uvedeno níže, a způsobem uvedeným v Objednávce). Podmínkou k vystavení faktury je vždy existence schváleného Přehledu činností.')),
    num(r('Každá faktura bude mít náležitosti účetního dokladu dle zákona č. 563/1991 Sb., o účetnictví a pokud bude zároveň i daňovým dokladem, bude mít všechny náležitosti dle zákona č. 235/2004 Sb., o dani z přidané hodnoty, ke dni vzniku povinnosti přiznat DPH a také bude obsahovat číslo Objednávky.')),
    num(r('Objednatel se zavazuje uhradit fakturu do 7 dní od jejího doručení, a to bezhotovostním převodem na bankovní účet uvedený na faktuře. Každá platba učiněná ve prospěch Poskytovatele se považuje za uhrazenou dnem jejího odepsání z bankovního účtu Objednatele.')),

    // ── 4. PRÁVA A POVINNOSTI ──────────────────────────────────────────
    secH('PRÁVA A POVINNOSTI SMLUVNÍCH STRAN'),
    num(r('Poskytovatel se zavazuje poskytovat Služby podle této Smlouvy s odbornou péčí v souladu se zájmy a organizačními pokyny Objednatele. Poskytovatel je však povinen Objednatele bez zbytečného odkladu upozornit, pokud by jeho požadavky či pokyny byly z jakéhokoli důvodu nevhodné, neúplné, nepřesné či nedostatečné apod., a je povinen navrhnout Objednateli alternativní řešení.')),
    num(r('Poskytovatel je povinen základě žádosti Objednatele dostavit se na vlastní náklady ke konzultaci nebo provádění Služeb na adresu provozovny Praze.')),
    num(r('Smluvní strany jsou povinny informovat se navzájem o veškerých skutečnostech důležitých pro jejich spolupráci v rámci plnění předmětu Smlouvy.')),
    num(r('Poskytovatel je povinen být po celou dobu poskytování Služeb dle této Smlouvy držitelem živnostenského oprávnění k vykonávání činností podle této Smlouvy a při podpisu této Smlouvy a dále kdykoliv na požádání tuto skutečnost prokázat Objednateli.')),
    num(r('Poskytovatel je oprávněn vykonávat obdobnou činnost, která je předmětem této Smlouvy, i pro jiné subjekty než pro Objednatele, pokud to není v rozporu se zájmy Objednatele. Je však povinen o takových službách Objednatele informovat.')),
    num(r('Objednatel se zavazuje poskytnout Poskytovateli součinnost potřebnou pro splnění předmětu a účelu této Smlouvy.')),
    num(r('Obě Smluvní strany se zavazují vynaložit takové úsilí, aby byly řádně a v termínu splněny jejich závazky vyplývající z této Smlouvy.')),

    // ── 5. AUTORSKÁ PRÁVA ──────────────────────────────────────────────
    secH('AUTORSKÁ PRÁVA'),
    num(r('Pro vyloučení pochybností Smluvní strany sjednávají, že budou-li při poskytování Služeb Poskytovatelem vytvořena jakákoliv díla či výstupy (dále jen „'), rb('Díla'), r('" či „'), rb('Dílo'), r('", přičemž množné číslo zahrnuje i číslo jednotné a naopak), naplňují tato Díla znaky děl vytvořených na objednávku dle § 58 odst. 7 zákona č. 121/2000 Sb., autorský zákon (dále jen „'), rb('AZ'), r('"), eventuálně znaky kolektivních děl dle § 59 odst. 2 AZ, a Objednatel se stává vykonavatelem majetkových práv k těmto Dílům. Poskytovatel uděluje souhlas (svolení) k postoupení výkonu práv dle předchozí věty na jakoukoli třetí osobu.')),
    num(r('V případě, že některá Díla nesplní znaky specifikované v odst. 1 tohoto článku, uděluje Poskytovatel okamžikem jejich vytvoření k těmto Dílům výhradní, časově neomezenou (tj. po dobu trvání majetkových autorských práv) licenci, a to ke všem způsobům užití Děl a v neomezeném územním, osobním či jiném rozsahu, přičemž odměna za poskytnutí licence je zahrnuta v odměně dle této Smlouvy. Smluvní strany se současně dohodly, že licenci uděluje Poskytovatel jako trvalé, výlučné a převoditelné právo užívat Díla, přičemž Objednatel toto právo přijímá. Výlučností poskytnuté licence se pro účely této Smlouvy rozumí, že Poskytovatel není bez předchozího výslovného písemného souhlasu Objednatele oprávněn Díla užívat, zpřístupnit je jakékoliv třetí osobě nebo jí umožnit jejich užívání, převést licenci nebo jinak umožnit užívání Děl jakékoliv třetí osobě (včetně udělení podlicence), a to jak bezplatně, tak úplatně. Objednatel není však povinen licenci využít. Objednatel však je oprávněn licenci dále poskytnout (udělit podlicenci) či převést licenci na třetí osobu a Poskytovatel se zavazuje bezodkladně na písemnou výzvu Objednatele vyhotovit a předat potřebnou dokumentaci pro udělení licence, případně poskytnout výslovný písemný souhlas pro převod licence z Objednatele na třetí osobu za stejných podmínek jako jsou sjednány v této Smlouvě. Smluvní strany dále výslovně potvrzují, že cena za užívání Děl je po celou dobu jejich životnosti zcela zahrnuta v odměně, a to i při případném převodu Děl na třetí osobu.')),
    num(r('Poskytovatel uděluje Objednateli souhlas se zveřejněním Díla, úpravám, jeho zpracování včetně překladu, spojení s jinými díly či věcmi, se zařazením do díla souborného, jakož i k tomu, aby Objednatel uváděl Díla na veřejnost pod svým jménem nebo toho, kdo vykonává majetková práva k těmto Dílům. Poskytovatel dále uděluje svolení k dokončení jakéhokoli Díla pro případ, že smluvní vztah mezi Objednatelem a Poskytovatelem bude ukončen nebo budou existovat důvodné obavy, že Poskytovatel nedokončí Dílo řádně nebo včas; na takto dokončené Dílo se uplatní pravidla stanovená v této Smlouvě přiměřeně.')),
    num(r('Poskytovatel dále souhlasí s tím, aby při užití jakéhokoliv Díla nebylo uváděno jméno autora a aby Dílo bylo možné používat i pro účely reklamy či marketingu.')),
    num(r('Poskytovatel prohlašuje a zaručuje, že má veškerá povolení a licence, která jsou nezbytná k zhotovování Děl vzniklých v souvislosti s touto Smlouvou, a že tato povolení jsou platná a postačující k tomu, aby mohl zhotovování Děl včas zahájit a řádně a včas dokončit. Dále Poskytovatel prohlašuje, že má ke všem věcem či autorským dílům použitých ke zhotovování Děl výlučné a neomezené vlastnické či autorské právo, popř. mu byla od třetích osob poskytnuta příslušná licenční oprávnění.')),
    num(r('V případě, že v důsledku zhotovování Děl vzniknou jakékoliv předměty průmyslového vlastnictví, včetně vynálezů, ochranných známek, apod. (dále jen „'), rb('Předměty průmyslového vlastnictví'), r('") či jiných výsledků činnosti nesplňujících znaky autorského práva či průmyslových práv, např. algoritmy, metody, apod. (dále jen „'), rb('Jiné výsledky činnosti'), r('"), převádí Poskytovatel veškerá práva k jednotlivým Předmětům průmyslového vlastnictví či k Jiným výsledkům činnosti na Objednatele, a to bez nároku na dodatečnou odměnu (tj. odměna je zahrnuta v odměně) s tím, že Objednatel je oprávněn tyto Předměty průmyslového vlastnictví či Jiné výsledky činnosti neomezeně využívat, modifikovat, sdělovat dalším osobám a používat při vývoji dalších produktů. Poskytovatel je povinen na vznik Děl, které mohou být Předmětem průmyslového vlastnictví, upozornit. Pouze Objednatel je oprávněn podat přihlášku k registraci Předmětů průmyslového vlastnictví k jakémukoli úřadu. Poskytovatel je povinen na žádost Objednatele poskytnout potřebnou součinnost v registračním řízení, pokud bude nutná pro úspěšnou registraci Předmětů průmyslového vlastnictví.')),
    num(r('Objednatel je oprávněn požadovat od Poskytovatele písemné potvrzení pro třetí strany, že jednotlivá Díla, např. představující konkrétní části mobilní hry, vytvořil sám a převedl veškerá majetková práva k těmto plněním na Objednatele. Poskytovatel je povinen vystavit toto potvrzení bez zbytečného odkladu po příslušné žádosti Objednatele. Poskytovatel je na žádost Objednatele zároveň povinen převést na Objednatele bezúplatně a písemnou smlouvou veškeré přihlášené Předměty průmyslového vlastnictví vytvořené v souvislosti s touto Smlouvou.')),
    num(r('V případě, že by jakékoli třetí osoba uplatnila u Objednatele svá práva k jakémukoli z Děl či jeho částí nebo by jakkoli jinak omezila výkon práva Objednatele k užití Díla či jeho části, je Objednatel povinen bez zbytečného odkladu informovat Poskytovatele. Poskytovatel je povinen bez zbytečného odkladu učinit na vlastní náklady potřebná faktická a právní opatření k ochraně Objednatelova práva Díla řádně užít. Při těchto opatřeních je Objednatel povinen poskytnout Poskytovateli potřebnou součinnost.')),

    // ── 6. UTAJENÍ ─────────────────────────────────────────────────────
    secH('UTAJENÍ PODKLADŮ A INFORMACÍ'),
    num(r('Za důvěrné informace se dle této Smlouvy považují bez ohledu na formu jejich zachycení veškeré informace týkající se smluvních vztahů v rámci plnění této Smlouvy (zejména informace o právech a povinnostech Smluvních stran, informace o průběhu plnění), veškeré informace o Smluvních stranách (zejména informace o jejich činnosti, výrobcích, struktuře a hospodářských výsledcích) a veškeré informace, u nichž je právními předpisy stanoven zvláštní režim utajení (zejména obchodní či bankovní tajemství), informace o právech duševního vlastnictví, o marketingové, obchodní, produktové a/nebo podnikatelské strategii, pokud nebyly Smluvní stranou označeny jako veřejné. Veškeré nosiče informací obsahující důvěrné informace je Objednatel povinen považovat za přísně důvěrné a podle toho s nimi nakládat.')),
    num(r('Důvěrné informace jsou výslovně také informace, se kterými Poskytovatel přijde do styku při poskytování služeb klientům Objednatele. Tedy kontaktní údaje na klienty a jeho pracovníky, stav jejich účtů a prodejů, data jejich zákazníků, jejich dodavatele apod. Tyto údaje musí po ukončení této Dohody smazat a nesmí klienty Objednatele jakkoliv kontaktovat, bez vědomí Objednatele.')),
    num(r('Povinnost zachovávat mlčenlivost znamená zejména povinnost zdržet se jakéhokoliv jednání, kterým by důvěrné informace byly jakoukoliv formou sděleny nebo zpřístupněny třetí osobě nebo by byly důvěrné informace využity v rozporu s jejich účelem pro vlastní potřeby nebo potřeby třetí osoby nebo by bylo umožněno třetí osobě jakékoliv využití těchto důvěrných informací, s výjimkou poskytování důvěrných informací třetím osobám, které jsou nezbytné pro výkon činnosti Poskytovatele.')),
    num(r('Smluvní strany se zavazují zachovávat mlčenlivost o důvěrných informacích. Tato povinnost mlčenlivosti trvá až do doby, kdy se informace stanou obecně známými za předpokladu, že se tak nestane porušením povinnosti mlčenlivosti, tedy i po skončení platnosti této smlouvy. Jakékoliv důvěrné informace získané kteroukoliv ze Smluvních stran při plnění předmětu Smlouvy mohou být využity toliko a výlučně pro realizaci předmětu a účelu této Smlouvy.')),
    num(r('Smluvní strany se zavazují zajistit, že i jejich zaměstnanci, pracovníci nebo spolupracující třetí osoby, včetně osob účastnících se práce v orgánech řídících plnění předmětu Smlouvy, budou zachovávat mlčenlivost v rozsahu stanoveném touto Smlouvou.')),
    num(r('Za porušení povinnosti mlčenlivosti se nepovažuje, je-li Smluvní strana povinna důvěrnou informaci sdělit na základě zákonem stanovené povinnosti.')),
    num(r('Každá ze Smluvních stran je povinna uvědomit druhou Smluvní stranu o porušení povinnosti mlčenlivosti bez zbytečného odkladu poté, co se o takovém porušení dozví.')),
    num(r('Poskytovatel se zavazuje, že po dobu trvání této smlouvy nebude poskytovat služby či vyvíjet a nabízet produkty ve stejném oboru podnikání jako Objednatel. Toto ustanovení platí i 12 měsíců po ukončení této Smlouvy, nedohodnou-li se strany jinak.')),

    // ── 7. SANKČNÍ UJEDNÁNÍ ────────────────────────────────────────────
    secH('SANKČNÍ UJEDNÁNÍ'),
    num(r('V případě prodlení Objednatele s placením plateb podle této Smlouvy většího než 14 dnů je Poskytovatel oprávněn přerušit činnost na plnění předmětu Smlouvy, a to do doby uhrazení dlužné částky Objednatelem a Objednatel je povinen uhradit Poskytovateli smluvní pokutu ve výši 0,03 % z dlužné částky za každý den prodlení. O tuto dobu se prodlužuje termín poskytnutí Služeb.')),
    num(r('V případě, že Poskytovatel poskytne, vyzradí nebo použije pro třetí stranu know-how, nebo informace uvedené v čl. 6 této Smlouvy, uhradí Poskytovatel Objednateli smluvní pokutu ve výši 250.000,- Kč (slovy: dvě stě padesát tisíc korun českých), a to za každý jednotlivý případ porušení.')),
    num(r('V případě, že Poskytovatel poruší některou ze svých povinností, jež jsou stanoveny v příloze č. 1 této Smlouvy (Ochrana osobních údajů), zavazuje se zaplatit Objednateli smluvní pokutu ve výši 50.000,- Kč (slovy: padesát tisíc korun českých) za každý jednotlivý případ porušení.')),
    num(r('Poskytovatel respektuje, že Klienti, se kterými přijde do styku, nebo o kterých se dozví, že jde o klienty Objednatele, jsou výlučně klienty Objednatele. Poskytovatel se zavazuje neposkytovat (ani nenabízet) služby Klientovi, a plnit je exkluzivně prostřednictvím Objednatele. A to v průběhu trvání této smlouvy, ani po jejím ukončení. A to jako OSVČ nebo prostřednictvím společnosti, kterou vlastní nebo pro kterou pracuje. V případě porušení tohoto ustanovení se zavazuje zaplatit Objednateli smluvní pokutu ve výši 300.000,- Kč (slovy: tři sta tisíc korun českých) za každý jednotlivý případ porušení. Stejná sankce se uplatní v případě porušení odstavce 8 v kapitole 6 této smlouvy o poskytování konkurenčních služeb.')),
    num(r('Smluvní strany se dohodly na vyloučení aplikace § 2050 Občanského zákoníku, tedy právo Objednatele na náhradu škody není sjednanou smluvní pokutou dotčeno.')),
    num(r('Smluvní pokuty jsou splatné do 5 pracovních dní ode dne doručení písemné výzvy k jejich úhradě.')),

    // ── 8. TRVÁNÍ A PLATNOST ───────────────────────────────────────────
    secH('TRVÁNÍ A PLATNOST SMLOUVY'),
    num(r('Tato Smlouva se uzavírá na dobu neurčitou s výpovědní dobou 1 měsíc.')),
    num(r('Objednatel je oprávněn od této Smlouvy odstoupit ze zákonných důvodů, zejména však v případě, kdy Poskytovatel bezdůvodně přeruší poskytování Služeb a nezahájí je ani po písemné výzvě v přiměřené lhůtě stanovené Objednatelem.')),
    num(r('Poskytovatel je oprávněn od této Smlouvy odstoupit ze zákonných důvodů, zejména pak v případě, že je Objednatel v prodlení s placením faktur větším než 30 dnů nebo jestliže Objednatel nezajistí Poskytovateli podmínky pro řádný výkon jeho činností podle této Smlouvy a tuto skutečnost nenapraví ani po přiměřené lhůtě poskytnuté mu Poskytovatelem písemně.')),
    num(r('V případě ukončení Smlouvy je Poskytovatel povinen předat Objednateli veškerou dokumentaci a pokyny, kterou získal nebo vytvořil při plnění této Smlouvy a informovat jej o stavu provádění plnění. Do 14 dnů od ukončení spolupráce je Poskytovatel povinen smazat veškeré data, dokumenty, podklady, kontaktní údaje od klientů Objednatele.')),

    // ── 9. ZÁVĚREČNÁ UJEDNÁNÍ ──────────────────────────────────────────
    secH('ZÁVĚREČNÁ UJEDNÁNÍ'),
    num(r('Tato Smlouva je zhotovena ve 2 stejnopisech, z nichž každá ze Smluvních stran obdrží po jednom z nich.')),
    num(r('Podpisem této Smlouvy pozbývají platnosti veškerá předcházející písemná či ústní ujednání mezi Smluvními stranami vztahující se k předmětu této Smlouvy.')),
    num(r('Tuto Smlouvu lze změnit pouze písemnými dodatky odsouhlasenými a podepsanými oběma Smluvními stranami.')),
    num(r('V otázkách, které nejsou touto Smlouvou zvlášť upraveny, se postupuje podle obecně závazných předpisů, zejména pak podle Občanského zákoníku.')),
    num(r('Je-li nebo stane-li se některé ustanovení této Smlouvy neplatným či nevykonatelným, nedotkne se tato neplatnost či nevykonatelnost jiných ustanovení této Smlouvy. Smluvní strany se zavazují, v co nejkratší lhůtě nahradit neplatné či nevykonatelné ustanovení jiným ustanovením, které bude platné a vykonatelné a které bude svým obsahem obdobné nahrazovanému neplatnému či nevykonatelnému ustanovení.')),
    num(r('Osobní údaje mohou být mezi smluvními stranami sdíleny a předávány prostřednictvím zabezpečených elektronických systémů (např. e-mail, komunikační platformy jako Slack, nebo úložiště Google Workspace), pokud je to nezbytné pro výkon smluvních povinností. Tyto systémy jsou spravovány v souladu s bezpečnostní politikou společnosti.')),
    plain(r('Příloha č. 1 – Zásady ochrany osobních údajů')),

    // ── SIGNATURE BLOCK ────────────────────────────────────────────────
    blank(),
    new Paragraph({ children: [r('V ……………. dne')], spacing: { after: 80 } }),
    new Paragraph({ children: [r('V ……………. dne')], spacing: { after: 480 } }),
    signatureTable(`za Poskytovatele\n${data.jmeno_prijmeni}`, 'za Objednatele\nMgr. Adam Kurzok'),

    // ── PAGE BREAK → PŘÍLOHA Č. 1 ─────────────────────────────────────
    new Paragraph({ pageBreakBefore: true, spacing: { after: 0 } }),
    new Paragraph({
      children: [new TextRun({ text: 'PŘÍLOHA Č. 1 RÁMCOVÉ SMLOUVY O POSKYTOVÁNÍ SLUŽEB', font: F, size: S, bold: true })],
      alignment: AlignmentType.CENTER,
      spacing: { after: 100 },
    }),
    new Paragraph({
      children: [new TextRun({ text: 'ZÁSADY OCHRANY OSOBNÍCH ÚDAJŮ', font: F, size: S, bold: true })],
      alignment: AlignmentType.CENTER,
      spacing: { after: 360 },
    }),

    // ── GDPR INTRO ─────────────────────────────────────────────────────
    plain(r('V rámci poskytování služeb dle Smlouvy může docházet ke zpracování osobních údajů subjektů údajů definovaných dále. S ohledem na nařízení Evropského parlamentu a Rady (EU) č. 2016/679 o ochraně fyzických osob v souvislosti se zpracováním osobních údajů a o volném pohybu těchto údajů a o zrušení směrnice 95/46/ES (obecné nařízení o ochraně osobních údajů, dále jen „Nařízení") Smluvní strany upravují vztah mezi Objednatelem, jakožto správcem osobních údajů, a Poskytovatelem, jakožto zpracovatelem osobních údajů, a dále v řadě případů též obdobný vztah Smluvních stran, kde Objednatel je zpracovatelem osobních údajů a Poskytovatel dalším zpracovatelem osobních údajů. S ohledem na to, že oba tyto vztahy jsou svým obsahem obdobné, jsou upraveny oba v této Smlouvě, která se vztahuje na oba uvedené vztahy.')),
    plain(r('Poskytovatel se zavazuje pro Objednatele zajistit zpracování osobních údajů za podmínek a dle této Smlouvy a Objednatel tento závazek Poskytovatele přijímá a Poskytovatele zpracováním pověřuje.')),

    annH('Doba trvání zpracování'),
    plain(r('Tato ujednání jsou účinná po dobu trvání této Smlouvy nebo do okamžiku, kdy skončí poskytování Služeb na jejím základě, podle toho, která z těchto okolností nastane později.')),
    plain(r('V případě jakéhokoliv ukončení Smlouvy či ukončení zpracování osobních údajů je Poskytovatel povinen bezodkladně provést likvidaci osobních údajů a jejich kopií, které mu byly poskytnuty na základě této Smlouvy, pokud platný právní řád nestanoví jinak.')),
    plain(r('Stejně tak je Poskytovatel povinen zlikvidovat osobní údaje na základě pokynu Objednatele, případně osobní údaje Objednateli předat a jejich kopie zlikvidovat.')),
    plain(r('Odst. 3.2. tohoto článku výše se nevztahuje na osobní údaje zpracovávané v IT prostředí Objednatele, ve kterém není Poskytovatel oprávněn bez výslovného pokynu Objednatele tyto údaje likvidovat. V případě takto zpracovávaných osobních údajů bude Poskytovateli po skončení zpracování osobních údajů ukončen přístup.')),

    annH('Povaha a účel zpracování'),
    plain(r('Poskytovatel bude zpracovávat osobní údaje za účelem plnění této Smlouvy a Objednávek uzavíraných na jejím základě nebo v souvislosti s ní.')),

    annH('Kategorie subjektů údajů'),
    plain(r('Poskytovatel bude zpracovávat osobní údaje těchto subjektů údajů:')),
    item('zaměstnanců a spolupracovníků Objednatele;'),
    item('zaměstnanců a spolupracovníků subdodavatelů Objednatele;'),
    item('osob spojených se zákazníky Objednatele (zaměstnanci, spolupracující osoby).'),

    annH('Typ osobních údajů'),
    plain(r('Poskytovatel je pro Objednatele oprávněn zpracovávat následující osobní údaje subjektů údajů:')),
    item('identifikační a kontaktní údaje subjektů údajů (jméno, příjmení, e-mail, telefon);'),
    item('přihlašovací údaje a přístupy do informačního systému, tzv. „logy", obsahující časové údaje a obsah vykonávané činnosti v rámci projektu včetně prováděných a plánovaných úkolů (PW, help-desk)'),
    plain(r('(dále jen „Osobní údaje").')),
    plain(r('V případě, že obsahem činnosti vykonávané v rámci této Smlouvy bude zpracování Osobních údajů jiných osob než dle čl. 5. výše nebo jiných Osobních údajů, než jsou ty výslovně uvedené v této Smlouvě, vztahuje se tato Smlouva bezvýjimečně i na tyto osobní údaje.')),

    annH('Práva a povinnosti Smluvních stran v oblasti ochrany osobních údajů'),
    plain(r('Poskytovatel se zavazuje, že dle této Smlouvy:')),
    item('bude zpracovávat Osobní údaje pouze na základě doložených pokynů Objednatele (včetně v otázkách předání Osobních údajů do třetí země nebo mezinárodní organizaci), přičemž pokyny Objednatele mohou vyplývat ze Smlouvy či Objednávek;'),
    item('bude důsledně dodržovat povinnost mlčenlivosti;'),
    item('bude důsledně dodržovat vnitřní předpisy Objednatele, ke kterým tímto přistupuje;'),
    item('přijme opatření požadovaná podle čl. 32 Nařízení;'),
    item('zohlední povahu zpracování, bude Objednateli nápomocen prostřednictvím vhodných technických a organizačních opatření, pokud je to možné, pro splnění Objednatelovo povinnosti reagovat na žádosti o výkon práv subjektu údajů dle Nařízení;'),
    item('bude Objednateli nápomocen při zajišťování souladu s povinnostmi zabezpečení Osobních údajů (čl. 32 až 36 Nařízení);'),
    item('v souladu s rozhodnutím Objednatele všechny Osobní údaje buď vymaže, nebo je vrátí Objednateli po ukončení poskytování služeb spojených se zpracováním a vymaže existující kopie;'),
    item('poskytne Objednateli veškeré informace potřebné k doložení plnění povinností dle Smlouvy a Nařízení, umožní audity, včetně inspekcí, prováděné Objednatelem nebo jiným auditorem, kterého Objednatel pověřil, a k těmto auditům přispěje;'),
    item('ohlásí bez zbytečného odkladu (nejpozději však do 12 hodin) Objednateli jakékoliv porušení zabezpečení Osobních údajů.'),

    annH('Zapojení dalších zpracovatelů'),
    plain(r('V rámci spolupráce Smluvních stran dochází k zapojování jiných zpracovatelů. Tyto jiné zpracovatele však zapojí vždy pouze Objednatel.')),
    plain(r('Poskytovatel nezapojí do zpracování dalšího zpracovatele bez předchozího písemného souhlasu Objednatele.')),
    plain(r('Poskytovatel se zavazuje, že v případě, že se s Objednatelem ve výjimečném případě dohodne na zapojení dalšího zpracovatele, dodrží podmínky pro zapojení dalšího zpracovatele dle čl. 28 odst. 2 a 4 Nařízení.')),

    annH('Povinnosti k zabezpečení Osobních údajů'),
    plain(r('Poskytovatel přijme technická, organizační a jiná opatření, jež zamezí neoprávněnému nebo nahodilému přístupu k Osobním údajům, jejich změně, zničení, ztrátě či jinému neoprávněnému nakládání s nimi. Poskytovatel bude ke zpracovávání Osobních údajů užívat výhradně IT infrastrukturu Objednatele nebo IT infrastrukturu Objednatelem schválenou, která splňuje podmínky Nařízení a je s ním v souladu.')),
    plain(r('Smluvní strany se zavazují vzájemně spolupracovat na naplnění účelu těchto ujednání týkajících se ochrany Osobních údajů, mj. na bezpečném předávání Osobních údajů. Smluvní strany se rovněž zavazují vzájemně informovat o všem podstatném týkajícím se těchto ujednání Smlouvy, zejména o:')),
    item('jakýchkoliv okolnostech, které by mohly mít vliv na ochranu Osobních údajů a nakládání s nimi, tj. zejména o jakékoliv poruše, výpadku, nefunkčnosti či jiném nedostatku opatření přijatých za účelem zajištění takové ochrany, přičemž jsou povinny v úzké součinnosti bezodkladně po zjištění takové okolnosti učinit veškeré kroky a opatření nezbytné k odstranění (resp. k zamezení pokračovaní) takového negativního stavu;'),
    item('jakémkoliv auditu, prověrce či opatřeních prováděných (přijatých) orgánem veřejné moci příslušným pro oblast ochrany osobních údajů.'),

    annH('Odpovědnost'),
    plain(r('V případě, že v souvislosti se zpracováním dle této Smlouvy dojde k zahájení jakéhokoliv řízení, bude hrozit jakákoliv sankce či vznik nebo přiznání jakékoliv újmy, poskytnou si Smluvní strany veškerou součinnost k minimalizaci důsledků pro kteroukoliv Smluvní stranu.')),
  ];

  const doc = new Document({ sections: [{ children }] });
  return Packer.toBuffer(doc);
}
