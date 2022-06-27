import React, {useEffect, useState} from 'react'
import {Keyboard, Text, KeyboardAvoidingView, TouchableWithoutFeedback,ImageBackground, StyleSheet, View, Button, Image, TextInput } from "react-native"
import colors from '../config/colors';
import AppButton from '../components/AppButton' 
import RegistrationPage from '../screens/RegistrationPage'
import {ERRORS} from '../constants/AuthErrors'

/* firebase */
import {MaterialCommunityIcons} from '@expo/vector-icons'

import { auth } from '../../firebase'
import { signInWithEmailAndPassword} from "firebase/auth";
import { useNavigation } from '@react-navigation/native';



function WelcomeScreen() {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  const navigation = useNavigation();
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.replace("tabs")//Welcome screen navigate to homescreen
      }
    })
    return unsubscribe
  },[])


  const login = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(userInfo => {
        const user = userInfo.user;
        console.log(user.email); //testing
      })
      .catch(error => {
        const errorCode = String(error.code);
        window.alert(ERRORS[errorCode]);
        
      })
  }

 
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ImageBackground 
          style = {styles.imageContainer}
          blurRadius = {8}
          source = {require('../assets/homepage.jpg')}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          
          
        <Image 
            source = {require('../assets/RunningGo.png')}
            style = {{
              alignSelf: 'center',
              height: 400,
              width: 300,
              bottom: 50,
              
            }}
            />


          <View style = {styles.txt}>
            <TextInput
              placeholder = "Email" 
              value = {email}
              onChangeText = {text => setEmail(text)}
              style = {styles.textInput}>
            </TextInput>
          </View>
          <TextInput
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.textInput}
          secureTextEntry={true}>
          
         </TextInput>
          <View style={styles.btnContainer}>
            <AppButton title="Login" onPress={login} />
            <AppButton title="Register" onPress={() => navigation.replace('Register')} />
          </View>
        </View>
      </TouchableWithoutFeedback>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default WelcomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  inner: {
    flex: 1,
    justifyContent: "space-around"
  },
  header: {
    fontSize: 36,
    marginBottom: 48
  },
  textInput: {
    height: 40,
    borderColor: "#000000",
    borderBottomWidth: 1,
    marginBottom: 30,
    bottom: 90,
    backgroundColor: 'white',
    width: '80%',
    alignSelf: 'center',
    
  },
  btnContainer: {
    marginTop: 12,
    width: 150,
    alignSelf: 'center',
    bottom: 80,
    paddingTop: 10,
  },
  imageContainer: {
    height: '100%',
    width: '100%',
    
  },
  txt: {
    paddingBottom: 60,
  }
});



