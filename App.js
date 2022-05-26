import React, {useState} from 'react';
import { StyleSheet, Text, View, Image, Button, ImageBackground, TextInput } from 'react-native';
import Screen from './app/components/Screen'
//to import icons, can refer google for possible icons
import {MaterialCommunityIcons} from '@expo/vector-icons';
import AppTextInput from './app/components/AppTextInput';









export default function App() {
  const [firstName, setFirstName] = useState('');

  return ( 
    <Screen>
      <AppTextInput placeholder={"Username"} icon = {'email'} />
    </Screen>
  );
  
}

