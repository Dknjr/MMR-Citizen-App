import React, { useState, useEffect } from 'react';
import { View, Text, Switch, Alert, StyleSheet, useColorScheme } from 'react-native';
import * as Notifications from 'expo-notifications';
import { Colors } from '@/constants/Colors';
import {  Stack } from 'expo-router';
import Icon from '@expo/vector-icons/Ionicons';

const NotificationSettings = () => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const currentColors = isDarkMode ? Colors.dark : Colors.light;
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    // Vérifier l'état actuel de la permission de notification
    Notifications.getPermissionsAsync().then(({ status }) => {
      if (status === 'granted') {
        setIsEnabled(true);
      }
    });
  }, []);

  const toggleSwitch = async () => {
    if (!isEnabled) {
      // Demander la permission pour les notifications
      const { status } = await Notifications.requestPermissionsAsync();
      if (status === 'granted') {
        setIsEnabled(true);
        Notifications.setNotificationHandler({
          handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: false,
            shouldSetBadge: false,
          }),
        });
      } else {
        Alert.alert(
          'Permission requise',
          'Pour activer les notifications, veuillez autoriser leur réception dans les paramètres de votre téléphone.',
          [{ text: 'OK', onPress: () => console.log('Permission refusée') }]
        );
      }
    } else {
      setIsEnabled(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: currentColors.background }]}>
      <Stack.Screen
          options={{
            headerTitle: 'Notifications'
          }}
        />

      <View style={styles.notificationCard}>
        <View style={styles.header}>
          <Icon name="alert-circle" size={24} color={currentColors.tint} />
          <Text style={styles.notificationTitle}> Activez les notifications</Text>
        </View>
        <Text style={styles.notificationMessage}>
          Ne ratez pas les messages importants concernant vos requêtes.
        </Text>
      </View>
      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Activez les notifications</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#00C91E' }}
          thumbColor={isEnabled ? '#f4f3f4' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  notificationCard: {
    backgroundColor: '#E0E0E0',
    padding: 20,
    borderRadius: 10,
    width: '100%',
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  notificationMessage: {
    fontSize: 14,
    color: '#000',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: '#E0E0E0',
    padding: 15,
    borderRadius: 35,
  },
  switchLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default NotificationSettings;
