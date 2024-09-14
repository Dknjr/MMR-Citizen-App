import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function CreateAccount() {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      const response = await fetch('http://192.168.2.241:20/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la création du compte');
      }

      const data = await response.json();

      if (response.status === 200) {
        // 201 Created: Compte créé avec succès
        Alert.alert('Succès', 'Compte créé avec succès', [
          { text: 'OK', onPress: () => router.push('/(auth)/login') },
        ]);
      } else if (response.status === 400) {
        // 400 Bad Request: Erreur dans les données soumises
        const data = await response.json();
        Alert.alert('Erreur', data.message || 'Une erreur est survenue');
      } else {
        Alert.alert('Erreur', data.message || 'Une erreur est survenue');
      }
    } catch (error) {
      console.error('Erreur lors de la création du compte:', error);
      Alert.alert('Erreur', 'Une erreur s\'est produite lors de la création du compte. Veuillez réessayer.', [
        { text: 'OK' },
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('@/assets/images/authdesign.png')} style={styles.image} />
      <Text style={styles.title}>Create{'\n'}account</Text>

      <View style={styles.inputes}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#A0A0A0"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Your Email"
          placeholderTextColor="#A0A0A0"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#A0A0A0"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
      </View>

      <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
        <Text style={styles.signupButtonText}>Sign up</Text>
      </TouchableOpacity>

      <View style={styles.alternative}>
        <View style={styles.line} />
        <Text style={{ color: '#fff', marginHorizontal: 15, fontSize: 25 }}>Or</Text>
        <View style={styles.line} />
      </View>

      <View style={styles.socialButtonsContainer}>
        <View style={styles.socialButtons}>
          <TouchableOpacity style={styles.socialButton}>
            <Image source={require('@/assets/Icons/Facebook.png')} style={styles.socialIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Image source={require('@/assets/Icons/Google.png')} style={styles.socialIcon} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
        <Text style={{ color: '#fff', fontSize: 15 }}>Already have an account?</Text>
        <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
          <Text style={{ fontSize: 18, color: Colors.light.tint }}>Sign in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 80,
    paddingHorizontal: 20,
    backgroundColor: '#20001F',
  },
  image: {
    position: 'absolute',
    bottom: 0,
  },
  title: {
  fontSize: 50,
  fontWeight: 'bold',
  color: '#fff',
  marginBottom: 40,
  textAlign: 'left',
  width: '100%',
  },
  inputes: {
  width: '100%',
  marginTop: 25,
  marginBottom: 30,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#fff',
    padding: 15,
    marginBottom: 20,
    borderRadius: 25,
    color: '#fff',
    backgroundColor: 'transparent',
  },
  signupButton: {
    width: '65%',
    backgroundColor: Colors.light.tint,
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#000',
    elevation: 5,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.35,
    shadowRadius: 3.84,
  },
  signupButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  alternative: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
  },
  line: {
      width: 80,
      height: 2,
      backgroundColor: '#e0e0e0',
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '40%',
    marginBottom: 30,
  },
  socialButtons: {
    flexDirection: 'row',
    marginTop: 30,
  },
socialButton: {
    padding: 10,
    marginHorizontal: 10,
},
  footerTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  footerText: {
    color: '#A0A0A0',
    fontSize: 16,
  },
  loginText: {
    color: '#FF8C00',
    fontWeight: 'bold',
  },
  socialIcon: {
    width: 30,
    height: 30,
},
});
