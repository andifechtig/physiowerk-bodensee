export const SITE_ORIGIN = "https://www.physiowerk-bodensee.de";

export const CONTACT = {
  company: "Physiowerk Bodensee GmbH",
  name: "Physiowerk Bodensee",
  phoneLabel: "+49 (0) 7542 2 919 731",
  phoneHref: "tel:+4975422919731",
  email: "info@physiowerk-bodensee.de",
  applicationEmail: "bewerbung@physiowerk-bodensee.de",
  street: "Tettnanger Straße 14",
  city: "88074 Meckenbeuren",
  address: "Tettnanger Straße 14, 88074 Meckenbeuren",
} as const;

export const BRAND_ASSETS = {
  logo: "/brand/physiowerk-bodensee-logo_e5ea2a63.svg",
  favicon: "/brand/physiowerk-bodensee-favicon_102ddb57.svg",
} as const;

/** Zentrale THEORG/TheraConnect-Konfiguration. */
export const BOOKING_CONFIG = {
  directUrl: "/kontakt/#terminbuchung",
  iframeUrl:
    "https://4d6a4d304e4445363152753455457a4437657765302b5151.proxy.sovd.cloud/otrs",
  isPlaceholder: false,
} as const;

export const COACHING_WHATSAPP_URL =
  "https://wa.me/4917680148726?text=Hallo%20Andreas%2C%20ich%20bin%20interessiert%20am%20Coaching%20Programm%20%22Physiowerk%20Gesundheitscoaching%22.";

export const THERACONNECT = {
  qrCode: "/brand/theracode-qr_3bdbe30f.png",
  googlePlay: "https://play.google.com/store/apps/details?id=de.sovdwaer.theraconnect",
  appStore: "https://apps.apple.com/de/iphone/today",
} as const;

export const CANONICAL_REDIRECTS: Record<string, string> = {
  "/physiotherapie": "/physiotherapie/",
  "/medizinisches-training-und-fitness": "/medizinisches-training-und-fitness/",
  "/team-praxis": "/team-praxis/",
  "/karriere": "/karriere/",
  "/coaching": "/coaching/",
  "/app": "/app/",
  "/kurse": "/kurse/",
  "/kontakt": "/kontakt/",
  "/impressum": "/impressum/",
  "/datenschutzerklaerung": "/datenschutzerklaerung/",
};

export const NAVIGATION = [
  { label: "Physiotherapie", href: "/physiotherapie/" },
  {
    label: "Medizinisches Training",
    href: "/medizinisches-training-und-fitness/",
  },
  { label: "Team & Praxis", href: "/team-praxis/" },
  { label: "Karriere", href: "/karriere/" },
  { label: "Coaching", href: "/coaching/" },
  { label: "App", href: "/app/" },
  { label: "Kurse", href: "/kurse/" },
] as const;

export const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/andi_biomechanix?igsh=MW53MnhjeGNwN2t6Mg==",
  },
  { label: "Facebook", href: "https://www.facebook.com/deinbiomechaniker/" },
] as const;

export const OPENING_HOURS = [
  { days: "Montag bis Donnerstag", hours: "07:00–12:00 Uhr und 13:00–19:00 Uhr" },
  { days: "Freitag", hours: "07:00–13:00 Uhr" },
  { days: "Samstag & Sonntag", hours: "geschlossen" },
] as const;

export type SeoConfig = {
  title: string;
  description: string;
  path: string;
};

export const SEO: Record<string, SeoConfig> = {
  "home": {
    "title": "Physiotherapie Meckenbeuren | Physiowerk Bodensee",
    "description": "Physiotherapie, Biomechanik und medizinisches Training in Meckenbeuren. Persönliche Betreuung für Kasse und Privat. Termin online oder telefonisch anfragen.",
    "path": "/"
  },
  "physiotherapie": {
    "title": "Physiotherapie & Biomechanik in Meckenbeuren",
    "description": "Physiotherapie in Meckenbeuren: Krankengymnastik, manuelle Therapie, Lymphdrainage und KGG im Physiowerk Bodensee. Erfahre mehr über unsere Behandlung.",
    "path": "/physiotherapie/"
  },
  "training": {
    "title": "Medizinisches Training Meckenbeuren | Physiowerk",
    "description": "Medizinisches Training und Fitness in Meckenbeuren: KGG, T-RENA und individuell betreutes Training für Kraft, Stabilität und Beweglichkeit.",
    "path": "/medizinisches-training-und-fitness/"
  },
  "team": {
    "title": "Team & Praxis in Meckenbeuren | Physiowerk Bodensee",
    "description": "Lerne unser Physiotherapie-Team und die Praxis in Meckenbeuren kennen. Persönliche Betreuung, biomechanische Analyse und medizinisches Training.",
    "path": "/team-praxis/"
  },
  "career": {
    "title": "Physiotherapie-Jobs Meckenbeuren | Physiowerk Bodensee",
    "description": "Arbeiten als Physiotherapeut:in in Meckenbeuren: Lerne unser Team, die Praxis und Deine Bewerbungsmöglichkeiten beim Physiowerk Bodensee kennen.",
    "path": "/karriere/"
  },
  "coaching": {
    "title": "Physiowerk Gesundheitscoaching | Physiowerk Bodensee",
    "description": "Sechs Monate persönliche Begleitung mit Bewegung, Training und alltagsnahen Impulsen. Coaching-Angebot im Physiowerk Bodensee.",
    "path": "/coaching/"
  },
  "app": {
    "title": "TheraConnect: Termine verwalten | Physiowerk Bodensee",
    "description": "Mit der TheraConnect-App Termine beim Physiowerk Bodensee in Meckenbeuren einsehen, online buchen und verwalten. Praxiscode und Anleitung finden.",
    "path": "/app/"
  },
  "courses": {
    "title": "Online-Präventionskurse §20 | Physiowerk Bodensee",
    "description": "Zertifizierte Online-Präventionskurse nach §20 SGB V beim Physiowerk Bodensee. Informiere Dich über die Kurse und mögliche Krankenkassen-Zuschüsse.",
    "path": "/kurse/"
  },
  "contact": {
    "title": "Kontakt & Anfahrt Meckenbeuren | Physiowerk Bodensee",
    "description": "Physiowerk Bodensee, Tettnanger Straße 14, 88074 Meckenbeuren. Kontakt, Anfahrt und Öffnungszeiten. Termin online buchen oder unter 07542 2919731 anfragen.",
    "path": "/kontakt/"
  },
  "imprint": {
    "title": "Impressum | Physiowerk Bodensee GmbH",
    "description": "Impressum der Physiowerk Bodensee GmbH, Tettnanger Straße 14, 88074 Meckenbeuren. Angaben zum Unternehmen und Kontaktmöglichkeiten.",
    "path": "/impressum/"
  },
  "privacy": {
    "title": "Datenschutzerklärung | Physiowerk Bodensee",
    "description": "Datenschutzerklärung des Physiowerk Bodensee: Informationen zur Verarbeitung personenbezogener Daten beim Besuch und bei der Nutzung dieser Website.",
    "path": "/datenschutzerklaerung/"
  }
};
