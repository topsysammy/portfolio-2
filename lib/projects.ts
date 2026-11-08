import { workflow } from "./data";

export type Kind = "case" | "website" | "vibecoded";

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
