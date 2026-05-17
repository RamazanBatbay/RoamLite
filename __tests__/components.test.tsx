import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { MyTripsScreen } from '../src/screens/MyTripsScreen';
import { FloatingActionButton } from '../src/components/FloatingActionButton';
import { ErrorBoundary } from '../src/components/ErrorBoundary';
import { TripCard } from '../src/components/TripCard';
import { Text } from 'react-native-paper';

jest.mock('expo-router', () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

jest.mock('expo-haptics', () => ({
  impactAsync: jest.fn(),
  ImpactFeedbackStyle: { Medium: 'Medium' },
}));

// Provide a mock trip store state.
jest.mock('../src/store/tripStore', () => ({
  useTripStore: jest.fn(),
}));

import { useTripStore } from '../src/store/tripStore';

describe('Components and UX', () => {
  // Test 7: Empty state text appears
  it('should render empty state text when there are no trips', () => {
    (useTripStore as unknown as jest.Mock).mockReturnValue({
      trips: [],
      deleteTrip: jest.fn(),
    });
    const { getByTestId } = render(<MyTripsScreen />);
    expect(getByTestId('empty-state-text')).toBeTruthy();
  });

  // Test 8: FAB fires onPress event
  it('should call onPress when FAB is pressed', () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(<FloatingActionButton onPress={onPressMock} />);
    fireEvent.press(getByTestId('fab-button'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  // Test 9: Error boundary catches error
  it('should catch error and render fallback UI', () => {
    // Suppress console.error for this expected error
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

    const ThrowError = () => {
      throw new Error('Test Error');
    };

    const { getByText, getByTestId } = render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(getByText('Oops, something went wrong.')).toBeTruthy();
    expect(getByTestId('reset-error-button')).toBeTruthy();
    
    consoleError.mockRestore();
  });

  // Test 10: Delete button calls store function
  it('should call onDelete when Delete is pressed on TripCard', () => {
    const onDeleteMock = jest.fn();
    const mockTrip = {
      id: 't1',
      destination: 'Rome',
      startDate: '2026-05-11',
      duration: 5,
      itinerary: [],
    };
    const { getByTestId } = render(
      <TripCard trip={mockTrip} onPress={() => {}} onDelete={onDeleteMock} />
    );

    fireEvent.press(getByTestId('delete-button'));
    expect(onDeleteMock).toHaveBeenCalledTimes(1);
  });
});
