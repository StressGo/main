import React, {useEffect, useState} from 'react'
import ActivityCard from '../components/ActivityCard';
import {View , Text, Image , FlatList} from 'react-native'
import {DATA} from '../constants/dummyData'

import { Firestore, getDoc, collection, getDocs,
  addDoc, deleteDoc, doc,
  query, where, onSnapshot, Document, whereEqualTo

} from 'firebase/firestore';
import {db} from '../../firebase';
import { auth } from '../../firebase';
import { storage } from '../../firebase';
import { ref, getDownloadURL } from "firebase/storage";


const Activity = () => {
  const [arr,setArr] = useState([]);
  const [downloadURL, setdownloadURL] = useState('');

useEffect(async () => {
  const docRef = doc(db, "user_data",auth.currentUser.uid);
  const docSnap = await getDoc(docRef);
  setArr(docSnap.data()["run"])
}, []);

//get profile pic
useEffect(async () => {
  const pathReference = ref(storage, 
      '/user_profile_pictures/' + auth.currentUser.uid + '/' + auth.currentUser.uid);
  setdownloadURL(await getDownloadURL(pathReference));
  console.log(downloadURL)
}, [])




    const renderItem = ({ item }) => (
        <ActivityCard image ={downloadURL} day = {item.day} kilometer = {item.distance} avgPace = {item.averagepace} time = {item.time} timeofDay = {item.timeofDay} />
      );
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

export default Activity