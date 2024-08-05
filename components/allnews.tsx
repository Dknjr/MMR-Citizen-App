// components/AllNews.tsx
import React from 'react';
import { Colors } from '@/constants/Colors';
import { View, Text, StyleSheet, Image, ScrollView,TouchableOpacity, Touchable } from 'react-native';

export default function AllNews() {
  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
  marginTop: 10,
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
