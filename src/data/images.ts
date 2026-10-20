/**
 * Placeholder photography.
 *
 * Every image on this demo is a legitimately licensed Pexels stock photo,
 * served from the Pexels CDN. To swap in a real client's photography,
 * replace these helpers with local imports (e.g. `import hero from "../assets/hero.jpg"`).
 */
export function px(id: number, w = 1400, h = 900): string {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=${w}&h=${h}`;
}

export const IMAGES = {
  hero: px(31737859, 2200, 1400),
  heroAlt: px(7031604, 1800, 1200),
  cityAerial: px(27151840, 2000, 1200),
  waterfront: px(13209789, 2000, 1200),
  skylineSunset: px(1025345, 2000, 1100),
  consultation: px(8559989, 1400, 1000),
  keysHandover: px(8815930, 1400, 1000),
  walkthrough: px(8730006, 1400, 1000),
  aboutInterior: px(7546323, 1400, 1000),
  aboutPortrait: px(8470844, 1200, 1400),
  ctaVilla: px(24805054, 2000, 1200),
  poolEvening: px(19075398, 1400, 1000),
  contactOffice: px(7195866, 1600, 1000),
  lounge: px(7174113, 1600, 1000),
  lounge2: px(8089172, 1600, 1000),
  bedroom: px(8135502, 1600, 1000),
  bedroom2: px(8134808, 1600, 1000),
  kitchen: px(30990851, 1600, 1000),
  duplex: px(8134821, 1600, 1000),
  villaNight: px(7031407, 1600, 1000),
  villaLawn: px(8082328, 1600, 1000),
  villaForest: px(7598375, 1600, 1000),
  mansionFacade: px(7031412, 1600, 1000),
  townhouse: px(7031405, 1600, 1000),
  penthouseView: px(27626185, 1600, 1000),
  terrace: px(24807124, 1600, 1000),
  infinity: px(19075385, 1600, 1000),
  resort: px(19084142, 1600, 1000),
  riverAerial: px(29299814, 1600, 1000),
  coastal: px(29787359, 1600, 1000),
  harbour: px(4533328, 1600, 1000),
  riverCity: px(27151838, 1600, 1000),
  poolDay: px(24805051, 1600, 1000),
  studio: px(7534560, 1600, 1000),
  classicRoom: px(7546213, 1600, 1000),
  openPlan: px(7174386, 1600, 1000),
  warmRoom: px(7534547, 1600, 1000),
  hotelRoom: px(7031721, 1600, 1000),
  bedCloset: px(6782578, 1600, 1000),
  bedTv: px(8082217, 1600, 1000),
  plushBed: px(8135118, 1600, 1000),
  softBed: px(7545856, 1600, 1000),
  openBedKitchen: px(30973390, 1600, 1000),
  colorfulLounge: px(7173666, 1600, 1000),
  chandelier: px(7546230, 1600, 1000),
  agentSenior: px(8815841, 900, 1100),
  agentCouple: px(8559996, 900, 1100),
  agentDeal: px(7937688, 900, 1100),
  agentPorch: px(8470799, 900, 1100),
} as const;

/** Attribution for the placeholder photography (shown in the footer). */
export const PHOTO_CREDIT =
  "Placeholder photography courtesy of Pexels (free licence). Creator credits: Max Vakhtbovych, Sharath G., Ahmet Çötür, Kampus Production, Pavel Danilyuk, Timur Weber, Thirdman, HONG SON, Quang Nguyen Vinh and others.";
