import React from 'react'
import { ImageBackground, StyleSheet, View, Button, Image } from "react-native"
import colors from '../config/colors';
import AppButton from '../components/AppButton' //why does it keep craSHING??



function WelcomeScreen(props) {
  //rsf
  return (
      <View>
        <ImageBackground 
          style = {styles.container}
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
          
        </ImageBackground>
        
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
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
})

export default WelcomeScreen