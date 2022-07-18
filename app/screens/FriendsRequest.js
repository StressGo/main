import React, {useState, useEffect} from 'react'
import PendingFriendRequest from '../components/PendingFriendRequest';
import {View , Text, Image , FlatList} from 'react-native'

import { Firestore, getDoc, collection, getDocs,
    addDoc, deleteDoc, doc,
    query, where, onSnapshot, Document, whereEqualTo, waitForPendingWrites, updateDoc
  
  } from 'firebase/firestore';
  import {db} from '../../firebase';
  import { auth } from '../../firebase';
  import { storage } from '../../firebase';
  import { ref, getDownloadURL } from "firebase/storage";

const FriendsRequest = () => {
    const [arr,setArr] = useState([]);

    useEffect(async () => {
        let tmparr = [];
        const friendsRef = collection(db, "friendships");
        const q1 = query(friendsRef, where("user_2", "==", auth.currentUser.uid), where("status", "==", "pending"));
        const doc1 = await getDocs(q1);
        if (!doc1.empty) {
            doc1.forEach((doc) => {
            tmparr.push({user: doc.data()["user_1"],
                         id: doc.id})
          });
        }
        setArr(tmparr);
        
       
        
      }, []);

      console.log(arr);

      //get profile pic
const get_url = async (user_id) => {
    const pathReference = ref(storage, 
     '/user_profile_pictures/' + user_id + '/' + user_id);
     const url = await getDownloadURL(pathReference);
     return url;
    
  }


  // Add friend
  const addFriends = async (doc_id) => {
    const friendsdocRef = doc(db, "friendships", doc_id);
    const ref = updateDoc(friendsdocRef, {
                status: "accepted"
            });
    }

    // Rejected request
    const rejectFriend = async (doc_id) => {
      const friendsdocRef = doc(db, "friendships", doc_id);
      const ref = deleteDoc(friendsdocRef);
    }
  

      const renderItem = ({ item }) => (
        <PendingFriendRequest image = {String(get_url(item.user))} username = {item.user} addFriend = {() => addFriends(item.id)}
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

export default FriendsRequest