import React, {useState} from 'react'
import ActivityCard from '../components/ActivityCard';
import {View , Text, Image , FlatList} from 'react-native'
import {DATA} from '../constants/dummyData'

import { Firestore, getDoc, collection, getDocs,
  addDoc, deleteDoc, doc,
  query, where, onSnapshot, Document, whereEqualTo

} from 'firebase/firestore';
import {db} from '../../firebase';
import { auth } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';

const Activity = () => {

  const [arr, setArr] = useState([]);
  const [bool, setBool] = useState(false)
  const [userid, setUserid] = useState('')

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUserid(user.uid);
    } else {
      console.log("no user found")
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