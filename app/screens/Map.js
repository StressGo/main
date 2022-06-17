import React,{useEffect,useState} from 'react'
import MapView, {Marker, Callout} from 'react-native-maps'
import {View,Text,TouchableOpacity, Image, StyleSheet} from "react-native"
import AppButton from '../components/AppButton' 

import * as Location from "expo-location"
import colors from '../config/colors'

const Map = () => {
  const [startLocation,setstartLocation] = useState({
    latitude: 0,
    longitude: 0,
    latitude: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [hasStarted,sethasStarted] = useState(false);
  
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied'); // testing
        return;
      }
      let newLocation = await Location.getCurrentPositionAsync({});
      setstartLocation({
         latitude: newLocation.coords.latitude,
         longitude: newLocation.coords.longitude,
         latitudeDelta: 0.0922,
         longitudeDelta: 0.0421,
       });
    })();
  }, []);


  return (
    <View >
    <MapView
        style={styles.Map}
        region={startLocation}
      >
    <Marker coordinate={startLocation} title='Marker' >
    <Callout> 
    <Text> Starting Point </Text>
    </Callout>
    </Marker>
    
    <Image style={styles.image}/>
    
    </MapView>
    
    </View>

/* <View>
{hasStarted 
  ? <AppButton title = "Stop Tracking" onPress={stopLocation} />
  : <AppButton title = "Start Tracking" onPress={startLocation} />
}
</View> */
  )
}

const styles = StyleSheet.create({
  image:{
    backgroundColor: colors.primary,
    height: '55%',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    opacity: 0.95,
    top: '60%'
  },
  Map:{
    alignSelf: 'stretch', 
    height: '100%'
  },
  
})

export default Map