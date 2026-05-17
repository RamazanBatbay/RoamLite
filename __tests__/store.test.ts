import { useTripStore } from '../src/store/tripStore';

describe('Zustand Trip Store', () => {
  beforeEach(() => {
    useTripStore.getState().clearTrips();
  });

  // Test 1: Initial state
  it('should have an empty array as initial state', () => {
    const trips = useTripStore.getState().trips;
    expect(trips).toEqual([]);
  });

  // Test 2: Add trip
  it('should add a trip to the state', () => {
    const mockTrip = {
      id: 'test-1',
      destination: 'Paris',
      startDate: '2026-05-11',
      duration: 5,
      itinerary: [],
    };
    useTripStore.getState().addTrip(mockTrip);
    const trips = useTripStore.getState().trips;
    expect(trips.length).toBe(1);
    expect(trips[0]).toEqual(mockTrip);
  });

  // Test 3: Delete trip
  it('should delete a trip correctly', () => {
    const mockTrip = {
      id: 'test-1',
      destination: 'Paris',
      startDate: '2026-05-11',
      duration: 5,
      itinerary: [],
    };
    useTripStore.getState().addTrip(mockTrip);
    useTripStore.getState().deleteTrip('test-1');
    const trips = useTripStore.getState().trips;
    expect(trips.length).toBe(0);
  });
});
