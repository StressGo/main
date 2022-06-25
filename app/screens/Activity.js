import React from 'react'
import ActivityCard from '../components/ActivityCard';
import {View , Text, Image , FlatList} from 'react-native'
import {DATA} from '../constants/dummyData'

const Activity = () => {
    const renderItem = ({ item }) => (
        <ActivityCard day = {item.day} timeofDay={item.timeofDay} kilometer = {item.kilometer} avgPace = {item.avgPace} time = {item.time}/>
      );
  return (
    <View style = {{paddingHorizontal:12}}>
        <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator = {false}
      />
    
    </View>
  )
}

export default Activity