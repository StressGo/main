
// import all functions needed from the SDKS needed
import firebase from 'firebase/app';
import {initializeApp } from "firebase/app";
import { getDocs, getFireStore, collection } from 'firebase/firestore'
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage"
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import React, {useEffect, useState} from 'react';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD1Hk1asVux06fU55J3FaaYfyIUI4sM1B4",
  authDomain: "stressgo-3cef0.firebaseapp.com",
  databaseURL: "https://stressgo-3cef0-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "stressgo-3cef0",
  storageBucket: "stressgo-3cef0.appspot.com",
  messagingSenderId: "316778582160",
  appId: "1:316778582160:web:3502f9529218e8fc838815",
  measurementId: "G-BLT8YK6SMG"
};



// init firebase app
const app = initializeApp(firebaseConfig)
const storage = getStorage();

//storage
//use async because uploading takes time
export async function upload(file, currentUser, setLoading){
  const fileRef = ref(storage, currentUser.uid + '.png');

  setLoading(true);

  const snapshot = await uploadBytes(fileRef, file);

  const photoURL = await getDownloadURL(fileRef)
  updateProfile(currentUser, {photoURL});

  setLoading(false);
  alert("uploaded file!")
}

export const auth = getAuth(app);

export function useAuth() {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => setCurrentUser(user));
    return unsub;
  }, [])

  return currentUser;
}


