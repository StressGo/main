import React from 'react'
import {View , Text, Image, StyleSheet} from 'react-native'


const ActivityCard = (props) => {
  return (
    <View style = {{borderRadius:12, backgroundColor: '#ffffff', marginVertical:8, padding: 16, elevation: 1}}>
    <View style ={{flexDirection: "row", justifyContent:"flex-start", alignItems: "flex-start"}}>
        <Image source = {{uri: 'https://i.stack.imgur.com/ddX9U.png'}} 
         style = {{width:40, height:40, borderRadius: 8}} />
         <View style ={{marginLeft: 12}}> 
             <Text> {props.day}</Text>
             <Text> {props.day} {props.timeofDay} RunScreen</Text>
         </View>
    </View>

    <View style = {{marginTop:12, flexDirection: "row", justifyContent: "space-between"}}>
        <View>
        <Text style ={{fontWeight: "bold"}}>{props.kilometer}</Text>
        <Text>Kilometer</Text>
        </View>
        <View>
        <Text style ={{fontWeight: "bold"}}>{props.avgPace}</Text>
        <Text>Average Pace</Text>
        </View>
        <View>
        <Text style ={{fontWeight: "bold"}}>{props.time}</Text>
        <Text>Kilometer</Text>
        </View>
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
  
})

export default ActivityCard