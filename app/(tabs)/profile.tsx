//import { I18nextProvider } from 'react-i18next';
//import { useTranslation } from 'react-i18next';
//const [language, setLanguage] = useState(i18n.language)
import React, { useState } from 'react';
import { Image, View, Text, Modal, TouchableOpacity, TextInput, Alert, StyleSheet} from 'react-native';
import { BlurView } from 'expo-blur';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome6 } from '@expo/vector-icons';
import Icons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useAuth } from '@/context/auth';

export default function UserProfile() {
  const [isPasswordModalVisible, setPasswordModalVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const currentColors = isDarkMode ? Colors.dark : Colors.light;
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [coverImage, setCoverImage] = useState<string | null>(null);
  // Utilisation du contexte pour obtenir les informations de l'utilisateur connecté
  const { logout, user } = useAuth();


  {/*useEffect(() => {
    if (user) {
      // Remplacez ces appels par les fonctions qui récupèrent réellement les données de l'utilisateur
      const fetchUserData = async () => {
        // Exemple d'appel d'API pour récupérer les informations de l'utilisateur
        try {
          const response = await fetch(`http://votre-api-url/api/user/${user.id}`);
          const data = await response.json();
          setUserData({
            username: data.username,
            email: data.email,
          });
        } catch (error) {
          console.error("Erreur lors de la récupération des données de l'utilisateur:", error);
        }
      };

      fetchUserData();
    }
  }, [user]);*/}

  const handleLogoutPress = () => {
    Alert.alert(
      "Confirmation de déconnexion",
      "Êtes-vous sûr de vouloir vous déconnecter ?",
      [
        {
          text: "Annuler",
          style: "cancel",
        },
        {
          text: "Se déconnecter",
          onPress: () => {
            // Appel de la fonction logout pour effectuer la déconnexion
            logout();
            Alert.alert("Déconnecté", "Vous avez été déconnecté avec succès!");
            console.log('Déconnexion réussie');
            router.replace('/(auth)/login')
          },
          style: "destructive", // Style rouge pour indiquer une action destructrice
        },
      ]
    );
  };  

  /*const changeLanguage = (lng: string) => {
    if (i18n.changeLanguage) {
      i18n.changeLanguage(lng)
        .then(() => setLanguage(lng))
        .catch(err => console.error('Language change error:', err));
    } else {
      console.error('i18n.changeLanguage is not available');
    }
  };*/

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

  const handlePasswordSubmit = () => {
    if (password === 'yourpassword') {
      setPasswordModalVisible(false);
      setPassword('');
      router.push('/ProfileSreen/Confidentiality');
    } else {
      setErrorMessage('Mot de passe incorrect');
    }
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    setErrorMessage('');
  };

  const handleCancel = () => {
    setPassword('');
    setPasswordModalVisible(false);
  };

  const handleConfidentialityPress = () => {
    setPasswordModalVisible(true);
  };

  const handleProfilPress = () => {
    router.push('/ProfileSreen/UserProfile');
  };

  const handleHistoriquePress = () => {
    router.push('/ProfileSreen/Historique');
  };

  const handleNotificationsPress = () => {
    router.push('/ProfileSreen/Notification');
  };

  const handleHelpPress = () => {
    router.push('/ProfileSreen/Help');
  };


  return (
    //<I18nextProvider i18n={i18n}>
      <View style={[styles.container, { backgroundColor: currentColors.coverbase }]}>
        <View style={styles.coverImageWrapper}>
          {coverImage ? (
            <Image source={{ uri: coverImage }} style={styles.coverImage} />
          ) : (
            <View style={styles.coverImagePlaceholder}>
              <Image source={require('@/assets/images/Cover.jpg')} style={styles.image} />
            </View>
          )}
        </View>

        <View style={styles.profileContainer}>
          <View style={styles.profilPreview}>
            <View style={[styles.profileImageWrapper, { backgroundColor: currentColors.base }]}>
              {profileImage ? (
                <Image source={{ uri: profileImage }} style={styles.profileImage} />
              ) : (
                <View style={styles.profileImagePlaceholder}>
                  <Icons name="person-circle" size={50} color="#fff" />
                </View>
              )}
            </View>

            <TouchableOpacity onPress={() => pickImage(setProfileImage)} style={styles.modify}>
              <Icons name="pencil" size={24} style={styles.editIcon} />
            </TouchableOpacity>
          </View>

          <View style={styles.topicons}>
            <TouchableOpacity /*onPress={() => changeLanguage(language === 'en' ? 'fr' : 'en')}*/>
              <View>
                <Icons name="language" size={24} color="#fff" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => pickImage(setCoverImage)}>
              <View>
                <Icons name="camera" size={24} color="#fff" />
              </View>
            </TouchableOpacity>
          </View>

          {/* Affichage du nom d'utilisateur et de l'email */}
          <Text style={styles.profileName}>{user?.username || 'Nom d’utilisateur'}</Text>
          <Text style={styles.email}>{user?.email || 'Email utilisateur'}</Text>
          
        </View>

        <View style={styles.menu}>
          <View style={styles.secu}>
            <TouchableOpacity style={[styles.menuItem, { backgroundColor: currentColors.menubase }]} onPress={handleProfilPress}>
              <View style={styles.menuItemLeft}>
                <Icons name="person-circle" size={30} color={currentColors.icon} />
                <Text style={styles.menuItemText}>Profil</Text>
              </View>
              <Icons name="chevron-forward" size={30} color={currentColors.icon} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.menuItem, { backgroundColor: currentColors.menubase }]} onPress={handleConfidentialityPress}>
              <View style={styles.menuItemLeft}>
                <Icons name="key" size={30} color={currentColors.icon} />
                <Text style={styles.menuItemText}>Confidentialité</Text>
              </View>
              <Icons name="chevron-forward" size={30} color={currentColors.icon} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={[styles.menuItem, { backgroundColor: currentColors.menubase }]} onPress={handleHistoriquePress}>
            <View style={styles.menuItemLeft}>
              <Icons name="time" size={30} color={currentColors.icon} />
              <Text style={styles.menuItemText}>Historique</Text>
            </View>
            <Icons name="chevron-forward" size={30} color={currentColors.icon} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.menuItem, { backgroundColor: currentColors.menubase }]} onPress={handleNotificationsPress}>
            <View style={styles.menuItemLeft}>
              <Icons name="notifications" size={30} color={currentColors.icon} />
              <Text style={styles.menuItemText}>Notifications</Text>
            </View>
            <Icons name="chevron-forward" size={30} color={currentColors.icon} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.menuItem, { backgroundColor: currentColors.menubase }]} onPress={handleHelpPress}>
            <View style={styles.menuItemLeft}>
              <Icons name="information-circle" size={30} color={currentColors.icon} />
              <Text style={styles.menuItemText}>Aide</Text>
            </View>
            <Icons name="chevron-forward" size={30} color={currentColors.icon} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.Déconnexion, { backgroundColor: '#FF7900' }]} onPress={handleLogoutPress}>
            <View style={styles.menuItemLeft}>
              <FontAwesome6 name="heart-crack" size={30} color={'#fff'} />
              <Text style={styles.DecoText}>Déconnexion</Text>
            </View>
          </TouchableOpacity>
          <Modal
            transparent={true}
            visible={isPasswordModalVisible}
            animationType="slide"
            onRequestClose={handleCancel}
          >
            <BlurView intensity={35} style={styles.modalOverlay}>
              <View style={[styles.modalContainer, { backgroundColor: currentColors.background }]}>
                <View style={styles.modalHeader}>
                  <TouchableOpacity onPress={handleCancel}>
                    <Text style={[styles.cancelButton, { color: currentColors.text }]}>Annuler</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handlePasswordSubmit}
                    disabled={!password}
                    style={password ? styles.okButtonEnabled : styles.okButtonDisabled}
                  >
                    <Text style={[styles.okButtonText, { color: currentColors.tint }]}>OK</Text>
                  </TouchableOpacity>
                </View>

                {errorMessage ? (
                  <Text style={[styles.errorText, { color: currentColors.tint }]}>
                    {errorMessage}
                  </Text>
                ) : null}

                <Text style={[styles.modalText, { color: currentColors.text }]}>Entez votre mot de passe</Text>
                <TextInput
                  style={[styles.input, { backgroundColor: currentColors.base, color: currentColors.text }]}
                  placeholder="Entez votre mot de passe"
                  placeholderTextColor={currentColors.icon}
                  secureTextEntry={true}
                  value={password}
                  onChangeText={handlePasswordChange}
                />
              </View>
            </BlurView>
          </Modal>
        </View>
      </View>
    //</I18nextProvider>
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
    width: '100%',
    height: 320,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 320,
    resizeMode: 'cover',
  },
  topicons: {
    width: '200%',
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
  email: {
    marginTop: 5,
    width: '100%',
    textAlign: 'center',
    color: Colors.light.background,
  },
  menu: {
    position: 'absolute',
    width: '100%',
    marginTop: 290,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  secu: {
    marginBottom: 20,
  },
  menuItem: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 50,
    marginBottom: 10,
    elevation: 5, // Pour l'ombre sur Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.10,
    shadowRadius: 3.84, // Pour l'ombre sur iOS
  },
  Déconnexion: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 50,
    marginTop: 20,
    elevation: 5, // Pour l'ombre sur Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.10,
    shadowRadius: 3.84, // Pour l'ombre sur iOS
  },
  DecoText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 20,
    color: '#fff',
  },
  // Déconnexion
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    color: Colors.light.text,
    marginLeft: 20,
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    
  },
  modalContainer: {
    width: '80%',
    padding: 20,
    borderRadius: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  cancelButton: {
    fontSize: 16,
  },
  okButtonEnabled: {
    opacity: 1,
  },
  okButtonDisabled: {
    opacity: 0.5,
  },
  okButtonText: {
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 14,
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 10,
    textAlign: 'center',
  },
  modalContent: {
    width : '100%',
    bottom: -300,
    height: 300,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  dragIndicator: {
    width: 50,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#ccc',
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  logoutActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3E2723',
    padding: 10,
    borderRadius: 50,
    width: '100%',
    justifyContent: 'center',
  },
  logoutActionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 10,
  },
});
