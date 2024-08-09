import { useColorScheme } from '@/hooks/useColorScheme';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import * as ImagePicker from 'expo-image-picker';
import RootLayout from '@/app/_layout';

export default function Help() {

    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === 'dark';
    const currentColors = isDarkMode ? Colors.dark : Colors.light;


  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.container, { backgroundColor: currentColors.background }]}>
        <View>
          <Text style={{ color: currentColors.text }}>Help</Text>
        </View>
        <View>
          <RootLayout/>
        </View>
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
