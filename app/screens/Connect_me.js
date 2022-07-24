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
                        navigation.replace("tabs")
                  }} />
                </View>
                <TouchableOpacity onPress={() => {
                      navigation.replace("FriendsList")
                }}>
                    <Text style = {styles.topButton} >
                        Friends List
                    </Text>
                 </TouchableOpacity>
                </View>
            
                <View style = {styles.secondary}>
                <TouchableOpacity onPress={
                    () => {
                        navigation.replace("SearchFriends")
                  }
                }
                >
                    <Text style = {styles.bottomButton} >
                        Requests
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
        height: 300, //unable to use flex
    }, 
    secondary: {
        backgroundColor: colors.secondary,
        justifyContent: 'center',
        height: 300, //unable to use flex
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