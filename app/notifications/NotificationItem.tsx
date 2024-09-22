import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface NotificationItemProps {
  title: string;
  message: string;
  time: string;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ title, message, time }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      <Text style={styles.time}>{time}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  message: {
    fontSize: 14,
    color: '#666',
  },
  time: {
    fontSize: 12,
    color: '#aaa',
    marginTop: 5,
  },
});

export default NotificationItem;
