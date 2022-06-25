import React from 'react'
import {SafeAreaView, View , Text} from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Map from './Map'
import Activity from './Activity'
import { NavigationContainer } from '@react-navigation/native';




const RunScreen = () => {
  
const Tab = createMaterialTopTabNavigator()

  return (

    
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
    
  )
}

export default RunScreen



