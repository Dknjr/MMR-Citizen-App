import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, Alert, LayoutChangeEvent } from 'react-native';
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

export default function Report() {
  const [level, setLevel] = useState(0);
  const [location, setLocation] = useState<{ latitude: number, longitude: number } | null>(null);
  const [description, setDescription] = useState<string>('');
  const [isLocationSet, setIsLocationSet] = useState<boolean>(false);
  const [selectedImages, setSelectedImages] = useState<ImagePicker.ImagePickerAsset[]>([]);
  const [selectedTab, setSelectedTab] = useState('Street lights');
  const [line2Height, setLine2Height] = useState(100);

  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const currentColors = isDarkMode ? Colors.dark : Colors.light;

  const section2Ref = useRef<View>(null);
  const section3Ref = useRef<View>(null);

  const handleLayoutChange = () => {
    if (section2Ref.current && section3Ref.current) {
      section2Ref.current.measureLayout(
        section3Ref.current,
        (x, y, width, height) => {
          setLine2Height(y - 40); // Mise à jour de la hauteur en fonction de la distance
        },
        () => {}
      );
    }
  };


  useEffect(() => {
    if (selectedImages.length > 0) {
      setLevel(2); // Active le niveau 2 lorsque des images sont ajoutées
    }
  }, [selectedImages]);

  useEffect(() => {
    if (isLocationSet) {
      setLevel(3); // Active le niveau 3 lorsque la localisation est définie
    }
  }, [isLocationSet]);

  const getCurrentDate = () => {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  const requestLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
    setIsLocationSet(true);
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

  const handleReset = () => {
    setLocation(null);
    setDescription('');
    setSelectedImages([]);
    setIsLocationSet(false);
    setLevel(0); // Réinitialise la TimeLine
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = selectedImages.filter((_, i) => i !== index);
    setSelectedImages(updatedImages);
    setLevel(1);
  };

  const handleNext = () => {
    // Logic to handle form submission
    console.log('Form Submitted');
  };


  const renderContent = () => {
    switch (selectedTab) {
      case 'Street lights': return <StreetLights setLevel={setLevel}  />;
      case 'Public roads': return <PublicRoad setLevel={setLevel}  />;
      case 'Environment': return <Environment setLevel={setLevel}  />;
      case 'Parks and gardens': return <Parks setLevel={setLevel}  />;
      case 'Traffic and parking': return <Traffic setLevel={setLevel}  />;
      case 'Urban development': return <Urban setLevel={setLevel}  />;
      case 'City services': return <City setLevel={setLevel} />;
      case 'Public safety': return <Public setLevel={setLevel}  />;
      case 'Social services': return <Social setLevel={setLevel}  />;
      default: return <StreetLights setLevel={setLevel}  />;
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.container, { backgroundColor: currentColors.background }]}>
        <View style={styles.headerStyle}>
          <View style={styles.header}>
            <Text style={[styles.title, { color: Colors.light.tint }]}>Today</Text>
            <Text style={[styles.date, { color: currentColors.text }]}>{getCurrentDate()}</Text>
          </View>
          <Text style={[styles.category, { color: currentColors.text }]}>Categories</Text>
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
              <Text style={styles.sectionTitle}>Reports</Text>
              <View ref={section2Ref} style={styles.section}>
                <ScrollView style={styles.scrollview}>
                  {renderContent()}
                </ScrollView>
              </View>

              <View ref={section3Ref} style={styles.section}>
                <Text style={styles.sectionTitle}>Images</Text>
                <TouchableOpacity style={[styles.imagePicker, { backgroundColor: currentColors.base }]} onPress={handleAttachmentPress}>
                  <Text style={[styles.imagePickerText, { color: currentColors.icon }]}>+ Add your files here</Text>
                </TouchableOpacity>

                <View style={styles.imagesContainer}>
                  {selectedImages.map((image, index) => (
                    <View key={index} style={styles.imageWrapper}>
                      <Image source={{ uri: image.uri }} style={styles.image} />
                      <TouchableOpacity style={styles.removeButton} onPress={() => handleRemoveImage(index)}>
                        <Icons name="close-circle" size={24} color="red" />
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Location</Text>
                <View style={styles.locationlayout}>
                  <TouchableOpacity style={styles.locationButton} onPress={requestLocation}>
                    <Icons style={styles.locationIcon} name="location" size={24} color='#fff' />
                  </TouchableOpacity>
                  <TextInput
                    style={[styles.input, { color: currentColors.text }]}
                    placeholder="Object location"
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
              placeholder="More descriptions"
              placeholderTextColor={currentColors.icon}
              value={description}
              onChangeText={setDescription}
              multiline={true}
              numberOfLines={4}
            />
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
    height: 150,
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
    width: 95,
    height: 95,
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
