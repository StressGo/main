import React from 'react'
import { View, ImageBackground, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import colors from '../config/colors';


function EventsSelection() {

  return (
    <View>
        < ImageBackground
                source = {require('../assets/splash-page.jpg')}
                style = {{width: '100%', height: '100%'}}
                blurRadius={8}
        > 
         <View style = {styles.backIcon}>
                <MaterialCommunityIcons name='arrow-left-bold' color="black" size={35} onPress={() => {
                        navigation.replace("Connect_me")
                  }} />
        </View>
        <Text style = {styles.text}>Select what you like!</Text>
        
        <View style = {styles.iconContainer}>
        <TouchableOpacity>
                <MaterialCommunityIcons name='run-fast' color="black" size={120} onPress={null
                  } />
        </ TouchableOpacity>
        <TouchableOpacity>
                <MaterialCommunityIcons name='bicycle' color="black" size={120} onPress={null
                } />
        </ TouchableOpacity>
        <TouchableOpacity>
                <MaterialCommunityIcons name='swim' color="black" size={120} onPress={null
                  } />
        </ TouchableOpacity>
            
        </View>
        
        </ ImageBackground>

    </View>
  )
}

const styles = StyleSheet.create({
    backIcon: {
        paddingLeft: 10,
        paddingTop: 30,
    }, 
    text: {
        top: 40,
        fontSize: 50,
        textAlign:'center',
        paddingBottom: 80,
        color: colors.primary,
        fontWeight: 'bold',
    },
    iconContainer: {
        alignSelf: 'center'
    }
    
})

export default EventsSelection