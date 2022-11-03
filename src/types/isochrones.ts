export interface IsochroneParams {
  mode: string;
  settings: {
    travel_time: string;
    speed: string;
    walking_profile: string;
  };
  starting_point: {
    input: {
      lat: number;
      lon: number;
    }[];
  };
  scenario: {
    id: number;
    modus: string;
  };
  output: {
    type: string;
    steps: string;
  };
}
