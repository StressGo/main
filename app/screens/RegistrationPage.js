import React from 'react';
import { Text, View, KeyboardAvoidingView, ImageBackground, TextInput, StyleSheet, Image, onPress } from 'react-native'
import AppButton from '../components/AppButton';
import {MaterialCommunityIcons} from '@expo/vector-icons'
import colors from '../config/colors';

function RegistrationPage(props) {
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
                    onPress={onPress} />
        </View>
        <Text style = {styles.registrationText}>
            Create New Account
        </Text>
            
            <View style={styles.inputContainer}>
        <TextInput
            placeholder = "Username" 
            style = {styles.input}>
          </TextInput>
          <TextInput
            placeholder = "Email" 
            style = {styles.input}>
          </TextInput>
          <TextInput
          placeholder="Password"
          style={styles.input}>
         </TextInput>
         <TextInput
          placeholder="Confirm Password"
          style={styles.input}>
         </TextInput>
      </View>
      <View style={styles.container}>
           <AppButton title = 'Register'  />
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
          top: 150,
        
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
        }
})

export default RegistrationPage;