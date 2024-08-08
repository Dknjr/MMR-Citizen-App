// ProfileStack.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import UserProfil from '@/app/ProfilSreen/UserProfil';
import Confidentiality from '@/app/ProfilSreen/Confidentiality';
import Notifications from '@/app/ProfilSreen/Notification'
import Help from '@/app/ProfilSreen/Help'
import Logout from '@/app/ProfilSreen/Logout';

const Stack = createStackNavigator();

export default function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="UserProfil" component={UserProfil} options={{ headerShown: false }} />
      <Stack.Screen name="Confidentiality" component={Confidentiality} options={{ title: 'Confidentiality' }} />
      <Stack.Screen name="Notifications" component={Notifications} options={{ title: 'Notifications' }} />
      <Stack.Screen name="Help" component={Help} options={{ title: 'Help' }} />
      <Stack.Screen name="Logout" component={Logout} options={{ title: 'Logout' }} />
    </Stack.Navigator>
  );
}
