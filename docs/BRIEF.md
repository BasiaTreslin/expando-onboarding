# 📋 Zadání pro Claude Code
## Welcome page pro nováčka v EXPANDO — Airbnb/Netflix feel

> **Verze 4.5 (FINAL)** — přepracováno podle US Employee Experience best practices (Airbnb, Netflix).
> Hype × Clarity × Pride × Social Bond × Wow Effect × Action.
> **Nové v v4.1:** HR Automation — propojení welcome page s backend automatizací HR checklistu (úspora ~90 min → ~10 min na nováčka).
> **Nové v v4.2:** Finalizovaný onboarding email s přihlašovacími údaji (dual-factor auth: magic link + password), detailní PandaDoc integrace.
> **Nové v v4.3:** Refactor sekcí 3 a 4 podle reálného UX feedbacku — **About You** (akce + benefits + referral) místo HR profile karty, **Your Team** s prostorem pro vlastní představení nováčka.
> **Nové v v4.4:** Vzor smlouvy ŽL dodán a analyzován — kompletní mapování PandaDoc fieldů, validace dependencies, klíčové obchodní podmínky pro nováčka v UI.
> **Nové v v4.5 (FINAL):** Sekce About You finalizována jako **symetrický 3+3 layout** (info dlaždice vlevo, akční dlaždice vpravo), kompletní specifikace všech 3 modálů (Practical Information / Contract / Questionnaire), conditional logika pro ŽL vs HPP, status pill nad kartou. Brief ready for Claude Code handoff.

---

## 🎯 Čeho chceme dosáhnout

Tahle stránka je **první digitální podání ruky** s EXPANDO. Po 10 minutách má nováček cítit:

1. **Hrdost** — „Přidala jsem se k něčemu velkému."
2. **Smysl** — „Chápu, co firma dělá pro svět a jakou roli v tom budu hrát."
3. **Patřičnost** — „Znám ty lidi, mám se na koho těšit."
4. **Jistotu** — „Vím, kam přijít, co si vzít, co mě čeká."
5. **Nadšení** — „Je tam _wow_. Těším se do pondělí."

**Primární emoční cíl:** nadšení a těším se. Každá sekce musí sloužit tomuto cíli.

---

## 🗣️ Tone of Voice (finální)

- **Tykáme.** „Ahoj Barbaro, těšíme se na tebe."
- **Energické, ne korporátní.** Slova jako *dobýváme, hranice, vlajka, posíláme, bouráme*.
- **EXPANDO:** vždy VELKÝMI písmeny, neskloňuje se. „Pracuji v EXPANDO", ne „v Expandu".
- **První osoba množná** („my", „u nás", „v našem týmu") — buduje okamžitou sounáležitost.
- **Čeština default**, EN switcher na přepnutí.

**Anti-pattern (nepoužívat):**
❌ „Vítáme Vás ve společnosti EXPANDO a přejeme Vám úspěšný vstup..."
✅ „Ahoj Barbaro 👋 Za 5 dní startujeme spolu."

---

## 🏢 O EXPANDO (klíčová fakta pro copy)

- Založeno 2016 v Praze (Adam Kurzok & Vojtěch Zogata)
- **Mise:** „We help sellers to grow globally."
- **Šířeji (copy-friendly):** „Nepošíláme jen balíky. Pomáháme lokálním značkám dobývat svět."
- 34 lidí, 6 zemí, 90 agency accounts, ~300 tech accounts
- **Top 20 % Amazon agencies globálně**
- **První produkt prodaný v roce 2016:** Metallica tričko na Amazonu (klient: Metalshop) 🎸
- **Klíčové metriky (pro „Why EXPANDO is cool" sekci):**
  - GMV — kolik naši klienti prodali přes naše služby
  - Active Clients, A-Clients (top tier: avg fee >50k CZK/měsíc)
  - Orders (celkový objem objednávek)
  - Zdroj: [METRICS EXPANDO Notion](https://www.notion.so/8cfc7cb4370d4c818faccb0616f76069) — HR/Data dodá aktuální snapshot

**Hodnoty (v akci):**
1. **Always Interact** — MRO → returnless refunds → lepší Account Health
2. **Innovate with Data** — Intercom + AI support → odpověď <2 min
3. **Do it Simply** — Agency Support SOPs → sjednocený tým
4. **Enjoy the Growth** — Crystal Bohemia → poprvé B2C
5. **Happy Client First** — Institut Katharos → reaktivace v rekordu

**Typy klientů:**
- **Resell (EAN)** — e-shop resellující cizí značky, stovky–tisíce SKU
- **Private Label (UNIQ)** — vlastní značka, desítky SKU, potřebuje listing quality + PPC

---

## 🎨 Brand (oficiální)

Zdroj: [Brand logo manuál EXPANDO](https://www.notion.so/expando/Brand-logo-manu-l-EXPANDO-262ca1a5e1774b9782677644b1d75263)

### Barvy
```css
--expando-orange: #FF4D00;  /* accent — CTA, highlights, links, icons */
--expando-black:  #000000;
--expando-white:  #FFFFFF;

/* derivace */
--expando-orange-hover: #E64400;
--expando-orange-soft:  #FFF1EB;  /* section backgrounds */
--expando-gray-900: #0A0A0A;
--expando-gray-600: #525252;
--expando-gray-200: #E5E5E5;
--expando-gray-50:  #FAFAFA;
```

### Typografie
- **DM Sans** (Google Fonts, `next/font/google`)
- Řezy: 400, 500, 700
- Hero H1: 40px / 72px, bold
- H2: 28px / 44px, bold
- Body: 16px / 18px

### Logo
- SVG varianty: [Google Drive](https://drive.google.com/drive/folders/1bOWdubDz8EQxSYLVGpP7CBiW19VO2Wd1)
- Před použitím: [Brandbook v. 2024](https://drive.google.com/drive/folders/1hXRwnK6M9Vihfm8LvZBBIfcNXi0AbvJr)

### Princip
- Hodně **white space**
- Oranžová **jen jako akcent**, nikdy velké plochy
- **Fotky tváří > stock/ilustrace**
- Jemné scroll-triggered animace (Framer Motion)

---

## 📸 Fotky (v `/assets/photos/`)

| Soubor | Kde | Účel |
|---|---|---|
| `team-courtyard.jpg` | **Hero background** | Autenticita — tým po práci na firemním dvorku |
| `team-laptop.jpg` | Sekce 2 „Our DNA" | Autentický pracovní moment, dvě kolegyně |
| `team-allhands.jpg` | Sekce 5 „Why EXPANDO is cool" | **Na zdi v pozadí jsou plakáty hodnot** — pokud použito, vyzvednout „na zdi je máme vytištěné" |
| `team-portrait.jpg` | Sekce 7 CTA outro | Přátelská lidská tvář na závěr |

**Tech:** WebP + JPG fallback, max 2000px wide, quality 80, `loading="lazy"` vyjma hero. Hero má `fetchpriority="high"`.

---

## 🧩 Struktura stránky (7 sekcí)

Sekce jsou navržené jako **emoční oblouk**:
- 1 (Hype) → 2 (Smysl) → 3 (Lidé) → 4 (Jistota) → 5 (Wow) → 6 (Vize 90 dní) → 7 (Akce)

---

### Sekce 1 — Hero: Hype & Identity

**Emoční cíl:** Hrdost ještě předtím, než zavře stránku.

**Layout:**
- **Full-width foto** `team-courtyard.jpg` s jemným dark overlay (35 % opacity)
- *Video v pozadí odloženo — přidáme později. Zatím statická foto s Ken Burns efektem volitelně.*

**Copy (tykáme, první osoba množná):**

> **H1:** Ahoj Barbaro 👋 Za 5 dní startujeme spolu.
>
> **Podtitul:** Vítej v týmu, který mění pravidla globálního e-commerce.
>
> **Microcopy pod:** V EXPANDO neposíláme jen balíky. Pomáháme lokálním firmám dobývat svět. A teď v tom budeš i ty — jako **Key Account Manager** v **Go-to-Market** týmu.

**Interakce:**
- Decentní oranžová šipka dolů „Pojď dál →" s jemným bounce
- Logo EXPANDO v levém horním rohu (fixed nav, pak sticky při scrollu)

**Co tu NENÍ:**
- Žádný countdown timer (vytváří stres, ne nadšení)
- Žádná profile karta s contract type / start date / buddy info
- Žádný video loop (Fáze 4, zatím statika)

---

### Sekce 2 — Our DNA: Co vlastně děláme (Context)

**Emoční cíl:** „Rozumím, co firma dělá pro svět. Má to smysl."

**Layout:** Interactive Story — **cesta klienta ve 3 krocích**, ne seznam služeb.

**Copy:**

> **H2:** Tohle je naše DNA
>
> Představ si českého výrobce bot. Skvělý produkt, ale prodává jen doma.

**3 karty (stepper):**

1. **🤝 Napojíme ho**
   Registrujeme ho na Amazon, Kaufland, eBay, Allegro. Synchronizujeme produkty přes **EXPANDO APP** — naše vlastní technologii.

2. **🌍 Přeložíme svět**
   Lokalizujeme listingy do 5+ jazyků, řešíme logistiku (FBA/FBM), spouštíme PPC kampaně, staráme se o zákazníky v jejich jazyce.

3. **🚀 A on prorazí**
   Od první objednávky po miliony v obratu. Náš klient **Podpal**: z 0 na **12 000 objednávek za 3 měsíce**, teď je na 9 marketplaces.

**Pod stepperem:**

> **Tvoje role v tom:** Jako **KAM v GTM týmu** jsi ten, kdo rozhoduje, které značky vezmeme na palubu a jak je odpálíme. *(Text se liší podle role — v configu.)*

**Vizuál:**
- Horizontální stepper na desktopu, vertikální na mobilu
- Oranžové connector-line mezi kroky
- Vedle textu `team-laptop.jpg` — autentická ilustrace
- Scroll-triggered reveal (karty naběhnou postupně)

**Dva typy klientů (mini-strip pod stepperem):**
> U nás děláme dva typy cest: **Resell (EAN)** — pomáháme cizím značkám prorazit. **Private Label (UNIQ)** — stavíme vlastní značky.

---

### Sekce 3 — About You (symetrický 3+3 layout) ⭐ FINAL v4.5

> **Co se změnilo v v4.5:** Po designovém review screenshotu finalizován **symetrický 3+3 layout dlaždic**. Levý sloupec = read-only fakta (Role / Team / Start date), pravý sloupec = akční dlaždice (Practical Information / Your Contract / Personal Questionnaire). Status pill „All tasks done!" je nad kartou, ne uvnitř.

**Emoční cíl:** „Vím, kdo jsem v EXPANDO, co mám udělat, a mám klid o praktickém fungování firmy."

**Headline a subhead:**

```
About You

Everything you need to know — and do — before you walk in the door.
```

---

#### 3a) Hlavní karta — Profile + 6 dlaždic (3 read-only + 3 akční)

**Layout (desktop ≥ 768px): 2 sloupce × 3 řádky**

```
┌─ Status pill (top right) ─────────────────────┐
│                       Tasks: 1 of 3 done →    │
└───────────────────────────────────────────────┘

┌─ Hlavní karta s oranžovým top-border ─────────┐
│                                                 │
│  Barbara Třeslínová                  [AM team] │
│  ──────────────────────────────────────────── │
│                                                 │
│  💼 ROLE                  📍 PRACTICAL INFO    │
│  Key Account Manager      Benefits, time off,  │
│                           perks                  │
│                           [Open card →]         │
│                                                 │
│  👥 TEAM                  📄 YOUR CONTRACT     │
│  AM team                  Rámcová smlouva ŽL    │
│                           [Read & sign →]       │
│                                                 │
│  📅 START DATE            ✅ QUESTIONNAIRE      │
│  Friday, 1 May 2026       Basic details for HR  │
│  9:00                     + payroll             │
│                           [Open questionnaire →] │
│                                                 │
└─────────────────────────────────────────────────┘
```

**Layout (mobile < 768px):** všech 6 dlaždic jako 1 sloupec, alternující info/akce. Status pill nad kartou na pravé straně.

#### Designové specifikace dlaždic

**Levé dlaždice (read-only fakta):**
- **Background:** transparentní (žádný fill)
- **Padding:** 14px 0
- **Ikona:** 36×36px, `border-radius: 8px`, background `#FFF1EB` (orange-soft), ikona stroke `#FF4D00`
- **Label:** uppercase, `font-size: 11px`, `color: #525252` (gray-600), `letter-spacing: 0.05em`, `font-weight: 500`
- **Value:** `font-size: 15px`, `font-weight: 500`, `color: #0A0A0A` (gray-900)
- **Hover:** žádný (čistě informační)

**Pravé dlaždice (akční):**
- **Background:** `#FFFAF6` (jemnější odstín orange-soft)
- **Border-radius:** 8px
- **Padding:** 14px (full padding, ne jen vertical)
- **Ikona:** 36×36px, background `#FFE0CF` (sytější orange-soft), stroke `#FF4D00`
- **Label:** uppercase, `font-size: 11px`, `color: #FF4D00` (orange!), `letter-spacing: 0.05em`, `font-weight: 500`
- **Value:** stejné jako levé
- **Link:** „Open card →" / „Read & sign →" / „Open questionnaire →" — `color: #FF4D00`, `font-size: 13px`, `font-weight: 500`, `margin-top: 6px`
- **Hover:** mírný lift (translateY -1px) + border `0.5px solid #FF4D00` opacity 0.3, transition 150ms
- **Cursor:** pointer (celá dlaždice clickable)

**Status pill (nad kartou):**
- **Pozice:** absolute top-right, `margin-bottom: 12px`
- **Stavy:**
  - `0/3` — skrytý (nezobrazuje se vůbec)
  - `1/3`, `2/3` — oranžová: `background: #FFF1EB`, `color: #993C1D`, text `Tasks: 1 of 3 done`
  - `3/3` — zelená: `background: #E6F4EC`, `color: #1D6F44`, text `✓ All tasks done!`
- **Styling:** `padding: 5px 12px`, `border-radius: 999px`, `font-size: 12px`, `font-weight: 500`
- **Animace:** při změně stavu fade + scale 1.05 → 1.0 (200ms)

---

#### 3b) Pravé akční dlaždice — co se otevře po kliknutí

##### 📍 Practical Information (modal/expandable card)

Klik otevře **velký modal** (max-width 720px) s obsahem rozděleným na 4 sub-bloky. Obsah je **statický** v `src/i18n/{cs,en}.json` (z Notion [GI11 Employees](https://www.notion.so/expando/GI11-Employees-11fef12c4f0c8084b242d5f67046c997)).

**Obsah modalu:**

```
┌──────────────────────────────────────────────────┐
│ Practical information                       [×]  │
│ Benefits, time off, and perks at EXPANDO         │
├──────────────────────────────────────────────────┤
│                                                    │
│ 🕐 WORKING HOURS                                  │
│ Work is as flexible as you are. No fixed 9–5.    │
│ Public holidays follow your home country         │
│ (Czech in CZ, Slovak in SK).                     │
│                                                    │
│ ─────────────────────────────────────────────    │
│                                                    │
│ 🏖️ VACATION & SICK DAYS                           │
│ • 25 vacation days per year                      │
│ • 3 sick days per year                            │
│ • Mid-year start = pro-rated                     │
│   (e.g. starting in July = 12.5 days)            │
│ • Roll over up to 5 days into next year          │
│   (max 30 total)                                  │
│ • Approval via Vacation Tracker (login via       │
│   Slack), then add to Google Calendar            │
│                                                    │
│ ─────────────────────────────────────────────    │
│                                                    │
│ 🤒 SICK LEAVE WORKFLOW (HPP only)                │
│ 1. Visit your doctor                              │
│ 2. Doctor issues eNeschopenka → ČSSZ            │
│ 3. You get an identifier (SMS/email)             │
│ 4. Send identifier to Ema Nováková               │
│ 5. First 14 days paid by EXPANDO (60% of avg)    │
│ 6. From day 15, ČSSZ takes over                  │
│                                                    │
│ [conditional pro ŽL: viz níže]                   │
│                                                    │
│ ─────────────────────────────────────────────    │
│                                                    │
│ 🎁 EXTRA PERKS                                    │
│ 🏡 Home office — flexibly with your leader      │
│ 🏋️ MultiSport card — 50% covered by EXPANDO    │
│    (517 Kč instead of 1034 Kč). Apply with      │
│    Ema from day 1.                               │
│ 💸 Payroll by 10th of each month to your        │
│    bank account from the questionnaire           │
│ 🌍 Office in Praha (Karlín) and Havířov          │
│                                                    │
│ ─────────────────────────────────────────────    │
│                                                    │
│ 📌 ONBOARDING TASK (we'll do this on Day 1):     │
│ Log into Vacation Tracker via Slack and ping     │
│ Ema to assign you to the right department.       │
│                                                    │
│ ─────────────────────────────────────────────    │
│                                                    │
│ Need more details? See the full HR handbook in   │
│ Notion → [GI11 Employees]                        │
│                                                    │
└──────────────────────────────────────────────────┘
```

**Conditional pro ŽL** (`contractType === 'ŽL'`):
- Sick leave sekce ukáže místo workflow s eNeschopenkou:
  > *„As an OSVČ, sick leave is your own — covered by your private/voluntary insurance. ČSSZ kicks in only if you pay voluntary sickness insurance. Just let your leader know if you need to take time off."*
- Vacation policy zůstává stejná (ŽL si dovolenou bere stejně, jen není „placená" v zaměstnaneckém slova smyslu — vyfakturuje míň hodin).
- Payroll info → nahradit za:
  > *„Faktury splatné do 7 dní (viz čl. 3.6 smlouvy). Posílej je na fakturace@expan.do v měsíčním cyklu."*

**Technická implementace:**
- shadcn/ui `<Dialog>` s `DialogContent max-w-[720px]`
- Obsah jako React komponenta `<PracticalInfoModal contractType="ŽL" />`
- Tlačítka „Open card" v dlaždici trigger `setOpen(true)`
- Mobile: full-screen sheet (shadcn/ui `<Sheet side="bottom">`)

---

##### 📄 Your Contract (modal s PandaDoc embed)

Klik otevře modal s PandaDoc embed (iframe) nebo redirect na PandaDoc signing URL.

**Stavy karty:**

| Stav | Vizuál | Trigger |
|---|---|---|
| `pending` (default) | Oranžová akční dlaždice s linkem „Read & sign →" | Smlouva čeká na vyplnění questionnaire (předpoklad pro pre-fill ŽL) |
| `ready_to_sign` | Stejná jako pending, ale link mění text na „Sign now →" | Po submit questionnaire backend vygeneroval PandaDoc draft |
| `signing` | Šedá s textem „Adam je na řadě" / „Tvoje řada" | Po Adamově podpisu |
| `completed` | **Zelená pill `✓ Signed`** uvnitř dlaždice + link mění text na „View signed contract →" | Webhook `document.completed` |

**Obsah modalu:**

```
┌──────────────────────────────────────────────────┐
│ Your contract                              [×]    │
│ Rámcová smlouva pro OSVČ (ŽL)                    │
├──────────────────────────────────────────────────┤
│                                                    │
│ KEY TERMS AT A GLANCE                            │
│ • Min. 35 hours/week                             │
│ • Invoice payment within 7 days                  │
│ • 1-month notice period                          │
│ • Non-compete clause: 12 months after end       │
│                                                    │
│ ─────────────────────────────────────────────    │
│                                                    │
│ [PandaDoc embed iframe — 600px height]           │
│                                                    │
│ Or: [Open in PandaDoc tab →]                     │
│                                                    │
└──────────────────────────────────────────────────┘
```

**Pre-condition:** Smlouva se nezobrazí dokud nováček nevyplní questionnaire (potřebujeme IČO + adresu pro pre-fill). Pokud klikne na dlaždici dřív, modal ukáže:

> *„Smlouva ti přijde, jakmile vyplníš osobní dotazník — potřebujeme od tebe IČO a adresu pro pre-fill. Vyplň ho prosím nejdřív →"*
> [Open questionnaire →]

---

##### ✅ Personal Questionnaire (modal s formulářem)

Klik otevře modal se 9–11 poli (počet záleží na `contractType`):

```
┌──────────────────────────────────────────────────┐
│ Personal questionnaire                     [×]    │
│ Basic details for HR + payroll. Takes ~5 min.    │
├──────────────────────────────────────────────────┤
│                                                    │
│ KONTAKTNÍ ÚDAJE                                   │
│ ┌──────────────────────┐ ┌────────────────────┐ │
│ │ Telefonní číslo      │ │ LinkedIn (volit.)  │ │
│ └──────────────────────┘ └────────────────────┘ │
│                                                    │
│ ┌────────────────────────────────────────────┐ │
│ │ Adresa                                       │ │
│ └────────────────────────────────────────────┘ │
│                                                    │
│ PRO TEAM LUNCH & MERCH                            │
│ ┌──────────────┐ ┌──────────────┐ ┌──────────┐ │
│ │ Velikost     │ │ Stravovací   │ │ Alergie  │ │
│ │ trička       │ │ preference   │ │          │ │
│ └──────────────┘ └──────────────┘ └──────────┘ │
│                                                    │
│ ┌──────────────────────┐                         │
│ │ Datum narození       │ (volitelné)             │
│ │ (birthday celebr.)   │                         │
│ └──────────────────────┘                         │
│                                                    │
│ [JEN PRO ŽL: contractType === 'ŽL']              │
│ ŽL — PRO PRE-FILL SMLOUVY                        │
│ ┌──────────────┐ ┌────────────────────────────┐ │
│ │ IČO          │ │ Bank account               │ │
│ └──────────────┘ └────────────────────────────┘ │
│                                                    │
│ ─────────────────────────────────────────────    │
│                                                    │
│ Tvoje data zůstanou jen u Nikol a HR. Slouží    │
│ pro přípravu smlouvy a tvůj první den.           │
│                                                    │
│ [Cancel]                          [Save details] │
│                                                    │
└──────────────────────────────────────────────────┘
```

**Validace:**

| Pole | Validace | Required? |
|---|---|---|
| Telefon | regex `^\+?[0-9 ]{9,15}$` | ✅ |
| Adresa | min 10 znaků | ✅ |
| Velikost trička | enum `S\|M\|L\|XL\|XXL` | ✅ |
| Stravovací preference | text, max 200 | ✅ |
| Alergie | text, max 200 (může být „žádné") | ✅ |
| Datum narození | date picker, max=today | volitelné |
| LinkedIn | URL formát | volitelné |
| **IČO** (jen ŽL) | **8 čísel, validace přes ARES** (volitelně) | ✅ jen pro ŽL |
| **Bank account** (jen ŽL) | český formát `123-456789012/0100` | ✅ jen pro ŽL |

**Akce po submit:**
1. POST `/api/hr/questionnaire/[slug]` → uloží do `new_hire_questionnaire`
2. **Konfety burst** (canvas-confetti, oranžové partikly, 1.5s)
3. Karta přejde do `completed` state — viz níže
4. Email Nikol: *„Barbara vyplnila questionnaire ✅"* s linkem na admin detail
5. **Trigger:** pokud `contractType === 'ŽL'` → spustit `createContractDraft()` na pozadí
6. Karta „Your Contract" automaticky přejde z `pending` → `ready_to_sign` (pollování statusu každých 5s nebo SSE)

**Stavy karty Personal Questionnaire:**

| Stav | Vizuál |
|---|---|
| `pending` (default) | Oranžová akční dlaždice |
| `completed` | **Zelená pill `✓ Completed`** uvnitř dlaždice (viz screenshot, který jsi poslala) + link „Open questionnaire →" se mění na „Edit answers →" |

---

#### 3c) Below-the-fold: Performance review & Referral program

Pod hlavní kartou s dlaždicemi (oddělené `margin-top: 3rem`):

##### 🌱 Performance review & growth (informační karta)

Stejný styl jako Practical info, ale **bez akce** — jen informativní text:

```
🌱 Jak u nás rosteš

V EXPANDO máme strukturovaný přístup k růstu — ne jen plat
do tabulky, ale skutečnou cestu.

• Měsíčně 1:1 se svým leaderem
• Kvartálně check-in nad OKRs
• 90-day review po nástupu
• Roční performance review

Zaměřujeme se na 3 osy: dovednosti, ownership, přínos týmu.

[Read more in Notion →]   (link TBD od HR)
```

##### 💥 Referral program (zelená karta)

Vizuálně odlišená od oranžových (zelený akcent — pozitivnost):

```
💥 Referral program

Až se rozkoukáš a najdeš někoho, kdo by k nám pasoval,
dej nám vědět! Hledáme A+ lidi, kteří zvednou laťku.

🎁 Bonus za referral:
• 10 000 Kč po 3 měsících jeho práce
• + 20 000 Kč po 6 měsících
  (= celkem 30 000 Kč za úspěšný hire)

Bonus je proporcionální FTE — 0,5 FTE = 50 % částky.

[Více v Notion →]   [Vyplnit referral →]
```

Linky:
- „Více v Notion" → [Referral program](https://www.notion.so/expando/Referral-program-1a7ef12c4f0c81aeb4eef945a22697b7)
- „Vyplnit referral" → [Google Form](https://forms.gle/uicEVkVwuMppEu7N9)

##### 📞 Kontakty pro praktické věci

Drobný blok dole (bez karty, jen 4 řádky):

```
HR a HR otázky        →  Ema Nováková (ema.novakova@expan.do)
MultiSport karta      →  Ema Nováková
IT / přístupy         →  IT team (#it-help v Slacku)
Cokoli dalšího        →  Tvůj buddy nebo leader (viz Your Team níže)
```

---

#### 3d) Technické detaily pro Claude Code

**Komponentní struktura:**

```tsx
// src/components/sections/about-you/AboutYouSection.tsx
<AboutYouSection>
  <StatusPill status={tasksStatus} />  {/* nad kartou */}

  <ProfileCard>
    <ProfileHeader name={config.fullName} team={config.team} />
    <Divider />
    <TilesGrid>
      {/* Levý sloupec — info */}
      <InfoTile icon={BriefcaseIcon} label="Role" value={config.role} />
      <InfoTile icon={UsersIcon} label="Team" value={config.team} />
      <InfoTile icon={CalendarIcon} label="Start date" value={formatDate(config.startDate)} />

      {/* Pravý sloupec — akce */}
      <ActionTile
        icon={MapPinIcon}
        label="Practical information"
        description="Benefits, time off, perks"
        onClick={() => setPracticalInfoOpen(true)}
        completed={false}
      />
      <ActionTile
        icon={FileTextIcon}
        label="Your contract"
        description={contractDescription}
        onClick={() => setContractOpen(true)}
        completed={contractStatus === 'completed'}
        disabled={contractStatus === 'pending'} // nelze otevřít před questionnaire
      />
      <ActionTile
        icon={CheckCircleIcon}
        label="Personal questionnaire"
        description="Basic details for HR + payroll"
        onClick={() => setQuestionnaireOpen(true)}
        completed={questionnaireStatus === 'completed'}
      />
    </TilesGrid>
  </ProfileCard>

  <PerformanceReviewCard />
  <ReferralProgramCard />
  <ContactsBlock />

  {/* Modaly */}
  <PracticalInfoModal open={practicalInfoOpen} onClose={...} contractType={config.contractType} />
  <ContractModal open={contractOpen} onClose={...} pandadocId={contractId} />
  <QuestionnaireModal open={questionnaireOpen} onClose={...} onSubmit={handleQuestionnaireSubmit} />
</AboutYouSection>
```

**State management:**
- Tasks status: `useTasksStatus()` hook — fetchne `/api/hr/tasks/[slug]` každých 5s při otevřené stránce nebo při zavření modalu
- LocalStorage cache pro UX (instant rendering on revisit), server jako source of truth
- `tasksStatus` derived: `{ contract: 'completed', questionnaire: 'pending' | 'completed', practicalInfo: 'viewed' | null }`
  - Pozn: `practicalInfo` se nezapočítává do `done count` — je to jen reference, ne task. **Done count = pouze `contract + questionnaire = 2 tasky`.**
  - Korekce textu pillu: `Tasks: 1 of 2 done` → `✓ All tasks done!` (1/2 → 2/2)

**Pozn k počtu tasků:**
Měli jsme původně 3 tasky (smlouva, dotazník, bulletin). V tomto layoutu jsem **odstranila task „Přečti si bulletin"** — bulletin patří spíš do sekce „Něž přijdeš" (Sekce 7 CTA). Practical Information není task (nemůže být „incomplete"). **Reálné tasky = 2: Contract + Questionnaire.**

Pokud chceš zachovat 3 tasky, můžeme „Read the bulletin" přidat jako 7. dlaždici pod hlavní kartu, nebo nahradit referral kartu. Default brief drží 2 tasky.

**API endpoints (nové):**

```
GET  /api/hr/tasks/[slug]           → { contract: {...}, questionnaire: {...} }
POST /api/hr/questionnaire/[slug]   → uložit dotazník + trigger contract
GET  /api/hr/contract/[slug]        → status + PandaDoc URL
```

**Schéma DB (rozšíření existujícího `onboarding_tasks`):**

Žádné změny — `task_type IN ('pandadoc_contract', 'questionnaire')` je už v existujícím schématu.

---
### Sekce 4 — Your Team (lidé)

> **Co se změnilo:** Přejmenováno z „Meet the Tribe" / „Your leader & buddy" na **„Your Team"**. Sekce „Say hi" s pre-filled textem byla **odstraněna** a nahrazena strukturovaným formulářem **„Introduce yourself"** se 2 konkrétními otázkami.

**Emoční cíl:** „Znám ty lidi. Nejsou to cizinci. Těším se."

Tohle je **srdce stránky**. Research: welcome pages with team faces drive 2× engagement.

**Headline:**
```
Your Team

Tady jsou lidi, se kterými budeš pracovat. Jsou na tebe nachystaní.
```

**4 sub-bloky:**

#### 4a) Founders (hero cards)

Stejný layout jako v3 — 2 velké karty zakladatelů:

```
[FOTO Adam]                  [FOTO Vojtěch]
Adam Kurzok                  Vojtěch Zogata
Co-founder & CEO             Co-founder & COO

"Nápad na EXPANDO přišel     "Nejlepší rozhodnutí?
v Londýně. 10 let později    Když klient vyhraje,
jsme tu."                    vyhráváme všichni."
```

**Microcopy nad:** *Tohle jsou Adam a Vojta. V roce 2016 založili EXPANDO v Praze — a po 10 letech jsme top 20 % Amazon agentur globálně.*

#### 4b) Your leader & buddy (KLÍČOVÉ — personalized)

**Layout přesně podle screenshotu, který jsi poslala** — 2 karty side-by-side:

```
┌────────────────────────┐  ┌────────────────────────┐
│ [⚪ FOTO]               │  │ [⚪ FOTO]               │
│                         │  │                         │
│ YOUR LEADER             │  │ YOUR BUDDY              │
│ Lukáš Doskočil          │  │ Jakub Žemlička          │
│ Head of Agency          │  │ Key Account Manager     │
│                         │  │                         │
│ 💬 Say hi on Slack →    │  │ 💬 Say hi on Slack →    │
└────────────────────────┘  └────────────────────────┘
```

**Slack deep-link button** (`💬 Say hi on Slack`):
- Klik → otevře Slack DM s leaderem/buddym
- URL: `slack://user?team=T...&id=U...` (HR dodá Slack user IDs do configu)
- Fallback: pokud Slack není nainstalován, otevře web Slack v novém tabu

**Co tady NENÍ** *(odstraněno oproti screenshotu):*
- ❌ Sekce „Say hi" s pre-filled message a tabama „Message your buddy / Message your leader"
- Důvod: nováček by měl pozdravit **autenticky vlastními slovy**, ne kopírovat firemní template. Místo toho v sub-bloku 4d (Introduce yourself) dostane prostor říct něco o sobě.

#### 4c) Zbytek týmu

Grid malých kruhových avatarů (foto + jméno + role + 1 hobby ikona):

```
[Honza]  [Klára]  [Míra]  [Ester]  [...]
GTM       AM       CS      Data
🐕        🏄        🎸      ☕
```

**Filter:** taby nahoře — „Všichni / GTM / AM / CS / Data / Ops"

**Hover efekt:** karty mírně škálují (1.05) + drobný tilt → člověk „reaguje" když na něj ukážeš.

**Data zdroj:** `src/data/team.json` — HR edituje přímo v Gitu (nebo přes admin UI ve Fázi 3). Když fotka chybí → iniciály v oranžovém kolečku.

---

#### 4d) Introduce yourself ⭐ NOVÁ SEKCE

> **Nahrazuje:** Původní „Say hi" sekci s pre-filled textem („Hi Jakub Žemlička, I'm Barbara, starting 1 May 2026...").
>
> **Proč:** Pre-filled text vypadá jako spam, ne jako autentický pozdrav. Místo toho dáme nováčkovi **strukturovaný formulář** se 2 konkrétními otázkami — stejný UX jako „Personal questionnaire" v sekci About You (Task 2).

**Layout (jako questionnaire — stejný komponentní styl):**

```
┌──────────────────────────────────────────────────────────┐
│ ✏️ Introduce yourself                                      │
│                                                            │
│ Než přijdeš, řekni nám pár vět o sobě. Tým si tě tak    │
│ může poznat dřív, než tě potká naživo.                    │
│                                                            │
│ ┌──────────────────────────────────────────────────────┐ │
│ │ Tvoje jméno                                           │ │
│ │ ┌──────────────────────────────────────────────────┐ │ │
│ │ │ Barbara Třeslínová                                │ │ │
│ │ │ (pre-filled, read-only)                           │ │ │
│ │ └──────────────────────────────────────────────────┘ │ │
│ └──────────────────────────────────────────────────────┘ │
│                                                            │
│ ┌──────────────────────────────────────────────────────┐ │
│ │ 1. Proč ses rozhodl/a pro EXPANDO?                   │ │
│ │ ┌──────────────────────────────────────────────────┐ │ │
│ │ │                                                    │ │ │
│ │ │ [textarea, 3 řádky, placeholder:                  │ │ │
│ │ │  „Co tě na nás zaujalo, co tě sem přivádí..."]   │ │ │
│ │ │                                                    │ │ │
│ │ └──────────────────────────────────────────────────┘ │ │
│ └──────────────────────────────────────────────────────┘ │
│                                                            │
│ ┌──────────────────────────────────────────────────────┐ │
│ │ 2. Řekni nám o sobě nějaký fun fact 🎉               │ │
│ │ ┌──────────────────────────────────────────────────┐ │ │
│ │ │                                                    │ │ │
│ │ │ [textarea, 2 řádky, placeholder:                  │ │ │
│ │ │  „Něco neobvyklého — koníček, dovednost,          │ │ │
│ │ │   příhoda, na kterou jsi pyšný/á..."]             │ │ │
│ │ │                                                    │ │ │
│ │ └──────────────────────────────────────────────────┘ │ │
│ └──────────────────────────────────────────────────────┘ │
│                                                            │
│ [✓ Save & share with the team]                            │
│                                                            │
│ ─────────────────────────────────────────                 │
│ Co se s tím stane?                                        │
│ Tvoje odpovědi dostane Nikol (tvoje buddy) jako prep     │
│ info — pomůže nám ho hodit na #general v den nástupu.    │
└──────────────────────────────────────────────────────────┘
```

**Pole formuláře:**

| # | Pole | Typ | Validace | Placeholder |
|---|---|---|---|---|
| 1 | `fullName` | input, read-only | pre-filled z `config.fullName` | — |
| 2 | `whyExpando` | textarea (3 řádky) | required, min 20 znaků, max 500 | „Co tě na nás zaujalo, co tě sem přivádí…" |
| 3 | `funFact` | textarea (2 řádky) | required, min 10 znaků, max 300 | „Něco neobvyklého — koníček, dovednost, příhoda, na kterou jsi pyšný/á…" |

**Stejný komponentní styl jako questionnaire v Task 2:**
- Bílá karta s lehkým stínem (`shadow-sm`)
- Oranžový top-border accent (1px `#FF4D00`)
- Labels DM Sans 14px medium, šedá `#525252`
- Inputy s rounded-md (8px), border `#E5E5E5`, focus ring oranžový
- CTA button v oranžové (`#FF4D00`), hover `#E64400`

**Co se stane po submitu:**

1. POST `/api/hr/introduction/[slug]` → uloží do DB
2. Pošle email Nikol s odpověďmi:

```
Subject: Barbara se představila ✨

Ahoj Nikol,

Barbara Třeslínová vyplnila své představení pro Day 1.
Tady jsou její odpovědi:

📌 Proč ses rozhodla pro EXPANDO?
[whyExpando text]

🎉 Fun fact:
[funFact text]

— Welcome page
```

3. Karta na welcome page přejde do **success state**:

```
┌──────────────────────────────────────────────────────────┐
│ ✅ Skvělé!                                                 │
│                                                            │
│ Tvoje odpovědi máme. Nikol je dostala a první den je    │
│ s tebou hodíme na #general — ať tě tým pozná.            │
│                                                            │
│ [Edit answers →]   (možnost upravit do startu)            │
└──────────────────────────────────────────────────────────┘
```

**UX detaily:**
- LocalStorage persist (kdyby se nováček vrátil — nepřijde o text)
- Po submit zobraz success state, ale necháme možnost **Edit answers** (do start date)
- Po prvním submit → drobné konfety (jako u questionnaire)
- Validace inline pod inputem (red text, ne alert)
- Save button disabled dokud nejsou obě otázky vyplněné

**Schéma databáze:** Pole `why_expando`, `fun_fact`, `introduction_submitted_at`, `introduction_emailed_to_buddy_at` jsou součástí tabulky `new_hire_questionnaire` (viz HR Automation sekce → Storage).

**Pozn:** Otevřená otázka „auto-post na #general vs. lidská kurace přes Nikol" — držíme se **lidské kurace** (Nikol dostane email, ne auto-post). Pokud bys to chtěla později změnit na auto-post, dá se přidat jednoduchý check `autoPostToSlack: true` do configu nováčka.

---

### Sekce 5 — Road to Day 1 (původní „Sekce 4")

**Pozn:** Tato sekce zůstává, jen se posunula v pořadí. Praktické info (parkování, dress code, oběd) zůstává tak jak bylo, protože se týká **prvního dne specificky** (kdežto dovolená/sick days/perks jsou v About You jako trvalý fakt).

**Emoční cíl:** „Vím přesně, co mě čeká první den. Žádné překvapení."

#### 5a) Tvůj první den — timeline

Vertikální stepper s časy (konzistentní mobile + desktop):

```
🕘 9:00   Káva a icebreaker          Operations
🕤 9:30   Jak získáváme klienty      Sales/GTM
🕥 10:15  První kroky s klientem     KAM
🕦 11:00  Strategie & OKRs           Senior KAM
🍽️ 12:00  Oběd s týmem               (u nás chodí všichni společně)
🕐 13:00  Customer Success           CS leader
🕑 13:45  Reporting & analytics      Data team
🕓 14:30  Setup tvých nástrojů       Ops + buddy
🕕 16:00  Jak to šlo? Feedback
```

**Mini-task pod:**
> 👀 *Malý úkol pro tebe: Všimni si během dne jednoho momentu, který tě překvapí z pohledu klienta. Na konci dne si to rozebereme.*

#### 5b) Praktické info pro Day 1 — Drop-down karty

Grid 2×3 (mobile 1×6), každá karta clickable/expandable:

**📍 Jak k nám dorazit**
*EXPANDO HQ, Praha (Karlín). Patro, Google Maps embed. MHD zastávka X, pěšky 3 min.*

**🚗 Parkování**
*Firemní parking na dvoře (řekni na recepci) nebo modrá zóna v okolí.*

**👕 Jak se obléct**
*Business casual. Mikina a sneakers jsou v pohodě. Klientské meetingy o level výš — buddy ti řekne.*

**🎒 Co si vzít**
*Laptop dostaneš od nás. Přines si jen dobrou náladu a něco na psaní.*

**☕ Káva & oběd**
*V kuchyňce espresso, čaje, ovoce, Mattoni. Obědy většinou společně — kolem kanclu je [Dvorek / Manifesto / ...].*

**📞 Když budeš potřebovat něco vyřešit ráno**
*Ema (HR) je na ema.novakova@expan.do, buddy v Slacku, leader taky.*

---

### Sekce 5 — Why EXPANDO is Cool: Tech & Progress (Wow Effect)

**Emoční cíl:** „Tohle není bahno. Tady se děje něco moderního."

**Tři sub-bloky:**

#### 5a) Milníky (live metrics feel)

3–4 big-number statsy s oranžovým akcentem. Počty dodává Data team (config aktualizovatelný).

```
  €75M+         300+              6                34
  GMV         clients on      countries          people
  YTD        our tech platform   worldwide      (and growing)
```

**Microcopy nad:** *Takhle jsme na tom právě teď.*
**Počítadla s count-up animací** při scrollu do view.

**Optional carousel „tohle se stalo nedávno":**
- *„Tento měsíc jsme expandovali do [země]."*
- *„Naše APP zpracovala miliontou objednávku."*
- *(HR/Data dodá aktuální zprávy; v config jako `recentMilestones: [...]`, pokud prázdné, blok se skryje.)*

#### 5b) Tech Stack (loga, ne seznam)

Row loga nástrojů, které reálně používáme:
- **Amazon Seller Central, Kaufland, eBay, Allegro** — marketplaces
- **EXPANDO APP** — naše vlastní tech
- **Looker Studio** — reporting
- **Intercom + AI** — customer support
- **Slack, ClickUp, Notion** — interně
- **Pipedrive** — CRM (pro GTM)

Grayscale loga, na hover color + jemný tooltip *„k čemu to je"*.

**Microcopy:** *Na tohle se budeš dívat každý den. Setup Day 1.*

#### 5c) Kultura v 1 větě

Velký oranžový pullquote style:

> **„Nefungujeme na schvalování, ale na zodpovědnosti."**

Drobný podtext: *U nás má každý prostor rozhodovat o své hromádce. Kontrolu si děláme navzájem přes výsledky, ne přes mikro-management.*

**Vizuál (Sekce 5):** background volitelně `team-allhands.jpg` s strong overlay, protože v pozadí jsou **plakáty hodnot na zdi**.

---

### Sekce 6 — Tvých 90 dní (v kostce)

**Emoční cíl:** „Mám směr, vím kam směřuju, ale nepřetěžuje mě to."

Podle dohody: **3 karty s vizí**, bez týdenních tasků. Detaily dodá Slackbot/agent od Day 1.

```
┌─────────────────┬─────────────────┬─────────────────┐
│ 📚 Měsíc 1      │ 🚀 Měsíc 2      │ 🏆 Měsíc 3      │
│ Učím se         │ Přispívám       │ Vedu svoje      │
│ a nasávám       │ a rostu         │                 │
├─────────────────┼─────────────────┼─────────────────┤
│ Cíl:            │ Cíl:            │ Cíl:            │
│ Zorientovat se, │ Dělat věci      │ Plná autonomie, │
│ poznat lidi,    │ samostatně,     │ první vlastní   │
│ pochopit        │ první vlastní   │ úspěchy         │
│ klienta         │ zodpovědnosti   │                 │
│                 │                 │                 │
│ Čemu budeš      │ Čemu budeš      │ Čemu budeš      │
│ rozumět:        │ rozumět:        │ rozumět:        │
│ • Typ klienta   │ • Hloubka role  │ • Dlouhodobý    │
│ • Marketplaces  │ • Tvůj segment  │   růst v role   │
│ • Kdo je kdo    │                 │                 │
│                 │                 │                 │
│ Kdo tě provází: │ Check-iny:      │ Checkpoint:     │
│ Nikol + Dana    │ 1×/týden s Danou│ 90-day review   │
└─────────────────┴─────────────────┴─────────────────┘
```

**Pod kartami:**
> *Detailní týdenní plán ti bude posílat Slackbot od prvního dne. Tady je jen mapa. 🗺️*

---

### Sekce 7 — Call to Action: Engagement (před startem)

**Emoční cíl:** „Nejenom čtu, dělám. Už teď jsem součástí."

**Copy:**

> **H2:** Než přijdeš, zkus tohle 👇

**3 akční karty (checkboxy, localStorage persist):**

**☑️ Napiš buddymu**
*Klikni sem a pozdrav Nikol na Slacku. Neboj, ona už o tobě ví.*
[→ Napiš na Slack]

**☑️ Pošli 3 zajímavosti o sobě do #general**
*Až se připojíš, pošli krátkou představovačku do našeho Slack kanálu #general. Fun fact o tobě, koníček, a co tě přivádí k EXPANDO.*
[Copy template text →]

**☑️ Podívej se, jak u nás žijeme**
*Náš Instagram a LinkedIn ukazují, co se u nás děje.*
[📸 Instagram] [💼 LinkedIn]

**Drobné volitelné:**
**🎨 Stáhni si wallpaper EXPANDO** (nezávazné)

---

### 🎉 Surprise & Delight (zapracováno)

Podle tvého výběru jsme do stránky dostali 3 drobnosti:

#### 🎊 Konfety při dokončení checklistu (Sekce 7)
Když nováček odškrtne všechny 3 akce → `canvas-confetti` burst s oranžovými partikly + krátké hlášení *„Parádo, jsi připravená!"* ve středu obrazovky na 2 sekundy.

#### 🤫 Easter egg — Hidden code na oběd
Malý nenápadný prvek dole na stránce (např. tečka vedle „Team EXPANDO" podpisu, nebo kliknutí 3× na emoji 🎸 u Metallica reference v Sekci 2). Otevře malý modal:

> **🍕 You found it!**
>
> Ukaž tohle Nikol první den a oběd jde na ni.
>
> Kód: `EXP-WELCOME-2026`

Buddy dostane seznam aktivních kódů v interním docu, aby věděl o čem nováček mluví. Tohle je **low-effort high-delight** prvek.

#### ✨ Hover efekty na kartách týmu (Sekce 3c)
Jemný scale 1.05 + tilt při hover na avatarech — každý člen „reaguje" když na něj ukážeš.

---

## 📐 Wireframe v kostce

```
┌────────────────────────────────────────┐
│ [HERO] full-bleed foto + H1 + CTA ↓    │ ← Hype
├────────────────────────────────────────┤
│ [OUR DNA] 3-step client journey        │ ← Smysl
│           + fotka team-laptop          │
├────────────────────────────────────────┤
│ [ABOUT YOU] symetrický 3+3 layout      │ ← Akce + jistota
│   ┌─────────────┬──────────────────┐   │
│   │ Role        │ Practical info → │   │
│   │ Team        │ Your contract  → │   │
│   │ Start date  │ Questionnaire  → │   │
│   └─────────────┴──────────────────┘   │
│   + Performance review (info)          │
│   + Referral program (zelená karta)    │
│   + Kontakty (Ema, IT, buddy)          │
├────────────────────────────────────────┤
│ [ABOUT YOUR TEAM]                      │ ← Social bond
│   - Founders (Adam + Vojta)            │   (SRDCE)
│   - Your leader & buddy (+Slack DM)    │
│   - Zbytek týmu (grid avatarů)         │
│   - Introduce yourself (textarea)      │
├────────────────────────────────────────┤
│ [ROAD TO DAY 1]                        │ ← Jistota Day 1
│   - Timeline prvního dne               │
│   - Praktické info (parking, dress...) │
├────────────────────────────────────────┤
│ [WHY EXPANDO IS COOL]                  │ ← Wow
│   - Milníky (stats + ticker)           │
│   - Tech stack (loga)                  │
│   - Pullquote kultury                  │
├────────────────────────────────────────┤
│ [90 DAYS] 3 karty vize                 │ ← Mapa
├────────────────────────────────────────┤
│ [CTA] 3 akční checkboxy → konfety      │ ← Akce
├────────────────────────────────────────┤
│ [OUTRO] foto + Team EXPANDO + socials  │ ← Těšení
└────────────────────────────────────────┘
```

**Pozn:** Sekce 6–10 (Why EXPANDO is cool, 90 days, CTA, Outro) si v briefu zachovávají původní číslování (5, 6, 7) — refactor přejmenoval sekce 3 a 4, takže následující jen posouvají pořadí o jedna. Pro Claude Code je důležité **logické pořadí ve wireframe výše**, ne číslování.

---

## 🤖 HR Automation: Checklist „Before First Day"

Tahle sekce řeší, **co všechno dnes ručně odbavuje Nikol** před každým nástupem, a jak to napojit na aplikaci tak, aby se většina udělala sama.

### Výchozí stav (co teď dělá Nikol ručně)

Aktuální HR checklist v Notion (ownership: Nikol Černá):

1. Personal questionnaire is sent
2. Candidate Folder on EXPANDO Disk je vytvořená → `Zaměstnanci EXPANDO` + `01_HR_ÚVAZKY` (folder podle typu úvazku: HPP/DPČ/DPP, nebo ŽL)
3. Accesses are created — email (group `all.praha` + relevant groups), Slack, ZOHO, Notion, EXPANDO Shared Disk, ClickUp, EXPANDO home/people, Trello/Missive (only some positions)
4. Onboarding email is sent (link na welcome page + přihlašovací údaje + ŽL info pro fakturace pokud contractor)
5. Entry documents are sent (podepsané Adamem nebo Dominikem, onsite nebo online via PandaDoc)

**Problém:** Nikol tohle dělá před každým nástupem ručně. Čas: ~90 minut na nováčka. Riziko: zapomenuté přístupy, pozdě odeslaný questionnaire, inkonzistence.

---

### 🎯 Cíl automatizace

**Minimalizovat manuální práci Nikol** na 2 věci:
1. Založit nováčka v admin UI (3–5 polí: jméno, email, start date, typ úvazku, tým, role, buddy, leader)
2. Zkontrolovat že všechno proběhlo (green dashboard)

Vše ostatní (tvorba složek, rozesílání emailů, collection dat od nováčka) musí jet automaticky.

---

### 📊 Co automatizovat vs. co nechat ručně

| # | Task | Automatizace | Kde to žije | Priorita |
|---|---|---|---|---|
| 1 | Personal questionnaire | ✅ **Plně automat** — formulář v aplikaci, nováček vyplní sám na welcome page | Sekce 7 aplikace + Notion DB | 🔴 MVP |
| 2 | Candidate folder v Google Drive | ✅ **Plně automat** — Google Drive API, šablona composed z typu úvazku | Backend (n8n/Make/API route) | 🟡 Fáze 2 |
| 3a | Email access (`all.praha` group) | ⚠️ **Polo-automat** — Google Workspace Admin SDK to umí, ale je potřeba domain-wide delegation; MVP: link do Admin konzole + pre-fill | Backend + IT owner | 🟡 Fáze 2 |
| 3b | Slack invite | ✅ **Plně automat** — Slack API `admin.users.invite` | Backend | 🔴 MVP |
| 3c | Notion access | ⚠️ **Polo-automat** — Notion API pozve uživatele do workspace, ale přiřazení do teams je manuální | Backend | 🟡 Fáze 2 |
| 3d | ZOHO, ClickUp, Missive, Trello | ❌ **Manuální** — API existují ale různá úroveň komplikace; v MVP generovat „To-do list pro Nikol" s 1-klik linky do admin panelů | Notification v admin UI | 🟢 Fáze 3 |
| 3e | EXPANDO home/people profil | ⚠️ **Polo-automat** — pokud je to vlastní app, potřeba endpoint; jinak manuál | Backend | 🟡 Fáze 2 |
| 3f | Google Drive sdílení složek | ✅ **Plně automat** — stejná API jako #2 | Backend | 🟡 Fáze 2 |
| 4 | Onboarding email | ✅ **Plně automat** — ale toto je **právě tahle welcome page!** Místo emailu pošleme magic link na personalizovanou stránku | Aplikace (existing) | 🔴 MVP |
| 5 | Entry documents (PandaDoc) | ⚠️ **Polo-automat** — PandaDoc API pre-fill šablony podle `contractType` + auto-send k podpisu. **Vzor smlouvy TBD (doplní HR z Drive)**. Signatáři (Adam/Dominik) podepíší v PandaDoc. | Backend + PandaDoc API | 🟡 Fáze 2 |

**Legenda:**
- ✅ **Plně automat** — bez Nikol zásahu
- ⚠️ **Polo-automat** — Nikol jen schvaluje / klikne 1×
- ❌ **Manuální** — generujeme jí checklist s linky, ale klikne sama

---

### 🏗️ Architektura (co postavit)

Doporučené řešení: **Next.js API routes + background job queue (Vercel Cron / Upstash QStash)**, backend interaguje s externími API (Google, Slack, Notion, PandaDoc).

**Proč ne n8n/Make:**
- Už používáte (Magic Box přes Composio, n8n on-prem), ale pro tohle je lepší vše držet v Next.js repu — jeden deploy, verze v Gitu, konzistentní typy (shared TypeScript types mezi welcome page a HR backend).
- n8n/Make se hodí na ad-hoc workflows mezi aplikacemi třetích stran, kde nechcete psát kód. Tady ale máme custom business logiku (rozhodování o úvazku, pre-fill šablony) — v kódu je to transparentnější a snáz testovatelné.
- **Fallback:** pokud budete chtít konkrétní flow rychle změnit bez deployů (např. přidat nový tool do accessů), můžete **z Next.js API route zavolat n8n webhook** a flow v n8n dále řešit. Best of both worlds.

**Komponenty:**

```
┌─────────────────────────────────────────────────────────┐
│ ADMIN UI (/admin/new-hire)                              │
│ - Formulář: jméno, email, start date, typ úvazku, role │
│ - Seznam pending/completed nováčků (status dashboard)  │
│ - 1-click „Spusť onboarding" → trigger workflow        │
└──────────────────┬──────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────┐
│ NEXT.JS API ROUTE: /api/hr/new-hire/create              │
│ 1. Validuje vstup                                        │
│ 2. Vytvoří config soubor (nebo DB record)                │
│ 3. Wygeneruje magic link                                 │
│ 4. Zařadí tasky do queue (QStash/Vercel Cron)            │
└──────────────────┬──────────────────────────────────────┘
                   │
         ┌─────────┼────────┬────────┬────────┬────────┐
         ▼         ▼        ▼        ▼        ▼        ▼
     ┌────────┐┌───────┐┌──────┐┌──────┐┌───────┐┌─────────┐
     │ Drive  ││ Slack ││Notion││ZOHO? ││PandaDc││ Resend  │
     │ folder ││invite ││ invt ││(TBD) ││ draft ││ (email) │
     └────────┘└───────┘└──────┘└──────┘└───────┘└─────────┘
                   │
                   ▼
            ┌──────────────┐
            │ STATUS UPDATE │
            │ (webhook → DB)│
            └──────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────┐
│ ADMIN DASHBOARD (Nikol vidí)                            │
│ ✅ Drive folder created                                  │
│ ✅ Slack invited                                         │
│ ⏳ Notion workspace — pending                            │
│ ❌ PandaDoc — chyba, klikni pro detail                   │
└─────────────────────────────────────────────────────────┘
```

---

### 🧱 Storage / Database

**Doporučení: lehký DB layer (Supabase nebo Vercel Postgres)** místo čistě config souborů pro HR data.

Proč: HR dashboard potřebuje persist state tasků (co je done / pending / failed), audit log kdo kdy co spustil, a řízení přístupů (Nikol vidí všechno, team leader jen svůj tým).

**Schéma (minimální):**

```sql
-- Nováček jako entita
new_hires (
  id uuid PRIMARY KEY,
  slug text UNIQUE,                     -- barbara-treslinova
  first_name text,
  last_name text,
  personal_email text,
  start_date date,
  contract_type text,                   -- HPP/DPČ/DPP/ŽL
  team text,                            -- GTM/AM/CS/Data/Operations
  role text,                            -- "Key Account Manager"
  buddy_user_id uuid,
  team_leader_user_id uuid,
  language text DEFAULT 'cs',           -- 'cs' | 'en'
  magic_token text,                     -- HMAC signed, expires 120d after start

  -- Conditional fields pro ŽL contract
  hourly_rate numeric,                  -- Kč/hod, jen pro ŽL
  signing_place text DEFAULT 'Praha',   -- pre-fill smlouvy

  created_at timestamp,
  created_by_user_id uuid
);

-- Tasky v onboardingu (každá položka checklistu = 1 task)
onboarding_tasks (
  id uuid PRIMARY KEY,
  new_hire_id uuid REFERENCES new_hires,
  task_type text,                       -- 'drive_folder' | 'slack_invite' | 'pandadoc_contract' | ...
  status text,                          -- 'pending' | 'waiting_dependency' | 'running' | 'done' | 'failed'
  external_ref text,                    -- link na vytvořený zdroj (Drive URL, PandaDoc doc ID...)
  error_message text,
  completed_at timestamp,
  completed_by text                     -- 'system' | user_id
);

-- Data od nováčka (questionnaire + introduce yourself)
new_hire_questionnaire (
  new_hire_id uuid PRIMARY KEY REFERENCES new_hires,

  -- Standardní pole
  phone text,
  address text,                         -- pre-fill ŽL smlouvy
  shirt_size text,                      -- S/M/L/XL/XXL
  dietary_preferences text,
  allergies text,
  birth_date date,                      -- volitelné, birthday celebrations
  linkedin_url text,                    -- volitelné

  -- ŽL-specific
  ico text,                             -- 8-místné, povinné pro ŽL, pre-fill smlouvy
  bank_account text,                    -- pre-fill faktur

  -- Introduce yourself (sekce About Your Team)
  why_expando text,
  fun_fact text,
  introduction_submitted_at timestamp,
  introduction_emailed_to_buddy_at timestamp,

  submitted_at timestamp
);
```

**Config soubory v Gitu** (`src/data/newHires/*.ts` z v3/v4) se stanou **read-only view** do DB — pro statickou generaci stránky. DB je single source of truth.

---

### 📝 Co přidat do welcome page (pro nováčka)

Welcome page se rozšíří o dvě drobnosti, které nahrazují ruční činnosti Nikol:

#### ➕ Přidat do Sekce 7 (CTA) — 4. checkbox

```
☑️ Vyplň osobní dotazník
   Potřebujeme pár informací — velikost trička (budeš
   z něj pyšná), co (ne)jíš, a pár kontaktních údajů.
   [→ Vyplnit (2 min)]
```

Klik otevře modal s formulářem (shadcn/ui Dialog):
- Phone number (pro urgentní kontakt)
- Adresa (pro případné zaslání merch/HW + pre-fill smlouvy ŽL)
- Velikost trička (S/M/L/XL/XXL)
- Stravovací preference (pro team lunch první den)
- Alergie / omezení
- Datum narození (volitelné — pro team birthday celebrations)
- LinkedIn URL (volitelné — pro zbytek týmu najít)
- **IČO** (jen pokud `contractType === 'ŽL'` — povinné pole pro pre-fill smlouvy)
- **Bank account** (jen pokud `contractType === 'ŽL'` — pro pre-fill faktur)

Submit → `POST /api/hr/questionnaire/[slug]` → zápis do `new_hire_questionnaire` → e-mail Nikol „Barbara vyplnila questionnaire ✅"

**Bonus gamifikace:** po submit další konfety + microcopy *„Parádo! Uvidíme se v pondělí."*

#### ➕ Přidat do Sekce 4b (Praktické info)

Drobný block s **live statusem přístupů**:

```
🛠️ Tvoje přístupy
✅ Email: barbara@expando.com — aktivní
✅ Slack — invite ti přišel, přihlas se
⏳ Notion — připravujeme
⏳ Google Drive — připravujeme

Až bude všechno hotové, dostaneš notifikaci.
```

Každá položka fetchne status z DB (server component). Nováček vidí realtime, co už funguje. **Snižuje anxiety**: „Pozor, Slack ti přišel, podívej se."

---

### 🎛️ Admin UI pro Nikol (`/admin/*`)

Nová stránka, password-protected (basic auth nebo SSO přes Google Workspace).

**`/admin` — Dashboard:**
- Seznam nováčků, filter „Nadcházející" / „Active onboarding" / „Hotové"
- Každý řádek: jméno, role, start date, progress bar % dokončených tasků, rychlý link
- CTA nahoře: **„+ Nový nováček"**

**`/admin/new-hire/new` — Formulář:**
- First name, last name, personal email (tam kam posíláme magic link)
- Start date (date picker)
- Contract type (HPP / DPČ / DPP / ŽL)
- Team (dropdown: GTM / AM / CS / Data / Operations)
- Role (text, nebo preset role templates)
- Buddy (dropdown z `team.json`)
- Team Leader (dropdown z `team.json`)
- Language preference (CS / EN)
- **Conditional pole pro ŽL** (zobrazí se jen pokud `contractType === 'ŽL'`):
  - **Hodinová sazba** (Kč/hod, bez DPH) — povinné, pre-fill smlouvy `{{hourly_rate}}`
  - **Místo podpisu** (default: „Praha") — pre-fill `{{signing_place}}`
- **Submit → spustí celý workflow:**
  1. Zápis do DB
  2. Generace magic tokenu
  3. Paralelní spuštění všech automatizovaných tasků (queue) — **kromě smlouvy**, ta čeká na vyplnění dotazníku nováčkem
  4. Odeslání **welcome emailu** s magic linkem přes Resend/Postmark
  5. Redirect na `/admin/new-hire/[slug]` — detail view

**Smlouva — kdy se vygeneruje:**
- ŽL: až po `questionnaire.submitted` (potřebujeme IČO + adresu od nováčka). Trigger: webhook po submit dotazníku → spustí `createContractDraft()`.
- HPP/DPČ/DPP: zatím manuálně (templates TBD od HR).

**`/admin/new-hire/[slug]` — Detail:**
- Všechna data nováčka
- **Live status každého tasku** (auto-refresh každých 5s během workflow):
  - ✅ Magic link odeslán → na `barbara@example.com` v 9:14
  - ✅ Drive folder → `Zaměstnanci EXPANDO/Barbara Třeslínová`
  - ✅ Slack invite → odesláno na `barbara@example.com`
  - ⏳ Notion → queued
  - ❌ PandaDoc → failed (klikni pro retry)
- **Tlačítka pro manuální úkony:**
  - „Otevřít ZOHO admin pro Barboru" (pre-filled URL)
  - „Vytvořit ClickUp profil" (s pre-filled template)
- „Download questionnaire data" (pro offline zpracování)

---

### 🔌 Integrace (po jednotlivých službách)

#### 1. Google Workspace (Drive, Gmail groups)
- **SDK:** `googleapis` npm
- **Auth:** OAuth2 service account s **domain-wide delegation** (IT musí povolit v Admin konzoli)
- **Scopes:** `drive`, `admin.directory.group.member`, `admin.directory.user`
- **Setup complexity:** 🟡 střední — 1× IT nastavení, pak vše funguje
- **Co umí:**
  - Vytvořit složku ze šablony v `Zaměstnanci EXPANDO` + `01_HR_ÚVAZKY/{contractType}`
  - Nasdílet specifické složky Barbaře (podle role)
  - Přidat email do `all.praha` skupiny (a dalších relevantních: `gtm@`, `all.cz`, etc.)
  - Vytvořit nový email account? → ⚠️ **Pozor:** vytvoření mailboxu vyžaduje License v Google Workspace. MVP: jen přidání do groupů. Email vytváří IT ručně.

#### 2. Slack
- **SDK:** `@slack/web-api`
- **Auth:** Bot token s admin scopes
- **Scopes:** `admin.users:write`, `admin.conversations:write`, `admin.users.invite`
- **Setup complexity:** 🟢 low
- **Co umí:**
  - Pozvat nového usera do workspace (`admin.users.invite`)
  - Přidat ho do relevantních channels (podle týmu): `#am-team-general`, `#gtm-team`, `#general`, `#random`
  - **Bonus:** po approved invite poslat welcome DM od „@expando-bot" *„Ahoj Barbaro! Za pár dní se uvidíme. Tvoje buddy Nikol je tady → [slack://user]"*

#### 3. Notion
- **SDK:** `@notionhq/client`
- **Auth:** Internal integration token
- **Setup complexity:** 🟡 střední — Notion API má omezení na guest management
- **Co umí:**
  - Pozvat user přes email (`notion.users.invite` — není v public API, workaround: přes workspace admin panel nebo SCIM, pokud máte Enterprise)
  - **Realisticky pro MVP:** generovat Nikol **1-click link do Notion admin panel s pre-filled email** + checkbox v admin UI „hotovo"
  - Duplikace Resource Map šablony podle role je možná přes API (`notion-duplicate-page`)

#### 4. PandaDoc
- **API:** REST, velmi dobré, `@pandadoc/pandadoc-api-node-client`
- **Setup complexity:** 🟢 low
- **Co umí:**
  - Vzít šablonu smlouvy podle `contractType` (HPP/DPČ/DPP/ŽL) — každá je samostatná template v PandaDoc
  - Pre-fill údaji nováčka (jméno, adresa z questionnaire, start date, role, salary — z admin UI)
  - Poslat k podpisu — rovnou Adamovi/Dominikovi i nováčkovi
  - Webhook zpět → když obě strany podepsaly, update status v DB

#### 5. ZOHO, ClickUp, Trello, Missive, EXPANDO home/people
- **MVP strategie:** Neintegrujeme API. Admin UI ukáže Nikol v detailu nováčka:
  ```
  ⚠️ Manuál tasky (klikni a udělej):
  [ ] ZOHO access → [Otevřít Admin] (pre-filled search)
  [ ] ClickUp user → [Otevřít ClickUp settings]
  [ ] Missive (jen pro AM tým) → [Otevřít]
  [ ] EXPANDO home/people profil check
  ```
- Každý klik = 1× checkbox + audit trail kdo a kdy to udělal
- **Fáze 3:** postupně přidávat API integrace, kde API existuje a má to ROI (ClickUp API ano, ZOHO ano, Missive ano)

#### 6. Onboarding email (welcome email s přihlašovacími údaji)

- **Služba:** **Resend** (doporučeno — lepší DX než Sendgrid, flat pricing) nebo Postmark
- **Template:** React Email (`@react-email/components`) — komponenty v TypeScriptu, stejný design system jako welcome page
- **Kdy se pošle:** automaticky po kliknutí „Spustit onboarding" v admin UI (30s po submit formuláře)

**Obsah emailu (finalizovaný):**

```
From: EXPANDO Welcome <welcome@expando.com>
Subject: Ahoj Barbaro, tady jsou tvoje první kroky do EXPANDO 🎸

────────────────────────────────────────────

[LOGO EXPANDO]

Ahoj Barbaro 👋

Za pár dní startujeme spolu. Abys měla všechno po ruce,
tady je vše, co potřebuješ.

┌──────────────────────────────────────────┐
│  🔗 TVOJE WELCOME PAGE                   │
│                                           │
│  [VELKÉ CTA TLAČÍTKO:                    │
│   Otevři svou welcome page →]            │
│                                           │
│  Najdeš tam rozvrh prvního dne, tvůj    │
│  tým, praktické info a pár drobností     │
│  jen pro tebe.                            │
└──────────────────────────────────────────┘

🔐 PŘIHLAŠOVACÍ ÚDAJE

Username: barbara.treslinova
Password: expando-welcome-2026

(Tohle jsou univerzální údaje pro první přihlášení
na welcome page. Heslo si nemusíš měnit — je platné
jen pro tuhle stránku.)

📌 CO TĚ ČEKÁ
• Welcome page si projdi klidně ještě dnes
• Vyplň krátký osobní dotazník (2 min, na stránce)
• Napiš buddymu Nikol na Slacku — je na tebe nachystaná
• V pondělí 9:00 se vidíme naživo na adrese [X]

Pokud bys potřebovala cokoli řešit před nástupem,
ozvi se Nikol (nikol@expando.com) nebo mi napiš.

Těšíme se!
Team EXPANDO

────────────────────────────────────────────
[social links: LinkedIn | Instagram]
```

**Technická implementace:**

```tsx
// src/emails/onboarding-welcome.tsx (React Email)
export default function OnboardingWelcomeEmail({
  firstName,
  magicLink,
  username,        // generated from firstName.lastName
  password,        // global default: "expando-welcome-2026"
  buddyFirstName,
  buddyEmail,
  startDateReadable, // "v pondělí 9:00"
  officeAddress,
}: Props) {
  // React Email komponenty + Tailwind style
}
```

**Credentials strategie:**
- **Username:** generovaný ze jména — `{firstName}.{lastName}` lowercase, bez diakritiky (např. `barbara.treslinova`). Unikátní per nováček.
- **Password:** **globální konstanta** `expando-welcome-2026` — sdílená napříč nováčky
  - V configu jako env var `WELCOME_PASSWORD`, aby šla rychle rotovat (např. každý rok)
  - Na welcome page slouží jako **druhotná vrstva ochrany** vedle magic linku (kdyby link někdo přeposlal, bez hesla neprojde)
  - Middleware check: magic token + password match → render stránky
- **UX:** když nováček přijde s platným magic linkem ale bez hesla (první klik z emailu), zobrazí se login screen s pre-filled username a jedním polem pro password. Po zadání hesla → cookie na 120 dní → dál už se neptá.

**Poznámka:** Tohle je low-friction řešení. Pokud by později chtěl EXPANDO per-user unikátní hesla (vyšší security), stačí změnit `password` na generované per-nováček (uloženo v DB, v emailu prezentováno stejně). Kód zůstane stejný.

#### 7. Entry documents (PandaDoc smlouva)

- **API:** `@pandadoc/pandadoc-api-node-client`
- **Setup complexity:** 🟢 low
- **Workflow:**
  1. Admin v UI vybere `contractType` (HPP / DPČ / DPP / ŽL) → backend vybere odpovídající PandaDoc **template ID**
  2. API volání `POST /documents` s pre-fill daty (jméno, adresa, start date, role, salary, rodné číslo, bank account pro ŽL)
  3. PandaDoc automaticky pošle k podpisu Adamovi/Dominikovi (jako first signer) a nováčkovi (second signer)
  4. Webhook `document_state_changed` → update status v DB
  5. Jakmile je podepsáno, PDF se automaticky uloží do složky nováčka v Google Drive (přes Drive API, task #2)

**Vzor smlouvy ŽL (Rámcová smlouva pro OSVČ):**

✅ **Vzor dodán** — `Template_Ramcova_smlouva_OSVC_CZ.pdf` (analyzováno v briefu níže).

**Specifikace smlouvy:**
- **Typ:** Rámcová smlouva o poskytování služeb (§ 1746 odst. 2 Občanského zákoníku)
- **Použito pro:** OSVČ / živnostníci (`contractType === 'ŽL'`)
- **Délka:** 10 stran (7 stran smlouvy + 3 strany Příloha č. 1 — GDPR)
- **Signatáři:** 2 — **Adam Kurzok** (jednatel EXPANDO COMPANY s.r.o.) + Poskytovatel (nováček-OSVČ)

**Pole k pre-fillu z PandaDoc tokens:**

| Token name | Source | Příklad hodnoty | Pozice ve smlouvě |
|---|---|---|---|
| `provider_full_name` | `config.fullName` | „Barbara Třeslínová" | Hlavička + podpis |
| `provider_address` | `questionnaire.address` | „Vinohradská 12, 120 00 Praha 2" | Hlavička („místo podnikání") |
| `provider_ico` | `questionnaire.ico` | „12345678" | Hlavička („IČO: DOPLNIT") |
| `provider_email` | `config.personalEmail` | „barbara@example.com" | Hlavička („e-mail: DOPLNIT") |
| `hourly_rate` | `config.hourlyRate` | „750" (Kč/hod, bez DPH) | Čl. 3.1 („počítá se cena ___ Kč / hodinu") |
| `signing_place` | konstanta nebo input | „Praha" | Závěr („V ____ dne ____") |
| `signing_date` | auto = den vytvoření | „21. 4. 2026" | Závěr |

**Přílohy (součástí jedné smlouvy, ne separátní dokumenty):**
- ✅ **Příloha č. 1 — Zásady ochrany osobních údajů (GDPR)** — automaticky součástí, není potřeba samostatný dokument

**Klíčová obchodní pravidla ze smlouvy** (důležité pro nováčka — zmínit v About You sekci u Tasku „Smlouva"):
- 📊 **Min. odběr:** 35 hod/týden (čl. 2.8)
- ⚠️ **Strop:** Při překročení 150 hod/měsíc povinnost informovat (čl. 3.1)
- 💸 **Splatnost faktur:** 7 dní od doručení (čl. 3.6)
- 🚫 **Konkurenční doložka:** 12 měsíců po skončení nesmí poskytovat konkurenční služby (čl. 6.8)
- 🔒 **Sankce za porušení mlčenlivosti:** 250 000 Kč (čl. 7.2)
- 🚷 **Sankce za přechod ke klientům EXPANDO:** 300 000 Kč (čl. 7.4)
- 📅 **Výpovědní doba:** 1 měsíc (čl. 8.1)
- 🗑️ **Po ukončení:** 14 dní na smazání všech dat klientů (čl. 8.4)

**UX poznámka pro Task „Smlouva" v sekci About You:**
Pod link na smlouvu přidat krátké info-box „Klíčové podmínky v kostce" s 3-4 bullet pointy z výše uvedeného (min. 35h/týden, splatnost 7 dní, výpovědní doba 1 měsíc) — aby nováček nemusel ihned číst 10 stran a měl rychlý přehled. Plný text je samozřejmě ve smlouvě k podepsání.

**⚠️ Otevřená otázka pro HR (mimo MVP):**
Brief počítal s **4 typy úvazku** (HPP / DPČ / DPP / ŽL). Vzor je zatím **jen pro ŽL**. Pro plné spuštění (Fáze 2) potřebujeme:
- Vzor smlouvy pro **HPP** (zaměstnanecký poměr)
- Vzor smlouvy pro **DPČ** (dohoda o pracovní činnosti)
- Vzor smlouvy pro **DPP** (dohoda o provedení práce)

Pokud HR další 3 vzory ještě nemá, MVP může jet jen pro ŽL (= aktuální Barbařin případ) a zbylé typy ošetříme placeholderem „Smlouva přijde emailem od Nikol" v admin UI.

**Pre-fill workflow:**

1. **Admin (Nikol) v `/admin/new-hire/new`** vyplní:
   - Standardní pole: jméno, příjmení, personal email, start date, role, team, buddy, leader
   - **ŽL-specific pole** (zobrazí se jen pokud `contractType === 'ŽL'`):
     - Hodinová sazba (Kč/hod, bez DPH) — `hourly_rate`
     - Místo podpisu (default: „Praha") — `signing_place`

2. **Nováček ve „Vyplň osobní dotazník"** (Task 2 v About You sekci) doplní:
   - Adresa → pre-fill do `provider_address`
   - **IČO** (nové pole, jen pro ŽL) → pre-fill do `provider_ico`
   - Bank account → pre-fill do faktury (ne smlouvy)

3. **Backend automaticky generuje smlouvu** přes PandaDoc API:

```typescript
// src/config/pandadoc-templates.ts
export const PANDADOC_TEMPLATES: Record<ContractType, string | null> = {
  ŽL:  'template_zl_xxxxxxxx',  // ✅ máme vzor, vytvoříme template
  HPP: null,                     // TBD — vzor zatím nedodán
  DPČ: null,                     // TBD
  DPP: null,                     // TBD
};

// Když template === null, admin UI zobrazí:
// „Pro tento typ úvazku zatím nemáme šablonu v PandaDoc.
//  Pošli smlouvu Barboře manuálně přes email."
```

**Validace před vytvořením smlouvy:**
- Pokud `contractType === 'ŽL'` → check že máme `provider_ico`, `provider_address`, `hourly_rate`. Pokud chybí, blokuj vytvoření a ukaž v admin UI: *„Před generací smlouvy potřebujeme od Barbory IČO a adresu — počkej až vyplní dotazník."*
- Tohle je důležitý dependency: **smlouva se nesmí poslat dřív, než nováček vyplní dotazník** (jinak by chyběly povinné údaje).

---

**Jak vytvořit PandaDoc template (1× setup):**

1. Otevřít vzor smlouvy v PandaDoc (upload PDF nebo Word)
2. Označit pole jako template variables (PandaDoc UI):
   - „DOPLNIT" (jméno) → `{{provider_full_name}}`
   - „DOPLNIT" (adresa) → `{{provider_address}}`
   - „DOPLNIT" (IČO) → `{{provider_ico}}`
   - „DOPLNIT" (e-mail) → `{{provider_email}}`
   - „_______ Kč / hodinu" → `{{hourly_rate}} Kč / hodinu`
   - „V _____ dne _____" → `V {{signing_place}} dne {{signing_date}}`
3. Označit signature fields:
   - Za Poskytovatele → role `Signer_Provider`
   - Za Objednatele → role `Signer_Employer`, pre-assign Adam Kurzok (`adam@expan.do`)
4. Uložit jako template, získat `template_uuid` → uložit do env nebo configu

---

**Implementace:**

```typescript
// src/services/pandadoc.ts
import { ContractType, NewHire } from '@/types';

export async function createContractDraft(newHire: NewHire) {
  const templateId = PANDADOC_TEMPLATES[newHire.contractType];

  if (!templateId) {
    throw new Error(
      `PandaDoc template not configured for ${newHire.contractType}. ` +
      `Send contract manually via email.`
    );
  }

  // Validace povinných polí pro ŽL
  if (newHire.contractType === 'ŽL') {
    const required = ['address', 'ico'] as const;
    const missing = required.filter(f => !newHire.questionnaire?.[f]);
    if (missing.length > 0) {
      throw new Error(
        `Missing fields from questionnaire: ${missing.join(', ')}. ` +
        `Wait until ${newHire.firstName} fills them in.`
      );
    }
    if (!newHire.hourlyRate) {
      throw new Error(`Missing hourlyRate. Set it in admin UI before generating contract.`);
    }
  }

  const doc = await pandadoc.documents.create({
    template_uuid: templateId,
    name: `Rámcová smlouva — ${newHire.fullName}`,
    recipients: [
      {
        email: 'adam@expan.do',
        first_name: 'Adam',
        last_name: 'Kurzok',
        role: 'Signer_Employer',
      },
      {
        email: newHire.personalEmail,
        first_name: newHire.firstName,
        last_name: newHire.lastName,
        role: 'Signer_Provider',
      },
    ],
    tokens: [
      // Pole z dotazníku nováčka
      { name: 'provider_full_name', value: newHire.fullName },
      { name: 'provider_address',   value: newHire.questionnaire?.address ?? '' },
      { name: 'provider_ico',       value: newHire.questionnaire?.ico ?? '' },
      { name: 'provider_email',     value: newHire.personalEmail },

      // Pole z admin UI (Nikol vyplní)
      { name: 'hourly_rate',        value: String(newHire.hourlyRate ?? '') },
      { name: 'signing_place',      value: newHire.signingPlace ?? 'Praha' },
      { name: 'signing_date',       value: new Date().toLocaleDateString('cs-CZ') },
    ],
  });

  // Auto-send k podpisu (Adam → Barbara)
  await pandadoc.documents.send(doc.id, {
    silent: false,
    message: `Ahoj ${newHire.firstName}, posíláme ti rámcovou smlouvu k podpisu. ` +
             `Adam ji už podepsal, teď je řada na tobě. Klikni a pojď to zaklepat. 🤝`,
  });

  return { documentId: doc.id, status: 'sent_for_signature' };
}
```

**Webhook handler** (`/api/webhooks/pandadoc`):
- Ověří signature přes `PANDADOC_WEBHOOK_SECRET`
- Při `document.completed` → update `onboarding_tasks.status = 'done'`, uloží PDF do Drive

**Admin UI zobrazení:**

```
📄 Smlouva (PandaDoc)
┌────────────────────────────────────────┐
│ Status: 🟡 Waiting for signatures      │
│                                         │
│ ✅ Adam Kurzok — podepsal 21.4. 10:14  │
│ ⏳ Barbara Třeslínová — čeká            │
│                                         │
│ [Otevřít v PandaDoc] [Resend link]     │
└────────────────────────────────────────┘
```

---

### 🔐 Autentizace a bezpečnost

| Část | Auth |
|---|---|
| Welcome page `/[slug]` | **Dual-factor:** Magic link (HMAC token v URL, 120 dní expirace) **+** password gate (`expando-welcome-2026` rotován ročně) |
| Admin UI `/admin/*` | SSO přes Google Workspace (omezit na `@expando.com` doménu) + role-based (jen `Nikol`, `Dana`, `Adam`, `Dominik` mají přístup) |
| API routes `/api/hr/*` | Vyžadují platnou session z admin SSO; žádný endpoint bez auth |
| Questionnaire submit `/api/hr/questionnaire/[slug]` | Ověří magic token + session cookie z password gate |
| Webhooky (PandaDoc, Slack) | Ověření signatury přes shared secret |

**Flow prvního přihlášení nováčka:**

```
1. Nováček dostane email s magic linkem + username/password
2. Klikne na tlačítko v emailu → /[slug]?t=abc123...
3. Middleware ověří magic token → pokud platný, přesměruje na /[slug]/login
4. Login screen:
   - Username field (pre-filled ze slugu: barbara.treslinova)
   - Password field (prázdný, nováček zadá z emailu)
5. Server ověří: magic token valid + password == env.WELCOME_PASSWORD
6. Set-Cookie: session token (120 dní, httpOnly, secure, sameSite=Lax)
7. Redirect na /[slug] → render welcome page
8. Při dalších návštěvách cookie stačí, password se neptá znovu
```

**Proč dual-factor (link + password) místo jen linku:**
- Magic link sám o sobě může být přeposlán nebo uniknout ze screenshotu
- Password je sdílená konstanta, ale **není v URL** — nekopíruje se při forwardu emailu ani ve screenshot linku
- Pro Barbaru je to jeden extra klik navíc (ne velká friction), ale výrazně těžší náhodný leak

**Env variables (do Vercelu):**
```
MAGIC_LINK_SECRET=...              # HMAC pro magic linky
WELCOME_PASSWORD=expando-welcome-2026  # sdílené heslo pro login gate (rotovat ročně)
GOOGLE_SERVICE_ACCOUNT_KEY=...     # JSON service account
SLACK_BOT_TOKEN=xoxb-...
NOTION_TOKEN=secret_...
PANDADOC_API_KEY=...
PANDADOC_WEBHOOK_SECRET=...
RESEND_API_KEY=re_...
DATABASE_URL=postgres://...
ADMIN_ALLOWED_EMAILS=nikol@expando.com,dana@expando.com,...
```

---

### ✅ Akceptační kritéria (pro HR automation)

Doplnit k existujícímu seznamu:

16. Admin UI `/admin` protected přes Google SSO, jen allowed emaily
17. Vytvoření nováčka ve formuláři spustí paralelní workflow (queue)
18. Live status tasků v detailu nováčka, refresh 5s
19. Failed task má retry tlačítko a error message
20. Welcome email odeslán do 30s od submit formuláře
21. Personal questionnaire na welcome page (Sekce 7, 4. checkbox) funguje a ukládá do DB
22. Live statuses přístupů v Sekci 4b welcome page
23. Slack invite funguje end-to-end (testováno s reálným userem)
24. Google Drive folder se vytvoří se správnou strukturou podle `contractType`
25. PandaDoc draft se vygeneruje se správnou šablonou a pre-filled údaji

---

### 🚀 Fáze dodání (rozšířeno)

**Fáze 1 — MVP welcome page (2–3 dny)** — *beze změny*

**Fáze 2 — HR Automation MVP (3–4 dny)**
- DB schéma (Supabase/Vercel Postgres)
- Admin UI: dashboard + new hire form + detail view
- Integrace: Slack invite + Resend email + Google Drive folder
- Questionnaire na welcome page
- Live statuses přístupů v Sekci 4b

**Fáze 3 — Full automation (2–3 dny)**
- Google Workspace groups (přidání do `all.praha`)
- Notion integrace (co je možné)
- PandaDoc integrace (draft + signature flow)
- Audit log + role-based access

**Fáze 4 — Polish (1–2 dny)**
- ZOHO/ClickUp/Missive API integrace (pokud má ROI)
- Email notifikace o změnách stavu (Nikol dostane notifikaci když nováček vyplní questionnaire)
- Analytics: time-to-complete per nováčka, která integrace nejčastěji fails, etc.

---

### 💰 Očekávaný přínos

| Metrika | Před | Po |
|---|---|---|
| Čas Nikol na 1 nováčka | ~90 min | ~10 min |
| Chybovost (zapomenuté kroky) | ~15 % | <2 % |
| Čas od „podepsaná smlouva" → „máš magic link v inboxu" | 1–3 dny | <1 minuta |
| Obeznámenost nováčka před Day 1 | Variable | Konzistentní |

Při **10 nástupech ročně** = úspora ~13 hodin Nikol / rok. Ne moc? Ale hlavní ROI je **konzistence**: každý nováček dostane identicky skvělý zážitek bez ohledu na to, jestli je Nikol zrovna na dovolené nebo má 15 jiných tasků.

---

## ⚙️ Technický stack

- **Next.js 14+ (App Router)**
- **Tailwind CSS** + shadcn/ui
- **Framer Motion** — scroll-triggered reveals, hover effects
- **canvas-confetti** — Sekce 7 konfety
- **lucide-react** — ikony
- **next/font/google** → DM Sans
- **next-intl** — i18n (CS default, EN switcher)
- **Deploy:** Vercel → `onboarding.expando.com`
- **Analytika:** Plausible

### Tailwind extract

```ts
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        expando: {
          orange: '#FF4D00',
          'orange-hover': '#E64400',
          'orange-soft': '#FFF1EB',
          black: '#000000',
          white: '#FFFFFF',
        },
      },
      fontFamily: {
        sans: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },
    },
  },
};
```

### Datová struktura

```typescript
// src/data/newHires/barbara-treslinova.ts
export const config: NewHireConfig = {
  slug: 'barbara-treslinova',
  firstName: 'Barbara',
  role: 'Key Account Manager',
  team: 'Go-to-Market',
  daysUntilStart: 5, // calculated, not shown as countdown
  roleMissionLine: 'Jako KAM v GTM týmu rozhoduješ, které značky vezmeme na palubu.',

  buddy: {
    firstName: 'Nikol',
    fullName: 'Nikol Černá',
    role: 'Senior KAM',
    photo: '/photos/team/nikol.jpg', // fallback: iniciály
    personalLine: 'Provedu tě prvními obědy, kávovarem a Slackem. Ptej se na cokoli.',
    slackDeepLink: 'slack://user?team=T123&id=U456',
    email: 'nikol@expando.com', // fallback
  },

  teamLeader: {
    firstName: 'Dana',
    fullName: 'Dana Kováčik',
    role: 'Head of GTM',
    photo: '/photos/team/dana.jpg',
    personalLine: 'Těším se na tvůj fresh pohled. Pondělí 9:00!',
    slackDeepLink: '...',
    email: 'dana@expando.com',
  },

  language: 'cs',
  hasWelcomeVideo: false,
  easterEggCode: 'EXP-WELCOME-2026', // hidden lunch code

  // optional overrides
  customDay1Schedule: undefined,
};
```

**Statická data** (hodnoty, story, practical info default, 90-day cards, CTA items) → `src/i18n/{cs,en}.json`

**Team data** (všichni členové firmy pro Sekci 3c) → `src/data/team.json`

**Metrics** (Sekce 5a milníky) → `src/data/metrics.json`, HR/Data edituje manuálně (MVP), později možná napojit na Notion API

**Notion API:** v MVP NE. Zvažuje se až ve Fázi 4.

### URL routing & auth

- `/` → generic welcome (fallback)
- `/[slug]` → personalizovaná verze (SSG přes `generateStaticParams`)
- `noindex, nofollow` meta
- **Magic link:** HMAC token v URL query, middleware check. MVP: allowlist slugů bez tokenu.

---

## ✅ Akceptační kritéria

1. Všech **7 sekcí** implementováno podle specifikace
2. **Tykáme** celým webem, EXPANDO vždy velkými písmeny bez skloňování
3. Personalizace z configu: `firstName`, `role`, `team`, `daysUntilStart`, `buddy`, `teamLeader`, `roleMissionLine`, `easterEggCode`
4. Mobile-first, testováno 375/768/1440
5. Lighthouse: Perf ≥ 90, A11y ≥ 95, SEO ≥ 90, BP ≥ 95
6. Brand: barvy `#FF4D00` / `#000` / `#FFF`, font DM Sans
7. **Slack deep-link buttony** fungují v Sekci 3b (fallback na mailto)
8. **Konfety** v Sekci 7 při dokončení všech 3 checkboxů (canvas-confetti, oranžové partikly)
9. **Easter egg** s hidden code funguje (3× klik na definovaný element, modal s kódem)
10. **Hover efekty** na avatarech v Sekci 3c (scale + tilt)
11. **Count-up animace** na metrikách v Sekci 5a při scrollu
12. **localStorage** pro checkboxy v Sekci 7 (persist napříč návštěvami)
13. EN/CZ switcher funkční
14. Fotky optimalizované (WebP + JPG, lazy loading)
15. Přidání nového nováčka = 1 config soubor, žádný zásah do komponent

---

## 🚀 Fáze dodání

**Fáze 1 — MVP (2–3 dny)**
CS statická verze, všech 7 sekcí, 4 dodané fotky, config pro testovací nováčku (Barbara Třeslínová), deploy na Vercel preview. Konfety + easter egg funkční. Magic link stub.

**Fáze 2 — Polish (1–2 dny)**
EN mutace + i18n switcher, Framer Motion animace (scroll reveals, hover), localStorage pro checkboxy, Slack deep-links, count-up metriky.

**Fáze 3 — Production (1 den)**
Magic link auth (HMAC token + middleware), custom doména `onboarding.expando.com`, Plausible, team.json s celým týmem pro Sekci 3c.

**Fáze 4 — Optional (0.5–1 den)**
Welcome video komponenta v outro (Sekce 7+), role-specific Day 1 schedule override, Notion API pro live metriky, video/audio quick zpráva leadera v Sekci 3b.

---

## 📎 Dodané assety

- 📄 Tento brief: `expando_onboarding_landing_brief.md`
- 📷 4 fotky v `assets/photos/`
- **Logo SVG:** [Google Drive](https://drive.google.com/drive/folders/1bOWdubDz8EQxSYLVGpP7CBiW19VO2Wd1) → `public/logo/`
- **Metriky:** aktuální snapshot z [METRICS EXPANDO Notion](https://www.notion.so/8cfc7cb4370d4c818faccb0616f76069) dodá Data team

---

## 📝 Klíčové změny v3 → v4.5

| v3.0 | v4.0 / v4.1 / v4.2 | v4.3 |
|---|---|---|
| 9 sekcí | 7 sekcí (jasnější emoční oblouk) | Stejně 7, ale **sekce 3 a 4 přejmenovány a refactored** |
| „Co děláme" neutrální popis | „Our DNA" jako 3-step client journey | Beze změny |
| „Meet the Tribe" — buddy + leader + zbytek týmu | + Slack deep-link, Founders, hover efekty | **Přejmenováno na „Your Team"** |
| „Road to Day 1" — Day 1 timeline + praktické info (parking, dovolená...) | + Konfety v CTA, easter egg, milníky | **Přesunuto za About You + Your Team**, dovolená vyňata |
| — | Nová Sekce „Why EXPANDO is cool" + CTA | Beze změny |
| Bez questionnaire | + Questionnaire modal v CTA | **Přesunut do About You jako Task 2** |
| Bez HR Automation | + Backend, admin UI, integrace, DB | Beze změny |
| Bez user introduction | „Say hi" sekce s pre-filled textem | **🆕 „Introduce yourself"** — strukturovaný form se 2 otázkami: 1) Proč ses rozhodl/a pro EXPANDO? 2) Fun fact o sobě |
| — | — | **🆕 About You** — 3 tasky před nástupem (smlouva, dotazník, bulletin) |
| — | — | **🆕 Benefits & dovolená** (z Notion: 25 dní, 3 sick, MultiSport 50 %, výplata do 10.) |
| — | — | **🆕 Performance review** — 1:1 měsíčně, kvartální OKRs, 90-day review, roční |
| — | — | **🆕 Referral program** — 10k + 20k bonus, link na Notion + Google Form |
| HR profile karta s Role/Start/Team/Contract/Location | Beze změny | **❌ Odstraněno** — info zůstává jen casually v hero ("Nastupuješ jako KAM v GTM týmu") |
| „Say hi" s pre-filled message templates | Beze změny | **❌ Odstraněno** — nahrazeno autentickým „Introduce yourself" |
| Akční tasky jako vertikální checklist | Beze změny | **🆕 v4.5: Symetrický 3+3 layout** — 3 info dlaždice vlevo (Role, Team, Start), 3 akční dlaždice vpravo (Practical Info, Contract, Questionnaire). Status pill nad kartou, ne uvnitř. |
| Practical info textový blok | Beze změny | **🆕 v4.5:** Modal/expandable card s obsahem z Notion GI11 (Working hours, Vacation 25 dní, Sick days 3, MultiSport 50%, conditional pro ŽL) |
| Contract jako samostatný checkbox | Beze změny | **🆕 v4.5:** Akční dlaždice s pre-condition logikou (čeká na questionnaire), KEY TERMS at a glance, embedded PandaDoc |
| Questionnaire bez ARES validace | Beze změny | **🆕 v4.5:** Conditional pole pro ŽL (IČO + bank account), validace pole, trigger pro contract pre-fill |

---

**Status:** v4.5 (FINAL) — Ready for Claude Code handoff 🚀

**Pending pro plný launch (mimo MVP):**
- Vzory smluv pro HPP / DPČ / DPP — pro MVP stačí ŽL (Barbara), který už máme
- Link na performance review proces v Notion — doplní HR
- Finální Slack User IDs pro deep-linky (leader, buddy, Ema) — doplní HR
- Logo SVG export z [Google Drive](https://drive.google.com/drive/folders/1bOWdubDz8EQxSYLVGpP7CBiW19VO2Wd1) → `public/logo/`

**MVP-ready:**
- ✅ Brief kompletně specifikovaný (UX + tech + integrace + DB + auth)
- ✅ 4 týmové fotky v `assets/photos/`
- ✅ Vzor smlouvy ŽL pro PandaDoc template (`contracts/ramcova_smlouva_OSVC_CZ.pdf`)
- ✅ Brand manuál (barvy, font, tone-of-voice)
- ✅ Obsah Practical Information karty z Notion GI11 Employees
