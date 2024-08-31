import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';


export default function Loading() {
  const router = useRouter();
  const [showButton, setShowButton] = useState(false);

  const handleStartNowPress = () => {
    router.push('/(auth)/login');
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 3000); // 8 seconds delay

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View >
          <Text style={styles.title}>
            United for action, {'\n'}citizens for change:
          </Text>
          <Text style={styles.subtitle}>Report, act, transform.</Text>

          <View style={styles.buttonContainer}>
            {showButton ? (
              <TouchableOpacity style={styles.button} onPress={handleStartNowPress}>
                <Text style={styles.buttonText}>Start now</Text>
              </TouchableOpacity>
            ) : (
              <ActivityIndicator size="large" color="#FF8C00" />
            )}
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1115', // Dark background
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    color: '#FFFFFF', // White text color
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 10,
  },
  subtitle: {
    color: '#FF8C00', // Orange text color
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    bottom: '-300%',
  },
  button: {
    backgroundColor: '#FF8C00', // Orange background
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 50,
  },
  buttonText: {
    color: '#FFFFFF', // White text color
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
