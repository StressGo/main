import React from 'react'
import {View , Text, Image, StyleSheet} from 'react-native'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import IonIcon from 'react-native-vector-icons/Ionicons';

const PendingFriendRequest = (props) => {
  
  return (
    <View style = {{borderRadius:12, backgroundColor: '#ffffff', marginVertical:8, padding: 16, elevation: 1}}>
    <View style ={{flexDirection: "row", justifyContent:"flex-start", alignItems: "flex-start"}}>
        <Image source = {{uri: props.image}}  
         style = {{width: 80, height: 80, borderRadius: 8}} />
         <View style ={{marginLeft: 150, marginTop: 20, flexDirection: "row", justifyContent: "space-between"}}> 
         <IonIcon name="person-add" 
                 size={40} 
                 color="black"
                 onPress = {props.addFriend} />
         <View style = {{marginLeft: 50}}>
         <IonIcon name="person-remove" 
                 size={40} 
                 color="black"
                 onPress = {props.deleteFriend}  />
         </View>
                 
         </View>
         
    </View>

    <View style = {{marginTop:12, flexDirection: "row", justifyContent: "space-between"}}>
        <View>
        <Text style ={{fontWeight: "bold"}}>{props.username}</Text>
        <View style = {{marginTop:12, flexDirection: "row", justifyContent: "space-between"}}>
        <Text style ={{fontWeight: "bold"}}> Interests: </Text>
        <MaterialCommunityIcons name= 'swim' 
                    color= "black" 
                    size={20} />
        <MaterialCommunityIcons name= 'run' 
                    color= "black" 
                    size={20} />
        <IonIcon name="bicycle" 
                 size={20} 
                 color="black" />
                  
        </View>
        </View>
        
    </View>

    </View>
  )
}

export default PendingFriendRequest