import React from 'react';
import {NavigationContainer} from '@react-navigation/native'
import Tabs from './navigation/tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './app/screens/WelcomeScreen';
import HomeScreen from './app/screens/HomeScreen';
import RegistrationPage from './app/screens/RegistrationPage';

import Map from './app/screens/Map';

const Stack = createNativeStackNavigator();

const App = () => {
  return ( 
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options = { {headerShown: false}} name ="login" component={WelcomeScreen} />
        <Stack.Screen options = { {headerShown: false}} name ="Register" component={RegistrationPage} /> 
        <Stack.Screen options = { {headerShown: false}} name ="tabs" component={Tabs} /> 
      </Stack.Navigator>
    </NavigationContainer>
  
  );
}

export default App;