import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import colors from '../config/colors';
import AppText from './AppText';

function Card({title, subTitle, image, onPress}) {
    // you cqan use View as a container to put styles onto certain components
    return (
        <TouchableOpacity>
            <View style = {styles.card} onPress = {onPress}>
                <Image style= {styles.image} source= {image} />
                <View style = {styles.detailsContainer}> 
                    <AppText style = {styles.title}>{title}</AppText>
                    <AppText style = {styles.subTitle}>{subTitle}</AppText>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    //think of how a card looks like
    //rounded edges
    card: {
        borderRadius: 15,
        backgroundColor: colors.white,
        marginBottom: 20,
        overflow: 'hidden', //if got overflow, it's hidden!
        
    },
    detailsContainer: {
        padding: 20,
        
    },
    image: {
        width: '100%',
        height: 100,

    },
    title: {
        marginBottom: 1,
        fontWeight: "bold",
        color: colors.primary,
        fontSize: 30,
    },
    subTitle: {
        color: colors.secondary,
    }
})

export default Card;