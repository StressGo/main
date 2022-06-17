import React from 'react';
import {NavigationContainer} from '@react-navigation/native'
import Tabs from './navigation/tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './app/screens/WelcomeScreen';
import HomeScreen from './app/screens/HomeScreen';
import RegistrationPage from './app/screens/RegistrationPage';
import ImagePickerExample from './app/screens/ImagePickerExample';


const AuthStack = createNativeStackNavigator();

const App = () => {
  return ( 
    <NavigationContainer>
      <AuthStack.Navigator>
        <AuthStack.Screen options = { {headerShown: false}} name ="login" component={WelcomeScreen} />
        <AuthStack.Screen options = { {headerShown: false}} name ="Register" component={RegistrationPage} /> 
        <AuthStack.Screen options = { {headerShown: false}} name ="tabs" component={Tabs} /> 
      </AuthStack.Navigator>
    </NavigationContainer>
  
  );
}

export default App;