// 0 is for not revelant
export type FlowerMinutes = number | 0;

export interface Amenities {
  Mobilitaetspunkte: FlowerMinutes;
  atm: FlowerMinutes;
  bakery: FlowerMinutes;
  bank: FlowerMinutes;
  bar: FlowerMinutes;
  bike_sharing: FlowerMinutes;
  bus_stop: FlowerMinutes;
  butcher: FlowerMinutes;
  cafe: FlowerMinutes;
  car_sharing: FlowerMinutes;
  charging_station: FlowerMinutes;
  cinema: FlowerMinutes;
  convenience: FlowerMinutes;
  dentist: FlowerMinutes;
  discount_supermarket: FlowerMinutes;
  fast_food: FlowerMinutes;
  general_practitioner: FlowerMinutes;
  grundschule: FlowerMinutes;
  gym: FlowerMinutes;
  gymnasium: FlowerMinutes;
  hauptschule_mittelschule: FlowerMinutes;
  hotel: FlowerMinutes;
  kindergarten: FlowerMinutes;
  marketplace: FlowerMinutes;
  museum: FlowerMinutes;
  nursery: FlowerMinutes;
  organic_supermarket: FlowerMinutes;
  park: FlowerMinutes;
  pharmacy: FlowerMinutes;
  playground: FlowerMinutes;
  population: FlowerMinutes;
  post_box: FlowerMinutes;
  post_office: FlowerMinutes;
  pub: FlowerMinutes;
  realschule: FlowerMinutes;
  recycling: FlowerMinutes;
  restaurant: FlowerMinutes;
  subway_entrance: FlowerMinutes;
  supermarket: FlowerMinutes;
  tram_stop: FlowerMinutes;
}

export type FlowerPetalsPositions = {
  [key: string]: {
    slope: number;
    starting_point: number[];
    ending_point: number[];
  };
};
