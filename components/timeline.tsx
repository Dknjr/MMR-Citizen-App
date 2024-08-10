import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  
  const [level, setLevel] = useState(0);

  return (
    <View style={styles.TimelineContainer}>
      <View style={styles.timeline}>
        <View style={[styles.circle, level >= 1 && styles.completedCircle]}>
          <Text style={styles.circleText}>1</Text>
        </View>
        <View style={[styles.line, level >= 1 && styles.completedLine]} />
        <View style={[styles.circle, level >= 2 && styles.completedCircle]}>
          <Text style={styles.circleText}>2</Text>
        </View>
        <View style={[styles.line, level >= 2 && styles.completedLine]} />
        <View style={[styles.circle, level >= 3 && styles.completedCircle]}>
          <Text style={styles.circleText}>3</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  TimelineContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  timeline: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20,
  },
  circle: {
    width: 35,
    height: 35,
    borderRadius: 25,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  completedCircle: {
    backgroundColor: '#4caf50',
  },
  circleText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  line: {
    width: 4,
    height: 50,
    backgroundColor: '#e0e0e0',
    marginBottom: 10,
  },
  completedLine: {
    backgroundColor: '#4caf50',
  },
});
