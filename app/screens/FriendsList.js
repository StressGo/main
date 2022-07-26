import React, {useEffect, useState} from 'react';
import Friend from '../components/Friend';
import {View , Text, Image , FlatList, StyleSheet} from 'react-native'
import colors from '../config/colors';

import { Firestore, getDoc, collection, getDocs,
  addDoc, deleteDoc, doc,
  query, where, onSnapshot, Document, whereEqualTo

} from 'firebase/firestore';
import {db} from '../../firebase';
import { auth } from '../../firebase';
import { storage } from '../../firebase';
import { ref, getDownloadURL } from "firebase/storage";

import {MaterialCommunityIcons} from '@expo/vector-icons'

const FriendsList = ({navigation}) => {

  const [arr,setArr] = useState([]);
  
  // Getting Friends of users
  useEffect(async () => {
    let tmparr = [];
    const friendsRef = collection(db, "friendships");
    const q1 = query(friendsRef, where("user_1", "==", auth.currentUser.uid), where("status", "==", "accepted"));
    const q2 = query(friendsRef, where("user_2", "==", auth.currentUser.uid), where("status", "==", "accepted"));
    const doc1 = await getDocs(q1);
    const doc2 = await getDocs(q2);
    if (!doc1.empty) {
      doc1.forEach((doc) => {
      tmparr.push({user: doc.data()["user_2"],
                   id: doc.id})
      
    });
  }
  if (!doc2.empty) {
    doc2.forEach((doc) => {
    tmparr.push({user: doc.data()["user_1"],
                 id: doc.id})
  });
}
  setArr(tmparr);

  }, []);

   //get profile pic
const get_url = async (user_id) => {
  const pathReference = ref(storage, 
   '/user_profile_pictures/' + user_id + '/' + user_id);
   const url = await getDownloadURL(pathReference);
   return url;
  
}

const openChat = (docid) => {
  navigation.navigate("Chat", {
    docId: docid
  })
}

const removeAccount = (docid) => {
  const friendsdocRef = doc(db, "friendships", docid);
  const ref = deleteDoc(friendsdocRef);
}
  const renderItem = ({ item }) => (
    <Friend  username = {item.user} chat = {() => {
      openChat(item.id)
    }} removeAccount = {() => {removeFriend(item.id)}}/> );
  
  return (
    <View style = {{paddingHorizontal:12}}>
    <View style = {{paddingTop: 40, paddingBottom: 10,}}>
    <MaterialCommunityIcons name='arrow-left-bold' 
                    color={colors.primary}
                    size={35}
                    onPress={() => navigation.replace("login")} />
    </View>
        <FlatList
        data={arr}
        renderItem={renderItem}
        showsVerticalScrollIndicator = {false}
      />
    
    </View>
    
  )
}

const styles = StyleSheet.create({
  
})

export default FriendsList