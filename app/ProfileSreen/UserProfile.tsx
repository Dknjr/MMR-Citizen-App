import React, {  useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, Stack } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors'; // Assurez-vous que ce chemin est correct
//import { getUserProfile } from '@/services/userService'; // Assurez-vous que ce service récupère les données de la base de données

export default function UserProfile() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const currentColors = isDarkMode ? Colors.dark : Colors.light;

  const router = useRouter();
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    profilePicture: '',
  });

 /* useEffect(() => {
    const fetchProfileData = async () => {
      const data = await getUserProfile(); // Récupère les données de profil depuis la base de données
      setProfile(data);
    };

    fetchProfileData();
  }, []);*/

  const handleModifyPress = () => {
    router.push('/ProfileSreen/ModifyProfile'); // Dirige vers l'interface de modification de profil
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.container, {backgroundColor: currentColors.background}]}>
        <Stack.Screen
          options={{
            headerTitle: 'Profil',
              
            headerRight: () => (
              <Text style={styles.modifyButton} onPress={handleModifyPress}>
                Modifier
              </Text>
            ),
          }}
        />

        <View style={styles.profileContainer}>
          <Image
            source={profile.profilePicture ? { uri: profile.profilePicture } : require('@/assets/images/RFi.jpg')}
            style={styles.profileImage}
          />
          <View style={styles.infoContainer}>
            <View style={styles.top}>
              <Text style={styles.label}>Prénom</Text>
              <View style={styles.cell}>
                <Text style={styles.value}>{profile.firstName || 'Votre prénom'}</Text>
              </View>
            </View>
            <View style={styles.top}>
              <Text style={styles.label}>Nom de famille</Text>
              <View style={styles.cell}>
                <Text style={styles.value}>{profile.lastName || 'votre Nom de famille'}</Text>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    fontSize: 24,
    color: '#000',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  modifyButton: {
    fontSize: 18,
    color: '#FF6F00', // La couleur du bouton "Modify"
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  infoContainer: {
    marginTop: 30,
    width: '100%',
  },
  top: {
    marginVertical: 10,
  },
  cell: {
    backgroundColor: '#F3F3F3',
    borderRadius: 30,
    padding: 15,
    marginVertical: 5,
  },
  label: {
    fontSize: 14,
    color: '#9E9E9E',
  },
  value: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
});