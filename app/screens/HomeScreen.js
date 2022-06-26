import { StyleSheet, Text, View, ImageBackground } from 'react-native'
import React, {useEffect, useState} from 'react'
import AppButton from '../components/AppButton' 
import Card from '../components/Card'
import AppText from '../components/AppText';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import Carousel from 'react-native-snap-carousel';

import { signOut } from "firebase/auth";
import { auth } from '../../firebase';
import Tabs from '../../navigation/tabs';
import { Firestore, getDoc, collection, getDocs,
  addDoc, deleteDoc, doc,
  query, where, onSnapshot

} from 'firebase/firestore';



import {db} from '../../firebase';
import { async } from '@firebase/util';
import colors from '../config/colors';



const HomeScreen = () => {

  const navigation = useNavigation();

    const [events, setEvents] = useState([]);
    const [bool, setBool] = useState(false);
    const [arr, setArr] = useState(events);
    const colRef = collection(db, 'events');
    
    
    const q = query(colRef, where('type', '>=', 0))

    onSnapshot(q, (snapshot) => {
        const events = []
        snapshot.docs.forEach((doc) => {
            events.push({...doc.data()}) //put the data into an array
        })
        if (bool === false) {
            setEvents(events);
            setBool(true)
        }
    })

    
    
    
  return (
    
        <View style={styles.container}>
          
          <ImageBackground
          source = {require('../assets/splash-page.jpg')}
          blurRadius = {8}
          style = {styles.imageContainer}
            >
          <Text style = {styles.text} >Hello there!</Text> 
          <Text style = {styles.smalltext} >Ongoing events:</Text> 
          <Text style = {styles.smalltext} >(slide to find out more!)</Text> 
          <View style = {styles.carousel}>
              <Carousel
                layout='tinder'
                layoutCardOffset={`40`}
                data={events}
                renderItem={({ item }) => (
                  <View style = {styles.cardContainer}>
                      <Card title={item.title} subTitle = {item.subTitle} image={String(item.url)} onPress={() => navigation.navigate('listing')} />
                  </View>
                )}
                sliderWidth={350}
                itemWidth={350}
              />
          </View>
          <View style = {styles.button}>
          </View>
          </ImageBackground>
        </View>
    
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    
  },
  text: {
    padding: 30,
    paddingTop: 100,
    fontSize: 60,
    fontFamily: "Roboto",
    fontWeight: 'bold',
    color: colors.primary,
  },
  button:{
    width: '33%',
  },
  imageContainer: {
    height: '100%',
    width: '100%',

  },
  carousel: {
    alignSelf: 'center',
    paddingTop: 20,
  },
  smalltext: {
    paddingLeft: 30,
  },
})

export default HomeScreen

