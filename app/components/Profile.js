import React from 'react';
import { View, StyleSheet, Image, TouchableHighlight } from 'react-native'
import colors from '../config/colors';
import AppText from './AppText';
import Swipeable from "react-native-gesture-handler/Swipeable";

function Profile({title, subTitle, image, onPress}) {
    return (
        
            
                <TouchableHighlight onPress={onPress} 
                    underlayColor = {colors.light}>
                    <View style = {styles.container}>
                        <Image style = {styles.image} source = {image}/>
                        <View>
                            <AppText style = {styles.title}>{title}</AppText>
                            <AppText style = {styles.subTitle}>{subTitle}</AppText>
                        </View>
                    </View>
                </TouchableHighlight>
           
        
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        padding: 15,
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 35,
        marginRight: 10,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20
    },
    subTitle: {
        color: 'grey',
    },
    
})

export default Profile;