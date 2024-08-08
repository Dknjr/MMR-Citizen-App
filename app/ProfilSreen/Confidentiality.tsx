import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, Image } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import * as ImagePicker from 'expo-image-picker';

export default function Confidentiality() {

    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === 'dark';
    const currentColors = isDarkMode ? Colors.dark : Colors.light;


  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.container, { backgroundColor: currentColors.background }]}>

      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  }  

});
