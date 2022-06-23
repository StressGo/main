import React, {useEffect, useState} from 'react';
import { View, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import colors from '../config/colors';
import { useNavigation } from '@react-navigation/core';

import * as ImagePicker from 'expo-image-picker';
import UserPermissions from '../../utilities/UserPermissions';

import { auth, useAuth, upload } from '../../firebase'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import storage from '@react-native-firebase/storage'
import AppButton from '../components/AppButton';



function EditUserProfile(props) {

    const navigation = useNavigation();

     //user profile
    const currentUser = useAuth();

     const [avatar, setAvatar] = useState(null)
     const [loading, setLoading] = useState(false);
     const [transferred, setTransferred] = useState(0);

     const pickImage = async () => {
         // No permissions request is necessary for launching the image library
         let result = await ImagePicker.launchImageLibraryAsync({
           mediaTypes: ImagePicker.MediaTypeOptions.All,
           allowsEditing: true,
           aspect: [4, 3],
           quality: 1,
         });
     
         console.log(result);
     
         if (!result.cancelled) {
           setAvatar(result.uri);
         }
       };


      function handleChange(e) {
        if (e.target.files[0]) {
          setAvatar(e.target.files[0])
        }
      }
    
      function handleClick() {
        upload(avatar, currentUser, setLoading);
      }

      useEffect(() => {
        if (currentUser?.avatar) {
          setAvatar(currentUser.avatar);
        }
      }, [currentUser])

    return (
        <View>
            <View style = {styles.backIcon}>
                    <MaterialCommunityIcons name='arrow-left-bold' 
                    color={colors.primary}
                    size={35}
                    onPress={() => navigation.replace("tabs")} />
            </View>
            <View style = {styles.AddProfilePicContainer}>
            <TouchableOpacity style = {styles.avatarPlaceholder} onPress={pickImage}>
            {avatar == null && <Image 
                source = {require('../assets/AddProfilePic.png')}
                style = {styles.AddProfilePic}  />}
            {avatar != null && <Image 
                source = {{ uri: avatar }}
                style = {styles.AddProfilePic}
            />}
            </TouchableOpacity>
            </View>
            <AppButton title = 'Upload' onPress = {handleClick} />
        </View>
    );
}

const styles = StyleSheet.create({
    AddProfilePic: {
        alignSelf:'center',
        height: 150,
        width: 150,
        borderRadius: 79,
      },
      AddProfilePicContainer: {
        paddingBottom: 30,
      },
      avatarPlaceholder:{
        width: 150,
        height: 150,
        borderRadius: 79,
        alignSelf: 'center',
        top: 180,
      },
      backIcon:{
        top: 40,
        paddingLeft: 15
    },
})

export default EditUserProfile;