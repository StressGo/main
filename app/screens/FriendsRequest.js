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
            tmparr.push(doc.data()["user_1"])
            console.log(get_url(doc.data()["user_1"]))
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


  // Add friend
  const addFriend = async (user_id) => {
    const friendsRef = collection(db, "friendships");
    const q1 = query(friendsRef, where("user_1", "==",user_id), where("user_2", "==", auth.currentUser.uid));
    const doc1 = await getDocs(q1);
    if (!doc1.empty) {
        doc1.forEach((doc) => {
             const ref = updateDoc(doc, {
                status: "accepted"
            });
        })
    }
    }

    // Rejected request
    const rejectFriend = async (user_id) => {
        const friendsRef = collection(db, "friendships");
        const q1 = query(friendsRef, where("user_1", "==",user_id), where("user_2", "==", auth.currentUser.uid));
        const doc1 = await getDocs(q1);
        if (!doc1.empty) {
            doc1.forEach((doc) => {
                const ref = deleteDoc(doc);
            })
        }

    }
  

      const renderItem = ({ item }) => (
        <PendingFriendRequest image = {item} username = {item} addFriend = {() => addFriend(item)}/> );
     

  return (
    <View style = {{paddingHorizontal:12}}>
        <FlatList
        data={arr}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator = {false}
      />
    
    </View>
  )
}

export default FriendsRequest