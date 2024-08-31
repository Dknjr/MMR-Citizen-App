import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native'; // Correction ici
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { BlurView } from 'expo-blur';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { position: 'absolute' },
        tabBarBackground: () => (
          <BlurView tint="light" intensity={80} style={StyleSheet.absoluteFillObject} /> // Correction ici
        ),
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="accueil"
        options={{
          title: 'Infos',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'newspaper' : 'newspaper-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: 'Ajouter',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'add-circle' : 'add-circle-outline'} color={color} />
          ),
          headerShown: true,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profil',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'person-circle' : 'person-circle-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
