export interface Place {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  isFreeDay?: boolean;
  coordinate: {
    latitude: number;
    longitude: number;
  };
}

export interface DayItinerary {
  day: number;
  date: string;
  places: Place[];
}

export interface Trip {
  id: string;
  destination: string;
  startDate: string;
  duration: number;
  itinerary: DayItinerary[];
}
