import React,{useEffect,useState} from 'react'
import MapView, {Marker, Callout,Polyline} from 'react-native-maps'
import {SafeAreaView, View,Text,TouchableOpacity, Image, StyleSheet} from "react-native"
import AppButton from '../components/AppButton' 
import showTime , {getDayname, getTimeOfDay, calculatePace,calculateDistance} from '../constants/Calculations'
import SummaryScreen from './SummaryScreen'
import Screen from '../components/Screen'

import * as Location from "expo-location"
import colors from '../config/colors'
import { useNavigation } from '@react-navigation/core';

const Map = () => {

  const navigation = useNavigation()

  const [startLocation,setstartLocation] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  });
  const [coordinates,setCoordinates] = useState([]);
  const [hasStarted,sethasStarted] = useState(false);
  const [drawLine,setdrawLine] = useState(false);
  const [distance, setDistance] = useState(0);
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


    // Timer functionality
      useEffect( () => {
        if (hasStarted) {
        const interval = setInterval( () => {
          setSeconds(prevSecond => prevSecond + 1);
        }, 1000);
        return () => clearInterval(interval);
      }
     }, [hasStarted])

     // updating distance 
     useEffect( () => {
       if (hasStarted) {
         const track_interval = setInterval(liveTracking,10000);
         return () => clearInterval(track_interval);
       }
      } , [hasStarted])


      
      const liveTracking = async () => {
        const {status} = await Location.getForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.log('Permission to access location was denied'); // testing
          return;
        }
        
        let updatedLocation = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Highest,
        });

        console.log("slat", startLocation.latitude);
        console.log("slong", startLocation.longitude);
        console.log("ulat", updatedLocation.coords.latitude);
        console.log("ulong", updatedLocation.coords.longitude);
        console.log("dist", calculateDistance(startLocation.latitude, startLocation.longitude, 1.3814392527129047, 103.74254944114948))

        setDistance(prevDistance => prevDistance + 
          calculateDistance(startLocation.latitude, startLocation.longitude, updatedLocation.coords.latitude, updatedLocation.coords.longitude));
        setstartLocation(prevStartLocation => {
            return {
              ...prevStartLocation,
              latitude: updatedLocation.coords.latitude,
              longitude: updatedLocation.coords.longitude}
        });
        
      }
            

  const startTracking = () => {
      sethasStarted(prevhasStarted => !prevhasStarted);
    }


  

    const stopTracking = () => {
      // setdrawLine(prevDrawLine => !prevDrawLine);
      sethasStarted(prevhasStarted => !prevhasStarted);
      setCoordinates([]);
      setSeconds(0);
      setDistance(0);

    }
  

  

  return (
    <Screen>
     <View style = {{height:'100%',width:"100%"}}>
    <MapView
        provider = "google"
        style={styles.Map}
        region={startLocation}
        minZoomLevel = {18}
        mapType = "standard"
      >

      <Marker coordinate={startLocation} title='Marker' >
    <Callout> 
    <Text> Starting Point </Text>
    </Callout>
    </Marker>
    

     {/* {setdrawLine && (
      <Polyline
        coordinates={coordinates}
        strokeColor="#00a8ff"
        lineCap= "round"
        strokeWidth={2}
                  />
                )}  */}
   </MapView>

   {hasStarted 
  ? <AppButton title = "Stop Tracking" onPress={() => {stopTracking, navigation.replace("summary")}} />
  : <AppButton title = "Start Tracking" onPress={startTracking}/>
    } 

    {/* {hasStarted && (
      <AppButton title = "Resume Tracking" onPress = {resumeTracking} />
    )}  */}

   <Text  style={styles.Text}>{showTime(seconds)} </Text>
   <Text  style={styles.Text}>{getDayname()} </Text>
   <Text  style={styles.Text}>{getTimeOfDay()} </Text>
   <Text  style={styles.Text}>{calculatePace(distance,seconds)} </Text>
   <Text  style={styles.Text}>{distance} </Text>
   </View>  
   
   
  
  </Screen>

  );
}

const styles = StyleSheet.create({
  
  Map:{
    flex: 1, 
    opacity: 0.6
  },
  Text: {
    fontSize:24,
    fontWeight: 'bold'
    
  }
  
})

export default Map