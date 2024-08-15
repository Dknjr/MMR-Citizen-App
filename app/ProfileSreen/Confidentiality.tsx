// app/auth/ConfidentialiteScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { StackNavigationProp } from '@react-navigation/stack';
import { Colors } from '@/constants/Colors';

// Définir les types pour les données et la navigation
type ConfidentialityData = {
  email: string;
  mobileNumber: string;
  password: string;
};



export default function ConfidentialiteScreen() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const currentColors = isDarkMode ? Colors.dark : Colors.light;
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const data: ConfidentialityData = await simulateDatabaseFetch();
      setEmail(data.email);
      setMobileNumber(data.mobileNumber);
      setPassword(data.password);
    };
    fetchData();
  }, []);

  const simulateDatabaseFetch = async (): Promise<ConfidentialityData> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          email: 'user@example.com',
          mobileNumber: '123456789',
          password: '••••••••',
        });
      }, 1000);
    });
  };

  const handleModifyPress = () => {
    router.push('/ProfileSreen/ModifyConfidentiality')
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Stack.Screen
          options={{
            headerTitle: 'Confidentialité',
              
            headerRight: () => (
              <Text style={styles.modifyButton} onPress={handleModifyPress}>
                Modifier
              </Text>
            ),
          }}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          editable={false}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Numéro de téléphone</Text>
        <TextInput
          style={styles.input}
          value={mobileNumber}
          editable={false}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Mot de passe</Text>
        <TextInput
          style={styles.input}
          value={password}
          editable={false}
          secureTextEntry
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  modifyButton: {
    fontSize: 18,
    color: Colors.light.tint,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 15,
    backgroundColor: '#e9e9e9',
  },
});
