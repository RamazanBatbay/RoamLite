import * as Location from 'expo-location';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Image, PanResponder, ScrollView, StyleSheet, View } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { Checkbox, List, Text } from 'react-native-paper';
import { useTripStore } from '../store/tripStore';
import { Place } from '../utils/types';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const COLLAPSED_HEIGHT = 200;
const EXPANDED_HEIGHT = SCREEN_HEIGHT * 0.8;
const COLLAPSED_Y = SCREEN_HEIGHT - COLLAPSED_HEIGHT;
const EXPANDED_Y = SCREEN_HEIGHT - EXPANDED_HEIGHT;

export const TripDetailsScreen: React.FC = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const getTripById = useTripStore((state) => state.getTripById);
  const trip = getTripById(id as string);
  const mapRef = useRef<MapView>(null);

  const [locationPermission, setLocationPermission] = useState(false);
  const [checkedPlaces, setCheckedPlaces] = useState<string[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  const panY = useRef(new Animated.Value(COLLAPSED_Y)).current;
  const currentY = useRef(COLLAPSED_Y);

  useEffect(() => {
    panY.addListener(({ value }) => {
      currentY.current = value;
    });
    return () => panY.removeAllListeners();
  }, []);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => Math.abs(gestureState.dy) > 5,
      onPanResponderGrant: () => {
        panY.setOffset(currentY.current);
        panY.setValue(0);
      },
      onPanResponderMove: Animated.event([null, { dy: panY }], { useNativeDriver: false }),
      onPanResponderRelease: (_, gestureState) => {
        panY.flattenOffset();
        const y = currentY.current;

        // Determine if we should expand or collapse
        const shouldExpand = gestureState.vy < -0.5 || y < SCREEN_HEIGHT / 2;

        Animated.spring(panY, {
          toValue: shouldExpand ? EXPANDED_Y : COLLAPSED_Y,
          useNativeDriver: false,
          bounciness: 4,
        }).start();
      },
    })
  ).current;

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setLocationPermission(status === 'granted');
    })();
  }, []);

  if (!trip) {
    return (
      <View style={styles.centered}>
        <Text variant="bodyLarge">Trip not found.</Text>
      </View>
    );
  }

  const allPlaces = trip.itinerary.flatMap((day) => day.places);
  const mapPlaces = allPlaces.filter((place) => !place.isFreeDay);
  const mapCenter = mapPlaces.length > 0 ? mapPlaces[0].coordinate : undefined;

  const togglePlace = (placeId: string) => {
    if (checkedPlaces.includes(placeId)) {
      setCheckedPlaces(checkedPlaces.filter(pid => pid !== placeId));
    } else {
      setCheckedPlaces([...checkedPlaces, placeId]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.headerTitle}>{trip.destination}</Text>
        <Text variant="bodyMedium" style={styles.headerSubtitle}>{trip.startDate} - {trip.duration} Days</Text>
      </View>

      {/* Full Screen Map */}
      {mapCenter && (
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: mapCenter.latitude,
            longitude: mapCenter.longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
          showsUserLocation={locationPermission}
          onPress={() => setSelectedPlace(null)}
        >
          {mapPlaces.map((place, index) => (
            <Marker
              key={`${place.id}-${index}`}
              coordinate={place.coordinate}
              onPress={() => setSelectedPlace(place)}
            />
          ))}
          <Polyline
            coordinates={mapPlaces.map((p) => p.coordinate)}
            strokeColor="#000"
            strokeColors={['#7F0000']}
            strokeWidth={3}
          />
        </MapView>
      )}

      {selectedPlace && (
        <View style={styles.floatingCard}>
          {selectedPlace.imageUrl && (
            <Image source={{ uri: selectedPlace.imageUrl }} style={styles.floatingImage} />
          )}
          <View style={styles.floatingTextContainer}>
            <Text style={styles.floatingTitle}>{selectedPlace.name}</Text>
            <Text style={styles.floatingDesc}>{selectedPlace.description}</Text>
          </View>
        </View>
      )}

      {/* Draggable Bottom Sheet */}
      <Animated.View style={[styles.bottomSheet, { top: panY }]}>
        <View {...panResponder.panHandlers} style={styles.dragHandleContainer}>
          <View style={styles.dragHandle} />
        </View>

        <ScrollView contentContainerStyle={styles.itineraryScrollContent}>
          <Text variant="titleLarge" style={styles.itineraryTitle}>Travel Itinerary</Text>
          <List.AccordionGroup>
            {trip.itinerary.map((day) => (
              <List.Accordion
                key={day.day}
                id={day.day.toString()}
                title={`Day ${day.day} (${day.date})`}
                titleStyle={styles.dayTitle}
                style={styles.accordion}
                theme={{ colors: { primary: '#007AFF' } }}
              >
                {day.places.map((place, index) => (
                  <List.Item
                    key={`${place.id}-${index}`}
                    title={place.name}
                    description={place.description}
                    titleStyle={[
                      styles.placeText,
                      checkedPlaces.includes(place.id) && styles.placeTextChecked
                    ]}
                    descriptionStyle={styles.placeDescText}
                    left={() => (
                      <Checkbox
                        status={checkedPlaces.includes(place.id) ? 'checked' : 'unchecked'}
                        onPress={() => togglePlace(place.id)}
                        color="#007AFF"
                      />
                    )}
                    onPress={() => togglePlace(place.id)}
                  />
                ))}
              </List.Accordion>
            ))}
          </List.AccordionGroup>
        </ScrollView>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  header: {
    position: 'absolute',
    top: 0,
    width: '100%',
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    zIndex: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  headerTitle: {
    color: '#1E1E1E',
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: '#333333',
  },
  floatingCard: {
    position: 'absolute',
    bottom: 130,
    alignSelf: 'center',
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 16,
    flexDirection: 'row',
    padding: 12,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    zIndex: 15,
  },
  floatingImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
    marginRight: 16,
  },
  floatingTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  floatingTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#1E1E1E',
    marginBottom: 6,
  },
  floatingDesc: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  bottomSheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: SCREEN_HEIGHT,
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 8,
    zIndex: 20,
  },
  dragHandleContainer: {
    padding: 16,
    alignItems: 'center',
  },
  dragHandle: {
    width: 40,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 3,
  },
  itineraryScrollContent: {
    padding: 16,
    paddingBottom: 400,
  },
  itineraryTitle: {
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1E1E1E',
  },
  accordion: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  dayTitle: {
    fontWeight: 'bold',
    color: '#1E1E1E',
  },
  placeText: {
    color: '#1E1E1E',
    fontWeight: '500',
  },
  placeTextChecked: {
    textDecorationLine: 'line-through',
    color: '#999999',
  },
  placeDescText: {
    color: '#666',
  },
});
