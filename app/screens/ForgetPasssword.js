import React, {useEffect, useState} from 'react'
import {Keyboard, Text, KeyboardAvoidingView, TouchableWithoutFeedback,ImageBackground, StyleSheet, View, Button, Image, TextInput } from "react-native"
import AppButton from '../components/AppButton' 
import {ERRORS} from '../constants/AuthErrors'

import { auth } from '../../firebase'
import {sendPasswordResetEmail} from "firebase/auth";
import { useNavigation } from '@react-navigation/native';

const ForgetPasssword = () => {
    const [email,setEmail] = useState('')

    const resetPassword = () => {
        sendPasswordResetEmail(auth,email)
          .then(() => {
            window.alert("Please check the instructions in your email!")
          })
          .catch(error => {
            const errorCode = String(error.code);
            window.alert(ERRORS[errorCode]);
            
          })
      }
  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    style={styles.container}>
    <Text style={styles.text}>Forgot Password?</Text>
    <View style = {styles.txt}>
    <TextInput
              placeholder = "Email" 
              value = {email}
              onChangeText = {text => setEmail(text)}
              style={styles.textInput} 
    >
    </TextInput>
    <AppButton title="Send Email" onPress={resetPassword} />

    </View>

     </KeyboardAvoidingView>
  )
}

export default ForgetPasssword

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 150
    },
    text: {
      color: '#333',
      fontSize: 24,
      marginLeft: 25
    },
    buttonContainer: {
      margin: 25
    },
   txt: {
        marginTop:12, 
        flexDirection: "column", 
        justifyContent: "space-between"
    },
    textInput: {
        height: 40,
        borderColor: "#000000",
        borderBottomWidth: 1,
        backgroundColor: 'white',
        width: '80%',
        alignSelf: 'center',
        
      }

  })