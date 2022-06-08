import React from 'react';
import {NavigationContainer} from '@react-navigation/native'
import Tabs from './navigation/tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './app/screens/WelcomeScreen';
import HomeScreen from './app/screens/HomeScreen';
import RegistrationPage from './app/screens/RegistrationPage';


const Stack = createNativeStackNavigator();

const App = () => {
  return ( 
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
  );
}

export default App;