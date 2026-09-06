import { img, materials } from "@/content/images";

// Representative gallery imagery. Replace with Suvi Interior photography as it becomes available.

export const galleryCategories = [
  { key: "all", label: "All" },
  { key: "living", label: "Living" },
  { key: "bedroom", label: "Bedroom" },
  { key: "kitchen", label: "Kitchen" },
  { key: "dining", label: "Dining" },
  { key: "tv-units", label: "TV Units" },
  { key: "furniture", label: "Furniture" },
  { key: "details", label: "Details" },
];

const g = (image, category, ratio = "4 / 3") => ({ ...image, category, ratio });

const m = (i) => ({ src: materials[i].src, id: materials[i].id, alt: materials[i].alt });

export const galleryItems = [
  g(img.livingWarm, "living", "3 / 2"),
  g(img.kitchenDark, "kitchen", "4 / 5"),
  g(img.bedroomLux, "bedroom", "3 / 2"),
  g(m(0), "details", "1 / 1"),
  g(img.tvWall, "tv-units", "4 / 3"),
  g(img.livingLeather, "living", "4 / 5"),
  g(img.diningWood, "dining", "3 / 2"),
  g(img.wardrobe, "furniture", "4 / 5"),
  g(img.bedroomDark, "bedroom", "4 / 3"),
  g(m(2), "details", "3 / 4"),
  g(img.kitchenWoodDark, "kitchen", "3 / 2"),
  g(img.livingBeige, "living", "4 / 3"),
  g(img.tvShelves, "tv-units", "4 / 5"),
  g(img.bedroomBeige, "bedroom", "3 / 2"),
  g(img.diningDark, "dining", "4 / 5"),
  g(m(4), "details", "1 / 1"),
  g(img.kitchenBlack, "kitchen", "4 / 3"),
  g(img.sideTable, "furniture", "1 / 1"),
  g(img.livingPanels, "living", "3 / 2"),
  g(img.tvUnit, "tv-units", "4 / 3"),
  g(img.bedroomWood, "bedroom", "4 / 5"),
  g(img.kitchenTap, "details", "4 / 5"),
  g(img.diningWarm, "dining", "4 / 3"),
  g(img.doors, "furniture", "3 / 4"),
  g(m(1), "details", "3 / 2"),
  g(img.livingLounge, "living", "3 / 2"),
  g(img.kitchenWhite, "kitchen", "4 / 3"),
  g(img.textile, "details", "1 / 1"),
  g(img.bedroomSlats, "bedroom", "3 / 2"),
  g(img.console, "furniture", "4 / 3"),
];

export const galleryStrip = [img.livingWarm, img.kitchenDark, img.bedroomLux, img.tvWall, img.diningWood, img.livingLounge];
