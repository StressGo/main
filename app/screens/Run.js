import React from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native'
import Screen from '../components/Screen';

function Run(props) {
    return (
        <Screen>
            <ImageBackground
                source = {require('../assets/splash-page.jpg')}
                blurRadius = {8}
                style = {styles.imageContainer}
            >

            </ImageBackground>
        </Screen>
    );
}

const styles = StyleSheet.create({
    imageContainer: {
        height: '100%',
        width: '100%',
    },
})

export default Run;