import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native'
import Card from '../components/Card';
import colors from '../config/colors';
import {MaterialCommunityIcons} from '@expo/vector-icons'

function EventsPage(props) {
    return (
        <View style = {styles.container}>
            <ImageBackground
                source = {require('../assets/splash-page.jpg')}
                style = {{width: '100%', height: '100%'}}
                blurRadius={8}
            >   
            <View style = {styles.closeIcon}>
                <MaterialCommunityIcons name='close' color="black" size={35} />
            </View>
            <View style = {styles.searchIcon}>
                <MaterialCommunityIcons name='magnify' color="black" size={35} />
            </View>
            <Text style = {styles.text}>EVENTS</Text>
            <View style = {styles.cardContainer}>
            <Card 
                title={'NIKE RUN'}
                subTitle={'Just Run Lah!'}
                image={require('../assets/Nike_KL_Run.jpg')}
            />
            <Card 
                title={'ADIDAS RUN'}
                subTitle={'Impossible to run'}
                image={require('../assets/Nike_KL_Run.jpg')}
            />
            <Card 
                title={'ASICS RUN'}
                subTitle={'What is Asics?'}
                image={require('../assets/Nike_KL_Run.jpg')}
            />
            <Card 
                title={'Gucci RUN'}
                subTitle={'Wait what..?'}
                image={require('../assets/Nike_KL_Run.jpg')}
            />
            </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 80,
        textAlign:'center',
        paddingBottom: 20,
        color: colors.primary,
        fontWeight: 'bold',
    },
    container: {
        backgroundColor: 'white',
    },
    cardContainer: {
        width: '95%',
        alignSelf: 'center'
    },
    closeIcon: {
        paddingLeft: 10,
        paddingTop: 15,
    }, 
    searchIcon: {
        paddingLeft: 10,
        paddingTop: 15,
        position: 'relative',
        left: 330,
        bottom: 47
    }
})

export default EventsPage;