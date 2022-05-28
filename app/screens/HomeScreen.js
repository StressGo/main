import { StyleSheet, Text, View } from 'react-native'
import React, {useEffect, useState} from 'react'
import { useNavigation } from '@react-navigation/core';
import AppButton from '../components/AppButton' 

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
      <Text>Email: {auth.currentUser.email} </Text>
      <AppButton title = 'Sign out' onPress = {handleSignOut} />
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }
  })