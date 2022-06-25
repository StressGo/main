
// import all functions needed from the SDKS needed
import { firebase } from "@react-native-firebase/auth";
import {initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


import {
  getFirestore, collection, getDocs,
  addDoc, deleteDoc, doc,
  query, where
} from 'firebase/firestore'


const FIREBASE_APIKEY="AIzaSyD1Hk1asVux06fU55J3FaaYfyIUI4sM1B4"
const FIREBASE_AUTHDOMAIN="stressgo-3cef0.firebaseapp.com"
const FIREBASE_PROJECTID="stressgo-3cef0"
const FIREBASE_STORAGEBUCKET="stressgo-3cef0.appspot.com"
const FIREBASE_MESSAGINGSENDERID="316778582160"
const FIREBASE_APPID="1:316778582160:web:3502f9529218e8fc838815"
const FIREBASE_MEASUREMENTID="G-BLT8YK6SMG"

// Initialize Firebase
const firebaseConfig = {
    apiKey: FIREBASE_APIKEY,
    authDomain: FIREBASE_AUTHDOMAIN,
    projectId: FIREBASE_PROJECTID,
    storageBucket: FIREBASE_STORAGEBUCKET,
    messagingSenderId: FIREBASE_MESSAGINGSENDERID,
    appId: FIREBASE_APPID,
    measurementId: FIREBASE_MEASUREMENTID,
  }



  const app = initializeApp(firebaseConfig)

  export const db = getFirestore(app);
  export const auth = getAuth(app);


