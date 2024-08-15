import { Colors } from '@/constants/Colors'; // Suppose you have a Colors.js file managing the light and dark colors.
import { useRouter, Stack } from 'expo-router';

import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
} from 'react-native';

export default function ModifyProfile() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const currentColors = isDarkMode ? Colors.dark : Colors.light;

  const handleSavePress = () => {
    router.push('/ProfileSreen/ModifyProfile'); // Dirige vers l'interface de modification de profil
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentColors.background }]}>
      <Stack.Screen
          options={{
            headerTitle: 'Modifier',
              
            headerRight: () => (
              <Text style={styles.SaveButton} onPress={handleSavePress}>
                Enrégistrer
              </Text>
            ),
          }}
        />

      <View style={styles.form}>
        <Text style={[styles.sectionTitle, { color: currentColors.text }]}>Modifiez vos informations personnelles</Text>

        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: currentColors.text }]}>Prénom</Text>
          <TextInput
            style={[styles.input, { backgroundColor: currentColors.base, color: currentColors.text }]}
            placeholder="Entrez votre prénom"
            placeholderTextColor={currentColors.icon}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: currentColors.text }]}>Nom de famille</Text>
          <TextInput
            style={[styles.input, { backgroundColor: currentColors.base, color: currentColors.text }]}
            placeholder="Enter votre nom de famille"
            placeholderTextColor={currentColors.icon}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  SaveButton: {
    fontSize: 18,
    color: '#FF6F00', // La couleur du bouton "Modify"
  },
  form: {
    paddingHorizontal: 20,
    marginTop: 30,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 10,
  },
});
