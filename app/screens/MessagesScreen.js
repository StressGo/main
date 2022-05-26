import React from 'react';
import { View, FlatList, StyleSheet, Platform, StatusBar, SafeAreaView } from 'react-native'
import ListItemDeleteAction from '../components/ListItemDeleteAction';
import ListItemSeparator from '../components/ListItemSeparator';
import Profile from '../components/Profile';
import Screen from '../components/Screen';

const messages = [
    {
        id: 1,
        title: 'T1',
        description: 'D1',
        image: require('../assets/nike.jpg')
    },
    {
        id: 2,
        title: 'T2',
        description: 'D2',
        image: require('../assets/nike.jpg')
    }
]

function MessagesScreen(props) {
    return (
        <Screen>
            <FlatList 
                data = {messages} //array of messages
                keyExtractor = {message => message.id.toString()} 
                //extracts unique key from each array
                //need to convert into string
                renderItem = {({item}) => ( //render has three arguments
                //renderItem({item, index, separators})
                    <Profile
                        title={item.title}
                        subTitle={item.description}
                        image={item.image}
                        onPress = {() => console.log("pressed")}
                         />
                    )}
                    ItemSeparatorComponent= {ListItemSeparator}
                />
    
        </Screen>

    );
}

const styles = StyleSheet.create({
    screen: {
        
    }
})

export default MessagesScreen;