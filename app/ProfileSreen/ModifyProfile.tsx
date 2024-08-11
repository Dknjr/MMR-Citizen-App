import { Colors } from '@/constants/Colors'; // Suppose you have a Colors.js file managing the light and dark colors.
import Icon from '@expo/vector-icons/Ionicons';
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

export default function Profile() {
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
            headerTitle: 'Modify',
              
            headerRight: () => (
              <Text style={styles.SaveButton} onPress={handleSavePress}>
                Save
              </Text>
            ),
          }}
        />

      <View style={styles.form}>
        <Text style={[styles.sectionTitle, { color: currentColors.text }]}>Modify your personal information</Text>

        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: currentColors.text }]}>First Name</Text>
          <TextInput
            style={[styles.input, { backgroundColor: currentColors.base, color: currentColors.text }]}
            placeholder="Enter your First Name"
            placeholderTextColor={currentColors.icon}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: currentColors.text }]}>Last Name</Text>
          <TextInput
            style={[styles.input, { backgroundColor: currentColors.base, color: currentColors.text }]}
            placeholder="Enter your Last Name"
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
