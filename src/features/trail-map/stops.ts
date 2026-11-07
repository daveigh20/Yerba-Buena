export interface Stop {
  name: string;
  lat: number;
  lng: number;
}

/** Route stops, in order. Change these to your own places. */
export const STOPS: Stop[] = [
  { name: "Start", lat: 37.7749, lng: -122.4194 },
  { name: "Middle", lat: 37.79, lng: -122.41 },
  { name: "End", lat: 37.808, lng: -122.4177 },
];
