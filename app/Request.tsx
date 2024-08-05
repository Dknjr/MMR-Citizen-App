import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, Image } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import * as ImagePicker from 'expo-image-picker';

export default function SubmitRequest() {
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

  const handleNext = () => {
    // Logic to handle form submission
    console.log('Form Submitted');
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access camera roll is required!');
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
      alert('Permission to access camera is required!');
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
      'Upload Photo',
      'Choose an option',
      [
        {
          text: 'Choose from library',
          onPress: pickImage,
        },
        {
          text: 'Take a photo',
          onPress: takePhoto,
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.container, { backgroundColor: currentColors.background }]}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.header}>
            <Text style={[styles.title, { color: currentColors.text }]}>SUBMIT REQUEST</Text>
          </View>
          <Text style={[styles.description, { color: currentColors.text }]}>
            Lorem ipsum dolor sit amet consectetur. Diam in eget eget massa tortor.
          </Text>

          <Text style={[styles.titles, { color: currentColors.text }]}>First Name</Text>
          <TextInput
            style={[styles.input, { backgroundColor: currentColors.base, color: currentColors.text }]}
            placeholder="Enter your First Name"
            placeholderTextColor={currentColors.icon}
            value={firstName}
            onChangeText={setFirstName}
          />

          <Text style={[styles.titles, { color: currentColors.text }]}>Last Name</Text>
          <TextInput
            style={[styles.input, { backgroundColor: currentColors.base, color: currentColors.text }]}
            placeholder="Enter your Last Name"
            placeholderTextColor={currentColors.icon}
            value={lastName}
            onChangeText={setLastName}
          />

          <Text style={[styles.titles, { color: currentColors.text }]}>Email Id</Text>
          <TextInput
            style={[styles.input, { backgroundColor: currentColors.base, color: currentColors.text }]}
            placeholder="Enter your Email Id"
            placeholderTextColor={currentColors.icon}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <Text style={[styles.titles, { color: currentColors.text }]}>Mobile Number</Text>
          <TextInput
            style={[styles.input, { backgroundColor: currentColors.base, color: currentColors.text }]}
            placeholder="Enter your Mobile Number"
            placeholderTextColor={currentColors.icon}
            value={mobile}
            onChangeText={setMobile}
            keyboardType="phone-pad"
          />

          <Text style={[styles.titles, { color: currentColors.text }]}>Subject</Text>
          <TextInput
            style={[styles.input, { backgroundColor: currentColors.base, color: currentColors.text }]}
            placeholder="Enter the Subject"
            placeholderTextColor={currentColors.icon}
            value={subject}
            onChangeText={setSubject}
          />

          <Text style={[styles.titles, { color: currentColors.text }]}>Message</Text>
          <TextInput
            style={[styles.input, styles.textArea, { backgroundColor: currentColors.base, color: currentColors.text }]}
            placeholder="Enter your Message"
            placeholderTextColor={currentColors.icon}
            value={message}
            onChangeText={setMessage}
            multiline={true}
            numberOfLines={4}
          />

          <Text style={styles.warning}>Please verify your entered details before submitting</Text>

          <Text style={[styles.label, { color: currentColors.text }]}>Attachments</Text>
          <TouchableOpacity style={[styles.attachment, { backgroundColor: currentColors.base }]} onPress={handleAttachmentPress}>
            <Text style={[styles.attachmentText, { color: currentColors.icon }]}>+ Add your files here</Text>
          </TouchableOpacity>

          <View style={styles.imageContainer}>
            {selectedImages.map((image, index) => (
              <Image key={index} source={{ uri: image.uri }} style={styles.thumbnail} />
            ))}
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, { backgroundColor: currentColors.text }]} onPress={handleReset}>
              <Text style={[styles.buttonText, { color: currentColors.background }]}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, { backgroundColor: currentColors.tint }]} onPress={handleNext}>
              <Text style={[styles.buttonText, { color: currentColors.background }]}>Next</Text>
            </TouchableOpacity>
          </View>
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
