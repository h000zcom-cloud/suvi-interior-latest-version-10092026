// Central business configuration. Update these values — the interface adapts automatically.
// Fields set to null are intentionally unpublished until verified by Suvi Interior.

export const site = {
  name: "Suvi Interior",
  wordmark: ["Suvi", "Interior"],
  tagline: "Interior design, custom furniture and execution — Nashik",
  descriptor: "Interior Design & Furniture · Nashik",
  positioning:
    "A premium interior and furniture studio creating thoughtfully designed spaces with precision, functionality and timeless aesthetics.",
  description:
    "Suvi Interior — interior designers in Nashik. Modular kitchens, custom furniture, TV units, bedroom interiors and complete home interior design, designed and made by one studio.",

  city: "Nashik",
  region: "Maharashtra",
  country: "IN",
  postalCode: "422010",

  address: {
    lines: [
      "Shop No. G2, Pandhari Mala",
      "273, Shree Kulswamini Business Centre",
      "10, Ambad–Uttam Nagar Road, Opp. Rajat Park",
      "Nashik, Maharashtra 422010, India",
    ],
    short: "Pandhari Mala, Ambad–Uttam Nagar Road, Nashik",
    streetAddress:
      "Shop No. G2, Pandhari Mala, 273, Shree Kulswamini Business Centre, 10, Ambad–Uttam Nagar Road, Opp. Rajat Park",
  },

  phone: { display: "+91 97020 39381", tel: "+919702039381" },

  whatsapp: {
    enabled: true,
    number: "919702039381",
    defaultMessage:
      "Hi Suvi Interior, I found your website and would like to discuss an interior project.",
  },

  email: null,

  social: {
    instagram: null,
    facebook: null,
    google: null,
  },

  // e.g. [{ days: "Monday – Saturday", time: "10:00 – 20:00" }]
  hours: [],

  // Publish only after verification. When enabled is false the block is hidden.
  googleReviews: { enabled: false, rating: null, count: null, url: null },

  mapsQuery:
    "Suvi Interior, Shop No. G2, Pandhari Mala, Shree Kulswamini Business Centre, Ambad-Uttam Nagar Road, Nashik 422010",

  // Imagery on this site is representative until Suvi Interior's own project photography is supplied.
  imageryNotice:
    "Imagery shown is representative while our project archive is being prepared.",
};

export const nav = [
  { label: "Projects", to: "/projects" },
  { label: "Services", to: "/services" },
  { label: "Studio", to: "/about" },
  { label: "Process", to: "/process" },
  { label: "Gallery", to: "/gallery" },
  { label: "Brochure", to: "/brochure" },
];

export const mobileNav = [
  { label: "Projects", to: "/projects" },
  { label: "Services", to: "/services" },
  { label: "Studio", to: "/about" },
  { label: "Process", to: "/process" },
  { label: "Gallery", to: "/gallery" },
  { label: "Brochure", to: "/brochure" },
  { label: "Contact", to: "/contact" },
];

export const projectTypes = [
  "Full Home Interior",
  "Modular Kitchen",
  "Living Room",
  "Bedroom",
  "Furniture",
  "TV Unit",
  "Other",
];
