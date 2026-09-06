import { u } from "@/lib/images";

// Generated representative imagery (not Suvi Interior projects). Replace with studio photography when available.
const GEN = "https://static.prod-images.emergentagent.com/jobs/f269e9d1-749a-45df-9bb4-b97d233efcd1/images/";

export const heroImage = {
  src: `${GEN}cbd42da2d5aeab75d8c03160dffa60bc7caccaef27cadd63015168b228dfde6a.jpeg`,
  alt: "Warm contemporary living room with a walnut TV wall unit and linen sofa",
};

export const introPortrait = {
  src: `${GEN}19c0df4a41d6ad56444b65ea529ae007d813094cc8708f8008531f1d9df780a4.jpeg`,
  alt: "Bedroom with a slatted walnut headboard wall and linen bedding",
};

export const materials = [
  {
    src: `${GEN}dce492bd8e6fbe45681b1b3082876eb8c3e5a4d7f34576d6bbcbf0140d605529.jpeg`,
    alt: "Close-up of matte walnut veneer grain",
    title: "Wood",
    note: "Veneers & solid timber",
    ratio: "1 / 1",
  },
  {
    src: `${GEN}e86d6f000202a0b88cd073eece9e66a70692156e65cdd370c23eec05bbc7de69.jpeg`,
    alt: "Limestone countertop edge meeting a walnut cabinet front",
    title: "Stone",
    note: "Countertops & surfaces",
    ratio: "3 / 2",
  },
  {
    src: `${GEN}d297a911539be3cca385e4bc0187fffd4404c6a8433bf3525a69a7522bbefa71.jpeg`,
    alt: "Slim black handle on a fluted oak cabinet door",
    title: "Metal",
    note: "Handles & hardware",
    ratio: "3 / 4",
  },
  {
    id: "1616627561950-9f746e330187",
    alt: "Striped textile detail in warm brown tones",
    title: "Fabrics",
    note: "Upholstery & soft finishes",
    ratio: "1 / 1",
  },
  {
    src: `${GEN}0aa9d8d850232cc7a071aad5ed960d6ceb7e271f4d9fbf37183b4ecd8a5ad958.jpeg`,
    alt: "Mitred joinery corner on a solid oak cabinet",
    title: "Joinery",
    note: "Edges, corners & fit",
    ratio: "1 / 1",
  },
  {
    id: "1600607688066-890987f18a86",
    alt: "Marble vanity with a wood cabinet in warm light",
    title: "Marble",
    note: "Vanities & feature surfaces",
    ratio: "3 / 4",
  },
];

export const img = {
  livingWarm: u("1564078516393-cf04bd966897", "Warm living room with tall windows and a padded chaise"),
  livingLeather: u("1600210492486-724fe5c67fb0", "Living room with a leather sofa and wooden ceiling beams"),
  livingPanels: u("1600585152915-d208bec867a1", "Living room with wood wall panels and garden view"),
  livingGarden: u("1600585154084-4e5fe7c39198", "Living room opening to a garden"),
  livingBeige: u("1618221195710-dd6b41faaea6", "Minimal living room in soft beige tones"),
  livingMinimal: u("1586023492125-27b2c045efd7", "Minimal living room with a grey sofa and plants"),
  livingView: u("1600210492493-0946911123ea", "Living room with panoramic windows"),
  livingSoft: u("1616486338812-3dadae4b4ace", "Soft-toned living room with sculptural seating"),
  livingGrey: u("1583847268964-b28dc8f51f92", "Living room with a grey sofa and wooden side table"),
  livingArches: u("1600210491369-e753d80a41f3", "Living room with arched windows and a fireplace"),
  livingBeams: u("1600210491892-03d54c0aaf87", "Living room with exposed beams and leather armchairs"),
  livingLounge: u("1621293954908-907159247fc8", "Lounge with warm wooden panelling"),
  livingTan: u("1554995207-c18c203602cb", "Living room with a tan leather sofa"),
  livingSunlit: u("1560448204-e02f11c3d0e2", "Sunlit living room with layered neutral textiles"),
  livingMirror: u("1618219908412-a29a1bb7b86e", "Living room with a round mirror and console"),
  openPlan: u("1600607687939-ce8a6c25118c", "Open-plan living and kitchen with wood joinery"),

  kitchenDark: u("1771270731051-9cfbb7222946", "Dark modular kitchen with wood accents"),
  kitchenWoodDark: u("1622372738946-62e02505feb3", "Dark kitchen with oak cabinetry and plants"),
  kitchenBlack: u("1564540586988-aa4e53c3d799", "Minimal black kitchen with stone counter"),
  kitchenWhite: u("1600585152220-90363fe7e115", "White kitchen with oak details"),
  kitchenIsland: u("1600607686527-6fb886090705", "Kitchen island with oak stools"),
  kitchenTap: u("1565538810643-b5bdb714032a", "Brass tap and stone counter detail"),

  bedroomLux: u("1710224002849-a76ea1068b0d", "Bedroom with wood panelling and city view"),
  bedroomDark: u("1617104678098-de229db51175", "Dark bedroom with wood wall"),
  bedroomBeige: u("1617325247661-675ab4b64ae2", "Minimal bedroom in beige tones"),
  bedroomWood: u("1616594039964-ae9021a400a0", "Bedroom with wooden headboard and side table"),
  bedroomSlats: u("1600566753051-f0b89df2dd90", "Bedroom with wooden slat wall"),
  bedroomSoft: u("1616486029423-aaa4789e8c9a", "Soft-lit bedroom with layered bedding"),
  bedroomGrey: u("1600607687644-c7171b42498f", "Bedroom with grey bedding and garden view"),

  diningWood: u("1604578762246-41134e37f9cc", "Solid wood dining table with pendant lights"),
  diningDark: u("1600607687920-4e2a09cf159d", "Dark dining space with glass partition"),
  diningWarm: u("1560185007-cde436f6a4d0", "Warm dining room with wooden table"),
  diningDesk: u("1611269154421-4e27233ac5c7", "Wooden dining table by the window"),

  tvWall: u("1663811397219-c572550dffc5", "Dark TV wall unit with integrated storage"),
  tvShelves: u("1595515106969-1ce29566ff1c", "Floating wooden wall shelves"),
  tvUnit: u("1594026112284-02bb6f3352fe", "TV unit with open shelving"),
  tvCabinets: u("1600121848594-d8644e57abab", "Living room with dark cabinetry"),
  tvFireplace: u("1598928506311-c55ded91a20c", "Living room with built-in shelving"),

  wardrobe: u("1595428774223-ef52624120d2", "Wooden wardrobe with open shelving"),
  sideTable: u("1611486212557-88be5ff6f941", "Wooden side table with a book"),
  console: u("1530018607912-eff2daa1bac4", "Wooden console table"),
  doors: u("1558997519-83ea9252edf8", "Leather-clad wardrobe doors"),

  textile: u("1616627561950-9f746e330187", "Striped textile detail in warm brown"),
  bathWood: u("1600607688066-890987f18a86", "Bathroom with marble and wood vanity"),
  woodGrain: u("1724918108497-160360dbedfe", "Close-up of wood joinery and grain"),
};
