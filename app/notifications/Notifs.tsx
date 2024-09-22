import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import Icons from '@expo/vector-icons/Ionicons';
import { Stack } from 'expo-router';

// Définir une interface pour les éléments de la liste de notifications
interface NotificationItem {
  id: string;
  title: string;
  time: string;
  description: string;
}

export default function NotificationsScreen() {
  // Liste initiale des notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: '1',
      title: 'Important',
      time: '15h17',
      description:
        'Votre signalement a été pris en charge. Vous serez informé de l’évolution. Merci pour votre contribution.',
    },
    {
      id: '2',
      title: 'Important',
      time: '15h17',
      description:
        'Votre demande a bien été enregistrée. Vous serez informé sur l’état de son évolution. Merci pour votre confiance.',
    },
  ]);

  // Fonction pour tout effacer
  const handleClearAll = () => {
    Alert.alert('Notifications effacées!');
    setNotifications([]); // Vider la liste des notifications
  };

  // Fonction pour rendre chaque élément de la FlatList
  const renderItem = ({ item }: { item: NotificationItem }) => (
    <View style={styles.notificationCard}>
      <View style={styles.notificationContent}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationDescription}>{item.description}</Text>
      </View>
      <Text style={styles.notificationTime}>{item.time}</Text>
    </View>
  );

  // Rendu principal
  return (
    <View style={styles.container}>
      <Stack.Screen
          options={{
            headerTitle: 'Notifications',
          }}
        />
      {/* En-tête avec le titre "Notifications" et le bouton pour tout effacer */}
      <View style={styles.header}>
        <View style={styles.notif}>
          <Text style={styles.headerTitle}>Notifications</Text>
          <Icons name="ellipse" size={12} color="#FF6200" style={styles.headerIcon} />
        </View>
        {notifications.length > 0 && (
          <TouchableOpacity onPress={handleClearAll} style={styles.clearAllButton}>
            <Icons name="trash-outline" size={20} color="#FF0000" />
            <Text style={styles.clearAllText}>Tout effacer</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Si aucune notification n'est disponible */}
      {notifications.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Image source={require('@/assets/images/No_messages.png')} style={styles.image} />
          {/*<Icons name="notifications-off-outline" size={50} color="#777777" />*/}
          <Text style={styles.emptyText}>Vous n'avez aucune notification pour l'instant.</Text>
        </View>
      ) : (
        <>
          <Text style={styles.dateText}>Date</Text>
          <FlatList
            data={notifications}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </>
      )}
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 20,

  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  notif: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerIcon: {
    marginLeft: 5,
  },
  clearAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clearAllText: {
    color: '#FF0000',
    marginLeft: 5,
    fontSize: 14,
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  notificationCard: {
    width: '95%',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    elevation: 5, // Ombre pour Android
    shadowColor: '#000', // Ombre pour iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  notificationContent: {
    flexDirection: 'column',
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6200',
  },
  notificationDescription: {
    fontSize: 14,
    color: '#777777',
    marginTop: 5,
  },
  notificationTime: {
    position: 'absolute',
    fontSize: 14,
    color: '#777777',
    right: 15,
    top: 15,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -150,
  },
  image: {
    width: '65%',
    height: 146,
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#777777',
    marginTop: 10,
  },
});
