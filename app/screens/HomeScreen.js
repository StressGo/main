import { StyleSheet, Text, View, ImageBackground } from 'react-native'
import React, {useEffect, useState} from 'react'
import { useNavigation } from '@react-navigation/core';
import AppButton from '../components/AppButton' 
import Card from '../components/Card'
import AppText from '../components/AppText';

import { signOut } from "firebase/auth";
import { auth } from '../../firebase';


const HomeScreen = () => {
    const navigation = useNavigation()

    const handleSignOut = () => {
      signOut(auth)
        .then(() => {
          navigation.replace("login")
        })
        .catch(error => alert(error.message))
    }

    
  return (
        <View style={styles.container}>
          <ImageBackground
          source = {require('../assets/splash-page.jpg')}
          blurRadius = {8}
          style = {styles.imageContainer}
            >
          <Text style = {styles.text} >Hello, {auth.currentUser.email} </Text>
          <View>
                <Card 
                    title={'Run'}
                    subTitle={'Ready for a run?'}
                    image = {require('../assets/running.jpg')}
                    
                />
                <Card
                    title={'Connect Me'} 
                    subTitle={'Find like minded runners!'}
                    image={require('../assets/grouprun.jpg')}
                    onPress = {() => {
                      navigation.replace("Connect_me")
                }}
                    
                />
          </View>
          <View style = {styles.button}>
            <AppButton title = 'Sign out' onPress = {handleSignOut} />
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
    fontSize: 30,
    fontFamily: "Roboto",
    fontWeight: 'bold'
  },
  button:{
    width: '33%',
  },
  imageContainer: {
    height: '100%',
    width: '100%',

  }
})

export default HomeScreen
