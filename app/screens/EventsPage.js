import React, { useState, setState } from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView } from 'react-native'
import Card from '../components/Card';
import colors from '../config/colors';
import {MaterialCommunityIcons} from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/core';

import { firestore, collection, doc, getDoc } from 'firebase/firestore';

import {db} from '../../firebase';

// 6m x 2.5m

//run: 1
//swim: 2
//cycle: 3

function EventsPage(props) {
    const navigation = useNavigation()

    const eventRef = db.collection('events').doc('event1');
    const snapshot = eventRef.get();
    snapshot.then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
    
    
    
    

    return (

        <ScrollView style = {styles.container}>
            <ImageBackground
                source = {require('../assets/splash-page.jpg')}
                style = {{width: '100%', height: '100%'}}
                blurRadius={8}
            >   
            <View style = {styles.closeIcon}>
                <MaterialCommunityIcons name='arrow-left-bold' color="black" size={35} onPress={() => {
                        navigation.replace("Connect_me")
                  }} />
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
                onPress = {() => {
                    navigation.replace("EventsListing_1")
              }}
            />
            
            </View>
            </ImageBackground>
            <Text></Text>
            <Text></Text>
            <Text></Text>
            <Text></Text> 
            <Text></Text>
        </ScrollView>
        // trolling
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
        paddingTop: 30,
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