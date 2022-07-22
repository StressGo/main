import React from 'react';
import {NavigationContainer} from '@react-navigation/native'
import Tabs from './navigation/tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './app/screens/WelcomeScreen';
import HomeScreen from './app/screens/HomeScreen';
import RegistrationPage from './app/screens/RegistrationPage';
import Map from './app/screens/Map';
import RunScreen from './app/screens/RunScreen';
import SummaryScreen from './app/screens/SummaryScreen';
import { StyleSheet, View } from 'react-native';
import Connect_me from './app/screens/Connect_me'
import Found_runner from './app/screens/Found_Runner';
import EventsListing_1 from './app/screens/EventListing_1';
import ImagePickerExample from './app/screens/EditUserProfile';
import ForgetPasssword from './app/screens/ForgetPasssword';
import FriendsRequest from './app/screens/FriendsRequest';
import SearchFriends from './app/screens/SearchFriends';
import FriendsList from './app/screens/FriendsList';
import ChatScreen from './app/screens/ChatScreen';

import Chat from './app/components/Chat';


const Stack = createNativeStackNavigator();

const App = () => {
  return ( 
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options = { {headerShown: false}} name ="login" component={WelcomeScreen} />
        <Stack.Screen options = { {headerShown: false}} name ="Register" component={RegistrationPage} /> 
        <Stack.Screen options = { {headerShown: false}} name ="home" component={HomeScreen} /> 
        <Stack.Screen options = { {headerShown: false}} name ="tabs" component={Tabs} /> 
        <Stack.Screen options = { {headerShown: false}} name ="summary" component={SummaryScreen} /> 
        <Stack.Screen options = { {headerShown: false}} name ="connect_me" component={Connect_me} /> 
        {/* <Stack.Screen options = { {headerShown: false}} name ="Found_runner" component={Found_runner} />  */}
        <Stack.Screen options = { {headerShown: false}} name ="FriendsList" component={FriendsList} />
        <Stack.Screen options = { {headerShown: false}} name ="FriendsRequest" component={SearchFriends} />
        <Stack.Screen options = { {headerShown: false}} name ="listing" component={EventsListing_1} /> 
        <Stack.Screen options = { {headerShown: false}} name ="edit" component={ImagePickerExample} /> 
        <Stack.Screen options = { {headerShown: false}} name ="forgetPassword" component={ForgetPasssword} /> 
        <Stack.Screen  name = "Chat" component={ChatScreen} /> 
      </Stack.Navigator>
    </NavigationContainer>

    );
    
    
      
  
}



export default App;