import React, {useState} from 'react'
import {KeyboardAvoidingView,ImageBackground, StyleSheet, View, Button, Image, TextInput } from "react-native"
import colors from '../config/colors';
import AppButton from '../components/AppButton' 

/* firebase */
import { signInWithEmailAndPassword } from 'firebase/auth'
// import { auth } from '../firebase'


function WelcomeScreen() {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  //rsf

  const signUp = () => {
    auth
    .createUserWithEmailAndPassword(email,password)
    .then(userInfo => {
      const user = userInfo.user;
      console.log(user.email) //testing
    })
    .catch(error => alert(error.message))
  }

  const login = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(userInfo => {
        const user = userInfo.user;
        console.log( user.email); //testing
      })
      .catch(error => alert(error.message))
  }
  return (
      <KeyboardAvoidingView
      style={styles.container}
      behavior="padding">
       <ImageBackground 
          style = {styles.imageContainer}
          blurRadius = {8}
          source = {require('../assets/homepage.jpg')}>
            
            <Image 
            source = {require('../assets/logo.png')}
            style = {{
              alignSelf: 'center',
              height: 400,
              width: 300,
              
            }}
            />
            <View style={styles.inputContainer}>
          <TextInput
            placeholder = "Email" 
            value = {email}
            onChangeText = {text => setEmail(text)}
            style = {styles.input}>
          </TextInput>
          <TextInput
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}>
          
         </TextInput>
      </View>
      <View style={styles.container}>
           <AppButton title = 'Login' onPress = {() => console.log('yo')} />
           <AppButton title = 'Register' onPress = {() => console.log('yo')} />
      </View>
          
        </ImageBackground> 
        
 </KeyboardAvoidingView>
        
    );
}
export default WelcomeScreen

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
       
       
      }
});



