import React , {useState , useRef} from 'react'
import {SafeAreaView , Text , TextInput, View , Pressable, Keyboard, KeyboardAvoidingView, Platform, Image , StyleSheet} from 'react-native'
import FontAwesome from "react-native-vector-icons/FontAwesome"
import Map from './Map'
import { NavigationContainer, TabRouter, useNavigation, Navigation } from '@react-navigation/native';
import {MaterialCommunityIcons} from '@expo/vector-icons'


const SummaryScreen = (props) => {
  const [title, setTitle] = useState("Type something here");
  const TextInputRef = useRef();
  const navigation = useNavigation();
  return (
    <Pressable style= {styles.MainContainer} onPress={() => Keyboard.dismiss()}>
        
        <Text style = {styles.Text}></Text>
        <MaterialCommunityIcons name='close' 
                    color="black" 
                    size={35}
                    onPress={() => {
                        navigation.replace("tabs")
                  }} />
        <Pressable style = {styles.Pressable} onPress = {() => TextInputRef.current.focus()}>
            <TextInput value = {title} onChangeText = {input => setTitle(input)} style = {styles.TextInput} ref = {TextInputRef}/>
            <FontAwesome name = "pencil" size = {25} />
        </Pressable>

        <KeyboardAvoidingView behavior = {Platform.OS == 'ios' ? "padding" :'height'}>

        <View style = {{marginTop: 12}}>
            <Text style = {styles.Textlarge}>{12}</Text>
            <Text style = {styles.Text}>Kilometer</Text>
        </View>

        <View style = {styles.TextContainer}>
            <View>
            <Text style = {styles.Textbold}> 12'00"</Text>
            <Text style = {styles.Text}> Pace</Text>
            </View>

            <View>
            <Text style = {styles.Textbold}> 15:00</Text>
            <Text style = {styles.Text}> Time</Text>
            </View>

        </View >

        <View style = {styles.ProgressBarContainer}>
            {/* <Image 
              source = {require("../assets/RunningGo.png")} 
              style = {{height: 100, width: 100}}/> */}
              <Text>Progress bar</Text>
        </View>
        
        </KeyboardAvoidingView>
  
        
    </Pressable>
  )
}

const styles = StyleSheet.create({
  
  Map:{
    flex: 1, 
    opacity: 0.6
  },
  Textbold: {
    fontSize:24,
    fontWeight: 'bold',
  },
  Text: {
    fontSize:16, 
    color: '#aaaaaa'

  },
  Textlarge: {
    fontSize: 100, 
    fontWeight: 'bold'
  },
  MainContainer : {
    backgroundColor: "#fff", 
    flex: 1, 
    borderTopWidth: 1, 
    borderColor: "#ccc",
     padding: 20
  }, 
  Pressable: {
    borderBottomWidth: 1, 
    borderColor: "#ccc",
    paddingBottom: 8 , 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center"

  },
  TextInput: {
    fontSize:26 , 
    fontWeight: "bold"

  },
  TextContainer: {
    marginTop: 12, 
    flexDirection: "row",
     justifyContent: "space-between",
      alignItems: "center"

  }, 
  ProgressBarContainer: {
    flex: 1, 
    justifyContent: 'center',
     alignItems: "center"

  }
  
})

export default SummaryScreen

