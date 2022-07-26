import React from 'react'
import {View , Text, Image , FlatList} from 'react-native'
import Chat from '../components/Chat'

const ChatScreen = ({route}) => {
  return (
    
      <Chat id = {route.params.docId} username = {route.params.username} />
    
  )
}

export default ChatScreen