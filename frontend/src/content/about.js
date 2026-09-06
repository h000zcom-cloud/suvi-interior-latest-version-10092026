import { img, introPortrait } from "@/content/images";

// About page content. Fields marked null are hidden until Suvi Interior provides them.

export const about = {
  heroImage: img.livingLounge,
  intro:
    "Suvi Interior is an interior design and furniture studio based in Nashik, Maharashtra. We design and manufacture furniture and interiors for homes — from modular kitchens, TV units and cabinets to complete residential interiors.",

  sections: [
    {
      key: "story",
      label: "Our Story",
      heading: ["A studio built", "on making."],
      body: [
        "Suvi Interior works at the meeting point of interior design and furniture manufacturing. Rather than designing on paper and handing the work elsewhere, the studio designs, makes and installs — which means the details that matter stay under one roof.",
        "We are based at Pandhari Mala on the Ambad–Uttam Nagar Road in Nashik, and we work with homeowners across the city and the surrounding region.",
      ],
      image: img.livingPanels,
      // Owner-provided story goes here when available.
      ownerNote: null,
    },
    {
      key: "philosophy",
      label: "Our Philosophy",
      heading: ["Designed around", "the way you live."],
      body: [
        "Every home is used differently. We begin with how a family actually lives — where they gather, what they store, how light moves through the day — and design outward from there.",
        "Good interiors are not about adding more. They are about resolving a space until nothing feels missing and nothing feels extra.",
      ],
      image: introPortrait,
    },
    {
      key: "believe",
      label: "What We Believe",
      heading: ["Function first.", "Beauty follows."],
      body: [
        "A beautiful kitchen that is difficult to cook in has failed. A TV unit that hides nothing has failed. We hold every design decision to the same test: does it make the room work better for the people in it?",
      ],
      principles: [
        { n: "01", title: "Function", text: "Every element should have a purpose." },
        { n: "02", title: "Craft", text: "Furniture and interiors are designed with attention to material, proportion and finish." },
        { n: "03", title: "Personal", text: "Every home should reflect the people who live in it." },
      ],
    },
    {
      key: "craft",
      label: "Craftsmanship",
      heading: ["Made with", "precision."],
      body: [
        "Because we manufacture our own furniture, we control the things a drawing cannot — the alignment of grain across doors, the weight of a drawer, the way a handle sits in the hand.",
        "Materials are chosen for how they feel and how they age, and every piece is made to the measurements of the room it belongs to.",
      ],
      image: img.woodGrain,
    },
    {
      key: "approach",
      label: "Design Approach",
      heading: ["Five steps.", "One conversation."],
      body: [
        "Our process moves from discovery through design, detail, craft and finally living in the finished space. At every step you speak to the same people, and every decision is made with the finished room in mind.",
      ],
      image: img.kitchenWoodDark,
    },
  ],

  // Founder / team information — hidden until provided by Suvi Interior.
  founder: null,
  team: [],
};
