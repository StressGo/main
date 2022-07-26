import React, {useEffect, useState} from 'react';
import { Text, View, KeyboardAvoidingView, ImageBackground, TextInput, StyleSheet, Image, onPress } from 'react-native'
import AppButton from '../components/AppButton';
import {MaterialCommunityIcons} from '@expo/vector-icons'
import colors from '../config/colors';
import { useNavigation } from '@react-navigation/core';
import {ERRORS} from '../constants/AuthErrors'

import { auth } from '../../firebase'
import { createUserWithEmailAndPassword } from "firebase/auth"

import { Firestore, getDoc, collection, getDocs,
  addDoc, deleteDoc, doc,
  query, where, onSnapshot, Document, set, add, setDoc, arrayUnion, updateDoc, waitForPendingWrites

} from 'firebase/firestore';
import {db} from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';


function RegistrationPage(props) {
  const [email,setEmail] = useState('')
  const [password1,setPassword1] = useState('')
  const [password2,setPassword2] = useState('')
  const [username,setUsername] = useState('')
  
  const navigation = useNavigation()


  const signUp = async () => {
    if (password1 === password2) {
    createUserWithEmailAndPassword(auth,email,password2)
    .then(userInfo => {
      const user = userInfo.user;
      navigation.replace("tabs")
      console.log(user.email) //testing
      const totalDistanceRef = doc(db, "user_totalDistance", auth.currentUser.uid);
      const ref = setDoc(totalDistanceRef, {
        totalDistance: 0
      });
        //status
    const docRef = doc(db, "user_status", auth.currentUser.uid);
    const statusRef = setDoc(docRef , {
      Cycle: false,
      Swim: false,
      Run: false,
      achievement: "bronze",
      status: "Nice to meet you",
      username: username
    })
    })
    .catch(error => {
      const errorCode = String(error.code);
      window.alert(ERRORS[errorCode]);
    })
    } else {
      window.alert("Both passwords are not the same")
    }
  }

  
    return (
        <KeyboardAvoidingView
      style={styles.container}
      behavior="padding">
       <ImageBackground 
          style = {styles.imageContainer}
          blurRadius = {8}
          source = {require('../assets/homepage.jpg')}>
        <View style = {styles.backIcon}>
                    <MaterialCommunityIcons name='arrow-left-bold' 
                    color={colors.primary}
                    size={35}
                    onPress={() => navigation.replace("login")} />
        </View>
        <Text style = {styles.registrationText}>
            Create New Account
        </Text>
            
            <View style={styles.inputContainer}>
        <TextInput
            placeholder = "Username" 
            style = {styles.input}
            value = {username}
            onChangeText = {text => setUsername(text)}>
          </TextInput>
          <TextInput
            placeholder = "Email" 
            style = {styles.input}
            value = {email}
            onChangeText = {text => setEmail(text)}>
          </TextInput>
          <TextInput
          placeholder="Password"
          style={styles.input}
          value = {password1}
          onChangeText = {text => setPassword1(text)}
          secureTextEntry={true} >
           
         </TextInput>
         <TextInput
          placeholder="Confirm Password"
          style={styles.input}
          value = {password2}
          onChangeText = {text => setPassword2(text)}
          secureTextEntry={true}>
         </TextInput>
      </View>
      <View style={styles.container}>
           <AppButton title = 'Register' onPress = {signUp} />
      </View>
          
        </ImageBackground> 
        
 </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        },
        imageContainer: {
          height: '100%',
          width: '100%',
  
        },
        button: {
          position: 'absolute',
          bottom: 0,
          opacity: 1,
        },
        bottom: {
          flex: 1,
          justifyContent: 'flex-end',
          marginBottom: 36
        },
        inputContainer: {
          width: '80%',
          alignSelf: 'center',
          
        
        },
        input: {
          backgroundColor: 'white',
          paddingHorizontal: 15,
          paddingVertical: 10,
          borderRadius: 10,
          marginTop: 5,
         
        },
        backIcon:{
            top: 40,
            paddingLeft: 15
        },
        registrationText:{
            fontSize: 60,
            fontWeight: 'bold',
            color: colors.white,
            top: 80,
            paddingLeft: 30,
            paddingBottom: 120,
        }
})

export default RegistrationPage;