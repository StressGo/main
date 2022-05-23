import React from 'react';
import { View, StyleSheet, Image } from 'react-native'
import colors from '../config/colors';
import AppText from './AppText';

function Card({title, subTitle, image}) {
    // you cqan use View as a container to put styles onto certain components
    return (
        <View style = {styles.card}>
            <Image style= {styles.image} source= {image} />
            <View style = {styles.detailsContainer}> 
                <AppText>{title}</AppText>
                <AppText style = {styles.subTitle}>{subTitle}</AppText>
            </View>
        </View>
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
        height: 200,
    },
    title: {
        marginBottom: 7,
    },
    subTitle: {
        color: colors.secondary,
        fontWeight: "bold",
    }
})

export default Card;