import React from 'react';
import { Card, Text, Button } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { Trip } from '../utils/types';
import { formatDate } from '../utils/dateUtils';

interface TripCardProps {
  trip: Trip;
  onPress: () => void;
  onDelete: () => void;
}

export const TripCard: React.FC<TripCardProps> = ({ trip, onPress, onDelete }) => {
  return (
    <Card style={styles.card} onPress={onPress}>
      <Card.Content>
        <Text variant="titleLarge" style={styles.destination}>
          {trip.destination}
        </Text>
        <Text variant="bodyMedium" style={styles.textDark}>
          Start: {formatDate(trip.startDate)}
        </Text>
        <Text variant="bodyMedium" style={styles.textDark}>
          Duration: {trip.duration} {trip.duration === 1 ? 'day' : 'days'}
        </Text>
      </Card.Content>
      <View style={styles.cardActions}>
        <Button mode="text" textColor="red" onPress={onDelete} testID="delete-button">
          Delete
        </Button>
        <Button mode="contained" onPress={onPress}>
          View Trip
        </Button>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    marginHorizontal: 16,
    elevation: 2,
    backgroundColor: '#ffffff',
  },
  destination: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#1E1E1E',
  },
  textDark: {
    color: '#333333',
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 8,
    gap: 8,
  },
});
