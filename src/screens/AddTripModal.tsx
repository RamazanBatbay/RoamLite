import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Button, Dialog, Portal, Text, TextInput } from 'react-native-paper';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { useTripStore } from '../store/tripStore';
import { AVAILABLE_CITIES, generateTripItinerary } from '../utils/dummyData';

export const AddTripModal: React.FC = () => {
  const router = useRouter();
  const addTrip = useTripStore((state) => state.addTrip);

  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredCities, setFilteredCities] = useState<string[]>([]);
  const [showCalendar, setShowCalendar] = useState(false);

  const handleDestinationFocus = () => {
    if (destination.length === 0) {
      setFilteredCities(AVAILABLE_CITIES);
    } else {
      const filtered = AVAILABLE_CITIES.filter(city =>
        city.toLowerCase().includes(destination.toLowerCase())
      );
      setFilteredCities(filtered);
    }
    setShowDropdown(true);
  };

  const handleDestinationChange = (text: string) => {
    setDestination(text);
    if (text.length > 0) {
      const filtered = AVAILABLE_CITIES.filter(city =>
        city.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredCities(filtered);
    } else {
      setFilteredCities(AVAILABLE_CITIES);
    }
    setShowDropdown(true);
  };

  const handleCitySelect = (city: string) => {
    setDestination(city);
    setShowDropdown(false);
  };

  const calculateDuration = (start: string, end: string) => {
    const s = new Date(start);
    const e = new Date(end);
    const diffTime = Math.abs(e.getTime() - s.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  };

  const onDayPress = (day: any) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(day.dateString);
      setEndDate(null);
    } else if (startDate && !endDate) {
      const start = new Date(startDate);
      const end = new Date(day.dateString);
      if (end < start) {
        setEndDate(startDate);
        setStartDate(day.dateString);
      } else {
        setEndDate(day.dateString);
      }
    }
  };

  const getMarkedDates = () => {
    const marked: any = {};
    if (startDate) {
      marked[startDate] = { startingDay: true, color: '#007AFF', textColor: 'white' };
    }
    if (startDate && endDate) {
      let curr = new Date(startDate);
      const end = new Date(endDate);
      curr.setDate(curr.getDate() + 1);
      while (curr < end) {
        const dateStr = curr.toISOString().split('T')[0];
        marked[dateStr] = { color: '#70B2FF', textColor: 'white' };
        curr.setDate(curr.getDate() + 1);
      }
      marked[endDate] = { endingDay: true, color: '#007AFF', textColor: 'white' };
    }
    return marked;
  };

  const today = new Date().toISOString().split('T')[0];

  const formatForDisplay = (dateString: string) => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  const handleSave = async () => {
    setError(null);

    if (!startDate || !endDate) {
      setError('Please select a start and end date for your trip.');
      return;
    }

    const duration = calculateDuration(startDate, endDate);
    if (duration < 1) {
      setError('Duration must be at least 1 day.');
      return;
    }

    if (!destination.trim()) {
      setError('Destination cannot be empty.');
      return;
    }

    const validCity = AVAILABLE_CITIES.find(c => c.toLowerCase() === destination.toLowerCase());
    if (!validCity) {
      setError('Please select a valid city from the dropdown.');
      return;
    }

    setLoading(true);

    try {
      const itinerary = await generateTripItinerary(validCity, startDate, duration);

      const newTrip = {
        id: Math.random().toString(36).substr(2, 9),
        destination: validCity,
        startDate,
        duration,
        itinerary,
      };

      addTrip(newTrip);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      router.back();
    } catch (err: any) {
      setError(err.message || 'An error occurred while generating the trip.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Generating your itinerary..." />;
  }

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>Plan a New Trip</Text>

      {error && (
        <Text style={styles.error} testID="error-message">
          {error}
        </Text>
      )}

      <View style={styles.autocompleteContainer}>
        <TextInput
          label="Destination (e.g., Warsaw, Paris, Rome)"
          value={destination}
          onChangeText={handleDestinationChange}
          onFocus={handleDestinationFocus}
          style={styles.input}
          mode="outlined"
        />
        {showDropdown && filteredCities.length > 0 && (
          <View style={styles.dropdown}>
            <FlatList
              data={filteredCities}
              keyExtractor={(item) => item}
              keyboardShouldPersistTaps="handled"
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => handleCitySelect(item)}
                >
                  <Text>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
      </View>

      <Button
        mode="outlined"
        onPress={() => setShowCalendar(true)}
        style={styles.datePickerBtn}
      >
        Select Trip Dates
      </Button>

      {startDate && endDate && (
        <Text style={styles.dateText}>
          {formatForDisplay(startDate)} to {formatForDisplay(endDate)} ({calculateDuration(startDate, endDate)} days)
        </Text>
      )}

      <Portal>
        <Dialog visible={showCalendar} onDismiss={() => setShowCalendar(false)} style={{ backgroundColor: '#fff' }}>
          <Dialog.Title>Select Dates</Dialog.Title>
          <Dialog.Content>
            <Calendar
              minDate={today}
              markingType="period"
              markedDates={getMarkedDates()}
              onDayPress={onDayPress}
              theme={{
                todayTextColor: '#007AFF',
                arrowColor: '#007AFF',
              }}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowCalendar(false)}>Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <View style={styles.buttonRow}>
        <Button mode="outlined" onPress={() => router.back()} style={styles.button}>
          Cancel
        </Button>
        <Button mode="contained" onPress={handleSave} style={styles.button}>
          Save Trip
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#1E1E1E',
  },
  autocompleteContainer: {
    zIndex: 1000,
    elevation: 10,
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  dropdown: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    maxHeight: 150,
    elevation: 10,
    zIndex: 1000,
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  datePickerBtn: {
    marginBottom: 8,
  },
  dateText: {
    textAlign: 'center',
    marginBottom: 16,
    color: '#333333',
    fontWeight: '500',
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 32,
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
  },
  error: {
    color: 'red',
    marginBottom: 16,
  },
});
