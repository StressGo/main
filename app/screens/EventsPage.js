import React, { useState, setState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, FlatList, Button, TouchableHighlight } from 'react-native'
import Card from '../components/Card';
import colors from '../config/colors';
import {MaterialCommunityIcons} from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/core';
import AppButton from '../components/AppButton'
import { SearchBar } from 'react-native-screens';

import { Firestore, getDoc, collection, getDocs,
        addDoc, deleteDoc, doc,
        query, where, onSnapshot
      
} from 'firebase/firestore';



import {db} from '../../firebase';
import { async } from '@firebase/util';

//run: 1
//swim: 2
//cycle: 3

function EventsPage(props) {
    

    const [events, setEvents] = useState([]);
    const [bool, setBool] = useState(false);
    const [arr, setArr] = useState(events)
    const [numer, setNumer] = useState(0);
    const colRef = collection(db, 'events');
    
    
    const q = query(colRef, where('type', '>=', 0))

    onSnapshot(q, (snapshot) => {
        const events = []
        snapshot.docs.forEach((doc) => {
            events.push({...doc.data()}) //put the data into an array
        })
        if (bool === false) {
            setEvents(events);
            setBool(true)
        }
    })

    
    useEffect( () => {
        setArr(events.filter((item) => item.type == numer))
        }, [numer]
    )
    
    for (let i = 0; i < events.length; i ++) {
        console.log(typeof(events[i].url))
    }

    return (

        <View style = {styles.container}>
            <ImageBackground
                source = {require('../assets/splash-page.jpg')}
                style = {{width: '100%', height: '100%'}}
                blurRadius={8}
            >   
            <View style = {styles.backIcon}>
                <MaterialCommunityIcons name='arrow-left-bold' color="black" size={35} onPress={() => {
                        navigation.replace("Connect_me")
                  }} />
            </View>
            
        <Text style = {styles.text}>EVENTS</Text>
        <View style = {styles.buttons}>
            <AppButton title={'Run'} onPress = {() => setNumer(1)}/>
            <AppButton title={'Swim'} onPress = {() => setNumer(2)}/>
            <AppButton title={'Cycle'} onPress = {() => setNumer(3)}/>
        </View>
        <FlatList
            data={arr}
            renderItem={({ item }) => (
                <View style = {styles.cardContainer}>
                    <Card title={item.title} subTitle = {item.subTitle} image={String(item.url)} />
                </View>
            )}
            />
            
            <Text></Text>
            <Text></Text>
            <Text></Text>
            <Text></Text> 
            <Text></Text>
            <Text></Text>
            <Text></Text>
            <Text></Text>
            
            </ImageBackground>
        </View>
        // trolling
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 80,
        textAlign:'center',
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
    backIcon: {
        paddingLeft: 10,
        paddingTop: 30,
    }, 
    searchIcon: {
        paddingLeft: 10,
        paddingTop: 15,
        position: 'relative',
        left: 330,
        bottom: 47
    },
    buttons: {
        flexDirection: 'row',
        padding: 20,
    }
})

export default EventsPage;