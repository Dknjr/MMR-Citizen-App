import React, { useState } from 'react';
import{Colors} from '@/constants/Colors'
import { useColorScheme } from '@/hooks/useColorScheme';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome6,} from '@expo/vector-icons';
import Icons from '@expo/vector-icons/Ionicons'

export default function UserProfile() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const currentColors = isDarkMode ? Colors.dark : Colors.light;


  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [coverImage, setCoverImage] = useState<string | null>(null);

  const pickImage = async (setImage: React.Dispatch<React.SetStateAction<string | null>>) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={[styles.container, {backgroundColor: currentColors.base}]}>
      <View style={styles.coverImageWrapper}>
        {coverImage ? (
          <Image source={{ uri: coverImage }} style={styles.coverImage} />
        ) : (
          <Icons name="camera" size={24} color="#fff" />
        )}
      </View>

      <View style={styles.profileContainer}>
        <View style={styles.profilPreview}>
          <View style={[styles.profileImageWrapper,{ backgroundColor:currentColors.base}]}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          ) : (
            <View style={styles.profileImagePlaceholder}>
              <Icons name="person-circle" size={50} color="#fff" />
            </View>
          )}

        </View>
        <TouchableOpacity  onPress={() => pickImage(setProfileImage)} style={styles.modify}>
          <Icons name="pencil" size={24} 
           style={styles.editIcon} />
        </TouchableOpacity>
        </View>
        <View style={styles.backicons}>
          <TouchableOpacity >
            <View >
                <Icons name="language" size={24} color="#fff" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.coverImagePlaceholder} onPress={() => pickImage(setCoverImage)}>
            <View >
                <Icons name="camera" size={24} color="#fff" />
            </View>
          </TouchableOpacity>
        </View>
        

        <Text style={styles.profileName}>Laura AGBEDOUVI</Text>
        <Text style={styles.profileDescription}>
          Lorem ipsum dolor sit amet consectetur. Ultrices facilisis
        </Text>
      </View>

      <View style={styles.menu}>
        <View style={styles.secu}>
          <TouchableOpacity style={styles.menuItem}>
          <View style= {styles.menuItemLeft}>
            <Icons name="person-circle" size={30} color={currentColors.icon} />
            <Text style={styles.menuItemText}>Profil</Text>
          </View>
            <Icons name="chevron-forward" size={30} color={currentColors.icon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
          <View style= {styles.menuItemLeft}>
            <Icons name="key" size={30} color={currentColors.icon} />
            <Text style={styles.menuItemText}>Confidentiality</Text>
          </View>
            <Icons name="chevron-forward" size={30} color={currentColors.icon} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.menuItem}>
          <View style= {styles.menuItemLeft}>
            <Icons name="notifications" size={30} color={currentColors.icon} />
            <Text style={styles.menuItemText}>Notifications</Text>
          </View>
          <Icons name="chevron-forward" size={30} color={currentColors.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <View style= {styles.menuItemLeft}>
            <Icons name="information-circle" size={30} color={currentColors.icon} />
            <Text style={styles.menuItemText}>Help</Text>
          </View>
          <Icons name="chevron-forward" size={30} color={currentColors.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <View style= {styles.menuItemLeft}>
            <FontAwesome6 name="heart-crack" size={30} color={currentColors.icon}/>
            <Text style={styles.menuItemText}>Log out</Text>
          </View>
          <Icons name="chevron-forward" size={30} color={currentColors.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  coverImageWrapper: {
    width: '100%',
    height: 320,
    justifyContent: 'center',
    alignItems: 'center',
  },
  coverImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  coverImagePlaceholder: {
    
  },
  backicons: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 20,
    position: 'absolute',
    justifyContent: 'space-between',
    height: 50,
    bottom : 150,
    alignItems: 'center',
    borderRadius: 25,
    elevation: 5, // Pour l'ombre sur Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.10,
    shadowRadius: 3.84, // Pour l'ombre sur iOS
  },
  profileContainer: {
    position:'absolute',
    alignItems: 'center',
    marginTop: 50,
  },
  profileImageWrapper: {
    position: 'relative',
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: '#fff',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  profileImagePlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#bbb',
  },
  modify: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    padding: 5,
    borderRadius: 50,
    backgroundColor: Colors.light.tint,
  },
  editIcon: {
    color: Colors.light.background,
    bottom: 0,
    right: 0,
  },
  profilPreview: {
    marginTop: 40,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    color: Colors.light.background,
  },
  profileDescription: {
    marginTop: 5,
    width: '80%',
    textAlign: 'center',
    color: Colors.light.background,
  },
  menu: {
    position: 'absolute',
    width: '100%',
    marginTop: 290,
    paddingHorizontal: 20,
    borderRadius: 10,
    elevation: 5, // Pour l'ombre sur Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.10,
    shadowRadius: 3.84, // Pour l'ombre sur iOS
  },
  secu: {
    marginBottom: 20,
  },
  menuItem: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 10,
    elevation: 2,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    marginLeft: 20,
    fontSize: 16,
  },
});
