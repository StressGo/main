import React from 'react';
import { View, StyleSheet, Image } from 'react-native'
import AppText from '../components/AppText';
import Profile from '../components/Profile';
import colors from '../config/colors';

function EventsListing_1(props) {
    return (
        <View>
            <Image style = {styles.image} source = {require('../assets/nike.jpg')} />
            <View style = {styles.detailsContainer}>
                <AppText style = {styles.title}>Nike Run Event</AppText>
                <AppText style = {styles.pricing}>$50/pax</AppText>
                <View styles = {styles.Profile}>
                    <Profile
                        image = {require('../assets/nike.jpg')}
                        title = "Nike"
                        subTitle= "4 Events"
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        width: "100%",
        height: 300,
    },
    detailsContainer: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.primary,
    },
    pricing: {
        fontSize: 20,
        color: colors.secondary,
    },
    Profile: {
        padding: 30,
    }
})

export default EventsListing_1;