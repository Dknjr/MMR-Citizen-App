// components/AllNews.tsx
import React from 'react';
import { Colors } from '@/constants/Colors';
import { View, Text, StyleSheet, Image, ScrollView,TouchableOpacity, Touchable } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';

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
                  <Image style={styles.image} source={{ uri: 'https://path.to/rfi-image.jpg' }} />
                  <View style={styles.textContainer}>
                    <Text style={styles.title}>RFI</Text>
                    <Text style={styles.description}>Lorem ipsum dolor sit amet consectetur.</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style= {styles.touchable}>
              <View style={styles.container}>
              <View style={styles.card}>
                  <Image style={styles.image} source={{ uri: 'https://path.to/tgsport-image.jpg' }} />
                  <View style={styles.textContainer}>
                    <Text style={styles.title}>TgSport</Text>
                    <Text style={styles.description}>Lorem ipsum dolor sit amet consectetur.</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style= {styles.touchable}>
              <View style={styles.container}>
              <View style={styles.card}>
                  <Image style={styles.image} source={{ uri: 'https://path.to/togo-info-image.jpg' }} />
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
                  <Image style={styles.image} source={{ uri: 'https://path.to/togo-info-image.jpg' }} />
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
    marginVertical: 0,
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'space-around',
    backgroundColor: Colors.light.base,
    height: 150,
  },
  image: {
    width: '100%',
    height: 50,
  },
  textContainer: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
  },
});
