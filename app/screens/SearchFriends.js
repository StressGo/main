import React, {useState, useEffect} from "react";
import { StyleSheet, TextInput, View, Keyboard, Button, Text, useWindowDimensions, TouchableOpacity} from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";
import SendingFriendRequest from '../components/SendingFriendRequest'
import { NavigationContainer, TabRouter, useNavigation, Navigation } from '@react-navigation/native'; 
import colors from '../config/colors';
import {MaterialCommunityIcons} from '@expo/vector-icons'

import { Firestore, getDoc, collection, getDocs,
    addDoc, deleteDoc, doc,
    query, where, onSnapshot, Document, set, add, setDoc, arrayUnion, updateDoc, 
  
  } from 'firebase/firestore';
  import {db} from '../../firebase';
  import { auth } from '../../firebase';
  import { storage } from '../../firebase';
  import { ref, getDownloadURL } from "firebase/storage";
  import * as Clipboard from 'expo-clipboard';
import AppButton from "../components/AppButton";




const SearchFriends = () => {

    const [clicked, setClicked] = useState(false);
    const [Friend,setFriend] = useState("");
    const [Found, setFound] = useState(false);
    const [search, setSearched] = useState(false);
    const [downloadURL, setdownloadURL] = useState('');
    const [copiedText, setCopiedText] = React.useState('');
    const navigation = useNavigation();

    const copyToClipboard = () => {
      Clipboard.setString(Friend);
      alert("User ID copied to clipboard!")
    };

    const fetchCopiedText = async () => {
      const text = await Clipboard.getStringAsync();
      setCopiedText(text);
    };

    const searchFriend = async () => {
        // Check whether Friend is user itself
        if (Friend == auth.currentUser.uid) {
          window.alert("Cannot send friend request to yourself")
        } else {
        // check whether user exists
        const docRef = doc(db, "user_totalDistance",Friend);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            // check whether both users are already friends
            const friendsRef = collection(db, "friendships");
            const q1 = query(friendsRef, where("user_1", "==", auth.currentUser.uid), where("user_2", "==", Friend));
            const q2 = query(friendsRef, where("user_1", "==", Friend), where("user_2", "==", auth.currentUser.uid));
            const doc1 = await getDocs(q1);
            const doc2 = await getDocs(q2);
            if (doc1.empty && doc2.empty) {
                setFound(true);
                
            } else {
                if (!doc1.empty) {
                doc1.forEach((doc) => doc.data()["status"] == "accepted"
                ? window.alert("User is already added")
                : window.alert("User request still pending"));
                } 
                if (!doc2.empty) {
                  doc2.forEach((doc) => doc.data()["status"] == "accepted"
                ? window.alert("User is already added")
                : window.alert("User request still pending"));
                }

            }
          } else {
            window.alert("No such user is found")
          }
        }
    }


    useEffect(async () => {
      const pathReference = ref(storage, 
          '/user_profile_pictures/' + Friend + '/' + Friend);
      setdownloadURL(await getDownloadURL(pathReference));
      console.log(downloadURL)
    }, [search])



    const addFriend = async () => {
        const friendsRef = collection(db, "friendships");
        const ref = addDoc(friendsRef, {
            user_1: auth.currentUser.uid,
            user_2: Friend, 
            status: "pending"
        })
        
    }
  return (
    <View>
      <View style = {{paddingTop: 30, paddingLeft: 10, paddingBottom: 30}}>
      <MaterialCommunityIcons name='arrow-left-bold' 
                    color={colors.primary}
                    size={35}
                    onPress={() => navigation.replace("login")} />
      </View>
      <Text style = {{padding: 15, fontWeight: "bold"}}>My ID: {auth.currentUser.uid}</Text>
      <View style={{width: '80%', alignSelf: "center", padding: 5}}>
      <AppButton title={"View Friend Requests"} onPress = {() => {
      navigation.navigate("FriendsRequest")
       }}/>
      </View>
      <View style={styles.container1}>
      <TouchableOpacity style={styles.forget} onPress={copyToClipboard}>
              <Text style={styles.forget}>Copy UID to clipboard</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.forget} onPress={fetchCopiedText}>
              <Text style={styles.forget}>View copied UID</Text>
      </TouchableOpacity>
      <Text style={styles.copiedText}>{copiedText}</Text>
      </View>
    <View style={styles.container}>
      <View
        style={
          {clicked}
            ? styles.searchBar__clicked
            : styles.searchBar__unclicked
        }
      >
       
        <Feather
          name="search"
          size={20}
          color="black"
          style={{ marginLeft: 1 }}
        />
    
        

        <TextInput
          style={styles.input}
          placeholder="Search"
          value={Friend}
          onChangeText={setFriend}
          onFocus={() => {
            setClicked(true);
          }}
        />
        
        {clicked && (
          <Entypo name="cross" size={20} color="black" style={{ padding: 1 }} onPress={() => {
            setFriend("")
          }}/>
        )}
      </View>

      
      
      {clicked && (
        <View>
          <Button
            title="Search"
            onPress={() => {
              Keyboard.dismiss();
              setClicked(false);
              searchFriend()
              setSearched(!search)
            
            }}
          ></Button>
        </View>
      )}
    </View>
    <View style ={{marginLeft: 20}}>
        <Text>Search Results:</Text>
        {Found && (
            <SendingFriendRequest 
            url = {String(downloadURL)} //user_id
            username = {Friend}
            onPress = {addFriend}/>

        )}
    </View>
    </View>
  );
};
export default SearchFriends;

// styles
const styles = StyleSheet.create({
  container: {
    margin: 15,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    width: "90%",
    paddingTop: 20

  },
  searchBar__unclicked: {
    padding: 10,
    flexDirection: "row",
    width: "95%",
    backgroundColor: "#d9dbda",
    borderRadius: 15,
    alignItems: "center",
  },
  searchBar__clicked: {
    padding: 10,
    flexDirection: "row",
    width: "80%",
    backgroundColor: "#d9dbda",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  input: {
    fontSize: 20,
    marginLeft: 10,
    width: "90%",
  }, 
  container1: {
    flexDirection: "column",
    paddingTop: 15
  },
  forget: {
    color: colors.black,
    alignSelf: 'center',
    paddingTop: 5,
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
  copiedText: {
    alignSelf: "center"
  }
});