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
import { doc, getDoc } from "firebase/firestore";
import { db } from '../../firebase';


function UserProfile(props) {

    const navigation = useNavigation();
    const [downloadURL, setdownloadURL] = useState('');
    const [status, setStatus] = useState('nothing');

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
            setStatus(docSnap.data());
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
    },[])
    
    console.log(status);
    
    

    return (
        
        <ScrollView>
            <View style = {styles.image} />
            <View>
                <View style = {styles.profileImageContainer}>
                <Image source = {{uri: String(downloadURL)}} style = {styles.profileImage}/> 
                <Text style = {styles.text}>{status.status}</Text>
                <View style = {styles.buttonContainer}>
                    <AppButton title = 'Sign out' onPress = {handleSignOut} />
                    <AppButton title = 'Edit' onPress = {() => navigation.replace('edit')} />
                </View>
                </View>
                <View style = {styles.cardContainer}>
                <Text style = {styles.txt}>Run history</Text>
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
        paddingTop: 25,
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
    }
})

export default UserProfile;