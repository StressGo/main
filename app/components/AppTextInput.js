import React from 'react';
import { View, TextInput, StyleSheet, Platform  } from 'react-native'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import colors from '../config/colors'

// {icon && <MaterialCommunityIcons name={icon} />} conditional rendering
// only renders when icon is defined

function AppTextInput({icon, ...otherprops}) {
    return (
        <View style = {styles.container}>
            {icon && <MaterialCommunityIcons name = {icon} size= {20} color = {colors.medium} style = {styles.icon}/>} 
            <TextInput style = {styles.textInput} {...otherprops} />
        </View>
    );
}

const styles = StyleSheet.create({
    textInput: {
        fontFamily: Platform.OS == "android" ? "Roboto" : "Avenir",
        fontSize: 18,
        color: colors.dark,
        
    },
    container: {
        backgroundColor: colors.light,
        borderRadius: 25,
        flexDirection: 'row',
        width: '100%',
        padding: 15,
        marginVertical: 10,
    },
    icon: {
        marginRight: 10,
        alignSelf: 'center',
    }
    
})

export default AppTextInput;