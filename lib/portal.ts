import proportions from "./proportions.json";

export type Screen = { src: string; label: string; web?: boolean; statusBar?: boolean; island?: boolean; safeBottom?: boolean };
export type PortalExtra = {
  icon: { text: string; bg: string; fg: string };
  wordmark: { text: string; font: string; weight: number };
  banner: string; // image used (blurred) behind the wordmark
  dark?: boolean;
  screens: Screen[];
  proportions: [string, number][];
  extraFonts?: { family: string; varName: string; use: string }[];
  screensCaption?: string;
};

/** Phone screens. `statusBar`: add a 9:41 bar (for captures without one). `island`: draw a Dynamic Island (off when the design already has one). */
const phone = (dir: string, names: [string, string][], o: { statusBar?: boolean; island?: boolean; safeBottom?: boolean } = {}): Screen[] =>
  names.map(([f, label]) => ({ src: `/work/${dir}/screens/${f}.jpg`, label, statusBar: o.statusBar ?? true, island: o.island ?? true, safeBottom: o.safeBottom ?? false }));
const web = (dir: string, labels: string[]): Screen[] =>
  labels.map((label, i) => ({ src: `/work/${dir}/screens/s${i + 1}.jpg`, label, web: true }));

const P = proportions as unknown as Record<string, [string, number][]>;

export const portal: Record<string, PortalExtra> = {
  duba: {
    icon: { text: "d", bg: "linear-gradient(150deg,#2a2a2a,#080808)", fg: "#fff" },
    wordmark: { text: "DUBA", font: "--font-kodchasan", weight: 700 },
    banner: "/work/duba-cover.png",
    dark: true,
    screens: phone("duba", [
      ["splash", "Splash"], ["welcome", "Welcome"], ["sign-up", "Sign up"], ["verify-email", "Verify email"],
      ["create-pin", "Create PIN"], ["all-set", "All set"], ["login", "Login"], ["forgot-password", "Forgot password"],
      ["confirm-pin", "Confirm PIN"], ["betting", "Betting"], ["settings", "Settings"],
    ], { statusBar: false }),
    proportions: P.duba,
    extraFonts: [{ family: "Kodchasan", varName: "--font-kodchasan", use: "Wordmark" }],
  },
  shoppa: {
    icon: { text: "s", bg: "linear-gradient(150deg,#2bc067,#168a47)", fg: "#fff" },
    wordmark: { text: "Shoppa", font: "--font-figtree", weight: 700 },
    banner: "/work/shoppa/cover.png",
    screens: phone("shoppa", [
      ["splash", "Splash"], ["offline-home", "Home (offline)"], ["list-details", "List details"], ["add-item", "Add item"],
      ["search", "Search"], ["join-list", "Join list"], ["shopping-complete", "Shopping complete"], ["profile", "Profile"],
    ]),
    proportions: P.shoppa,
  },
  adunni: {
    icon: { text: "a", bg: "linear-gradient(150deg,#a85c3c,#8c4a2f)", fg: "#f6f1ea" },
    wordmark: { text: "Adùnní", font: "--font-cormorant", weight: 400 },
    banner: "/work/adunni/cover.jpg",
    screens: [
      ...web("adunni", ["Home", "New in", "Bespoke", "Collection", "About", "Principles", "Contact"]),
      ...phone("adunni", [["m-home", "Home · mobile"], ["m-collections", "Collection · mobile"], ["m-about", "About · mobile"], ["m-contact", "Contact · mobile"]]),
    ],
    proportions: P.adunni,
    screensCaption: "Exported from the Figma file: desktop first, then mobile. Scroll sideways, click to enlarge.",
    extraFonts: [{ family: "Manrope", varName: "--font-manrope", use: "Body, labels & buttons" }],
  },
  saaspro: {
    icon: { text: "s", bg: "linear-gradient(150deg,#4a86ff,#2a5fd6)", fg: "#ffffff" },
    wordmark: { text: "SaasPro", font: "--font-system", weight: 700 },
    banner: "/work/saaspro/cover.jpg",
    dark: true,
    screens: web("saaspro", [
      "Sales dashboard", "Products", "Customers", "Transactions", "Reports", "Notifications", "Profile", "Help & FAQs", "Settings", "Help Centre",
    ]),
    proportions: P.saaspro,
    screensCaption: "Exported from the Figma file: all ten dashboard screens. Scroll sideways, click to enlarge.",
  },
  "legacy-homes-web": {
    icon: { text: "L", bg: "linear-gradient(150deg,#5d726b,#3a4a45)", fg: "#ffffff" },
    wordmark: { text: "LEGACY HOMES", font: "--font-satoshi", weight: 900 },
    banner: "/work/legacy-homes-web/cover.jpg",
    dark: true,
    screens: web("legacy-homes-web", [
      "Search", "Search filter", "Saved properties", "Saved · empty", "Profile", "Edit profile", "Settings", "Notifications", "Notifications · empty", "Messages",
    ]),
    proportions: P["legacy-homes-web"],
    screensCaption: "Exported from the Figma file. Scroll sideways, click to enlarge.",
  },
  "legacy-homes-website": {
    icon: { text: "L", bg: "linear-gradient(150deg,#5d726b,#3a4a45)", fg: "#ffffff" },
    wordmark: { text: "Legacy Homes", font: "--font-satoshi", weight: 700 },
    banner: "/work/legacy-homes-website/cover.jpg",
    dark: true,
    screens: web("legacy-homes-website", ["Hero & search", "Popular properties", "How we help", "Install the app", "Success stories", "FAQs & footer"]),
    proportions: P["legacy-homes-website"],
    screensCaption: "Exported from the Figma file, section by section. Scroll sideways, click to enlarge.",
  },
  "saaspro-website": {
    icon: { text: "s", bg: "linear-gradient(150deg,#4a86ff,#2a5fd6)", fg: "#ffffff" },
    wordmark: { text: "SaasPro", font: "--font-system", weight: 700 },
    banner: "/work/saaspro-website/cover.jpg",
    dark: true,
    screens: web("saaspro-website", [
      "Home · hero", "Home · features", "Home · three steps", "Home · pricing", "Home · FAQ",
      "Features · hero", "Features · at a glance", "Pricing · plans", "Pricing · questions", "Contact",
    ]),
    proportions: P["saaspro-website"],
    screensCaption: "Exported from the Figma file. Scroll sideways, click to enlarge.",
  },
  "duba-website": {
    icon: { text: "d", bg: "linear-gradient(150deg,#ff7a2e,#ff5c02)", fg: "#fff" },
    wordmark: { text: "DUBA", font: "--font-kodchasan", weight: 700 },
    banner: "/work/duba-website.jpg",
    dark: true,
    screens: web("duba-website", ["Hero", "Services", "Airtime & data", "Electricity", "Virtual card"]),
    proportions: P["duba-website"],
    extraFonts: [{ family: "Kodchasan", varName: "--font-kodchasan", use: "Wordmark" }],
  },
  dearly: {
    icon: { text: "d", bg: "linear-gradient(150deg,#a8344a,#8e2436)", fg: "#f8f7f4" },
    wordmark: { text: "Dearly", font: "--font-shadows", weight: 400 },
    banner: "/work/dearly/cover.jpg",
    screens: phone("dearly", [
      ["welcome", "Welcome"], ["make-it-yours", "Make it yours"], ["send-anywhere", "Send it anywhere"], ["signup", "Sign up"],
      ["home", "Home"], ["templates", "Templates"], ["template", "Template preview"], ["write", "Write"],
      ["paper", "Paper"], ["decorate", "Decorate"], ["letters", "Collection"], ["profile", "Profile"],
    ]),
    proportions: P.dearly,
    screensCaption: "Captured from the app at phone size. Scroll sideways, click to enlarge.",
    extraFonts: [
      { family: "DM Sans", varName: "--font-dm-sans", use: "Body copy" },
      { family: "Instrument Serif", varName: "--font-instrument", use: "Editorial accents" },
    ],
  },
  folat: {
    icon: { text: "f", bg: "linear-gradient(150deg,#2a2a2e,#0e0e10)", fg: "#e8bf55" },
    wordmark: { text: "Folat", font: "--font-system", weight: 700 },
    banner: "/work/folat/cover.jpg",
    screens: phone("folat", [
      ["login", "Sign in"], ["home", "Home"], ["customers", "Customers"], ["customer", "Customer"],
      ["record-payment", "Record payment"], ["owing", "Follow up"], ["today", "Payments"], ["report", "Report"],
      ["distribution", "Distribution day"], ["add-customer", "New customer"], ["settings", "Settings"],
    ]),
    proportions: P.folat,
    screensCaption: "Captured from the app at phone size, filled with made-up customers. Scroll sideways, click to enlarge.",
  },
  "duo-deck": {
    icon: { text: "d", bg: "linear-gradient(150deg,#f09ab3,#d9406f)", fg: "#ffffff" },
    wordmark: { text: "duo deck.", font: "--font-bagel", weight: 400 },
    banner: "/work/duo-deck/cover.jpg",
    screens: phone("duo-deck", [
      ["on-1", "Welcome"], ["on-2", "Play close or far apart"], ["quiz-1", "Quiz · together"], ["quiz-2", "Quiz · mood"], ["quiz-3", "Quiz · content"],
      ["home", "Home"], ["deck-deep-talk", "Deck · Deep Talk"], ["play-deep-talk", "Play · Deep Talk"], ["play-first-spark", "Play · First Spark"],
      ["play-this-or-that", "Would You Rather"], ["deck-long-distance", "Deck · Long Distance"], ["saved", "Saved"], ["us", "Us"], ["on-3", "Create account"],
    ], { safeBottom: true }),
    proportions: P["duo-deck"],
    screensCaption: "Captured from the live app at phone size, playing as a guest. Scroll sideways, click to enlarge.",
    extraFonts: [{ family: "Outfit", varName: "--font-outfit", use: "Interface & card prompts" }],
  },
  "legacy-homes": {
    icon: { text: "L", bg: "linear-gradient(150deg,#5d726b,#3a4a45)", fg: "#ffffff" },
    wordmark: { text: "LEGACY HOMES", font: "--font-satoshi", weight: 900 },
    banner: "/work/legacy-homes/cover.jpg",
    dark: true,
    screens: phone("legacy-homes", [
      ["splash", "Splash"], ["onb1", "Find your dream home"], ["onb2", "Find your ideal property"], ["register", "Create an account"],
      ["home", "Home"], ["search", "Search"], ["property", "Property details"], ["buy", "Buy property"], ["crypto", "Pay with crypto"],
      ["chat", "Chat with the agent"], ["saved", "Saved properties"], ["notifications", "Notifications"], ["settings", "Settings"],
    ], { statusBar: false }),
    proportions: P["legacy-homes"],
    screensCaption: "Exported from the Figma file. Scroll sideways, click to enlarge.",
  },
  mealio: {
    icon: { text: "m", bg: "linear-gradient(150deg,#3ad374,#14b74d)", fg: "#fff" },
    wordmark: { text: "mealio", font: "--font-roboto", weight: 700 },
    banner: "/work/mealio/cover.png",
    screens: phone("mealio", [
      ["splash", "Splash"], ["welcome", "Welcome"], ["order-easily", "Onboarding"], ["home", "Home"],
      ["meal-details", "Meal details"], ["restaurant", "Restaurant"], ["cart", "Cart"], ["checkout", "Checkout"], ["add-card", "Add card"],
    ], { statusBar: false, island: false }),
    proportions: P.mealio,
  },
  picta: {
    icon: { text: "p", bg: "linear-gradient(150deg,#3b4d61,#2b3a4a)", fg: "#ffc531" },
    wordmark: { text: "picta", font: "--font-fredoka", weight: 700 },
    banner: "/work/picta/cover.jpg",
    dark: true,
    screens: phone("picta", [["splash", "Splash"], ["home", "Home"], ["pass-n-play", "Pass N play"], ["freestyle", "Freestyle"]]),
    proportions: P.picta,
    extraFonts: [{ family: "DM Mono", varName: "--font-dm-mono", use: "Labels" }],
  },
  morenikeji: {
    icon: { text: "m", bg: "linear-gradient(150deg,#123150,#071a2b)", fg: "#8bef5a" },
    wordmark: { text: "Morenikeji", font: "--font-jost", weight: 400 },
    banner: "/work/morenikeji-website.jpg",
    screens: web("morenikeji", ["Hero", "Categories", "New arrivals", "Products", "Shop our picks"]),
    proportions: P.morenikeji,
    extraFonts: [{ family: "Jost", varName: "--font-jost", use: "Wordmark" }],
  },
};
