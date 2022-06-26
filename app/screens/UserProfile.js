import React from 'react';
import { View, Image, StyleSheet, ScrollView, Text, ImageBackground} from 'react-native'
import Screen from '../components/Screen';
import Card from '../components/Card';
import AppButton from '../components/AppButton';
import WelcomeScreen from '../screens/WelcomeScreen';

import { signOut } from "firebase/auth";
import { auth } from '../../firebase';
import { useNavigation } from '@react-navigation/native';

function UserProfile(props) {

    const navigation = useNavigation();

    const handleSignOut = () => {
        signOut(auth)
          .then(() => { //try catch block
            navigation.replace('login') //When sign out, brings back to login page
          })
          .catch(error => alert(error.message))
    }

    return (
        
        <ScrollView>
            <Image source = {require('../assets/nike.jpg')} style = {styles.image} />
            <View>
                <View style = {styles.profileImageContainer}>
                <Image source = {require('../assets/Mr_Aaron.jpg')} style = {styles.profileImage}/> 
                <Text style = {styles.text}>My name is Aaron, Aaron Jaeger</Text>
                <View style = {styles.buttonContainer}>
                    <AppButton title = 'Sign out' onPress = {handleSignOut} />
                </View>
                </View>
                <View style = {styles.cardContainer}>
                    <Text></Text>
                    <Text></Text>
                    <Text></Text>
                    <Text></Text> 
                    <Text></Text>
                </View>
            </View>
            
        </ScrollView>
        
    );
}

const styles = StyleSheet.create({
    profileImage:{
        width: 120,
        height: 120,
        borderRadius: 80,
        alignSelf: 'center',
        
    },
    profileImageContainer:{
        paddingBottom: 30,
        bottom: 50,
        alignItems: 'center',
    },
    cardContainer: {
        width: '95%',
        alignSelf: 'center'
    },
    buttonContainer: {
        paddingTop: 25,
        flexDirection: 'row-reverse'
    },
    image: {
        height: 220,
        width: '100%'
    },
    text: {
        alignSelf: 'center',
        paddingTop: 30,
    }
})

export default UserProfile;