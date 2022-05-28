import React from 'react';
import Constants from 'expo-constants'
import { StyleSheet, SafeAreaView } from 'react-native'

//used to ensure safe area view across platforms

function Screen({children}) {
    return (
        <SafeAreaView style = {styles.screen}>
            {children}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: {
        paddingTop: Constants.statusBarHeight,
        // seen from Constants, gives device specs
    }
})

export default Screen;