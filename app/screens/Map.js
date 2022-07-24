import React,{useEffect,useState} from 'react'
import MapView, {Marker, Callout,Polyline} from 'react-native-maps'
import { View,Text,TouchableOpacity, Image, StyleSheet} from "react-native"
import AppButton from '../components/AppButton' 
import showTime , {getDayname, getTimeOfDay, calculatePace,calculateDistance} from '../constants/Calculations'
import SummaryScreen from './SummaryScreen'
import Screen from '../components/Screen'

import * as Location from "expo-location"
import colors from '../config/colors'
import { useNavigation } from '@react-navigation/core';



const Map = ({navigation}) => {

const [startLocation,setstartLocation] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  });
  const [coordinates,setCoordinates] = useState([]);
  const [hasStarted,sethasStarted] = useState(false);
  const [drawLine,setdrawLine] = useState(false);
  const [end, setEnd] = useState(false);
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

        // testing
        // console.log("slat", startLocation.latitude);
        // console.log("slong", startLocation.longitude);
        // console.log("ulat", updatedLocation.coords.latitude);
        // console.log("ulong", updatedLocation.coords.longitude);
        // console.log("dist", calculateDistance(startLocation.latitude, startLocation.longitude, 1.3814392527129047, 103.74254944114948))

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
      if (startLocation["latitude"] == 0 && startLocation["longitude"] == 0) {
        window.alert("Still tracking current Location...Please try again in a few seconds")
      } else {
      sethasStarted(prevhasStarted => !prevhasStarted);
      }
    }


  

    const stopTracking = () => {
      // setdrawLine(prevDrawLine => !prevDrawLine);
      sethasStarted(prevhasStarted => !prevhasStarted);
      setDistance(0);
      setSeconds(0);
    }


    

  return (
    <Screen>
     <View style = {{height:'90%',width:"100%"}} >
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
                )}   */}
   </MapView>

   <View style = {styles.button}>      
   {hasStarted 
  ? <AppButton title = "Stop Tracking" onPress={() => {stopTracking
      navigation.navigate("summary", {distance: distance.toFixed(2), 
        time: showTime(seconds), pace: calculatePace(distance,seconds)})}} />

  : <AppButton title = "Start Tracking" onPress={startTracking}/>
    } 

  </View>         

    {/* {hasStarted && (
      <AppButton title = "Resume Tracking" onPress = {resumeTracking} />
    )}  */}
  
  <View style = {{ textAlign: "center", padding: 20}}>
            <Text style = {styles.Textlarge}>{distance.toFixed(2)}</Text>
            <Text style = {styles.Text}>Kilometers</Text>
        </View>

        <View style = {styles.TextContainer}>
            <View>
            <Text style = {styles.Textbold}> {calculatePace(distance,seconds)}</Text>
            <Text style = {styles.Text}> Pace(min/km)</Text>
            </View>
            <View>
            <Text style = {styles.Textbold}> {showTime(seconds)} </Text>
            <Text style = {styles.Text}> Time</Text>
            </View>
            

          </View >
          
          
   
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
    
  },
  Textlarge: {
    fontSize: 100, 
    fontWeight: 'bold'
  },
  Textbold: {
    fontSize:24,
    fontWeight: 'bold',
    paddingLeft: 8,
  },
  Text: {
    fontSize:16, 
    color: '#aaaaaa',
    paddingLeft: 10,
  },
  TextContainer: {
    marginTop: 12, 
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 20,
    paddingLeft: 10,
  },
  button: {
    top: 20,
    width: '80%',
    alignSelf: 'center',
  }
  
})

export default Map