import { FlowerPetalsPositions } from "@types";

export const AMENITIES = "AMENITIES";

export const FLOWER_PROXIMITY = [5, 20];
export const FLOWER_PROXIMITY_WITH_LABEL = [0, "min", 20];

export const AMENITIES_LIST = [
  "Mobilitaetspunkte",
  "atm",
  "bakery",
  "bank",
  "bar",
  "bike_sharing",
  "bus_stop",
  "butcher",
  "cafe",
  "car_sharing",
  "charging_station",
  "cinema",
  "convenience",
  "dentist",
  "discount_supermarket",
  "fast_food",
  "general_practitioner",
  "grundschule",
  "gym",
  "yoga",
  "gymnasium",
  "hauptschule_mittelschule",
  "hotel",
  "kindergarten",
  "marketplace",
  "museum",
  "nursery",
  "organic_supermarket",
  "pharmacy",
  "playground",
  "hyper",
  "population",
  "post_box",
  "post_office",
  "pub",
  "realschule",
  "recycling",
  "restaurant",
  "subway_entrance",
  "supermarket",
  "tram_stop",
];

export const AMENITIES_GROUP = {
  food: ["restaurant", "fast_food", "cafe", "pub", "bar"],
  transport: [
    "bus_stop",
    "tram_stop",
    "underground_stop",
    "railway_station",
    "bike_sharing",
    "car_sharing",
    "charging_station",
  ],
  health: ["dentist", "general_practitioner", "pharmacy"],
  services: [
    "atm",
    "bank",
    "post_office",
    "post_box",
    "fuel_station",
    "recycling_station",
  ],
  sport: ["gym", "yoga"],
  leisure: ["cinema", "museum", "hotel", "playground"],
  shop: [
    "organic_supermarket",
    "discount_supermarket",
    "supermarket",
    "hyper",
    "marketplace",
    "bakery",
    "butcher",
    "chemists",
  ],
  education: [
    "nurseries",
    "kindergarten",
    "hauptschule_mittelschule",
    "grundschule",
    "realschule",
    "gymnasium",
  ],
};

export const POSITIONS: FlowerPetalsPositions = {
  food: {
    lines: [
      { startPoint: { x: 43.2257, y: 89.5538 }, endPoint: { x: 130.226, y: 133.554 } },
      { startPoint: { x: 128.828, y: 142.469 }, endPoint: { x: 27.828, y: 105.469 } },
      { startPoint: { x: 126.9, y: 149.49 }, endPoint: { x: 18.9002, y: 127.49 } },
      { startPoint: { x: 126.947, y: 156.497 }, endPoint: { x: 13.9472, y: 144.497 } },
      { startPoint: { x: 125.987, y: 163.5 }, endPoint: { x: 9.98707, y: 160.5 } },
    ],
  },
  health: {
    lines: [
      { startPoint: { x: 129.21, y: 190.454 }, endPoint: { x: 23.2098, y: 239.454 } },
      { startPoint: { x: 122.113, y: 184.487 }, endPoint: { x: 14.1128, y: 209.487 } },
      { startPoint: { x: 132.288, y: 200.408 }, endPoint: { x: 47.2883, y: 260.408 } },
    ],
  },
  services: {
    lines: [
      { startPoint: { x: 236.356, y: 210.649 }, endPoint: { x: 305.356, y: 280.649 } },
      { startPoint: { x: 225.377, y: 213.672 }, endPoint: { x: 298.377, y: 297.672 } },
      { startPoint: { x: 216.404, y: 213.706 }, endPoint: { x: 283.404, y: 305.706 } },
      { startPoint: { x: 211.442, y: 216.767 }, endPoint: { x: 258.442, y: 305.767 } },
      { startPoint: { x: 205.478, y: 218.853 }, endPoint: { x: 232.478, y: 306.853 } },
      { startPoint: { x: 198.492, y: 220.912 }, endPoint: { x: 216.492, y: 321.912 } },
    ],
  },
  sport: {
    lines: [
      { startPoint: { x: 210.597, y: 102.704 }, endPoint: { x: 265.597, y: 27.7043 } },
      { startPoint: { x: 217.703, y: 109.598 }, endPoint: { x: 301.703, y: 47.5977 } },
    ],
  },
  leisure: {
    lines: [
      { startPoint: { x: 172.531, y: 98.1742 }, endPoint: { x: 143.531, y: 20.1743 } },
      { startPoint: { x: 167.592, y: 105.288 }, endPoint: { x: 107.592, y: 20.2883 } },
      { startPoint: { x: 162.669, y: 110.374 }, endPoint: { x: 75.6686, y: 33.3744 } },
      { startPoint: { x: 155.733, y: 115.423 }, endPoint: { x: 55.7335, y: 52.423 } },
    ],
  },
  shop: {
    lines: [
      { startPoint: { x: 252.061, y: 174.504 }, endPoint: { x: 358.061, y: 187.504 } },
      { startPoint: { x: 249.132, y: 177.518 }, endPoint: { x: 355.132, y: 206.518 } },
      { startPoint: { x: 250.183, y: 182.535 }, endPoint: { x: 352.183, y: 222.535 } },
      { startPoint: { x: 248.229, y: 185.556 }, endPoint: { x: 345.229, y: 235.556 } },
      { startPoint: { x: 248.277, y: 189.584 }, endPoint: { x: 332.277, y: 245.584 } },
      { startPoint: { x: 248.304, y: 195.603 }, endPoint: { x: 325.304, y: 254.603 } },
      { startPoint: { x: 247.325, y: 201.62 }, endPoint: { x: 317.325, y: 261.62 } },
    ],
  },
  education: {
    lines: [
      { startPoint: { x: 178.499, y: 220.027 }, endPoint: { x: 173.499, y: 312.027 } },
      { startPoint: { x: 172.491, y: 217.094 }, endPoint: { x: 155.491, y: 306.094 } },
      { startPoint: { x: 166.463, y: 215.189 }, endPoint: { x: 130.463, y: 303.189 } },
      { startPoint: { x: 163.415, y: 213.278 }, endPoint: { x: 106.415, y: 298.278 } },
      { startPoint: { x: 158.368, y: 213.338 }, endPoint: { x: 91.3684, y: 286.338 } },
      { startPoint: { x: 151.334, y: 214.372 }, endPoint: { x: 81.3345, y: 277.372 } },
    ],
  },
  transport: {
    lines: [
      { startPoint: { x: 237.66, y: 130.633 }, endPoint: { x: 306.66, y: 66.6334 } },
      { startPoint: { x: 239.699, y: 138.601 }, endPoint: { x: 328.699, y: 71.6005 } },
      { startPoint: { x: 243.724, y: 146.583 }, endPoint: { x: 349.724, y: 76.5828 } },
      { startPoint: { x: 246.755, y: 151.564 }, endPoint: { x: 351.755, y: 92.5641 } },
      { startPoint: { x: 250.809, y: 155.538 }, endPoint: { x: 361.809, y: 109.538 } },
      { startPoint: { x: 252.851, y: 160.523 }, endPoint: { x: 361.851, y: 126.523 } },
      { startPoint: { x: 255.902, y: 164.51 }, endPoint: { x: 365.902, y: 142.51 } },
    ],
  },
};
