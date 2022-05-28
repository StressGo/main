import React from 'react';
import WelcomeScreen from './app/screens/WelcomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './app/screens/HomeScreen';
import EventsGo_pg1 from './app/screens/Connect_me';
import EventsListing_1 from './app/screens/EventListing_1';
import EventsPage from './app/screens/EventsPage';

const Stack = createNativeStackNavigator();

export default function App() {
  return ( 
    <EventsPage />
  );
  
}

