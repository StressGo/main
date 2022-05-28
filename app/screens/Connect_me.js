import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text, onPress } from 'react-native'
import Screen from '../components/Screen';
import colors from '../config/colors';


function EventsGo_main(props) {
    return (
        
        <View>
            <TouchableOpacity onPress={onPress}>
                <View style = {styles.primary}>
                    <Text style = {styles.topButton} >
                        RUNNERS NEAR ME
                    </Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={onPress}>
                <View style = {styles.secondary}>
                    <Text style = {styles.bottomButton} >
                        JOIN AN EVENT
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
        
    );
}

const styles = StyleSheet.create({
    primary: {
        backgroundColor: colors.primary,
        justifyContent: 'center',
        height: 400, //unable to use flex
    }, 
    secondary: {
        backgroundColor: colors.secondary,
        justifyContent: 'center',
        height: 410, //unable to use flex
    },
    topButton: {
        textAlign: 'center',
        fontSize: 65,
        fontWeight: 'bold',
        color: colors.white,
    },
    bottomButton: {
        textAlign: 'center',
        fontSize: 65,
        fontWeight: 'bold',
        color: colors.white,

        
    }
})

export default EventsGo_main;