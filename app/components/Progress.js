import React from 'react'
import { View, Text, StyleSheet, Animated } from 'react-native'
import colors from '../config/colors';


function Progress({step, steps, height, color, txt}) {


    const animatedValue = React.useRef(new Animated.Value(-1000)).current;
    const reactive = React.useRef(new Animated.Value(-1000)).current;
    const [width, setWidth] = React.useState(0);

    React.useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: reactive,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, []);

    React.useEffect(() => {
        reactive.setValue(-width + (width * step)/ steps)
    }, [step, width])

  return (
    <View>
    <Text style={{fontSize: 12, fontWeight: '900', marginBottom: 8,}}>
        {step} km/{steps} km to {txt}!
    </Text>
    <View 
    onLayout={
        e => {
            const newWidth = e.nativeEvent.layout.width;

            setWidth(newWidth);
        }
    }
    
    style= {{
        height: height,
        backgroundColor: 'rgba(0,0,0,0.1)',
        borderRadius: height,
        overflow: 'hidden',
    }}>
        <Animated.View 
            style={{
                height: height,
                width: '100%',
                borderRadius: height,
                backgroundColor: color,
                borderWidth: 1,
                borderColor: colors.black,
                position: 'absolute',
                left: 0,
                top: 0,
                transform: [
                    {
                        translateX: animatedValue,
                        
                    },
                ],
            }}
        />
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        padding: 20,
    }
})

export default Progress