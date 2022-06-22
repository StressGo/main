
// import all functions needed from the SDKS needed
import firebase from 'firebase/app'
import {initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDocs, getFireStore, collection } from 'firebase/firestore'

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

  // init services
  const db = getFireStore()

  // collection ref
  const colRef = collection(db, 'events')

  // get collection data
  getDocs(colRef).then((snapshot) => {
    let events = []
    snapshot.docs.forEach((doc) => {
      events.push({ ...doc.data(), id: doc.id })
    })
  })
  .catch(err => {
    console.log(err.message)
  })

  export const auth = getAuth(app);


