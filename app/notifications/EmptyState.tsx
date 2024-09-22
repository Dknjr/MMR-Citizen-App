import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const EmptyState: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>Aucune notification pour le moment.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    fontSize: 16,
    color: '#aaa',
  },
});

export default EmptyState;
