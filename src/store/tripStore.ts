import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Trip } from '../utils/types';

interface TripState {
  trips: Trip[];
  addTrip: (trip: Trip) => void;
  deleteTrip: (id: string) => void;
  getTripById: (id: string) => Trip | undefined;
  clearTrips: () => void;
}

export const useTripStore = create<TripState>()(
  persist(
    (set, get) => ({
      trips: [],
      addTrip: (trip) =>
        set((state) => ({
          trips: [...state.trips, trip],
        })),
      deleteTrip: (id) =>
        set((state) => ({
          trips: state.trips.filter((trip) => trip.id !== id),
        })),
      getTripById: (id) => get().trips.find((trip) => trip.id === id),
      clearTrips: () => set({ trips: [] }),
    }),
    {
      name: 'trip-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
