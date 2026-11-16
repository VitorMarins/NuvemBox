import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignIn from '../pages/SignIn';
import Dashboard from '../pages/Dashboard';

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>

        <Stack.Screen 
          name="SignIn" 
          component={SignIn} 
        />

        <Stack.Screen 
          name="Dashboard" 
          component={Dashboard} 
        />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}