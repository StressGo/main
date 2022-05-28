import React from 'react';
import { View, Image, StyleSheet } from 'react-native'
import colors from '../config/colors';
import {MaterialCommunityIcons} from '@expo/vector-icons'

function ViewImageScreen({image}) {
    return (
        <View style = {styles.imageContainer}>
            <View style = {styles.closeIcon}>
                <MaterialCommunityIcons name='close' color="white" size={35} />
            </View>
            <Image
             source = {image}
             style = {styles.image}
             
             />
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        
        width: '100%',
        height: '100%',
        resizeMode: 'center',
        
    },
    imageContainer : {
        backgroundColor: colors.primary,
    },
    closeIcon: {
        position: "absolute",
        top: 40,
        left: 30,
    }

})

export default ViewImageScreen;