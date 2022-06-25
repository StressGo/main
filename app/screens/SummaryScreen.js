import React , {useState , useRef} from 'react'
import {SafeAreaView , Text , TextInput, View , Pressable, Keyboard, KeyboardAvoidingView, Platform, Image} from 'react-native'
import FontAwesome from "react-native-vector-icons/FontAwesome"


const SummaryScreen = () => {
  const [title, setTitle] = useState("Monday Afternoon Run");
  const TextInputRef = useRef();
  return (
    <Pressable style= {{backgroundColor: "#fff", flex: 1, borderTopWidth: 1, borderColor: "#ccc", padding: 20}} onPress={() => Keyboard.dismiss()}>
        
        <Text style = {{fontSize:16, color: '#aaaaaa'}}> Monday - 12:00</Text>
        <Pressable style = {{borderBottomWidth: 1, borderColor: "#ccc", paddingBottom: 8 , 
        flexDirection: "row", justifyContent: "space-between", alignItems: "center"}} onPress = {() => TextInputRef.current.focus()}>
            <TextInput value = {title} onChangeText = {input => setTitle(input)} style = {{fontSize:26 , fontWeight: "bold"}} ref = {TextInputRef}/>
            <FontAwesome name = "pencil" size = {25} />
        </Pressable>

        <KeyboardAvoidingView behavior = {Platform.OS == 'ios' ? "padding" :'height'}>

        <View style = {{marginTop: 12}}>
            <Text style = {{fontSize: 100, fontWeight: 'bold'}}>2.4</Text>
            <Text style = {{fontSize:16, color: '#aaaaaa'}}>Kilometer</Text>
        </View>

        <View style = {{marginTop: 12, flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
            <View>
            <Text style = {{fontSize:24,fontWeight: 'bold'}}> 12'00"</Text>
            <Text style = {{fontSize:16, color: '#aaaaaa'}}> Pace</Text>
            </View>

            <View>
            <Text style = {{fontSize:24,fontWeight: 'bold'}}> 15:00</Text>
            <Text style = {{fontSize:16, color: '#aaaaaa'}}> Time</Text>
            </View>

            <View>
            <Text style = {{fontSize:24,fontWeight: 'bold'}}> 100</Text>
            <Text style = {{fontSize:16, color: '#aaaaaa'}}> Calories</Text>
            </View>
        </View >

        <View style = {{flex: 1, justifyContent: 'center', alignItems: "center"}}>
            {/* <Image 
              source = {require("../assets/RunningGo.png")} 
              style = {{height: 100, width: 100}}/> */}
              <Text>Progress bar</Text>
        </View>
        
        </KeyboardAvoidingView>
  
        
    </Pressable>
  )
}

export default SummaryScreen