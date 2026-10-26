import React, { useState } from 'react';
import { Colors } from '@/constants/Colors'; // Suppose you have a Colors.js file managing the light and dark colors.
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Modal, useColorScheme } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Stack } from 'expo-router';

//import CountryPicker, { CountryCode } from 'react-native-country-picker-modal';

export default function ModifyConfidentiality() {
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === 'dark';
    const currentColors = isDarkMode ? Colors.dark : Colors.light;
    const navigation = useNavigation();

  // State pour les champs de saisie
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // State pour la gestion des overlays de vérification
  const [isEmailOverlayVisible, setEmailOverlayVisible] = useState(false);
  const [isMobileOverlayVisible, setMobileOverlayVisible] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  
  // State pour le picker de pays
//  const [countryCode, setCountryCode] = useState<CountryCode>('FR')
  const [callingCode, setCallingCode] = useState('33');

  // Gestion de la vérification email
  const handleVerifyEmail = () => {
    // Code pour envoyer un email de vérification ici
    setEmailOverlayVisible(true);
  };

  // Gestion de la vérification du numéro de mobile
  const handleVerifyMobile = () => {
    // Code pour envoyer un SMS de vérification ici
    setMobileOverlayVisible(true);
  };

  const handleSavePress = () => {
    // Code pour enregistrer les modifications ici
  };

  /*const handleCountrySelect = (country: any) => {
    setCountryCode(country.cca2 as CountryCode);
    setCallingCode(country.callingCode[0]);
  }*/

  return (
    <View style={[styles.container, {backgroundColor: currentColors.background}]}>
      <Stack.Screen
          options={{
            headerTitle: 'Modifier',
            headerRight: () => (
              <Text style={[styles.saveButton, {color: currentColors.tint}]} onPress={handleSavePress}>
                Enrégistrer
              </Text>
            ),
          }}
        />
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Entrez votre Email"
          value={email}
          onChangeText={setEmail}
        />
        <View style={ styles.verify }>
            <Text style={styles.verifyText}>Vérifiez Email</Text>
            <TouchableOpacity style={styles.verifyButton} onPress={handleVerifyEmail}>
            <Text style={styles.verifyButtonText}>Vérifier</Text>
            </TouchableOpacity>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Numéro de téléphone</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Pays"
          value={mobileNumber}
        />
        <TextInput
          style={styles.input}
          placeholder="Entrez votre numero de téléphone"
          value={mobileNumber}
          onChangeText={setMobileNumber}
          keyboardType="phone-pad"
        />
        <View style={ styles.verify }>
            <Text style={styles.verifyText}>Vérifier votre numéro</Text>
            <TouchableOpacity style={styles.verifyButton} onPress={handleVerifyMobile}>
            <Text style={styles.verifyButtonText}>Vérifier</Text>
            </TouchableOpacity>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Modifiez votre mot de passe</Text>
        <TextInput
          style={styles.input}
          placeholder="Entrez votre mot de passe"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirmer votre mot de passe"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>

      {/* Modal pour la vérification de l'email */}
      <Modal visible={isEmailOverlayVisible} transparent animationType="slide">
        <View style={styles.overlayContainer}>
          <View style={styles.overlayContent}>
            <Text style={styles.overlayTitle}>Un code de vérification a été envoyé sur votre email. Veuillez entrer le code !</Text>
            <TextInput
              style={styles.input}
              placeholder="Code de vérification"
              value={verificationCode}
              onChangeText={setVerificationCode}
            />
            <View style={styles.overlayButtons}>
              <TouchableOpacity style={styles.verifyButton} onPress={() => setEmailOverlayVisible(false)}>
                <Text style={styles.verifyButtonText}>Vérifier</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setEmailOverlayVisible(false)}>
                <Text style={styles.cancelButtonText}>Annuler</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal pour la vérification du numéro de téléphone */}
      <Modal visible={isMobileOverlayVisible} transparent animationType="slide">
        <View style={styles.overlayContainer}>
          <View style={styles.overlayContent}>
            <Text style={styles.overlayTitle}>Un code de vérification a été envoyé sur votre numéro. Veuillez entrer le code !</Text>
            <TextInput
              style={styles.input}
              placeholder="Code de vérification"
              value={verificationCode}
              onChangeText={setVerificationCode}
            />
            <View style={styles.overlayButtons}>
              <TouchableOpacity style={styles.verifyButton} onPress={() => setMobileOverlayVisible(false)}>
                <Text style={styles.verifyButtonText}>Vérifier</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setMobileOverlayVisible(false)}>
                <Text style={styles.cancelButtonText}>Annuler</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
},

saveButton: {
    fontSize: 18,
},
inputContainer: {
    marginBottom: 20,
    marginTop: 35,
  },
  label: {
    fontSize: 15,
    color: '#333',
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 15,
    backgroundColor: Colors.light.base,
    marginBottom: 10,
  },
  verifyText: {
    fontSize: 15,
    fontWeight: '500',
  },
  verifyButton: {
    backgroundColor: Colors.light.tint
    ,
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  verify: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  verifyButtonText: {
    color: '#fff',
    fontSize: 16,
    marginHorizontal: 45,
  },
  overlayContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  overlayContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  overlayTitle: {
    fontSize: 13,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 15,
  },
  overlayButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#333',
    fontSize: 16,
    marginHorizontal: 5,
  },
});
