import {createStackNavigator} from 'react-navigation-stack'
import {createAppContainer} from 'react-navigation'
import HomeScreen from '../app/screens/HomeScreen'

const screens = {
    start: {
        screen: HomeScreen
    },
    
}

const HomeStack = createStackNavigator(screens)