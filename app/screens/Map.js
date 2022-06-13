import React,{useEffect,useState} from 'react'
import MapView from 'react-native-maps'
import  Marker  from 'react-native-maps'
import  Callout from 'react-native-maps'
import * as Location from "expo-location"
import {View,Text,TouchableOpacity, Stylesheet} from "react-native"

const Map = () => {
  const [startLocation,setstartLocation] = useState('');
  
  useEffect(() => {
    async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied'); // testing
        return;
      }
      let newLocation = await Location.getCurrentPositionAsync({});
      setstartLocation({
        region: {
         latitude: location.coords.latitude,
         longitude: location.coords.longitude,
         latitudeDelta: 0.0922,
         longitudeDelta: 0.0421,
        },
       });
    };
  }, []);


  return (
    <MapView
        style={{ alignSelf: 'stretch', height: '100%' }}
        region={startLocation}
      >
    <Marker coordinate={startLocation} title='Marker' >
    <Callout> 
    <Text> Starting Point </Text>
    </Callout>
    </Marker>
    </MapView>
  )
}

export default Map