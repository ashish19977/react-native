import React from 'react'
import { View, Button,StyleSheet, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';


export default function Home (props) {

        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.btns} onPress={() => props.navigation.navigate("Contact")}>
                    <Text>Contacts</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btns} onPress={() => props.navigation.navigate("Map")} >
                     <Text>Map</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btns} onPress={() => props.navigation.navigate("CameraCompo")} >
                    <Text>Camera</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btns} onPress={() => props.navigation.navigate("Calender")} >
                    {/* i know spelling is calendar but to resolve a naming conflict with inbuilt calendar i used this */}
                    <Text>Calender</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btns} onPress={() => props.navigation.navigate("Audio")} >
                    <Text>Sound</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btns} onPress={() => props.navigation.navigate("Recorder")} >
                    <Text>Recorder</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btns} onPress={() => props.navigation.navigate("Motion")} >
                    <Text>Motion/Compass</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btns} onPress={() => props.navigation.navigate("ImagePicker")} >
                    <Text>Image Picker</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btns} onPress={() => props.navigation.navigate("MusicLib")} >
                    <Text>Music Library</Text>
                </TouchableOpacity>
            </View>
        )
    }

const styles = StyleSheet.create({
    btns: {
        padding: 10,
        margin: 5,
        justifyContent: "center",
        alignItems: "center",
        borderRadius:5,
        backgroundColor:"#adafad"
    },
    container: {
        flex:1,
      marginTop:24,
    },
});
  