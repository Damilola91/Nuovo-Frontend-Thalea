export interface NearbyPlace {
  title: string;
  description: string;
  fullDescription: string;
  images: string[];
  lat?: number;
  lng?: number;
  reverse: boolean;
}
