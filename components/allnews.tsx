// components/AllNews.tsx
import React from 'react';
import { Colors } from '@/constants/Colors';
import { View, Text, StyleSheet, Image, ScrollView,TouchableOpacity, Touchable } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { LinearGradient } from 'expo-linear-gradient';

export default function AllNews() {

  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const currentColors = isDarkMode ? Colors.dark : Colors.light;

  return (
    <View>
      <ScrollView style={[styles.scrollView, {backgroundColor:currentColors.background}]} contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={true}
          indicatorStyle={isDarkMode ? 'white' : 'black'}
          scrollIndicatorInsets={{ right: 0 }}
          >
          <View style={styles.contentwidth}>
            <TouchableOpacity style= {styles.touchable}>
              <View style={styles.container}>
                <View style={styles.card}>
                  <Image style={styles.image} source={require('@/assets/images/RFi.jpg')} />
                  <LinearGradient colors={['#000', '#000']} style={styles.gradient}/>
                  <View style={styles.textContainer}>
                    <Text style={styles.title}>RFI</Text>
                    <Text style={styles.description}>Suivez avec nous les actualités du pays!</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style= {styles.touchable}>
              <View style={styles.container}>
              <View style={styles.card}>
                <Image style={styles.image} source={require('@/assets/images/TgSport.png')} />
                <LinearGradient colors={['#000', '#000']} style={styles.gradient}/>
                  <View style={styles.textContainer}>
                    <Text style={styles.title}>TgSport</Text>
                    <Text style={styles.description}>Togo Sport infos.</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style= {styles.touchable}>
              <View style={styles.container}>
              <View style={styles.card}>
                <Image style={styles.image} source={require('@/assets/images/Togo_info.jpg')} />
                <LinearGradient colors={['#000', '#000']} style={styles.gradient}/>
                  <View style={styles.textContainer}>
                    <Text style={styles.title}>Togo_info</Text>
                    <Text style={styles.description}>Lorem ipsum dolor sit amet consectetur.</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style= {styles.touchable}>
              <View style={styles.container}>
              <View style={styles.card}>
                <Image style={styles.image} source={require('@/assets/images/students.jpg')} />
                <LinearGradient colors={['#000', '#000']} style={styles.gradient}/>
                  <View style={styles.textContainer}>
                    <Text style={styles.title}>Education</Text>
                    <Text style={styles.description}>Lorem ipsum dolor sit amet consectetur.</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>

          </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  
  contentwidth: {
    marginLeft:20, 
    marginRight: 20,
  },
  scrollView: {
  marginTop: 0,
    height: 600,
  },
  contentContainer: {
    paddingBottom: 350,
  },

  touchable: {
    flex: 1,
  },
  container: {
    marginTop: 10,
  },
  card: {
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'space-around',
    backgroundColor: Colors.light.base,
    height: 150,
  },
  image: {
    position: 'absolute',
    width: '150%',
    height: '150%',
    top: -50,
    left: -50,
  },
  gradient: {
    position: 'absolute',
    width: '150%',
    height: '150%',
    top: -50,
    left: -50,
    opacity: 0.8,
  },
  textContainer: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  description: {
    fontSize: 14,
    color: '#fff',

  },
});
