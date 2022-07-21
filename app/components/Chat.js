import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'

import { Firestore, getDoc, collection, getDocs,
  addDoc, deleteDoc, doc,
  query, where, onSnapshot, Document, set, add, setDoc, arrayUnion, updateDoc

} from 'firebase/firestore';
import {db} from '../../firebase';
import { auth } from '../../firebase';
import { storage } from '../../firebase';
import { ref, getDownloadURL } from "firebase/storage";

const Chat = (props) => {
    const [messages, setMessages] = useState([]);
    const [onClick,setonClick] = useState(false);
    

  useEffect(async () => {
    const chatDocRef = doc(db, "messages", props.id);
    const chatDocSnap = await getDoc(chatDocRef);
     setMessages(chatDocSnap.data()["message"].reverse());
  }, [messages])

  const onSend = useCallback(async (messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    const { _id, createdAt, text, user,} = messages[0];
    const chatDocRef = doc(db, "messages", props.id);
    const chatref =  updateDoc (chatDocRef, {message:arrayUnion({ 
      _id: String(_id),
      createdAt: String(createdAt),
      text: String(text),
      user: user
    })}, 
   );



  }, [])

  return (
    <GiftedChat
      messages={messages}
      showAvatarForEveryMessage = {true}
      onSend={messages => onSend(messages)}
      user={{
        _id: auth?.currentUser?.email,
        avatar: 'https://placeimg.com/140/140/any'
      }}
    />
  )
}

export default Chat