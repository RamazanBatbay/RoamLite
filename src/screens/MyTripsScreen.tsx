import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { FloatingActionButton } from '../components/FloatingActionButton';
import { TripCard } from '../components/TripCard';
import { useTripStore } from '../store/tripStore';

export const MyTripsScreen: React.FC = () => {
  const { trips, deleteTrip } = useTripStore();
  const router = useRouter();

  const handleDelete = (id: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    deleteTrip(id);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={trips}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TripCard
            trip={item}
            onPress={() => router.push(`/trip/${item.id}`)}
            onDelete={() => handleDelete(item.id)}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text variant="bodyLarge" style={styles.emptyText} testID="empty-state-text">
              You have no trips yet. Add one to get started!
            </Text>
          </View>
        }
        contentContainerStyle={trips.length === 0 ? styles.flex1 : styles.listContent}
      />
      <FloatingActionButton
        onPress={() => router.push('/add-trip')}
        testID="add-trip-fab"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContent: {
    paddingBottom: 80,
  },
  flex1: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    textAlign: 'center',
    color: '#333333',
  },
});
