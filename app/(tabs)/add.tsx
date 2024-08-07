import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import Icons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';


export default function AddScreen() {
  const router = useRouter();  
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const currentColors = isDarkMode ? Colors.dark : Colors.light;

  const handleReportPress = () => {
    router.push('/Report');
  };
  
  const handleRequestPress = () => {
    router.push('/Request');
  };

  const handleSwipeLeft = () => {
    router.push('/Request');
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.container, {backgroundColor:currentColors.background}]}>
        <View style={styles.notificationContainer}>
          <Text style={[styles.text, { color: currentColors.text }]}>Report or Request ?</Text>
          <View style={[styles.globalnotif, { backgroundColor: currentColors.text }]}>
            <Icons style={[styles.notif, { color: currentColors.background }]} name='notifications-outline' />
          </View>
        </View>

        <View style={styles.cardcontainer}>
          <View>
            <View style={styles.card}>
              <Image source={require('@/assets/images/Ordures.jpg')} style={styles.image} />
              <LinearGradient colors={['#D30000', '#120011']} style={styles.gradient1}>
                <Text style={styles.cardText1}>
                  Help us keep our city safe and clean! Report any incidents today and
                  make a difference in our community.
                </Text>
              </LinearGradient>
              <TouchableOpacity onPress={handleReportPress} style={styles.button1}>
                <Text style={styles.cardTitle}>Report</Text>
              </TouchableOpacity>
              <Image source={require('@/assets/images/Megaphone.png')} style={styles.png1} />
            </View>
          </View>

          <View>
            <View style={styles.card}>
              <Image source={require('@/assets/images/Ouvrier.jpg')} style={styles.image} />
              <LinearGradient colors={['#310042', '#FC5C7D']} style={styles.gradient2}>
                <Text style={styles.cardText2}>
                  Your voice matters! Submit your citizen requests today and help
                  improve our community.
                </Text>
              </LinearGradient>
              <TouchableOpacity onPress={handleRequestPress} style={styles.button2}>
                <Text style={styles.cardTitle}>Request</Text>
              </TouchableOpacity>
              <Image source={require('@/assets/images/equality.png')} style={styles.png2} />
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
    padding: 20,
  },
  notificationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  globalnotif: {
    backgroundColor: Colors.light.text,
    borderRadius: 50,
  },
  notif: {
    fontSize: 25,
    padding: 10,
  },
  cardcontainer: {
    height: 700,
    marginTop: 30,
    gap: 20,
    flexDirection: 'column',
  },
  card: {
    width: '100%',
    borderRadius: 10,
    marginVertical: 2,
    overflow: 'hidden',
  },
  image: {
    position: 'absolute',
    width: '100%',
  },
  gradient1: {
    height: 260,
    padding: 20,
    alignItems: 'flex-end',
    opacity: 0.8,
  },
  gradient2: {
    height: 260,
    padding: 20,
    alignItems: 'flex-start',
    opacity: 0.8,
  },
  cardTitle: {
    fontSize: 15,
    color: '#fff',
    fontWeight: 'bold',
  },
  cardText1: {
    width: 175,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'right',
  },
  cardText2: {
    width: 190,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'left',
  },
  png1: {
    position: 'absolute',
    width: 165,
    height: 165,
    left: 10,
    bottom: 10,
  },
  png2: {
    position: 'absolute',
    width: 155,
    height: 130,
    left: 10,
    bottom: 10,
  },
  button1: {
    position: 'absolute',
    alignItems: 'center',
    width: 120,
    backgroundColor: Colors.light.tint,
    padding: 10,
    borderRadius: 20,
    left: 175,
    top: 180,
  },
  button2: {
    position: 'absolute',
    alignItems: 'center',
    width: 120,
    backgroundColor: Colors.light.tint,
    padding: 10,
    borderRadius: 20,
    left: 175,
    top: 180,
  },
});
