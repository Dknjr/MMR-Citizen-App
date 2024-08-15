// screens/HomeScreen.tsx
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import Icons from '@expo/vector-icons/Ionicons';
import SearchBar from '@/components/searchbar';
import AllNews from '@/components/allnews'; // Assurez-vous que le chemin d'importation soit correct


export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const currentColors = isDarkMode ? Colors.dark : Colors.light;

  const handleNotificationPress = () => {
    // Logic for notification press
    console.log('Notification pressed');
  };



  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.container, {backgroundColor:currentColors.background}]}>
        <View style={styles.welcomeheader} >
          <View style={styles.welcome}>
            <Text style={[styles.text, { color: Colors.light.tint, fontWeight: '600' }]}>
              Bonjour{'\n'}Good morning
            </Text>
            <View style={[styles.globalnotif, { backgroundColor: currentColors.text }]}>
              <Icons style={[styles.notif, { color: currentColors.background }]} name='notifications-outline' />
            </View>
          </View>

          <View style={styles.intro}>
            <Text style={[styles.text, { color: currentColors.text, fontSize: 18, fontWeight: 'bold' }]}>
              Restez informé,{'\n'}
              restez autonome,{'\n'}
              votre hub d'actualités quotidien.
            </Text>
          </View>

          <SearchBar currentColors={currentColors} />
        </View>
        <AllNews/>
        
      </SafeAreaView>
    </SafeAreaProvider>
  );
}



const styles = StyleSheet.create({
  container: {
    padding: 0,
  },
  text: {
    color: Colors.light.tint,
  },
  globalnotif:{
    backgroundColor: Colors.light.text,
    borderRadius: 50,
  },
  notif:{
    fontSize: 25,
    padding: 10 ,
  },
  welcomeheader: {
    padding: 20,
  },
  welcome:{
    flexDirection: 'row', 
    justifyContent: 'space-between',
  },
  intro:{
    marginTop: 5,
  },
  introText:{
    color: Colors.light.text,
  },

});
