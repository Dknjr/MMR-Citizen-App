import { useColorScheme } from '@/hooks/useColorScheme';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';

export default function Helps() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const currentColors = isDarkMode ? Colors.dark : Colors.light;

  return (
    <SafeAreaProvider>
        <Stack.Screen
          options={{
            headerTitle: 'Aide'
          }}
        />
      <SafeAreaView style={[styles.container, { backgroundColor: currentColors.background }]}>
          <Text style={[styles.headerText, { color: currentColors.text }]}>Besoin d'aide ?</Text>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>

          <TouchableOpacity style={[styles.helpButton, { backgroundColor: currentColors.base }]}>
            <Ionicons name="help-circle-outline" size={24} color={currentColors.tint} />
            <Text style={[styles.buttonText, { color: currentColors.text }]}>FAQ</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.helpButton, { backgroundColor: currentColors.base }]}>
            <Ionicons name="chatbox-outline" size={24} color={currentColors.tint} />
            <Text style={[styles.buttonText, { color: currentColors.text }]}>Support en ligne</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.helpButton, { backgroundColor: currentColors.base }]}>
            <Ionicons name="book-outline" size={24} color={currentColors.tint} />
            <Text style={[styles.buttonText, { color: currentColors.text }]}>Guides d'utilisation</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.helpButton, { backgroundColor: currentColors.base }]}>
            <Ionicons name="call-outline" size={24} color={currentColors.tint} />
            <Text style={[styles.buttonText, { color: currentColors.text }]}>Contacter le support</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  headerText: {
    fontSize: 24,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
  },
  helpButton: {
    width: '95%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginVertical: 10,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  buttonText: {
    marginLeft: 15,
    fontSize: 18,
    fontWeight: '500',
  },
});
