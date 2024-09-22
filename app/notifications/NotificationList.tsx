import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Icons from '@expo/vector-icons/Ionicons';
import NotificationItem from './NotificationItem';
import EmptyState from './EmptyState';


interface Notification {
  title: string;
  message: string;
  time: string;
}

const notifications: Notification[] = [];

const NotificationList: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          Notifications <Text style={styles.dot}>•</Text>
        </Text>
        <Icons name="trash-outline" size={24} color="red" />
        <Text style={styles.clearAll}>Tout effacer</Text>
      </View>

      {notifications.length === 0 ? (
        <EmptyState />
      ) : (
        <ScrollView>
          <Text style={styles.date}>Date</Text>
          {notifications.map((notification, index) => (
            <NotificationItem
              key={index}
              title={notification.title}
              message={notification.message}
              time={notification.time}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default NotificationList;

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    dot: {
        fontSize: 20,
        color: 'red',
    },
    clearAll: {
        fontSize: 16,
        color: 'red',
    },
    date: {
        fontSize: 16,
        color: '#666',
        paddingHorizontal: 20,
        paddingTop: 10,
    },
})