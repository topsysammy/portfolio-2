import { workflow } from "./data";

export type Kind = "case" | "website" | "vibecoded" | "dashboard";

export type Swatch = { name: string; hex: string };

export type Block =
  | { type: "lead"; eyebrow: string; text: string }
  | {
      type: "challenge";
      eyebrow: string;
      title: string;
      who?: string;
      why?: string;
      items: { title: string; text: string }[];
      quote?: { text: string; by: string };
    }
  | { type: "timeline"; eyebrow: string; title: string; steps: { when: string; title: string; text: string }[] }
  | { type: "goals"; eyebrow: string; title: string; intro?: string; items: { title?: string; text: string }[] }
  | {
      type: "research";
      eyebrow: string;
      title: string;
      methods: string[];
      findings: string[];
      lists: { title: string; items: string[] }[];
    }
  | { type: "changes"; eyebrow: string; title: string; items: { what: string; why: string }[] }
  | {
      type: "figure";
      eyebrow: string;
      title: string;
      text?: string;
      image: string;
      alt: string;
      points?: { title: string; text: string }[];
      tall?: boolean;
    };

export type Project = {
  slug: string;
  title: string;
  year: string;
  kind: Kind;
  label: string;
  summary: string;
  tags: string[];
  cover: string;
  coverAlt: string;
  behance?: string;
  live?: string;
  /** internal case-study page exists */
  page: boolean;
  meta?: { k: string; v: string }[];
  blocks?: Block[];
  palette?: Swatch[];
  font?: { family: string; varName: string; weights: number[]; note: string; sample: string };
  /** Demo video. Shown only once the file exists in /public (checked at build time). */
  video?: { src: string; poster?: string; caption?: string; /** fill behind a portrait video on the card */ bg?: string };
};

export const projects: Project[] = [
  {
    slug: "duba",
    title: "DUBA",
    year: "2026",
    kind: "case",
    label: "Case study",
    summary:
      "A bill-payment and virtual-card app that brings airtime, data, electricity and betting top-ups into one calm, trustworthy wallet.",
    tags: ["Fintech", "Product Design", "Mobile App"],
    cover: "/work/duba-cover.png",
    coverAlt: "DUBA bill payment app screens",
    behance: "https://www.behance.net/gallery/256508847/DUBA-Bill-payment-app",
    page: true,
    meta: [
      { k: "Role", v: "Product Designer (UI/UX)" },
      { k: "Timeline", v: "6 weeks" },
      { k: "Platform", v: "iOS mobile app" },
      { k: "Year", v: "2026" },
      { k: "Tools", v: "Figma" },
      { k: "Status", v: "Concept" },
    ],
    blocks: [
      {
        type: "lead",
        eyebrow: "the idea",
        text: "DUBA is a bill-payment app designed around one simple idea: paying for the essentials should take seconds, not four different apps — and every naira should leave a clear, trustworthy receipt.",
      },
      {
        type: "challenge",
        eyebrow: "the challenge",
        title: "Paying bills in Nigeria feels scattered.",
        who: "We spoke with 12 young professionals in Lagos and Abuja who pay at least four bills a month. Three frustrations kept coming up.",
        why: "Nigerians juggle separate apps and USSD codes to buy airtime, data, power tokens and betting credit. Payments fail silently, receipts disappear, and balances are hard to trust.",
        items: [
          { title: "Too many apps", text: "Airtime in one app, power tokens in another, betting top-ups on a website. Users context-switch for every bill." },
          { title: "Payments fail silently", text: "Debits with no token, no receipt and no clear status leave users anxious and calling support." },
          { title: "Low trust in balances", text: "Hidden fees and unclear confirmations make people double-check every transaction." },
        ],
        quote: {
          text: "I just want to buy light, top up data and fund my bet in one place — and actually see a receipt when the money leaves.",
          by: "Ada, 27 · Lagos (research participant)",
        },
      },
      {
        type: "timeline",
        eyebrow: "how it went",
        title: "Six weeks, five phases",
        steps: [
          { when: "Week 01", title: "Discover", text: "Interviews, competitor audit of 6 bill-pay apps, USSD journey mapping." },
          { when: "Week 02", title: "Define", text: "Personas, jobs-to-be-done and the “4 taps to pay” success metric." },
          { when: "Week 03", title: "Structure", text: "Information architecture, user flows and low-fi wireframes." },
          { when: "Week 04–05", title: "Design", text: "High-fidelity UI, components, glass nav and the virtual card." },
          { when: "Week 06", title: "Test", text: "Prototype tests with 8 users; iterated on PIN and receipt screens." },
        ],
      },
      {
        type: "goals",
        eyebrow: "my approach",
        title: "Product goals",
        intro: "Every decision was measured against one question: does this help someone pay a bill faster and feel sure it worked?",
        items: [
          { title: "Clarity", text: "One hero number per screen. Balances, amounts and statuses are always the largest type on the page." },
          { title: "Speed", text: "Any bill in four taps: pick service → enter details → confirm → PIN. Quick amounts remove typing." },
          { title: "Trust", text: "Verified customer names, a confirmation sheet before every debit, and a receipt for every naira." },
          { title: "Control", text: "Freeze the card, reveal details, and set limits from one place — no support call needed." },
        ],
      },
      {
        type: "figure",
        eyebrow: "any bill in four taps",
        title: "User flow",
        text: "The core journey was designed once and reused for every service, so learning to buy airtime means you already know how to pay for light, data or betting.",
        image: "/work/duba/user-flow.png",
        alt: "DUBA user flow diagram",
      },
      {
        type: "figure",
        eyebrow: "monochrome by default, colour with purpose",
        title: "Visual language",
        text: "DUBA unifies everyday payments in a quiet, monochrome interface that lets the money do the talking. Plus Jakarta Sans carries the UI, and colour is reserved for services and status.",
        image: "/work/duba/visual-language.png",
        alt: "DUBA typeface and colour palette",
      },
      {
        type: "figure",
        eyebrow: "a home screen that answers first",
        title: "Application design",
        text: "The wallet balance leads, Top up and Transfer sit one thumb-reach below, and the four most-used services are large, tinted tiles — each tint carried into its own flow so users always know where they are.",
        image: "/work/duba/home.png",
        alt: "DUBA home and internet data screens",
        tall: true,
        points: [
          { title: "Balance first", text: "₦ and $ equivalent at a glance, with a privacy toggle." },
          { title: "Tinted service tiles", text: "Blue for Internet, green for Electricity, yellow for Betting." },
          { title: "Glass navigation", text: "A floating pill nav that never hides content." },
        ],
      },
      {
        type: "figure",
        eyebrow: "security that feels reassuring, not heavy",
        title: "Onboarding & security",
        text: "Sign-up stays short: verify the email, set a 4-digit transaction PIN, and you’re in. The same PIN pad and dot pattern reappear at checkout, so authorising a payment feels familiar from day one.",
        image: "/work/duba/onboarding.png",
        alt: "DUBA onboarding and PIN screens",
      },
      {
        type: "figure",
        eyebrow: "from tap to token in under 20 seconds",
        title: "Core flow · Airtime",
        text: "Quick amounts and a saved number mean most airtime purchases need no typing at all. A review sheet and PIN guard every debit, and success always ends with a shareable receipt.",
        image: "/work/duba/airtime.png",
        alt: "DUBA airtime purchase flow",
      },
      {
        type: "figure",
        eyebrow: "take control of your card from one place",
        title: "Virtual card",
        text: "Card details stay blurred until you ask for them. Freezing is a single, reversible action with a plain-language confirmation — no charges, no calls.",
        image: "/work/duba/card.png",
        alt: "DUBA virtual card screens",
      },
      {
        type: "figure",
        eyebrow: "every naira, accounted for",
        title: "Wallet & activity",
        text: "A dedicated account number makes top-ups as easy as a bank transfer. Transfers resolve the recipient’s name before you pay, and every transaction lands in a searchable history with a downloadable receipt.",
        image: "/work/duba/wallet.png",
        alt: "DUBA wallet and activity screens",
      },
      {
        type: "figure",
        eyebrow: "a small kit that scales to every bill",
        title: "UI components",
        text: "Buttons, inputs, selection chips, service tiles, navigation and list rows: a handful of parts reused across every flow.",
        image: "/work/duba/components.png",
        alt: "DUBA UI components",
      },
      {
        type: "figure",
        eyebrow: "the rest of the app, same quiet system",
        title: "Other screens",
        text: "Every remaining screen is built from the same handful of components — so login, settings and betting feel like part of one product, not add-ons.",
        image: "/work/duba/other.png",
        alt: "Other DUBA screens",
      },
    ],
    palette: [
      { name: "Ink", hex: "#080808" },
      { name: "Surface", hex: "#171717" },
      { name: "Canvas", hex: "#EEEEEE" },
      { name: "Paper", hex: "#FFFFFF" },
      { name: "Internet", hex: "#3347B9" },
      { name: "Electricity", hex: "#114F38" },
      { name: "Betting", hex: "#D9B31A" },
      { name: "Success", hex: "#2F9E44" },
      { name: "Alert", hex: "#FF5C02" },
    ],
    font: {
      family: "Plus Jakarta Sans",
      varName: "--font-jakarta",
      weights: [400, 500, 600, 700],
      note: "Carries the whole UI. Balances are Bold 32, titles Medium 24, body SemiBold 15.",
      sample: "₦350,080.00",
    },
  },
  {
    slug: "shoppa",
    title: "Shoppa",
    year: "2026",
    kind: "case",
    label: "Case study",
    summary:
      "A shopping-list app built around how people in Nigerian markets and supermarkets actually shop: in a crowd, with one free hand, often on a weak connection, and frequently buying for someone else.",
    tags: ["UI/UX", "Product Design", "Mobile App"],
    cover: "/work/shoppa/cover.png",
    coverAlt: "Shoppa shopping list app screens",
    behance: "https://www.behance.net/gallery/256754665/Shoppa",
    page: true,
    meta: [
      { k: "Role", v: "Product design, PRD, design system" },
      { k: "Team", v: "Self-initiated project" },
      { k: "Platform", v: "Mobile app · iOS & Android" },
      { k: "Year", v: "2026" },
      { k: "Tools", v: "Figma, Claude" },
      { k: "Status", v: "Concept" },
    ],
    blocks: [
      {
        type: "lead",
        eyebrow: "the idea",
        text: "Shoppa replaces the paper list with one you can share on WhatsApp, tick off with one hand, and keep using when the network drops.",
      },
      {
        type: "challenge",
        eyebrow: "the challenge",
        title: "Paper lists get lost, can’t be shared, and never tell you what is left.",
        items: [
          { title: "Lists live in one pocket", text: "If the person with the paper isn’t at the market, the list isn’t either." },
          { title: "Markets have their own units", text: "Paint, congo, tuber, bunch, tin. Generic apps default to kilograms and litres." },
          { title: "Connection is not guaranteed", text: "Many stalls have weak data. An app that waits on the network fails when it’s needed most." },
        ],
      },
      {
        type: "goals",
        eyebrow: "my approach",
        title: "Product goals",
        intro: "One list, a calm Shopping Mode, WhatsApp sharing, and offline that just works.",
        items: [],
      },
      {
        type: "figure",
        eyebrow: "what shoppa does instead",
        title: "Solutions",
        text: "Quick add with recent items and local units, a Shopping Mode with big rows and a live count, and sharing that starts with WhatsApp and syncs when you are back online.",
        image: "/work/shoppa/solutions.png",
        alt: "Shoppa solutions overview",
      },
      {
        type: "figure",
        eyebrow: "what the design depends on",
        title: "Assumptions",
        text: "No usability data yet, so instead of inventing research I wrote down what the design depends on, and what would prove it wrong.",
        image: "/work/shoppa/assumptions.png",
        alt: "Shoppa design assumptions",
      },
      {
        type: "figure",
        eyebrow: "from splash to trip done",
        title: "User flow",
        text: "Add items, check the list, share, shop, finish.",
        image: "/work/shoppa/user-flow.png",
        alt: "Shoppa user flow",
      },
      {
        type: "figure",
        eyebrow: "decision 01",
        title: "Shopping Mode is a different screen on purpose",
        text: "The list screen is for planning, so it is dense. Shopping Mode strips it down to big rows and the one number that matters: items remaining.",
        image: "/work/shoppa/decision-1.png",
        alt: "Shopping Mode screen",
      },
      {
        type: "figure",
        eyebrow: "decision 02",
        title: "WhatsApp comes first in the share sheet",
        text: "The sheet previews the exact message, so you see what your family will receive before you send it.",
        image: "/work/shoppa/decision-2.png",
        alt: "Share sheet with WhatsApp first",
      },
      {
        type: "figure",
        eyebrow: "decision 03",
        title: "Offline is designed, not an error",
        text: "A calm banner explains that changes are saved on the device and will sync later. Nothing blocks, so people keep shopping.",
        image: "/work/shoppa/decision-3.png",
        alt: "Offline state banner",
      },
      {
        type: "figure",
        eyebrow: "decision 04",
        title: "Shared lists show who did what",
        text: "Each item says who added it, and a banner at the top summarises the latest change.",
        image: "/work/shoppa/decision-4.png",
        alt: "Shared list activity",
      },
      {
        type: "figure",
        eyebrow: "a calm, light system",
        title: "Typography & colour",
        text: "One green for action, one ink for text, and colour kept for meaning so a badge is the only place it shouts. Set in Figtree.",
        image: "/work/shoppa/type-colour.png",
        alt: "Shoppa typography and colour",
      },
      {
        type: "figure",
        eyebrow: "the parts",
        title: "Components",
        text: "Navigation, buttons, inputs, chips, badges, toggles and list rows.",
        image: "/work/shoppa/components.png",
        alt: "Shoppa components",
      },
      {
        type: "figure",
        eyebrow: "everything in the app",
        title: "Feature sorting",
        text: "Sixteen areas, from splash and onboarding to offline states.",
        image: "/work/shoppa/features.png",
        alt: "Shoppa feature sorting",
      },
      {
        type: "figure",
        eyebrow: "the screens",
        title: "UI screens",
        text: "Splash, profile, search, add item, list details, shopping complete, join list and the offline home.",
        image: "/work/shoppa/screens.png",
        alt: "Shoppa UI screens",
      },
    ],
    palette: [
      { name: "Action green", hex: "#1FA855" },
      { name: "Deep green", hex: "#168A47" },
      { name: "Ink", hex: "#1C1C1E" },
      { name: "Lime", hex: "#C6DC6E" },
      { name: "Ground", hex: "#F4F4F5" },
      { name: "Info", hex: "#3B6FD0" },
      { name: "Alert", hex: "#C94A33" },
      { name: "Link", hex: "#6A4BE0" },
    ],
    font: {
      family: "Figtree",
      varName: "--font-figtree",
      weights: [400, 500, 600, 700],
      note: "Set in Figtree across the app. Sizes 12, 13, 14, 16, 18, 22, 28 and 42.",
      sample: "3 items left",
    },
  },
  {
    slug: "adunni",
    title: "Adùnní",
    year: "2026",
    kind: "website",
    label: "Website",
    summary:
      "A website for a Lagos couture atelier: hand-dyed adire, hand-woven aso-oke and made-to-measure womenswear, with bespoke fittings booked online.",
    tags: ["Web Design", "Fashion", "E-commerce"],
    cover: "/work/adunni/cover.jpg",
    coverAlt: "Adùnní homepage with an arch-framed gown hero",
    page: true,
    meta: [
      { k: "Role", v: "Web design" },
      { k: "Year", v: "2026" },
      { k: "Platform", v: "Web · desktop & mobile" },
      { k: "Type", v: "Client work" },
    ],
    blocks: [
      {
        type: "lead",
        eyebrow: "the idea",
        text: "Adùnní makes contemporary womenswear with Nigerian cloth and Nigerian hands. The site had to feel as considered as the clothes, show the collection, and turn interest into a booked fitting.",
      },
      {
        type: "changes",
        eyebrow: "what i designed",
        title: "And why it works for Adùnní",
        items: [
          { what: "An arch-framed hero puts one gown, its name and its price in front of everything else.", why: "Visitors see the work, and what it costs, before they read a word." },
          { what: "Categories run as a single serif strip under the hero: Gowns, Tailoring, Kaftans, Bridal, Aso-oke, Adire.", why: "People jump straight to what they came for without opening a menu." },
          { what: "Bespoke gets its own dark banner with the three numbers that matter: 3 weeks, 30% deposit, 12 months of alterations.", why: "The big made-to-measure questions, how long and how much, are answered up front." },
          { what: "The collection grid sits next to a Made to order panel covering sizing, timeline, delivery and aftercare.", why: "Fit and delivery worries are answered right where people decide." },
          { what: "Contact is an appointment form: in the atelier or on video, with occasion, date and budget.", why: "The concierge gets everything needed to reply in one message." },
          { what: "On mobile the hero goes full-bleed and the filters become scrollable chips.", why: "The collection stays easy to browse one-handed." },
        ],
      },
      { type: "figure", eyebrow: "01 — home", title: "Home · arch layout", image: "/work/adunni/home.jpg", alt: "Adùnní home page, full length" },
      { type: "figure", eyebrow: "02 — collections", title: "The Collection", image: "/work/adunni/collections.jpg", alt: "Adùnní collection page, full length" },
      { type: "figure", eyebrow: "03 — about", title: "About the atelier", image: "/work/adunni/about.jpg", alt: "Adùnní about page, full length" },
      { type: "figure", eyebrow: "04 — contact", title: "Contact & appointments", image: "/work/adunni/contact.jpg", alt: "Adùnní contact page, full length" },
      { type: "figure", eyebrow: "mobile", title: "The same four pages on mobile", image: "/work/adunni/mobile.jpg", alt: "Adùnní mobile pages" },
    ],
    palette: [
      { name: "Canvas", hex: "#F1F1F1" },
      { name: "Paper", hex: "#FFFFFF" },
      { name: "Sand", hex: "#EAE1D3" },
      { name: "Cream", hex: "#F6F1EA" },
      { name: "Linen", hex: "#D6CBBB" },
      { name: "Clay", hex: "#8C4A2F" },
      { name: "Stone", hex: "#6E6457" },
      { name: "Taupe", hex: "#B8AC9B" },
      { name: "Charcoal", hex: "#4A443C" },
      { name: "Ink", hex: "#1B1916" },
    ],
    font: {
      family: "Cormorant Garamond",
      varName: "--font-cormorant",
      weights: [300, 400, 500],
      note: "Display L is Light 88, H1 Regular 60, H2 Regular 44. Italics carry the second half of every headline.",
      sample: "Heritage Couture",
    },
  },
  {
    slug: "saaspro",
    title: "SaasPro",
    year: "2026",
    kind: "dashboard",
    label: "Dashboard",
    summary:
      "A sales dashboard for online stores: revenue, orders, customers, stock and reports in one dark, data-dense workspace.",
    tags: ["Dashboard", "SaaS", "Product Design"],
    cover: "/work/saaspro/cover.jpg",
    coverAlt: "SaasPro sales dashboard in a browser window",
    page: true,
    meta: [
      { k: "Role", v: "Product design" },
      { k: "Year", v: "2026" },
      { k: "Platform", v: "Web app · desktop" },
      { k: "Scope", v: "10 dashboard screens" },
    ],
    blocks: [
      {
        type: "lead",
        eyebrow: "the idea",
        text: "SaasPro gives a store owner one place to see how the business is doing: what sold, where it sold, what is running out and who needs a reply.",
      },
      {
        type: "changes",
        eyebrow: "what i designed",
        title: "And why it works for SaasPro",
        items: [
          { what: "The dashboard opens with a greeting that states today's work: 50 orders delivered, 20 to send out.", why: "The first thing on screen is what needs doing next." },
          { what: "Four KPI cards, each with a coloured edge and its change since last month.", why: "The health of the store reads in one glance." },
          { what: "One sales chart with Sales, Orders and Customers tabs, 7D / 30D / 1Y ranges and a hover value.", why: "One chart answers many questions without opening new pages." },
          { what: "An Insights panel flags sales spikes and low stock beside sales by country.", why: "Problems surface without digging through reports." },
          { what: "The same sidebar and header run through all ten screens, and every table shares search, filter and export.", why: "Learn it once, use it everywhere." },
          { what: "Reports turn the same numbers into monthly revenue and revenue by category, with saved reports ready to download as CSV.", why: "The owner can hand figures to an accountant without rebuilding them." },
        ],
      },
      { type: "figure", eyebrow: "overview", title: "Sales dashboard", image: "/work/saaspro/dashboard-full.jpg", alt: "SaasPro sales dashboard, full screen" },
      { type: "figure", eyebrow: "catalogue", title: "Products", image: "/work/saaspro/products-full.jpg", alt: "SaasPro products screen" },
      { type: "figure", eyebrow: "people", title: "Customers", image: "/work/saaspro/customers-full.jpg", alt: "SaasPro customers screen" },
      { type: "figure", eyebrow: "money", title: "Transactions", image: "/work/saaspro/transactions-full.jpg", alt: "SaasPro transactions screen" },
      { type: "figure", eyebrow: "numbers", title: "Reports", image: "/work/saaspro/reports-full.jpg", alt: "SaasPro reports screen" },
      { type: "figure", eyebrow: "alerts", title: "Notifications", image: "/work/saaspro/notifications-full.jpg", alt: "SaasPro notifications screen" },
      { type: "figure", eyebrow: "account", title: "Settings", image: "/work/saaspro/settings-full.jpg", alt: "SaasPro settings screen" },
    ],
    palette: [
      { name: "Canvas", hex: "#181818" },
      { name: "Deep", hex: "#101010" },
      { name: "Panel", hex: "#202020" },
      { name: "Line", hex: "#303030" },
      { name: "Muted", hex: "#A0A0A0" },
      { name: "Text", hex: "#FFFFFF" },
      { name: "Primary", hex: "#3878FF" },
      { name: "Navy", hex: "#284888" },
      { name: "Up", hex: "#02BE08" },
      { name: "Orders", hex: "#FF8806" },
      { name: "Down", hex: "#FF1312" },
      { name: "Conversion", hex: "#A5C74B" },
      { name: "Returning", hex: "#6068D2" },
    ],
  },
  {
    slug: "saaspro-website",
    title: "SaasPro Website",
    year: "2026",
    kind: "website",
    label: "Website",
    summary:
      "The marketing site for SaasPro: a homepage, features, pricing and contact page that sell the sales dashboard by showing it.",
    tags: ["Web Design", "Landing Page", "SaaS"],
    cover: "/work/saaspro-website/cover.jpg",
    coverAlt: "SaasPro homepage hero with the dashboard below it",
    page: true,
    meta: [
      { k: "Role", v: "Web design" },
      { k: "Year", v: "2026" },
      { k: "Platform", v: "Web · desktop" },
      { k: "Pages", v: "Home, Features, Pricing, Contact" },
    ],
    blocks: [
      {
        type: "lead",
        eyebrow: "the idea",
        text: "A dark, product-first site for the SaasPro dashboard. Every page leads with the real product, so visitors see what they are signing up for before they read about it.",
      },
      {
        type: "changes",
        eyebrow: "what i designed",
        title: "And why it works for SaasPro",
        items: [
          { what: "The hero is one line, Unlock Your Sales Potential, with a single Start free Trial button and the live dashboard rising beneath it.", why: "The promise and the proof arrive together." },
          { what: "A strip of customer logos sits straight under the hero: Built for industry leaders.", why: "Trust comes before the feature list." },
          { what: "Features are shown as small working pieces of the dashboard: know your numbers, never run out of stock, see where you sell.", why: "Each benefit is something visitors can already see working." },
          { what: "Up and running in three steps: add products, start selling, grow with insights.", why: "Setup feels small before anyone signs up." },
          { what: "Pricing is three plans with Pro highlighted, a monthly or yearly toggle, and the answers to pricing questions right below.", why: "The choice is simple and the doubts are answered on the same page." },
          { what: "The same navigation pill, glow and Ready to grow your sales? banner close every page.", why: "Every page ends at the same next step." },
        ],
      },
      { type: "figure", eyebrow: "01 — home", title: "Homepage", image: "/work/saaspro-website/home.jpg", alt: "SaasPro homepage, full length" },
      { type: "figure", eyebrow: "02 — features", title: "Features", image: "/work/saaspro-website/features.jpg", alt: "SaasPro features page, full length" },
      { type: "figure", eyebrow: "03 — pricing", title: "Pricing", image: "/work/saaspro-website/pricing.jpg", alt: "SaasPro pricing page, full length" },
      { type: "figure", eyebrow: "04 — contact", title: "Contact", image: "/work/saaspro-website/contact.jpg", alt: "SaasPro contact page" },
    ],
    palette: [
      { name: "Night", hex: "#081018" },
      { name: "Canvas", hex: "#181818" },
      { name: "Panel", hex: "#202020" },
      { name: "Line", hex: "#303030" },
      { name: "Glow", hex: "#2858B0" },
      { name: "Navy", hex: "#284888" },
      { name: "Primary", hex: "#3878FF" },
      { name: "Muted", hex: "#A0A0A0" },
      { name: "Text", hex: "#FFFFFF" },
    ],
  },
  {
    slug: "duba-website",
    title: "DUBA Website",
    year: "2026",
    kind: "website",
    label: "Website",
    summary: "Marketing site for DUBA explaining its top-ups and virtual card on one page.",
    tags: ["Web Design", "Landing Page", "Fintech"],
    cover: "/work/duba-website.jpg",
    coverAlt: "DUBA marketing website",
    live: "https://duba-landing.vercel.app/",
    page: true,
    meta: [
      { k: "Role", v: "Web design & build" },
      { k: "Year", v: "2026" },
      { k: "Platform", v: "Web · landing page" },
      { k: "Status", v: "Live" },
    ],
    blocks: [
      {
        type: "lead",
        eyebrow: "the idea",
        text: "Marketing site for DUBA explaining its top-ups and virtual card on one page.",
      },
    ],
    palette: [
      { name: "Ink", hex: "#080808" },
      { name: "Surface", hex: "#0D0D0D" },
      { name: "Canvas", hex: "#F5F5F5" },
      { name: "Paper", hex: "#FFFFFF" },
      { name: "Internet tint", hex: "#F4F3FD" },
      { name: "Electricity tint", hex: "#F1F6F3" },
      { name: "Betting tint", hex: "#FCF9EE" },
      { name: "Electricity", hex: "#114F38" },
      { name: "Alert", hex: "#FF5C02" },
    ],
    font: {
      family: "Plus Jakarta Sans",
      varName: "--font-jakarta",
      weights: [400, 500, 600, 700],
      note: "The same UI typeface as the app, so the site and the product read as one brand. Kodchasan Bold is kept for the wordmark.",
      sample: "Pay every bill from one place",
    },
  },
  {
    slug: "dearly",
    title: "Dearly",
    year: "2026",
    kind: "case",
    label: "Application",
    summary:
      "A sketchbook-style letter app: write handwritten-style letters on customisable digital stationery, export them as PNG, JPG or PDF, or send a link that opens as a sealed, animated envelope.",
    tags: ["Product Design", "Web App", "Vibecoded"],
    cover: "/work/dearly/cover.jpg",
    coverAlt: "Dearly letter app screens",
    live: "https://dearly-sand.vercel.app/",
    page: true,
    meta: [
      { k: "Role", v: "Designer & Builder" },
      { k: "Year", v: "2026" },
      { k: "Technology", v: "Next.js, React, Tailwind CSS, PostgreSQL, Framer Motion" },
      { k: "Status", v: "Live" },
    ],
    blocks: [
      {
        type: "lead",
        eyebrow: "the idea",
        text: "Some things are better written. Dearly turns your words into letters that feel like real paper — and real post.",
      },
      {
        type: "goals",
        eyebrow: "the product",
        title: "Write it, make it yours, send it anywhere",
        items: [
          { title: "Write", text: "Ten handwriting fonts from elegant script to neat print, seven ink colours, and a letter that autosaves to your account as you type." },
          { title: "Paper", text: "Pick the paper colour and style — blank, lined, dotted, grid and more — at A4 or A5." },
          { title: "Decorate", text: "Hearts, flowers, stars and butterflies you can drag, resize and rotate. They sit beneath your ink, so words always stay readable." },
          { title: "Templates", text: "Ready-made stationery across Love, Birthday, Thank You, Vintage, Friendship, Heroes, Anime and more. Every detail stays editable." },
          { title: "Send", text: "A link that opens as a sealed envelope with a wax seal. The recipient needs no app and no account, and you can revoke the link any time." },
          { title: "Export", text: "Download the letter as PNG, JPG or a true-size PDF at around 300 dpi." },
        ],
      },
      {
        type: "goals",
        eyebrow: "under the hood",
        title: "One renderer, everywhere",
        items: [
          { text: "One Paper component renders the letter at true size; the editor, previews, thumbnails, exports and the recipient view all use it" },
          { text: "Accounts with hashed passwords and httpOnly session cookies; drafts are stored per account" },
          { text: "Share links are immutable snapshots with live status and open counts, and can be revoked" },
          { text: "The envelope is built from separate layers — back, letter, pocket, 3D flap and a split wax seal — choreographed with Framer Motion, with a reduced-motion fallback" },
        ],
      },
      {
        type: "timeline",
        eyebrow: "how i built it",
        title: "Built with AI",
        steps: workflow.map((w, i) => ({ when: `Step 0${i + 1}`, title: w.title, text: w.text })),
      },
    ],
    palette: [
      { name: "Canvas", hex: "#ECEBE7" },
      { name: "Surface", hex: "#F8F7F4" },
      { name: "Cream", hex: "#EFE8DC" },
      { name: "Blush", hex: "#F6E2E5" },
      { name: "Sage", hex: "#DFE9E1" },
      { name: "Line", hex: "#D9D6CF" },
      { name: "Faint", hex: "#A19D95" },
      { name: "Muted", hex: "#6E6B65" },
      { name: "Ink", hex: "#1C1B19" },
      { name: "Wax", hex: "#8E2436" },
    ],
    font: {
      family: "Shadows Into Light Two",
      varName: "--font-shadows",
      weights: [400],
      note: "The hand-drawn UI face for titles, buttons and navigation. DM Sans carries body copy, and letters themselves can be set in ten handwriting fonts.",
      sample: "Some things are better written.",
    },
  },
  {
    slug: "folat",
    title: "Folat",
    year: "2026",
    kind: "case",
    label: "Application",
    summary:
      "A savings book for people who run December food savings: record every customer's payment, see who is behind, send statements on WhatsApp and run distribution day.",
    tags: ["Fintech", "Web App", "Vibecoded"],
    cover: "/work/folat/cover.jpg",
    coverAlt: "Folat savings app screens",
    live: "https://folat-theta.vercel.app",
    page: true,
    video: { src: "/work/folat/demo/demo.mp4", poster: "/work/folat/demo/demo-poster.jpg", bg: "#E9DFC8", caption: "A walk through Folat: recording a payment, following up and sending a statement." },
    meta: [
      { k: "Role", v: "Designer & Builder" },
      { k: "Year", v: "2026" },
      { k: "Technology", v: "React, Vite, TypeScript, Supabase, WhatsApp Cloud API" },
      { k: "Status", v: "Live" },
    ],
    blocks: [
      {
        type: "lead",
        eyebrow: "the idea",
        text: "Folat started as a savings book for my mum's December food savings: customers pay daily, weekly or monthly, and in December everyone collects what they saved. It replaced a notebook and a WhatsApp bot, and now anyone running a savings scheme can open an account.",
      },
      {
        type: "changes",
        eyebrow: "what i designed",
        title: "And why it works for Folat",
        items: [
          { what: "Every customer's page leads with what they have paid, how far behind they are, and one Record payment button.", why: "The question she hears most, how much have I paid, is answered at a glance." },
          { what: "Statements are sent as a WhatsApp message from her own number, already typed out.", why: "No bot fees, and customers hear from someone they trust." },
          { what: "Follow up splits customers who are behind from those who have stopped paying, each with a Remind button.", why: "She chases the right people first." },
          { what: "Distribution day has its own screen: tick off each customer as they collect their food.", why: "The December hand-out stays organised, even on a busy day." },
          { what: "Money, “behind by” and the CSV report run on the same code as the WhatsApp bot.", why: "The app and the bot never disagree on a number." },
          { what: "It installs from the browser to the home screen and stays signed in.", why: "It opens like an app, with no app store." },
        ],
      },
      {
        type: "timeline",
        eyebrow: "how i built it",
        title: "Built with AI",
        steps: workflow.map((w, i) => ({ when: `Step 0${i + 1}`, title: w.title, text: w.text })),
      },
    ],
    palette: [
      { name: "Paper", hex: "#FFFFFF" },
      { name: "Mist", hex: "#F3F3F1" },
      { name: "Pill", hex: "#F5F5F3" },
      { name: "Line", hex: "#ECECE8" },
      { name: "Sand", hex: "#E9DFC8" },
      { name: "Gold", hex: "#E8BF55" },
      { name: "Good", hex: "#1F9D55" },
      { name: "Good tint", hex: "#E3F3EA" },
      { name: "Bad", hex: "#D93B3B" },
      { name: "Bad tint", hex: "#FBEAEA" },
      { name: "Muted", hex: "#8A8A90" },
      { name: "Ink", hex: "#0E0E10" },
    ],
    font: {
      family: "System UI (SF Pro)",
      varName: "--font-system",
      weights: [400, 500, 600, 700],
      note: "The phone's own typeface, with tabular numbers so every naira lines up in a column.",
      sample: "₦525,000 collected",
    },
  },
  {
    slug: "duo-deck",
    title: "Duo Deck",
    year: "2026",
    kind: "case",
    label: "Application",
    summary:
      "A free conversation-card game for couples. Pick a deck, take turns and talk: together on one phone, or apart by sending a card on WhatsApp. It installs from the browser and works offline.",
    tags: ["Product Design", "Web App", "Vibecoded"],
    cover: "/work/duo-deck/cover.jpg",
    coverAlt: "Duo Deck card game screens",
    live: "https://duo-deck.vercel.app/",
    page: true,
    meta: [
      { k: "Role", v: "Designer & Builder" },
      { k: "Year", v: "2026" },
      { k: "Technology", v: "Next.js, Tailwind CSS, Framer Motion, Supabase, PWA" },
      { k: "Status", v: "Live" },
    ],
    blocks: [
      {
        type: "lead",
        eyebrow: "the idea",
        text: "Real talk, closer hearts. Duo Deck is a set of card games that get two people talking about the things that matter. Free, no sign-up, and it plays close or far apart.",
      },
      {
        type: "changes",
        eyebrow: "what i designed",
        title: "And why it works for Duo Deck",
        items: [
          { what: "Every onboarding screen has Skip, and Home's Play now goes straight into a game.", why: "The first card is never more than two taps away." },
          { what: "A three-question quiz (how long together, the mood, clean or spicy) shapes the For you decks.", why: "The first deck suggested already fits the couple." },
          { what: "Accounts are optional: guests can play every deck, and signing in only syncs favourites and history.", why: "No sign-up wall between a couple and the first question." },
          { what: "Cards are big, swipeable and take turns by name, with skip, favourite and share always one tap away.", why: "It reads aloud like a real card game, passed between two people." },
          { what: "Would You Rather is pass-the-phone: one picks in secret, then the partner, then both answers are revealed.", why: "Nobody copies the other's answer." },
          { what: "Spicy decks stay hidden behind an 18+ check and a content filter that is on by default.", why: "It is safe to open in front of anyone, and faith-friendly out of the box." },
        ],
      },
      {
        type: "timeline",
        eyebrow: "how i built it",
        title: "Built with AI",
        steps: workflow.map((w, i) => ({ when: `Step 0${i + 1}`, title: w.title, text: w.text })),
      },
    ],
    palette: [
      { name: "Background", hex: "#000000" },
      { name: "Surface", hex: "#141217" },
      { name: "Surface 2", hex: "#1C1A20" },
      { name: "Border", hex: "#2E2B33" },
      { name: "Muted", hex: "#A7A3AD" },
      { name: "Cream card", hex: "#FFF1E8" },
      { name: "Pink", hex: "#EC6F96" },
      { name: "Pink strong", hex: "#D9406F" },
      { name: "Pink softer", hex: "#F5B3C6" },
      { name: "Magenta", hex: "#C8177E" },
      { name: "Orange", hex: "#E8961F" },
      { name: "Yellow", hex: "#FFC24B" },
      { name: "Sky", hex: "#5E95E3" },
      { name: "Blue", hex: "#1E5FD9" },
    ],
    font: {
      family: "Bagel Fat One",
      varName: "--font-bagel",
      weights: [400],
      note: "Bagel Fat One for the logo and headings. Outfit for the interface and the card prompts, which have to read well aloud.",
      sample: "Real talk, closer hearts.",
    },
  },
  {
    slug: "mealio",
    title: "Mealio",
    year: "2025",
    kind: "case",
    label: "Case study",
    summary:
      "A modern food delivery app that helps users quickly discover restaurants, filter food options and place orders with minimal friction.",
    tags: ["UI/UX", "Food Delivery", "Mobile App"],
    cover: "/work/mealio/cover.png",
    coverAlt: "Mealio food delivery app screens",
    behance: "https://www.behance.net/gallery/239472869/MEALIO-Food-Ordering-and-Delivery-App",
    page: true,
    meta: [
      { k: "Role", v: "UI/UX Designer" },
      { k: "Platform", v: "iOS mobile app" },
      { k: "Year", v: "2025" },
      { k: "Tools", v: "Figma" },
      { k: "Status", v: "Concept" },
    ],
    blocks: [
      {
        type: "lead",
        eyebrow: "the idea",
        text: "This project focuses on designing a modern and effortless food delivery application that helps users quickly discover restaurants, filter food options, and place orders with minimal friction. The goal was to create a clean, intuitive interface that improves food discovery and ordering for users in busy urban environments.",
      },
      {
        type: "challenge",
        eyebrow: "the challenge",
        title: "The challenge was to design a food delivery app that solves these pain points with speed, clarity, and personalization.",
        who: "Jessica works long hours and barely has time to cook. She values speed, convenience and reliability, and wants to order food quickly — preferably in under 2 minutes — without scrolling endlessly.",
        why: "Too many options, weak filters and slow checkouts lead to frustration, abandoned carts, and slow decision-making.",
        items: [],
      },
      {
        type: "research",
        eyebrow: "what i found out",
        title: "Research",
        methods: ["User interviews (10 participants)", "Competitor analysis (UberEats, JumiaFood, Glovo)", "Survey on ordering behaviors"],
        findings: [
          "84% of users rely on search before browsing menus",
          "Users want clear delivery times and transparent pricing",
          "Filters are underused because they feel complex or hidden",
          "Most users reorder the same meals regularly",
          "Speed and convenience are the biggest factors in app choice",
        ],
        lists: [
          {
            title: "Pain points",
            items: [
              "Too many restaurant options",
              "Difficulty finding preferred cuisines quickly",
              "Poor filtering systems",
              "Slow and confusing checkout processes",
              "Cluttered, visually overwhelming interfaces",
            ],
          },
          {
            title: "User needs",
            items: [
              "Find food fast without browsing too much",
              "See delivery time clearly",
              "Reorder usual meals easily",
              "Get meals within budget",
            ],
          },
        ],
      },
      {
        type: "goals",
        eyebrow: "my approach",
        title: "Product goals",
        items: [
          { text: "Make food discovery fast, relevant, and personalized" },
          { text: "Create an easy ordering experience with minimal steps" },
          { text: "Ensure users can filter and find exactly what they want without frustration" },
          { text: "Improve conversion rates by simplifying the search → select → order journey" },
          { text: "Deliver a clean visual aesthetic that enhances usability and trust" },
        ],
      },
      {
        type: "figure",
        eyebrow: "what it does",
        title: "App features",
        text: "With Mealio, food ordering has never been so easy. Just open your app and order food from your favorite restaurant.",
        image: "/work/mealio/features.png",
        alt: "Mealio app features",
      },
      {
        type: "figure",
        eyebrow: "first impressions",
        title: "Splash & onboarding",
        text: "A calm splash screen and two onboarding screens that set expectations: discover meals, track orders, check out securely.",
        image: "/work/mealio/onboarding.png",
        alt: "Mealio splash and onboarding",
      },
      {
        type: "figure",
        eyebrow: "getting in",
        title: "Secured sign-up & login",
        text: "Login, sign-up and password reset, with Google and Apple as quick alternatives.",
        image: "/work/mealio/signup.png",
        alt: "Mealio sign-up and login",
      },
      {
        type: "figure",
        eyebrow: "finding food fast",
        title: "Home & product pages",
        text: "Search sits at the top of home, followed by category chips, restaurants and popular meals. Meal and restaurant pages keep price, delivery time and add-ons in view.",
        image: "/work/mealio/home.png",
        alt: "Mealio home and product pages",
      },
      {
        type: "figure",
        eyebrow: "paying without friction",
        title: "Cart & checkout flow",
        text: "Cart totals are broken down clearly, and checkout keeps delivery location and payment method on one screen.",
        image: "/work/mealio/cart.png",
        alt: "Mealio cart and checkout",
      },
      {
        type: "figure",
        eyebrow: "browse and track",
        title: "Explore & order pages",
        text: "Explore lists meals with simple filters. Orders show status at a glance, with step-by-step tracking in the details.",
        image: "/work/mealio/explore.png",
        alt: "Mealio explore and orders",
      },
      {
        type: "figure",
        eyebrow: "everything else",
        title: "Other screens",
        text: "Search, filters, notifications, messaging, calls and profile.",
        image: "/work/mealio/other.png",
        alt: "Other Mealio screens",
      },
      {
        type: "figure",
        eyebrow: "the ui kit",
        title: "Typography & colour",
        text: "Roboto throughout, with one fresh green (#14B74D) against near-black, light grey and mid grey.",
        image: "/work/mealio/ui-kit.png",
        alt: "Mealio UI kit",
      },
    ],
    palette: [
      { name: "Fresh green", hex: "#14B74D" },
      { name: "Near-black", hex: "#1A1A1A" },
      { name: "Light grey", hex: "#F7F7F7" },
      { name: "Mid grey", hex: "#A1A1A1" },
    ],
    font: {
      family: "Roboto",
      varName: "--font-roboto",
      weights: [400, 500, 700],
      note: "Roboto throughout. Headlines step 36, 32, 24, 16 and 12px.",
      sample: "Order in under 2 minutes",
    },
  },
  {
    slug: "picta",
    title: "Picta",
    year: "2026",
    kind: "vibecoded",
    label: "Application",
    summary:
      "A two-player draw-and-guess game for the phone. One player draws a secret word, the other guesses it. Play on one phone by passing it back and forth, or on two phones over the internet.",
    tags: ["Game", "Web App", "Vibecoded"],
    cover: "/work/picta/cover.jpg",
    coverAlt: "Picta draw-and-guess game",
    live: "https://picta-game.vercel.app",
    page: true,
    meta: [
      { k: "Role", v: "Designer & Builder" },
      { k: "AI tools", v: "Claude" },
      { k: "Technology", v: "React, Vite, Tailwind CSS, Supabase" },
      { k: "Status", v: "Live" },
    ],
    blocks: [
      {
        type: "lead",
        eyebrow: "the problem",
        text: "Drawing games are usually built for a room full of people and a big screen. I wanted one that works for two people with just a phone, whether they are sitting together or apart.",
      },
      {
        type: "goals",
        eyebrow: "the product",
        title: "What it is, and what I built",
        items: [
          {
            title: "What it is",
            text: "A draw-and-guess game for two. Three modes: Pass N play on one phone, Play online on two phones, and Freestyle for drawing with no timer.",
          },
          {
            title: "What I built",
            text: "The whole game: splash and home screens, the drawing canvas with stroke widths, undo and clear, timed rounds and scoring, and online play over a realtime channel.",
          },
        ],
      },
      {
        type: "figure",
        eyebrow: "the flow",
        title: "From the home screen to the final guess",
        image: "/work/picta/flow.jpg",
        alt: "Picta game flow",
      },
      {
        type: "timeline",
        eyebrow: "how i built it",
        title: "Built with AI",
        steps: workflow.map((w, i) => ({ when: `Step 0${i + 1}`, title: w.title, text: w.text })),
      },
    ],
    palette: [
      { name: "Paper", hex: "#FBFAF6" },
      { name: "Cream", hex: "#FFF8EC" },
      { name: "Slate", hex: "#2B3A4A" },
      { name: "Mist", hex: "#8B9AA8" },
      { name: "Tape yellow", hex: "#FFC531" },
      { name: "Draws coral", hex: "#FF5C63" },
      { name: "Guesses mint", hex: "#22D3A0" },
    ],
    font: {
      family: "Fredoka",
      varName: "--font-fredoka",
      weights: [400, 500, 600, 700],
      note: "Fredoka for the logo and headings, DM Mono for the small spaced-out labels.",
      sample: "draw it, pass it, guess it",
    },
  },
  {
    slug: "morenikeji",
    title: "Morenikeji Collections",
    year: "2026",
    kind: "website",
    label: "Website",
    summary:
      "An online store for the Nigerian market with delivery across Nigeria and card, transfer or USSD payment.",
    tags: ["Web Design", "E-commerce", "Fashion"],
    cover: "/work/morenikeji-website.jpg",
    coverAlt: "Morenikeji Collections online store",
    live: "https://morenikejicollections.netlify.app/",
    page: true,
    meta: [
      { k: "Role", v: "Web design & build" },
      { k: "Year", v: "2026" },
      { k: "Platform", v: "Web · online store" },
      { k: "Status", v: "Live" },
    ],
    blocks: [
      {
        type: "lead",
        eyebrow: "the idea",
        text: "An online store for the Nigerian market with delivery across Nigeria and card, transfer or USSD payment.",
      },
    ],
    palette: [
      { name: "Ground", hex: "#F7F8F5" },
      { name: "Mint", hex: "#E6EEE8" },
      { name: "Sand", hex: "#EFE8D8" },
      { name: "Paper", hex: "#FFFFFF" },
      { name: "Lime", hex: "#8BEF5A" },
      { name: "Navy", hex: "#071A2B" },
      { name: "Ink", hex: "#101828" },
      { name: "Slate", hex: "#667085" },
    ],
    font: {
      family: "Instrument Sans",
      varName: "--font-instrument-sans",
      weights: [400, 500, 600],
      note: "Instrument Sans for the interface and product copy, Jost for the wordmark.",
      sample: "Your Style Starts Here.",
    },
  },
];

export const caseStudies = projects.filter((p) => p.page);

export function projectHref(p: Project) {
  return `#${p.slug}`;
}

export function nextProject(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}
