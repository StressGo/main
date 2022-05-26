import React from 'react';
import { Text, StyleSheet }  from 'react-native'
import { Platform } from 'react-native-web';
//imrn
//sets default fonts for any component encapsulated within the <AppText> component
// this is a reusable component
// to use this, need to write 
// import AppText from './directory' to import component for usage

function AppText({children, style}) {
    // set the style of the <text> to the stylesheet style
    // props is any argument passed into the function, while
    // props.children is accessing the argument

    //dynamically apply the styles, now you can pass in style
    // as an argument. You just have to enclose it in []
    return (
        <Text style = {[styles.text, style]}>{children}</Text>
    );
}


//rnss
const styles = StyleSheet.create({
    //method 1 for platform specific
    //text: {
       // fontSize: 18,
       // fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    //}

    //method 2
    // use AppText.ios.js or AppText.android.js for platform specific
    // components

    //method 3
    text: {
        ...Platform.select({
            ios: {
                fontSize: 20,
                fontFamily: 'Avenir'
            },
            android: {
                fontSize: 18,
                fontFamily: "Roboto"
            }
        })
    },
    container: {
        
    }
})

export default AppText;