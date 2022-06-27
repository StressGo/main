import React , {useState , useRef} from 'react'
import {SafeAreaView , Text , TextInput, View , Pressable, Keyboard, KeyboardAvoidingView, Platform, Image , StyleSheet} from 'react-native'
import FontAwesome from "react-native-vector-icons/FontAwesome"
import Map from './Map'
import { NavigationContainer, TabRouter, useNavigation, Navigation } from '@react-navigation/native';
import {MaterialCommunityIcons} from '@expo/vector-icons'
import showTime , {getDayname, getTimeOfDay, calculatePace,calculateDistance} from '../constants/Calculations'
import AppButton from '../components/AppButton' 

import { Firestore, getDoc, collection, getDocs,
  addDoc, deleteDoc, doc,
  query, where, onSnapshot, Document, set, add, setDoc, arrayUnion, updateDoc

} from 'firebase/firestore';
import {db} from '../../firebase';
import { auth } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';


const SummaryScreen = ({route}) => {
  const [title, setTitle] = useState("Type something here");
  const [arr, setArr] = useState([]);
  const TextInputRef = useRef();
  const navigation = useNavigation();
  const [saved, setSaved] = useState(true);
  
  const storeEvent = async () => {
    if (saved) {
    setSaved(prevsaved => !prevsaved);
    const docRef = doc(db, "user_data",auth.currentUser.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const ref =  updateDoc (docRef, {run:arrayUnion({ 
        averagepace: String(route.params.pace),
        distance: route.params.distance,
        time: String(route.params.time),
        day: getDayname(),
        picture:'https://media.wired.com/photos/59269cd37034dc5f91bec0f1/191:100/w_1280,c_limit/GoogleMapTA.jpg'
      })}, 
     );
    } else {
      const ref =  setDoc (docRef, {run:[{ 
        averagepace: String(route.params.pace),
        distance: route.params.distance,
        time: String(route.params.time),
        day: getDayname(),
        picture:'https://media.wired.com/photos/59269cd37034dc5f91bec0f1/191:100/w_1280,c_limit/GoogleMapTA.jpg'
      }]}, 
     );
    }
     
  }
}
  

  return (
    <Pressable style= {styles.MainContainer} onPress={() => Keyboard.dismiss()}>
        
        <Text style = {styles.Text}></Text>
        <MaterialCommunityIcons name='close' 
                    color="black" 
                    size={35}
                    onPress={() => {
                        navigation.replace("tabs")
                  }} />
        <Pressable style = {styles.Pressable} onPress = {() => TextInputRef.current.focus()}>
            <TextInput value = {title} onChangeText = {input => setTitle(input)} style = {styles.TextInput} ref = {TextInputRef}/>
            <FontAwesome name = "pencil" size = {25} />
        </Pressable>

        <KeyboardAvoidingView behavior = {Platform.OS == 'ios' ? "padding" :'height'}>

        <View style = {{marginTop: 12}}>
            <Text style = {styles.Textlarge}>{route.params.distance}</Text>
            <Text style = {styles.Text}>Kilometer</Text>
        </View>

        <View style = {styles.TextContainer}>
            <View>
            <Text style = {styles.Textbold}> {route.params.pace}</Text>
            <Text style = {styles.Text}> Pace</Text>
            </View>

            <View>
            <Text style = {styles.Textbold}> {route.params.time}</Text>
            <Text style = {styles.Text}> Time</Text>
            </View>

        </View >

        {/* <View style = {styles.ProgressBarContainer}>
             <Image 
              source = {require("../assets/RunningGo.png")} 
              style = {{height: 100, width: 100}}/> 
              <Text>Progress bar</Text>
        </View> */}
        
        </KeyboardAvoidingView>

        <AppButton title = "Save Event" onPress={() => {storeEvent}}/>
  
        
    </Pressable>
  )
}

const styles = StyleSheet.create({
  
  Map:{
    flex: 1, 
    opacity: 0.6
  },
  Textbold: {
    fontSize:24,
    fontWeight: 'bold',
  },
  Text: {
    fontSize:16, 
    color: '#aaaaaa'

  },
  Textlarge: {
    fontSize: 100, 
    fontWeight: 'bold'
  },
  MainContainer : {
    backgroundColor: "#fff", 
    flex: 1, 
    borderTopWidth: 1, 
    borderColor: "#ccc",
     padding: 20
  }, 
  Pressable: {
    borderBottomWidth: 1, 
    borderColor: "#ccc",
    paddingBottom: 8 , 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center"

  },
  TextInput: {
    fontSize:26 , 
    color: '#aaaaaa'
    

  },
  TextContainer: {
    marginTop: 12, 
    flexDirection: "row",
     justifyContent: "space-between",
      alignItems: "center"

  }, 
  ProgressBarContainer: {
    flex: 1, 
    justifyContent: 'center',
     alignItems: "center"

  }
  
})

export default SummaryScreen

