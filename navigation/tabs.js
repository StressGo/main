import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import EventsPage from "../app/screens/EventsPage";
import HomeScreen from "../app/screens/HomeScreen";
import Connect_me from "../app/screens/Connect_me"
import Map from "../app/screens/Map";
import UserProfile from "../app/screens/UserProfile";
import colors from "../app/config/colors";

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({children, onPress}) => (
    <TouchableOpacity
        style={{
            top: -30,
            justifyContent: "center",
            alignItems: 'center',
            ...styles.shadow
        }}
        onPress={onPress}
    >
        <View style={{
            width: 70,
            height: 70,
            borderRadius: 35,
            backgroundColor: colors.secondary
            
        }}>
            {children}
        </View>
    </TouchableOpacity>
);

const Tabs = () => {
    return(
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                headerShown: false,
                tabBarStyle: {
                position: 'absolute',
                bottom: 25,
                left: 20,
                right: 20,
                elevation: 0,
                backgroundColor: colors.white,
                borderRadius: 15,
                height: 90,
                ...styles.shadow}
            }}
        >
            <Tab.Screen name = "Home" component={HomeScreen} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: "center", justifyContent: "center", top: 10}}>
                        <Image 
                            source={require('../app/assets/1.png')}
                            resizeMode = 'contain'
                            style= {{
                                width: 25,
                                height: 25,
                                tintColor: focused ? 'e32f45' : '#748c94',
                                bottom: 5,
                            }}
                        />
                        <Text style={{color: focused ? 'e32f45' : '#748c94'}}>Home</Text>
                    </View>
                ),
            }}/>
            <Tab.Screen name = "Events" component={EventsPage} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: "center", justifyContent: "center", top: 10}}>
                        <Image 
                            source={require('../app/assets/2.png')}
                            resizeMode = 'contain'
                            style= {{
                                width: 25,
                                height: 25,
                                tintColor: focused ? 'e32f45' : '#748c94',
                                bottom: 5,
                            }}
                        />
                        <Text style={{color: focused ? 'e32f45' : '#748c94'}}>Events</Text>
                    </View>
                ),
            }} 
            />
            <Tab.Screen name = "Run" component={Map} 
                options={{
                    tabBarIcon: ({focused}) => (
                        <Image 
                            source={require('../app/assets/3.png')}
                            resizeMode='contain'
                            style = {{
                                width:30,
                                height: 30,
                                tintColor: colors.white,
                                
                            }}
                        />
                    ),
                    tabBarButton: (props) => (
                        <CustomTabBarButton {...props} />
                    )
                }}
            />
            <Tab.Screen name = "Connect" component={Connect_me} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: "center", justifyContent: "center", top: 10}}>
                        <Image 
                            source={require('../app/assets/4.png')}
                            resizeMode = 'contain'
                            style= {{
                                width: 25,
                                height: 25,
                                tintColor: focused ? 'e32f45' : '#748c94',
                                bottom: 5,
                            }}
                        />
                        <Text style={{color: focused ? 'e32f45' : '#748c94'}}>Connect</Text>
                    </View>
                ),
            }}/>
            <Tab.Screen name = "UserProfile" component={UserProfile} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: "center", justifyContent: "center", top: 10}}>
                        <Image 
                            source={require('../app/assets/5.png')}
                            resizeMode = 'contain'
                            style= {{
                                width: 25,
                                height: 25,
                                tintColor: focused ? 'e32f45' : '#748c94'
                            }}
                        />
                        <Text style={{color: focused ? 'e32f45' : '#748c94'}}>Profile</Text>
                    </View>
                ),
            }}/>
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#7F5DF0',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5,
    }
})

export default Tabs;