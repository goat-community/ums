export type PoisList = {
  [key: string]: {
    coordinates: [number, number] | [];
    category: string;
  }[];
};
