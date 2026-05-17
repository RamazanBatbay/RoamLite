import React from 'react';
import { StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';

interface FloatingActionButtonProps {
  onPress: () => void;
  icon?: string;
  testID?: string;
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  onPress,
  icon = 'plus',
  testID = 'fab-button',
}) => {
  return (
    <FAB
      style={styles.fab}
      icon={icon}
      onPress={onPress}
      testID={testID}
    />
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
