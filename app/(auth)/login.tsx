import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useAuth } from '@/context/auth'; // Assurez-vous que le chemin est correct
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
//import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
//import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleAuthLogin = async () => {
    try {
      const response = await fetch('http://192.168.1.72:2030/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur de connexion');
      }

      const data = await response.json();

      // Vérifiez la réponse et gérez les informations d'authentification
      if (data && data.token) {
        const user = {
          id: data.userId,
          name: data.name,
          email: data.email,
        };
        const token = data.token;

        login(user, token);  // Stocke l'utilisateur dans le contexte d'authentification
        router.replace('/(tabs)/accueil'); // Redirige vers la page d'accueil
      } else {
        Alert.alert(
          'Erreur de connexion',
          'Email ou mot de passe incorrect. Veuillez réessayer.',
          [{ text: 'OK' }],
        );
      }
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      Alert.alert(
        'Erreur',
        'Une erreur s\'est produite lors de la tentative de connexion. Veuillez réessayer.',
        [{ text: 'OK' }],
      );
    }
  };
  
  /*useEffect(() => {
      GoogleSignin.configure({
          webClientId: 'YOUR_GOOGLE_WEB_CLIENT_ID',
      });
  }, []);*/
  /*const handleFacebookLogin = async () => {
      try {
          const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
          if (result.isCancelled) {
              Alert.alert('Erreur', 'La connexion Facebook a été annulée.');
          } else {
              const data = await AccessToken.getCurrentAccessToken();
              if (data) {
                  const user = {
                      id: data.userID,
                      name: 'Facebook User',
                      email: '', // Obtenez l'email via Graph API si nécessaire
                      image: `https://graph.facebook.com/${data.userID}/picture?type=large`,
                  };
                  login(user);
                  router.replace('/(tabs)/accueil');
              }
          }
      } catch (error) {
          const err = error as Error;
          Alert.alert('Erreur', err.message);
      }
  };*/
  /*const handleGoogleLogin = async () => {
      try {
          await GoogleSignin.hasPlayServices();
          const userInfo = await GoogleSignin.signIn();
          const user = {
              id: userInfo.user.id,
              name: userInfo.user.name,
              email: userInfo.user.email,
              image: userInfo.user.photo,
          };
          login(user);
          router.replace('/(tabs)/accueil');
      } catch (error) {
          const err = error as Error;
          if (err.message === statusCodes.SIGN_IN_CANCELLED) {
              Alert.alert('Erreur', 'La connexion Google a été annulée.');
          } else if (err.message === statusCodes.IN_PROGRESS) {
              Alert.alert('Erreur', 'Connexion Google en cours.');
          } else if (err.message === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
              Alert.alert('Erreur', 'Services Google Play non disponibles.');
          } else {
              Alert.alert('Erreur', err.message);
          }
      }*/

     return (
         <View style={styles.container}>
             <Image source={require('@/assets/images/authdesign.png')} style={styles.image} />
             <Text style={styles.title}>Welcome {'\n'}Back</Text>
             <View style={styles.inputes}>
                 <TextInput
                     style={styles.input}
                     placeholder="Your Email"
                     value={email}
                     onChangeText={setEmail}
                     keyboardType="email-address"
                     autoCapitalize="none"
                     placeholderTextColor="#999"
                 />
                 <TextInput
                     style={styles.input}
                     placeholder="Password"
                     value={password}
                     onChangeText={setPassword}
                     secureTextEntry
                     placeholderTextColor="#999"
                 />
             </View>
             <TouchableOpacity style={styles.button} onPress={handleAuthLogin}>
                 <Text style={styles.buttonText}>Log in</Text>
             </TouchableOpacity>
             <View style={styles.alternative}>
                 <View style={styles.line} />
                 <Text style={{ color: '#fff', marginHorizontal: 15, fontSize: 25 }}>Or</Text>
                 <View style={styles.line} />
             </View>
             <View style={styles.socialButtons}>
                 <TouchableOpacity style={styles.socialButton} /*onPress={handleFacebookLogin}*/>
                     <Image source={require('@/assets/Icons/Facebook.png')} style={styles.socialIcon} />
                 </TouchableOpacity>
                 <TouchableOpacity style={styles.socialButton} /*onPress={handleGoogleLogin}*/>
                     <Image source={require('@/assets/Icons/Google.png')} style={styles.socialIcon} />
                 </TouchableOpacity>
             </View>
             <View style= {{ flexDirection: 'row', alignItems:'center', marginTop: 50}}>
              <Text style={{ color: '#fff', fontSize: 15 }}>Don’t have an account ? </Text>
              <TouchableOpacity onPress={() => router.push('/(auth)/signup')}>
                  <Text style={{fontSize:18, color: Colors.light.tint}}>Sign up</Text>
              </TouchableOpacity>
             </View>
         </View>
     );
  };



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
      marginTop: 70,
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
  button: {
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
  buttonText: {
      color: '#fff',
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
  socialButtons: {
      flexDirection: 'row',
      marginTop: 30,
  },
  socialButton: {
      padding: 10,
      marginHorizontal: 10,
  },
  socialIcon: {
      width: 30,
      height: 30,
  },
});