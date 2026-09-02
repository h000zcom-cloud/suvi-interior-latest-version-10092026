import { img } from "@/content/images";

// Directional copy — confirm claims with Suvi Interior before publishing changes.
export const services = [
  {
    slug: "modular-kitchens",
    number: "01",
    title: "Modular Kitchens",
    short: "Custom modular kitchens balancing functionality, storage, material quality and visual simplicity.",
    description:
      "A kitchen is used more than any other room. We plan each one around how you cook, store and move — then resolve it into calm, well-proportioned cabinetry with finishes chosen to last.",
    features: ["Layout & storage planning", "Tall units, drawers and pull-outs", "Countertop & finish selection", "Hardware and lighting coordination"],
    idealFor: ["New homes", "Kitchen renovations", "Compact apartments"],
    image: img.kitchenDark,
    secondary: img.kitchenWoodDark,
    projectType: "Modular Kitchen",
  },
  {
    slug: "living-spaces",
    number: "02",
    title: "Living Spaces",
    short: "Living rooms designed around comfort, proportion, lighting and everyday lifestyle.",
    description:
      "The living room carries the character of a home. We work with proportion, light and material to create spaces that feel composed when guests arrive and easy when they leave.",
    features: ["Space planning and furniture layout", "Feature walls and panelling", "Seating, storage and display", "Lighting direction"],
    idealFor: ["Family homes", "Apartments", "Bungalows"],
    image: img.livingLeather,
    secondary: img.livingPanels,
    projectType: "Living Room",
  },
  {
    slug: "bedroom-interiors",
    number: "03",
    title: "Bedroom Interiors",
    short: "Calm, functional bedroom spaces with thoughtful storage and material coordination.",
    description:
      "Bedrooms should be quiet — visually and practically. We coordinate wardrobes, headboards, side tables and lighting so that storage disappears and the room settles.",
    features: ["Wardrobes and dressing units", "Headboard walls", "Bedside and study furniture", "Soft lighting"],
    idealFor: ["Master bedrooms", "Children's rooms", "Guest rooms"],
    image: img.bedroomLux,
    secondary: img.bedroomDark,
    projectType: "Bedroom",
  },
  {
    slug: "tv-units-wall-systems",
    number: "04",
    title: "TV Units & Wall Systems",
    short: "Custom TV units, entertainment walls, storage systems and feature walls.",
    description:
      "From a single floating unit to a full entertainment wall, we design TV units, TV stands and cabinets that hold everything — cables included — and still read as one clean composition.",
    features: ["TV units and TV stands", "Entertainment walls", "Cabinets and concealed storage", "Feature wall finishes"],
    idealFor: ["Living rooms", "Bedrooms", "Media rooms"],
    image: img.tvWall,
    secondary: img.tvShelves,
    projectType: "TV Unit",
  },
  {
    slug: "custom-furniture",
    number: "05",
    title: "Custom Furniture",
    short: "Furniture designed and manufactured around the client's space and requirements.",
    description:
      "When a standard piece will not fit the room or the way you live, we design and manufacture it — sized to the millimetre, finished to match the rest of the home.",
    features: ["Made-to-measure cabinets", "Wardrobes and storage", "Tables, consoles and units", "Material and finish matching"],
    idealFor: ["Awkward spaces", "Matching existing interiors", "One-off pieces"],
    image: img.wardrobe,
    secondary: img.sideTable,
    projectType: "Furniture",
  },
  {
    slug: "complete-interior-solutions",
    number: "06",
    title: "Complete Interior Solutions",
    short: "End-to-end interior execution for residential spaces.",
    description:
      "One studio, one point of contact — from the first conversation and concept through furniture manufacturing, installation and handover of a finished home.",
    features: ["Concept and space planning", "Furniture design and manufacturing", "Installation and finishing", "Single point of coordination"],
    idealFor: ["New homes", "Complete renovations", "Villas and bungalows"],
    image: img.openPlan,
    secondary: img.livingLounge,
    projectType: "Full Home Interior",
  },
];

export const getService = (slug) => services.find((s) => s.slug === slug);
