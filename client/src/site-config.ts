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
  logo: "/manus-storage/physiowerk-bodensee-logo_e5ea2a63.svg",
  favicon: "/manus-storage/physiowerk-bodensee-favicon_102ddb57.svg",
} as const;

/** Zentrale THEORG/TheraConnect-Konfiguration. */
export const BOOKING_CONFIG = {
  directUrl: "/kontakt/#terminbuchung",
  iframeUrl:
    "https://4d6a4d304e4445363152753455457a4437657765302b5151.proxy.sovd.cloud/otrs",
  isPlaceholder: false,
} as const;

export const COACHING_WHATSAPP_URL =
  "https://wa.me/4917680148726?text=Hallo%20Andreas%2C%20ich%20bin%20interessiert%20am%20Coaching%20Programm%20%22Schmerzfrei%20Jetzt%22.";

export const THERACONNECT = {
  qrCode: "/manus-storage/theracode-qr_3bdbe30f.png",
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
  "/kontakt": "/kontakt/",
  "/impressum": "/impressum/",
  "/datenschutzerklaerung": "/datenschutzerklaerung/",
};

export const NAVIGATION = [
  { label: "Physiotherapie", href: "/physiotherapie/" },
  {
    label: "Medizinisches Training und Fitness",
    href: "/medizinisches-training-und-fitness/",
  },
  { label: "Team & Praxis", href: "/team-praxis/" },
  { label: "Karriere", href: "/karriere/" },
  { label: "Coaching", href: "/coaching/" },
  { label: "App", href: "/app/" },
] as const;

export const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://www.instagram.com/andi_physiowerk/" },
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
  home: {
    title: "Startseite - Physiowerk Bodensee",
    description:
      "Wir bringen Dich wieder in Bewegung – individuell, nachhaltig und mit modernsten Methoden aus Physiotherapie, Biomechanik und ganzheitlichem Training.",
    path: "/",
  },
  physiotherapie: {
    title: "Physiotherapie - Physiowerk Bodensee",
    description:
      "Wir kombinieren klassische Physiotherapie mit moderner Biomechanik – für nachhaltige Ergebnisse und echte Lebensqualität.",
    path: "/physiotherapie/",
  },
  training: {
    title: "Medizinisches Training und Fitness - Physiowerk Bodensee",
    description:
      "Baue Kraft, Stabilität und Mobilität auf – mit medizinisch begleitetem Training im Physiowerk Bodensee.",
    path: "/medizinisches-training-und-fitness/",
  },
  team: {
    title: "Team & Praxis - Physiowerk Bodensee",
    description:
      "Wir sind das Physiowerk Bodensee – ein Team aus erfahrenen Therapeut:innen, das Menschen in Bewegung bringt.",
    path: "/team-praxis/",
  },
  career: {
    title: "Karriere - Physiowerk Bodensee",
    description: "Physiotherapie mit Herz, Know-how und modernem Umfeld.",
    path: "/karriere/",
  },
  coaching: {
    title: "Schmerzfrei Jetzt Coaching - Physiowerk Bodensee",
    description:
      "Das ganzheitliche 6-Monats-Coaching von Andreas Fechtig – biomechanisch fundiert, persönlich betreut und nachhaltig ausgerichtet.",
    path: "/coaching/",
  },
  app: {
    title: "TheraConnect App - Physiowerk Bodensee",
    description:
      "Termine bequem online verwalten, einsehen und buchen – mit der TheraConnect App und dem Praxiscode des Physiowerk Bodensee.",
    path: "/app/",
  },
  contact: {
    title: "Kontakt - Physiowerk Bodensee",
    description: "Ob Termin, Frage oder Beratung – wir freuen uns, von Dir zu hören.",
    path: "/kontakt/",
  },
  imprint: {
    title: "Impressum - Physiowerk Bodensee",
    description: "Physiowerk Bodensee GmbH, Tettnanger Straße 14, 88074 Meckenbeuren.",
    path: "/impressum/",
  },
  privacy: {
    title: "Datenschutzerklärung - Physiowerk Bodensee",
    description:
      "Die Hinweise geben einen Überblick darüber, was mit Ihren personenbezogenen Daten beim Besuch dieser Website passiert.",
    path: "/datenschutzerklaerung/",
  },
};
