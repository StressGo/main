import React from 'react'
import {View , Text, Image, StyleSheet} from 'react-native'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import IonIcon from 'react-native-vector-icons/Ionicons';

const Friend = (props) => {
  return (
    <View style = {{borderRadius:12, backgroundColor: '#ffffff', marginVertical:8, padding: 16, elevation: 1}}>
    <View style ={{flexDirection: "row", justifyContent:"flex-start", alignItems: "flex-start"}}>
        <Image source = {{uri: props.image}} 
         style = {{width: 80, height: 80, borderRadius: 8}} />
         <View style ={{marginLeft: 250, marginTop: 20}}> 
         <MaterialCommunityIcons name= 'chat' 
                    color= "black" 
                    size={40}
                    onPress={() => {
                        window.alert("chatting")
                  }} />
         </View>
    </View>

    <View style = {{marginTop:12, flexDirection: "row", justifyContent: "space-between"}}>
        <View>
        <Text style ={{fontWeight: "bold"}}>{props.username}</Text>
        <View style = {{marginTop:12, flexDirection: "row", justifyContent: "space-between"}}>
        <Text style ={{fontWeight: "bold"}}>Interests: </Text>
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

        <MaterialCommunityIcons name= 'account-remove' 
                    color= "black" 
                    size={40}
                    onPress = {
                        () => {}
                    } />
        
    </View>

    </View>
  )
}

export default Friend