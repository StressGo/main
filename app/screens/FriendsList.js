import React, {useEffect, useState} from 'react';
import Friend from '../components/Friend';
import {View , Text, Image , FlatList} from 'react-native'

import { Firestore, getDoc, collection, getDocs,
  addDoc, deleteDoc, doc,
  query, where, onSnapshot, Document, whereEqualTo

} from 'firebase/firestore';
import {db} from '../../firebase';
import { auth } from '../../firebase';
import { storage } from '../../firebase';
import { ref, getDownloadURL } from "firebase/storage";

const FriendsList = () => {

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
      tmparr.push({user: doc.data()["user_2"]})
      
    });
  }
  if (!doc2.empty) {
    doc2.forEach((doc) => {
    tmparr.push({user: doc.data()["user_1"]})
  });
}
  setArr(tmparr);
  console.log(arr);

  }, []);

  const renderItem = ({ item }) => (
    <Friends image = {String(get_url(item.user))} username = {item.user} addFriend = {() => addFriends(item.id)}
                          deleteFriend = {() => rejectFriend(item.id)}/> );
  
  return (
    <View style = {{paddingHorizontal:12}}>
        <FlatList
        data={arr}
        renderItem={renderItem}
        showsVerticalScrollIndicator = {false}
      />
    
    </View>
    
  )
}

export default FriendsList