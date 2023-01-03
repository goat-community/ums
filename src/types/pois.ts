export type PoisList = {
  [key: string]: {
    coordinates: [number, number] | [];
    category: string;
  }[];
};

export type PoisConfigBase = {
  [key: string]: {
    icon: string;
    color: [string];
    sensitivity?: number;
  };
};

export type PoisConfig = {
  [key: string]: {
    icon: string;
    color: [string];
    children: PoisConfigBase[];
  };
}[];

export type CustomizationConfig = {
  poi_groups: PoisConfig;
};
