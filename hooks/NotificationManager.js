// NotificationManager.js
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import { useEffect } from 'react';

export const useNotificationHandler = () => {
  useEffect(() => {
    registerForPushNotificationsAsync().then(token => console.log(token));

    const notificationListener = Notifications.addNotificationReceivedListener(notification => {
      console.log('Notification Received:', notification);
      // Gérez la réception de la notification ici
    });

    const responseListener = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('Notification Response:', response);
      // Gérez la réponse à la notification ici
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);
};

async function registerForPushNotificationsAsync() {
  let token;
  const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    alert('Failed to get push token for push notification!');
    return;
  }

  token = (await Notifications.getExpoPushTokenAsync()).data;
  return token;
}
