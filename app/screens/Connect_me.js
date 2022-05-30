import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text, onPress } from 'react-native'
import Screen from '../components/Screen';
import colors from '../config/colors';
import { useNavigation } from '@react-navigation/core';
import {MaterialCommunityIcons} from '@expo/vector-icons'


function EventsGo_main(props) {
    const navigation = useNavigation()

    return (
        <Screen>
        <View>
            
            
                <View style = {styles.primary}>
                <View style = {styles.backIcon}>
                    <MaterialCommunityIcons name='arrow-left-bold' 
                    color="white" 
                    size={35}
                    onPress={() => {
                        navigation.replace("Home")
                  }} />
                </View>
                <TouchableOpacity onPress={() => {
                      navigation.replace("Found_runner")
                }}>
                    <Text style = {styles.topButton} >
                        RUNNERS NEAR ME
                    </Text>
                 </TouchableOpacity>
                </View>
            
                <View style = {styles.secondary}>
                <TouchableOpacity onPress={() => {
                      navigation.replace("EventsPage")
                }}>
                    <Text style = {styles.bottomButton} >
                        JOIN AN EVENT
                    </Text>
                </TouchableOpacity>
                </View>
            
        </View>
        </Screen>
        
    );
}

const styles = StyleSheet.create({
    primary: {
        backgroundColor: colors.primary,
        justifyContent: 'center',
        height: 380, //unable to use flex
    }, 
    secondary: {
        backgroundColor: colors.secondary,
        justifyContent: 'center',
        height: 400, //unable to use flex
    },
    topButton: {
        textAlign: 'center',
        fontSize: 65,
        fontWeight: 'bold',
        color: colors.white,
        bottom: 20,
    },
    bottomButton: {
        textAlign: 'center',
        fontSize: 65,
        fontWeight: 'bold',
        color: colors.white,
        bottom: 20,
    },
    backIcon:{
        bottom: 70,
        paddingLeft: 15
    }
})

export default EventsGo_main;