import React from 'react';
import { View, StyleSheet, Image, Text, ImageBackground } from 'react-native'
import colors from '../config/colors';

function Found_runner(props) {
    return (
        <View>
        <ImageBackground 
            source= {require('../assets/splash-page.jpg')}
            style = {{width: '100%', height : '100%'}}
            blurRadius = {8}
        >
            <View style = {styles.imageContainer}> 
            <Image 
            source = {require('../assets/Mr_Aaron.jpg')}
            style = {styles.image} />
            </View>
            <Text style = {styles.text}>
                YOUR RUNNING BUDDY IS:
            </Text>
            <Text style = {styles.username}>
                MR AARON
            </Text>
        </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        width: 220,
        height: 220,
        borderRadius: 120,
        
    },
    imageContainer:{
        alignSelf: 'center',
        top: 100,
        padding: 100,
    },
    text: {
        alignSelf: 'center',
        fontSize: 40,
        width: '80%',
        fontWeight: 'bold',
        paddingTop: 30,
        color: colors.primary
    },
    username: {
        alignSelf: 'center',
        fontSize: 40,
        width: '80%',
        fontWeight: 'bold',
        color: colors.secondary
    }
})

export default Found_runner;
