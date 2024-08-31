import React, { useState, useEffect } from 'react';
import { Stack } from 'expo-router';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import Icons from '@expo/vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import CategoriesNavBar from '@/components/CategoriesNavBar';
import PublicRoad from '@/components/publicRoad';
import StreetLights from '@/components/StreetLights';
import Environment from '@/components/Environment';
import Parks from '@/components/Parks&gardens';
import Traffic from '@/components/Traffic&parking';
import Urban from '@/components/UrbanDevelopment';
import City from '@/components/CityServices';
import Public from '@/components/PublicSafety';
import Social from '@/components/SocialServices';
import ReportModal from '@/components/Modals/reportModal';

export default function Report() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [level, setLevel] = useState(0);
  const [location, setLocation] = useState<{ latitude: number, longitude: number } | null>(null);
  const [description, setDescription] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [isLocationSet, setIsLocationSet] = useState<boolean>(false);
  const [selectedImages, setSelectedImages] = useState<ImagePicker.ImagePickerAsset[]>([]);
  const [selectedTab, setSelectedTab] = useState('Éclairage public');

  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const currentColors = isDarkMode ? Colors.dark : Colors.light;

  useEffect(() => {
    if (selectedImages.length > 0 && level >= 1) {
      setLevel(2);
    }
  }, [selectedImages]);

  useEffect(() => {
    if (isLocationSet && level >= 2) {
      setLevel(3);
    }
  }, [isLocationSet]);

  const getCurrentDate = () => {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  const requestLocation = async () => {
    if (level < 2) {
      Alert.alert('Veuillez complèter les étapes précédentes.');
      return;
    }

    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Accès refusé');
      return;
    }
    
    setLoading(true);

    let location = await Location.getCurrentPositionAsync({});
    setLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
    setIsLocationSet(true);
    setLoading(false);
  };

  const pickImage = async () => {
    if (level < 1) {
      Alert.alert('Veuillez complèter les étapes précédentes.');
      return;
    }

    if (selectedImages.length >= 3) {
      Alert.alert('Vous ne pouvez ajouter que 3 images.');
      return;
    }

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
      const newImages = [...selectedImages, ...result.assets];
      if (newImages.length > 3) {
        Alert.alert('Vous ne pouvez ajouter que 3 images.');
        setSelectedImages(newImages.slice(0, 3)); // Limite à 3 images
      } else {
        setSelectedImages(newImages);
      }
    }
  };

  const takePhoto = async () => {
    if (level < 1) {
      Alert.alert('Veuillez complèter les étapes précédentes.');
      return;
    }

    if (selectedImages.length >= 3) {
      Alert.alert('Vous ne pouvez ajouter que 3 images.');
      return;
    }

    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert("Cette Aplication souhaite accéder à l'appareil photo !");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      quality: 1,
    });

    if (!result.canceled) {
      const newImages = [...selectedImages, result.assets[0]];
      if (newImages.length > 3) {
        Alert.alert('Vous ne pouvez ajouter que 3 images.');
        setSelectedImages(newImages.slice(0, 3)); // Limite à 3 images
      } else {
        setSelectedImages(newImages);
      }
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

  const handleReset = () => {
    setLocation(null);
    setDescription('');
    setSelectedImages([]);
    setIsLocationSet(false);
    setLevel(0);
    setSelectedTab('Éclairage public');
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = selectedImages.filter((_, i) => i !== index);
    setSelectedImages(updatedImages);
    if (updatedImages.length === 0) {
      setLevel(1);
    }
  };
  

  const renderContent = () => {
    switch (selectedTab) {
      case 'Éclairage public': return <StreetLights setLevel={setLevel} />;
      case 'Voirie': return <PublicRoad setLevel={setLevel} />;
      case 'Environnement': return <Environment setLevel={setLevel} />;
      case 'Espaces verts': return <Parks setLevel={setLevel} />;
      case 'Transports et stationnement': return <Traffic setLevel={setLevel} />;
      case 'Logement et urbanisme': return <Urban setLevel={setLevel} />;
      case 'Services municipaux': return <City setLevel={setLevel} />;
      case 'Sécurité publique': return <Public setLevel={setLevel} />;
      case 'Services sociaux': return <Social setLevel={setLevel} />;
      default: return <StreetLights setLevel={setLevel} />;
    }
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
          
            headerTitle: 'Signalement'
          }}
        />
      <SafeAreaView style={[styles.container, { backgroundColor: currentColors.background }]}>
        <View style={styles.headerStyle}>
          <View style={styles.header}>
            <Text style={[styles.title, { color: Colors.light.tint }]}>Aujourd'hui</Text>
            <Text style={[styles.date, { color: currentColors.text }]}>{getCurrentDate()}</Text>
          </View>
          <Text style={[styles.category, { color: currentColors.text }]}>Catégories</Text>
          <CategoriesNavBar currentColors={currentColors} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          scrollIndicatorInsets={{ right: -2 }}>

          <View style={styles.content}>
            <View style={styles.TimelineContainer}>
              <View style={styles.timeline}>
                <View style={[styles.circle, level >= 1 && styles.completedCircle]}>
                  <Text style={styles.circleText}>1</Text>
                </View>
                <View style={[styles.line1, level >= 1 && styles.completedLine]} />
                <View style={[styles.circle, level >= 2 && styles.completedCircle]}>
                  <Text style={styles.circleText}>2</Text>
                </View>
                <View style={[styles.line2, level >= 2 && styles.completedLine]} />
                <View style={[styles.circle, level >= 3 && styles.completedCircle]}>
                  <Text style={styles.circleText}>3</Text>
                </View>
              </View>
            </View>

            <View style={styles.formWrapper}>
              <Text style={styles.sectionTitle}>Signalement</Text>
              <View style={styles.section}>
                <ScrollView style={styles.scrollview}>
                  {renderContent()}
                </ScrollView>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Images</Text>
                <TouchableOpacity style={[styles.imagePicker, { backgroundColor: currentColors.base }]} onPress={handleAttachmentPress}>
                  <Text style={[styles.imagePickerText, { color: currentColors.icon }]}>+ Ajoutez vos fichiers ici</Text>
                </TouchableOpacity>

                <View style={styles.imagesContainer}>
                  {selectedImages.map((image, index) => (
                    <View key={index} style={styles.imageWrapper}>
                      <Image source={{ uri: image.uri }} style={styles.image} />
                      <TouchableOpacity style={styles.removeButton} onPress={() => handleRemoveImage(index)}>
                        <Icons name="close-circle" size={24} color= 'red' />
                      </TouchableOpacity>
                    </View>
                  ))}

                  {/* Placeholders */}
                  {Array.from({ length: 3 - selectedImages.length }).map((_, index) => (
                    <View key={index} style={styles.placeholder}>
                      <Icons name="image-outline" size={50} color={currentColors.icon} />
                    </View>
                  ))}
                </View>
              </View>

              <View /*ref={section3Ref}*/ style={styles.section}>
                <Text style={styles.sectionTitle}>Localisation</Text>
                <View style={styles.locationlayout}>

                  <TouchableOpacity style={styles.locationButton} onPress={requestLocation}>
                    {!loading ? (
                      <Icons style={styles.locationIcon} name="location" size={24} color='#fff' />
                    ):(
                      <ActivityIndicator style={styles.activityindicator} color="#fff" />
                    )}
                  </TouchableOpacity>

                  <TextInput
                    style={[styles.input, { color: currentColors.text }]}
                    placeholder="Localisation en direct"
                    placeholderTextColor={currentColors.icon}
                    value={location ? `Lat: ${location.latitude}, Lon: ${location.longitude}` : ''}
                    editable={false}
                  />
                </View>
                {location && (
                  <MapView
                    style={styles.map}
                    initialRegion={{
                      latitude: location.latitude,
                      longitude: location.longitude,
                      latitudeDelta: 0.01,
                      longitudeDelta: 0.01,
                    }}
                  >
                    <Marker
                      coordinate={{
                        latitude: location.latitude,
                        longitude: location.longitude,
                      }}
                    />
                  </MapView>
                )}
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: currentColors.text }]}>Descriptions</Text>
            <TextInput
              style={[styles.input, styles.textArea, { backgroundColor: currentColors.base, color: currentColors.text }]}
              placeholder="Plus de descriptions..."
              placeholderTextColor={currentColors.icon}
              value={description}
              onChangeText={setDescription}
              multiline={true}
              numberOfLines={4}
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, { backgroundColor: currentColors.text }]} onPress={handleReset}>
              <Text style={[styles.buttonText, { color: currentColors.background }]}>Réinitialiser</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, { backgroundColor: currentColors.tint }]} onPress={handleSubmit}>
              <Text style={[styles.buttonText, { color: currentColors.background }]}>Envoyer</Text>
              <ReportModal visible={isModalVisible} onClose={handleCloseModal} />
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
    paddingHorizontal: 0,
    backgroundColor: '#fff', // Ajuster selon le colorScheme
  },
  headerStyle: {
    paddingHorizontal: 20,
  },
  scrollContainer: {
    paddingBottom: 20,
    marginHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 16,
    marginLeft: 10,
  },
  TimelineContainer: {

  },
  timeline: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20,
  },
  circle: {
    width: 25,
    height: 25,
    borderRadius: 25,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  completedCircle: {
    backgroundColor: Colors.light.tint,
  },
  circleText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  line1: {
    width: 4,
    height: 200,
    backgroundColor: '#e0e0e0',
    marginBottom: 10,
  },
  line2: {
    width: 4,
    height: 151,
    backgroundColor: '#e0e0e0',
    marginBottom: 10,
  },
  completedLine: {
    backgroundColor: Colors.light.tint,
  },
  category: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
  },
  content: {
    flexDirection: 'row',
  },
  formWrapper: {
    flex: 1,
    paddingLeft: 10,
  },
  section: {
    width: '100%',
    marginBottom: 15,
  },
  scrollview: {
    maxHeight: 200,
  },
  sectionTitle: {
    color: Colors.light.tint,
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 0,
    marginBottom: 10,
  },
  imagePicker: {
    backgroundColor: '#ddd',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  imagePickerText: {
    fontSize: 16,
    color: '#555',
  },
  imagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  imageWrapper: {
    position: 'relative',
  },
  image: {
    width: 85,
    height: 85,
    borderRadius: 10,
    marginHorizontal: 5,
    marginBottom: 10,
  },
  removeButton: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'white',
    borderRadius: 12,
  },
  placeholder: {
    width: 85,
    height: 85,
    marginHorizontal: 5,
    borderRadius: 10,
    backgroundColor: Colors.light.base,
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationlayout: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ddd',
    borderRadius: 20,
  },

  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.tint,
    borderRadius: 15,
    margin: 5, 
  },
  locationIcon: {
    padding: 5,
    margin: 5, 
  },
  activityindicator: {
    padding: 5,
    margin: 5,
  },
  input: {
    flex: 1,
    fontSize: 16,
    padding: 15,
    marginHorizontal: 5,
    borderRadius: 15,
  },
  textArea: {
    backgroundColor: '#ddd',
    width: '100%',
    height: 100,
    textAlignVertical: 'top',
  },
  map: {
    borderRadius: 20,
    width: '100%',
    height: 200,
    marginTop: 10,
  },
  buttonContainer: {
    marginTop: 25,
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