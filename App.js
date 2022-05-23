import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button, ImageBackground } from 'react-native';
import WelcomeScreen from './app/screens/WelcomeScreen';
import {AppButton} from './app/components/AppButton'
//to import icons, can refer google for possible icons
import {MaterialCommunityIcons} from '@expo/vector-icons';
import Card from './app/components/Card'
import EventsListings from './app/screens/EventListing_1';





export default function App() {
  return ( 
    <WelcomeScreen />
  );
  
}

