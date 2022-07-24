import React, {useState} from 'react'
import { View , Text} from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Map from './Map'
import Activity from './Activity'
import { NavigationContainer } from '@react-navigation/native';
import Screen from '../components/Screen';

import { Firestore, getDoc, collection, getDocs,
  addDoc, deleteDoc, doc,
  query, where, onSnapshot, Document

} from 'firebase/firestore';
import {db} from '../../firebase';
import { auth } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';



const RunScreen = () => {

  const [user, setUser] = useState('')
  const [bool, setBool] = useState(false);
  const [arr, setArr] = useState([]);
  
  const Tab = createMaterialTopTabNavigator()
  const colRef = collection(db, 'user_data');
  

  return (

    <Screen>
    <NavigationContainer>

    <Tab.Navigator screenOptions={{
        tabBarLabelStyle:{color:"#040404", fontWeight: "bold"}
    }} >
      <Tab.Screen name="Map" component={Map} options = {{
          tabBarLabel: "Start A Run"
          
      }}/>
      <Tab.Screen name="Activity" component={Activity} options = {{
          tabBarLabel: "Activity"
         }}/>
    </Tab.Navigator>

    </NavigationContainer>
    </Screen>
    
  )
}

export default RunScreen



