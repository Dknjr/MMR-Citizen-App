// screens/HomeScreen.tsx
import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import Icons from '@expo/vector-icons/Ionicons';
import SearchBar from '@/components/searchbar';
import NavigationBar from '@/components/navigationbar';
import AllNews from '@/components/allnews'; // Assurez-vous que le chemin d'importation soit correct
import PoliticsNews from '@/components/politicsnews';
import SportsNews from '@/components/sportsnews';


export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const currentColors = isDarkMode ? Colors.dark : Colors.light;

  const handleNotificationPress = () => {
    // Logic for notification press
    console.log('Notification pressed');
  };

  const [selectedTab, setSelectedTab] = useState('All');

  const renderContent = () => {
    switch (selectedTab) {
      case 'All':
        return <AllNews />;
      case 'Politics':
        return <PoliticsNews />;
      case 'Sports':
        return <SportsNews />;
      default:
        return <AllNews />;
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.welcome}>
          <Text style={[styles.text, { color: currentColors.tint, fontWeight: '600' }]}>
            Bonjour{'\n'}Good morning
          </Text>
          <View style={[styles.globalnotif, { backgroundColor: currentColors.text }]}>
            <Icons style={[styles.notif, { color: currentColors.background }]} name='notifications-outline' />
          </View>
        </View>

        <View style={styles.intro}>
          <Text style={[styles.text, { color: currentColors.text, fontSize: 20, fontWeight: 'bold' }]}>
            Stay Informed,{'\n'}
            Stay Empowered,{'\n'}
            Your Daily News Hub.
          </Text>
        </View>

        <SearchBar currentColors={currentColors} />
        <NavigationBar currentColors={currentColors} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

        {renderContent()}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}



const styles = StyleSheet.create({
  container: {
    margin: 30,  
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
  welcome:{
    flexDirection: 'row', 
    justifyContent: 'space-between',
  },
  intro:{
    marginTop: 10,
  },
  introText:{
    color: Colors.light.text,
  },

});
