import React, {useState} from 'react'
import ActivityCard from '../components/ActivityCard';
import {View , Text, Image , FlatList} from 'react-native'
import {DATA} from '../constants/dummyData'

import { Firestore, getDoc, collection, getDocs,
  addDoc, deleteDoc, doc,
  query, where, onSnapshot, Document

} from 'firebase/firestore';
import {db} from '../../firebase';
import { auth } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';

const Activity = () => {

  const [arr, setArr] = useState([]);
  const [bool, setBool] = useState(false)
  const [user, setUser] = useState('')
  const colRef = collection(db, 'user_data');

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user.uid);
    } else {
      console.log("no user found")
    }
  })

  //Retrieve user entries
  const q = query(colRef, where('uid', '==', user))

  onSnapshot(q, (snapshot) => {
      const user_data = []
      snapshot.docs.forEach((doc) => {
          user_data.push({...doc.data()}) //put the data into an array
      })
      if (bool === false) {
          setArr(user_data);
          setBool(true)
      }
  })

    const renderItem = ({ item }) => (
        <ActivityCard image ={item.uri} day = {item.day} kilometer = {item.distance} avgPace = {item.averagepace} time = {item.time}/>
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