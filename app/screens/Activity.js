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
  const [user, setUser] = useState('')

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user.uid);
    } else {
      console.log("no user found")
    }
  })

  //Retrieve user entries
  // const colRef = doc(db, 'user_data', user).data().getResult()
  // const q = query(colRef)

  // onSnapshot(q, (snapshot) => {
  //     const user_data = []
  //     snapshot.docs.forEach((doc) => {
  //         user_data.push({...doc.data()}) //put the data into an array
  //     })
  //     if (bool === false) {
  //         setArr(user_data);
  //         setBool(true)
  //     }
  // })

  console.log(arr);

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