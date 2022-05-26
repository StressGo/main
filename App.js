import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button, ImageBackground } from 'react-native';
import WelcomeScreen from './app/screens/WelcomeScreen';
import {AppButton} from './app/components/AppButton'
//to import icons, can refer google for possible icons
import {MaterialCommunityIcons} from '@expo/vector-icons';
import Card from './app/components/Card'
import EventsListing_1 from './app/screens/EventListing_1';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();

export default function App() {
  return ( 
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name ="login" component={WelcomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    //<AppButton title = 'yo' onPress = {() => console.log('yo')}> </AppButton>
  );
  
}

