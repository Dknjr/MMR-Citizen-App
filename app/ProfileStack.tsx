// ProfileStack.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import UserProfile from '@/app/ProfileSreen/UserProfile';
import Confidentiality from '@/app/ProfileSreen/Confidentiality';
import Notifications from '@/app/ProfileSreen/Notification'
import Help from '@/app/ProfileSreen/Help'
import Logout from '@/app/ProfileSreen/Logout';

const Stack = createStackNavigator();

export default function ProfilStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="UserProfile" component={UserProfile} options={{ headerShown: false }} />
      <Stack.Screen name="Confidentiality" component={Confidentiality} options={{ title: 'Confidentiality' }} />
      <Stack.Screen name="Notifications" component={Notifications} options={{ title: 'Notifications' }} />
      <Stack.Screen name="Help" component={Help} options={{ title: 'Help' }} />
      <Stack.Screen name="Logout" component={Logout} options={{ title: 'Logout' }} />
    </Stack.Navigator>
  );
}