import React, {useState, useEffect} from 'react'
import {View , Text, Image, StyleSheet} from 'react-native'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import IonIcon from 'react-native-vector-icons/Ionicons';

import { Firestore, getDoc, collection, getDocs,
  addDoc, deleteDoc, doc,
  query, where, onSnapshot, Document, whereEqualTo

} from 'firebase/firestore';
import {db} from '../../firebase';
import { auth } from '../../firebase';
import { storage } from '../../firebase';
import { ref, getDownloadURL } from "firebase/storage";


const PendingFriendRequest = (props) => {
  const [username, setusername] = useState("");
  const [swim,setswim] =useState(false);
  const [run, setrun] = useState(false);
  const [cycle, setcycle] = useState(false);
  const [done, setdone] = useState(false);

  useEffect(async () => {
    const friendsDocRef = doc(db, "user_status", props.username);
    const friendsDocSnap = await getDoc(friendsDocRef);
    const userData = friendsDocSnap.data();
    setusername(userData["username"])
    setswim(userData["Swim"])
    setrun(userData["Run"])
    setcycle(userData["Cycle"])
    setdone(true)
  }, [])
  
  return (
    <View>
    {done ?<View style = {{borderRadius:12, backgroundColor: '#ffffff', marginVertical:8, padding: 16, elevation: 1}}>
    <View style ={{flexDirection: "row", justifyContent:"flex-start", alignItems: "flex-start"}}>
        <Image source = {{uri: props.image}}  
         style = {{width: 80, height: 80, borderRadius: 8}} />
         <View style ={{marginLeft: 150, marginTop: 20, flexDirection: "row", justifyContent: "space-between"}}> 
         <IonIcon name="person-add" 
                 size={40} 
                 color="black"
                 onPress = {props.addFriend} />
         <View style = {{marginLeft: 50}}>
         <IonIcon name="person-remove" 
                 size={40} 
                 color="black"
                 onPress = {props.deleteFriend}  />
         </View>
                 
         </View>
         
    </View>

    <View style = {{marginTop:12, flexDirection: "row", justifyContent: "space-between"}}>
        <View>
        <Text style ={{fontWeight: "bold"}}>{username}</Text>
        <View style = {{marginTop:12, flexDirection: "row", justifyContent: "space-between"}}>
        <Text style ={{fontWeight: "bold"}}> Interests: </Text>
        { swim && <MaterialCommunityIcons name= 'swim' 
                    color= "black" 
                    size={20} /> }
        { run && <MaterialCommunityIcons name= 'run' 
                    color= "black" 
                    size={20} /> }
        { cycle && <IonIcon name="bicycle" 
                 size={20} 
                 color="black" /> }
                  
        </View>
        </View>
        
    </View>

    </View> : null}
  </View>
  )
  
}

export default PendingFriendRequest