import { async } from '@firebase/util';
import Constants from 'expo-constants';
import { Button, PermissionsAndroid, SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";


//3:27

class UserPermissions{
    getCameraPermission = async() => {
        try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.CAMERA,
              {
                title: "Cool Photo App Camera Permission",
                message:
                  "RunningGo! needs access to your camera " +
                  "so you can take awesome pictures.",
              }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              console.log("You can use the camera");
            } else {
              console.log("Camera permission denied");
            }
          } catch (err) {
            console.warn(err);
          }
    }

}

export default new UserPermissions();