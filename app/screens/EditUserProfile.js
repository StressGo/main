import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AppButton from '../components/AppButton';
import {MaterialCommunityIcons} from '@expo/vector-icons'
import colors from '../config/colors';
import { useNavigation } from '@react-navigation/core';


import { storage } from '../../firebase';
import { auth } from '../../firebase';
import { uploadBytes, ref, getDownloadURL, uploadString } from 'firebase/storage';

import BouncyCheckbox from "react-native-bouncy-checkbox";

import { Firestore, getDoc, collection, getDocs,
  addDoc, deleteDoc, doc,
  query, where, onSnapshot, Document, set, add, setDoc, arrayUnion, updateDoc

} from 'firebase/firestore';

import {db} from '../../firebase';


export default function ImagePickerExample() {
  const [image, setImage] = useState(null);
  const [upload, setUpload] = useState(false);
  const [press, setPressed] = useState(false);
  const [res, setRes] = useState(null);
  const [status, setStatus] = useState('');
 
  const navigation = useNavigation();

  // for profile picture
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    setImage(result.uri);
    setRes(result);

  };

  function handleButton() {
   handleImagePicked(res);
   writeStatus();
   writeInterest();
   alert('uploaded')
  }

  const handleImagePicked = async (result) => {
    try {
      setUpload(true);

      if (!result.cancelled) {
        const uploadUrl = await uploadImageAsync(result.uri);
        setImage(uploadUrl);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setUpload(false);
    }
  };

  async function uploadImageAsync(uri) {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
  
    const photoRef = ref(storage, 'user_profile_pictures/' + auth.currentUser.uid + '/' + auth.currentUser.uid);
    const result = await uploadBytes(photoRef, blob);
    

    blob.close();

    return await getDownloadURL(photoRef);

  } 

  //status
  async function writeStatus() {
    const docRef = doc(db, "user_status", auth.currentUser.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      await updateDoc(docRef, {status: status})
    } else {
      await setDoc(docRef, {status: status})
    }
  }
  
  //checkbox 
  const [checkboxStateRun, setCheckboxStateRun] = React.useState(false);
  const [checkboxStateCycle, setCheckboxStateCycle] = React.useState(false);
  const [checkboxStateSwim, setCheckboxStateSwim] = React.useState(false);

  async function writeInterest() {
    const docRef = doc(db, "user_status", auth.currentUser.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      await updateDoc(docRef, {Run: checkboxStateRun, Cycle: checkboxStateCycle, Swim: checkboxStateSwim})
    } else {
      await setDoc(docRef, {Run: checkboxStateRun, Cycle: checkboxStateCycle, Swim: checkboxStateSwim})
    }
  }
  
  return (
    <View>

            <View style = {styles.AddProfilePicContainer}>
            <TouchableOpacity style = {styles.avatarPlaceholder} onPress={pickImage}>
            {image == null && <Image 
                source = {require('../assets/AddProfilePic.png')}
                style = {styles.AddProfilePic}  />}
            {image != null && <Image 
                source = {{ uri: image }}
                style = {styles.AddProfilePic}
            />}
            </TouchableOpacity>
            </View>

            <View style={styles.backIcon}>
            <MaterialCommunityIcons name='arrow-left-bold' 
                    color={colors.primary}
                    size={35}
                    onPress={() => {
                      navigation.replace("tabs")
                    }}
                    />
            </View>

            <TextInput
              placeholder="What's on your mind?"
              value={status}
              onChangeText={text => setStatus(text)}
              maxLength={35}
              style={styles.textInput}>
          
            </TextInput>
            
          <View style={styles.checkbox}>
            <Text style = {{bottom: 10}}>Indicate your interests: </Text>
            <BouncyCheckbox
              size={25}
              fillColor="red"
              unfillColor="#FFFFFF"
              text="Running"
              iconStyle={{ borderColor: "red" }}
              textStyle={{ textDecorationLine: 'none' }}
              onPress={() => setCheckboxStateRun(!checkboxStateRun)}
              style = {{paddingTop: 10}}
            />
            <BouncyCheckbox
              size={25}
              fillColor="green"
              unfillColor="#FFFFFF"
              text="Swimming"
              iconStyle={{ borderColor: "green" }}
              textStyle={{textDecorationLine: 'none'}}
              onPress={() => setCheckboxStateSwim(!checkboxStateSwim)}
              style = {{paddingTop: 10}}
            />
            <BouncyCheckbox
              size={25}
              fillColor="blue"
              unfillColor="#FFFFFF"
              text="Cycling"
              iconStyle={{ borderColor: "blue" }}
              textStyle={{textDecorationLine: 'none'}}
              onPress={() => setCheckboxStateCycle(!checkboxStateCycle)}
              style = {{paddingTop: 10}}
            />
            </View>

            <View style = {styles.button}>
                <AppButton title = 'Upload' onPress = {handleButton} />
            </View>
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
      top: 150,
    },
    backIcon:{
      bottom: 130,
      paddingLeft: 15,
      width: 45,
  },
  button: {
      top: 190,
  },
  textInput: {
    height: 50,
    borderColor: "#000000",
    borderBottomWidth: 1,
    marginBottom: 30,
    backgroundColor: 'white',
    width: '80%',
    alignSelf: 'center',
    top: 120,
    
  },
  checkbox: {
    paddingLeft: 50,
    top: 150,
  }
})


