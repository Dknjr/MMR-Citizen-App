import React, { useState } from 'react';
import { Stack } from 'expo-router';
import { View, Text, TextInput,  TouchableOpacity, StyleSheet, ScrollView, Alert, Image } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import * as ImagePicker from 'expo-image-picker';
import RequestModal from '../components/Modals/RequestModal';

export default function SubmitRequest() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [selectedImages, setSelectedImages] = useState<ImagePicker.ImagePickerAsset[]>([]);

  const handleReset = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setMobile('');
    setSubject('');
    setMessage('');
    setSelectedImages([]);
  };

  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const currentColors = isDarkMode ? Colors.dark : Colors.light;

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert("Cette Aplication souhaite accéder à l'appareil photo !");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImages([...selectedImages, ...result.assets]);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert("Cette Aplication souhaite accéder à l'appareil photo !");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImages([...selectedImages, result.assets[0]]);
    }
  };

  const handleAttachmentPress = () => {
    Alert.alert(
      'Ajouter des Photos',
      'Choisissez une option',
      [
        {
          text: 'Choisir dans la bibliothèque',
          onPress: pickImage,
        },
        {
          text: 'Prendre une photo',
          onPress: takePhoto,
        },
        {
          text: 'Annuler',
          style: 'cancel',
        },
      ],
      { cancelable: true }
    );
  };

  const handleSubmit = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <SafeAreaProvider>
      <Stack.Screen
          options={{
            headerTitle: 'Demande'
          }}
        />
      <SafeAreaView style={[styles.container, { backgroundColor: currentColors.background }]}>
        <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={true}
        indicatorStyle={isDarkMode ? 'white' : 'black'}
        scrollIndicatorInsets={{ right: 0 }}  // Ajout d'un espacement de 10 à droite
        >
          <View style={styles.contentwidth}>
            <View style={styles.header}>
              <Text style={[styles.title, { color: Colors.light.tint }]}>SOUMETTRE UNE DEMANDE</Text>
            </View>
            <Text style={[styles.description, { color: currentColors.text }]}>
            Veuillez remplir les informations ci-dessous pour soumettre votre demande.
            </Text>

            <Text style={[styles.titles, { color: currentColors.text }]}>Prénom</Text>
            <TextInput
              style={[styles.input, { backgroundColor: currentColors.base, color: currentColors.text }]}
              placeholder="Entrez votre prénom"
              placeholderTextColor={currentColors.icon}
              value={firstName}
              onChangeText={setFirstName}
            />

            <Text style={[styles.titles, { color: currentColors.text }]}>Nom de famille</Text>
            <TextInput
              style={[styles.input, { backgroundColor: currentColors.base, color: currentColors.text }]}
              placeholder="Entrez votrez nom de famille"
              placeholderTextColor={currentColors.icon}
              value={lastName}
              onChangeText={setLastName}
            />

            <Text style={[styles.titles, { color: currentColors.text }]}>Email</Text>
            <TextInput
              style={[styles.input, { backgroundColor: currentColors.base, color: currentColors.text }]}
              placeholder="Entrez votre Email"
              placeholderTextColor={currentColors.icon}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />

            <Text style={[styles.titles, { color: currentColors.text }]}>Numéro de Téléphone</Text>
            <TextInput
              style={[styles.input, { backgroundColor: currentColors.base, color: currentColors.text }]}
              placeholder="Entrez votre numéro de téléphone"
              placeholderTextColor={currentColors.icon}
              value={mobile}
              onChangeText={setMobile}
              keyboardType="phone-pad"
            />

            <Text style={[styles.titles, { color: currentColors.text }]}>Objet</Text>
            <TextInput
              style={[styles.input, { backgroundColor: currentColors.base, color: currentColors.text }]}
              placeholder="Entrez l'objet de la demande"
              placeholderTextColor={currentColors.icon}
              value={subject}
              onChangeText={setSubject}
            />

            <Text style={[styles.titles, { color: currentColors.text }]}>Message</Text>
            <TextInput
              style={[styles.input, styles.textArea, { backgroundColor: currentColors.base, color: currentColors.text }]}
              placeholder="Entrez votre Message"
              placeholderTextColor={currentColors.icon}
              value={message}
              onChangeText={setMessage}
              multiline={true}
              numberOfLines={4}
            />

            <Text style={styles.warning}>Veuillez vérifier les informations entrées avant de soumettre.</Text>

            <Text style={[styles.label, { color: currentColors.text }]}>Images</Text>
            <TouchableOpacity style={[styles.attachment, { backgroundColor: currentColors.base }]} onPress={handleAttachmentPress}>
              <Text style={[styles.attachmentText, { color: currentColors.icon }]}>+ Ajoutez vos fichiers ici</Text>
            </TouchableOpacity>

            <View style={styles.imageContainer}>
              {selectedImages.map((image, index) => (
                <Image key={index} source={{ uri: image.uri }} style={styles.thumbnail} />
              ))}
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={[styles.button, { backgroundColor: currentColors.text }]} onPress={handleReset}>
                <Text style={[styles.buttonText, { color: currentColors.background }]}>Réinitialiser</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, { backgroundColor: currentColors.tint }]} onPress={handleSubmit}>
                <Text style={[styles.buttonText, { color: currentColors.background }]}>Envoyer</Text>
                <RequestModal visible={isModalVisible} onClose={handleCloseModal} />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 0,
  },
  contentwidth: {
    marginLeft:20, 
    marginRight: 20,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  backIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    marginVertical: 20,
    fontSize: 14,
  },
  titles: {
    marginBottom: 10,
    fontSize: 16,
  },
  input: {
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  warning: {
    padding: 1.5,
    color: Colors.light.tint,
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    marginBottom: 10,
    fontSize: 16,
  },
  attachment: {
    borderRadius: 25,
    padding: 15,
    alignItems: 'center',
    marginBottom: 10,
  },
  attachmentText: {
    fontSize: 16,
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 30,
  },
  thumbnail: {
    width: 100,
    height: 100,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
