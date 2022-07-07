import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { storage } from '../../firebase';
import { auth } from '../../firebase';
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage';


export default function ImagePickerExample() {
  const [image, setImage] = useState(null);
  const [upload, setUpload] = useState(false);


  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    
    handleImagePicked(result);
    setImage(result.uri);
    
  };

  const handleImagePicked = async (result) => {
    try {
      setUpload(true);

      if (!result.cancelled) {
        const uploadUrl = await uploadImageAsync(result.uri);
        setImage(uploadUrl);
      }
    } catch (e) {
      console.log(e);
      alert("Upload failed, sorry :(");
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
  
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    </View>
  );
}
