import React from 'react';
import WelcomeScreen from './app/screens/WelcomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './app/screens/HomeScreen';
import EventsGo_pg1 from './app/screens/Connect_me';
import EventsListing_1 from './app/screens/EventListing_1';
import EventsPage from './app/screens/EventsPage';
import Found_runner from './app/screens/Found_runner';

const Stack = createNativeStackNavigator();

export default function App() {
  return ( 
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen options = { {headerShown: false}} name ="login" component={WelcomeScreen} />
      <Stack.Screen options = { {headerShown: false}} name ="Home" component={HomeScreen} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
  
}

