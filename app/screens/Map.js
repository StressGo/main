import React,{useEffect,useState, useRef,useCallback} from 'react'
import MapView, {Marker, Callout,Polyline} from 'react-native-maps'
import {View,Text,TouchableOpacity, Image, StyleSheet} from "react-native"
import AppButton from '../components/AppButton' 
import showTime from '../screens/Timer'

import * as Location from "expo-location"
import colors from '../config/colors'

let foregroundSubscription = null;


const Map = () => {
  const [startLocation,setstartLocation] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [coordinates,setCoordinates] = useState([]);
  const [hasStarted,sethasStarted] = useState(false);
  // const [drawLine,setdrawLine] = useState(false);
  const [times, setTimes] = useState(0);
  const [seconds,setSeconds] = useState(0);

  
  
  // Tracking only starting location 
  useEffect(async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied'); // testing
        return;
      }
      let newLocation = await Location.getCurrentPositionAsync({});
      setstartLocation(prevStartLocation => {
        return {
          ...prevStartLocation,
          latitude: newLocation.coords.latitude,
          longitude: newLocation.coords.longitude}
        })
      }, []);

      useEffect( () => {
        if (hasStarted) {
        const interval = setInterval( () => {
          setSeconds(prevSecond => prevSecond + 1);
        }, 1000);
        return () => clearInterval(interval);
      }
     }, [hasStarted])


  const startTracking = async () => {
    sethasStarted(prevhasStarted => !prevhasStarted);
    const {status} = await Location.getForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to access location was denied'); // testing
      return;
    }
    foregroundSubscription = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        distanceInterval: 15
      },
      location => {
        setCoordinates(prevCoordinates => {
          return [...prevCoordinates, {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude 
          } ]
        })
        setTimes(prevTimes => prevTimes + 1)
        console.log(times);
      })
    }

  const stopTracking = () => {
    foregroundSubscription?.remove();
    // setdrawLine(prevDrawLine => !prevDrawLine);
    sethasStarted(prevhasStarted => !prevhasStarted);
    setCoordinates([]);
    setTimes(0);
    setSeconds(0);

  }

  const resumeTracking = () => {

  }

  

  return (
    <View >
    <MapView
        provider = "google"
        style={styles.Map}
        region={startLocation}
      >

      <Marker coordinate={startLocation} title='Marker' >
    <Callout> 
    <Text> Starting Point </Text>
    </Callout>
    </Marker>

    {hasStarted && (
      <Polyline
        coordinates={coordinates}
        strokeColor="#00a8ff"
        lineCap= "round"
        strokeWidth={2}
                  />
                )}
    
    <Image style={styles.image} />
    
    {hasStarted 
  ? <AppButton title = "Stop Tracking" onPress={stopTracking} />
  : <AppButton title = "Start Tracking" onPress={startTracking} />
    }

    {hasStarted && (
      <AppButton title = "Resume Tracking" onPress = {resumeTracking} />
    )} 

   <Text>{showTime(seconds)} </Text>
  </MapView>

  
    
    </View>

  );
}

const styles = StyleSheet.create({
  image:{
    backgroundColor: colors.primary,
    height: '55%',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    opacity: 0.95,
    top: '55%',
  },
  Map:{
    alignSelf: 'stretch', 
    height: '100%'
  },
  
})

export default Map