import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button, ImageBackground } from 'react-native';
import WelcomeScreen from './app/screens/WelcomeScreen';
import AppButton from './app/components/AppButton'
//to import icons, can refer google for possible icons
import {MaterialCommunityIcons} from '@expo/vector-icons';
import Card from './app/components/Card'
import EventsListing_1 from './app/screens/EventListing_1';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './app/screens/HomeScreen';

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

