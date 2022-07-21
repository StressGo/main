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
import Progress from '../components/Progress';



const HomeScreen = () => {

  const navigation = useNavigation();

    const [events, setEvents] = useState([]);
    const [bool, setBool] = useState(false);
    const [dist, setDist] = useState(0);
    const [arr, setArr] = useState(events);
    const colRef = collection(db, 'events');


    //tiers
    const gold = 1000;
    const silver = 500;
    const bronze = 100;
    
    
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

    //retrieve total distance
    useEffect( async () => {
      const docRef = doc(db, "user_totalDistance", auth.currentUser.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
          setDist(docSnap.data().totalDistance);
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
    },[])
    
    console.log(dist)
    
  return (
    
        <View style={styles.container}>
          
          <ImageBackground
          source = {require('../assets/splash-page.jpg')}
          blurRadius = {8}
          style = {styles.imageContainer}
            >
          <Text style = {styles.text} >Hello there!</Text> 
          <View style={styles.progress}>
            {dist >= silver && <Progress step={dist} steps={gold} height={20} color = {colors.gold} txt = {'gold'}/>}
            {dist >= bronze && dist < silver && <Progress step={dist} steps={silver} height={20} color = {colors.silver} txt = {'silver'}/>}
            {dist < bronze && <Progress step={dist} steps={bronze} height={20} color = {colors.bronze} txt = {'bronze'}/>}
          </View>
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
    fontSize: 40,
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
  progress: {
    padding: 30,
    paddingTop: 0,
  }
})

export default HomeScreen