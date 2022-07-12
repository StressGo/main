import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, ScrollView, Text, ImageBackground} from 'react-native'
import Screen from '../components/Screen';
import Card from '../components/Card';
import AppButton from '../components/AppButton';
import WelcomeScreen from '../screens/WelcomeScreen';


import { signOut } from "firebase/auth";
import { auth } from '../../firebase';
import { useNavigation } from '@react-navigation/native';
import Activity from './Activity';
import { storage } from '../../firebase';
import { ref, getDownloadURL } from "firebase/storage";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from '../../firebase';


function UserProfile(props) {

    const navigation = useNavigation();
    const [downloadURL, setdownloadURL] = useState('');
    const [dist, setDist] = useState(0);
    const [arr, setArr] = useState([])

    const handleSignOut = () => {
        signOut(auth)
          .then(() => { //try catch block
            navigation.replace('login') //When sign out, brings back to login page
          })
          .catch(error => alert(error.message))
    }

    //get profile pic
    useEffect(async () => {
        const pathReference = ref(storage, 
            '/user_profile_pictures/' + auth.currentUser.uid + '/' + auth.currentUser.uid);
        setdownloadURL(await getDownloadURL(pathReference));
        console.log(downloadURL)
    }, [])

    //get status
    useEffect( async () => {
        const docRef = doc(db, "user_status", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setArr(docSnap.data());
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
    },[])
    
    
    //achievements
    //tiers
    const gold = 1000;
    const silver = 500;
    const bronze = 100;

    //retrieve total distance
    useEffect( async () => {
        const distRef = doc(db, "user_totalDistance", auth.currentUser.uid);
        const docSnap = await getDoc(distRef);
        if (docSnap.exists()) {
            setDist(docSnap.data().totalDistance);
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!!");
          }
      },[])

    
    //update firebase their tier
    useEffect( async function writeStatus() {
        const docRef = doc(db, "user_status", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          await updateDoc(docRef, {achievement: dist > gold 
                                                    ? 'gold'
                                                    : dist > silver
                                                    ? 'silver'
                                                    : 'bronze'})
        } else {
          await setDoc(docRef, {achievement: dist > silver
                                            ? 'gold'
                                            : dist > bronze
                                            ? 'silver'
                                            : 'bronze'})
        }
      },[])


    return (
        
        <ScrollView>
            <View style = {styles.image} />
            <View>
                <View style = {styles.profileImageContainer}>
                <Image source = {{uri: String(downloadURL)}} style = {styles.profileImage}/> 
                <Text style = {styles.text}>{arr.status}</Text>
                {dist >= silver && <Image style = {styles.medal} source = {require('../assets/gold.png')} />}
                {dist >= bronze && dist < silver  && <Image style = {styles.medal} source = {require('../assets/silver.png')} />}
                {dist < bronze && <Image style = {styles.medal} source = {require('../assets/bronze.png')} />}
                <View style = {styles.buttonContainer}>
                    <AppButton title = 'Sign out' onPress = {handleSignOut} />
                    <AppButton title = 'Edit' onPress = {() => navigation.replace('edit')} />
                </View>
                </View>

                

                <View style = {styles.cardContainer}>
                <Text style = {styles.txt}>User Interests:</Text>

                <View style={styles.interest}>
                {arr.Run && <Image style = {{width: 100, height: 100}} source = {require('../assets/run.png')}/>}
                {arr.Swim && <Image style = {{width: 100, height: 100}} source = {require('../assets/swim.png')}/>}
                {arr.Cycle && <Image style = {{width: 100, height: 100}} source = {require('../assets/cycle.png')}/>}
                </View>

                <Text style = {styles.txt}>Run history:</Text>
                    <Activity />
                    
                </View>
                
            </View>
                    <Text></Text>
                    <Text></Text>
                    <Text></Text>
                    
            
        </ScrollView>
        
    );
}

const styles = StyleSheet.create({
    profileImage:{
        width: 120,
        height: 120,
        borderRadius: 80,
        alignSelf: 'center',
        
    },
    profileImageContainer:{
        paddingBottom: 30,
        bottom: 50,
        alignItems: 'center',
    },
    cardContainer: {
        width: '95%',
        alignSelf: 'center',
        bottom: 80,
    },
    buttonContainer: {
        paddingTop: 10,
        flexDirection: 'row-reverse'
    },
    image: {
        height: 120,
        width: '100%'
    },
    text: {
        alignSelf: 'center',
        paddingTop: 30,
    },
    txt: {
        padding: 20,
        fontWeight: 'bold'
    },
    medal: {
        alignSelf: 'center',
        width: 100,
        height: 100, 
    },
    interest: {
        flexDirection: 'row'
    }
})

export default UserProfile;