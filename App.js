import React from 'react';
import WelcomeScreen from './app/screens/WelcomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './app/screens/HomeScreen';
import EventsGo_pg1 from './app/screens/Connect_me';
import EventsListing_1 from './app/screens/EventListing_1';
import EventsPage from './app/screens/EventsPage';
import Connect_me from './app/screens/Connect_me';
import Found_runner from './app/screens/Found_Runner';
import RegistrationPage from './app/screens/RegistrationPage';

const Stack = createNativeStackNavigator();

export default function App() {
  return ( 
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen options = { {headerShown: false}} name ="login" component={WelcomeScreen} />
      <Stack.Screen options = { {headerShown: false}} name ="Home" component={HomeScreen} /> 
      <Stack.Screen options = { {headerShown: false}} name ="Connect_me" component={Connect_me} /> 
      <Stack.Screen options = { {headerShown: false}} name ="EventsPage" component={EventsPage} /> 
      <Stack.Screen options = { {headerShown: false}} name ="EventsListing_1" component={EventsListing_1} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
  
}

