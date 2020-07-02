import React,{useEffect,useState} from 'react';
import { StyleSheet, View, Image, Dimensions, PlatformOSType, Text, ActivityIndicator, Vibration } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { Notifications } from 'expo'
import Constants from 'expo-constants'
import * as Permissions from 'expo-permissions'
import io from 'socket.io-client';

console.ignoredYellowBox = ['Remote debugger'];
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings([
    'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
]);

export default function Chat() {

let [token,setToken]=useState()

  useEffect(() => {
    getNotificationPermissions()
    let _notificationSubscription = Notifications.addListener(handleNotification)
  })

  useEffect(() => {
    var socket = io('http://192.168.43.26:5050', {
    })
    return ()=>socket.disconnect()
  })

  const getNotificationPermissions = async () => {
    let { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS)

    let finalStatus=status
    
    if (status !== 'granted') {
      let  status  = await Permissions.askAsync(Permissions.NOTIFICATIONS)
      finalStatus = status
    }
    if(finalStatus !== 'granted')
      return
    
    let token = await Notifications.getExpoPushTokenAsync()
    setToken(token)
    console.log(token)
    if (PlatformOSType === 'android') {
      console.log('android')
      Notifications.createChannelAndroidAsync('default', {
        name: 'default',
        sound: true,
        priority: 'max',
        vibrate:[0,250]
      })
    }
   
  }

  const handleNotification = () =>Vibration.vibrate()

  const senNotification = async () => {
    console.log('from send',token)
    const message = {
      to: token,
      sound:'default',
      title: 'New Message',
      body: 'And here is the body!',
      data: { data: 'goes here' },
      _displayInForeground: true,
    }
    try {
      const response = await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Accept-encoding': 'gzip, deflate',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      })
    } catch (e) {
      console.log(e)
    }
    
  }

  return (
    <View style={styles.container}>
          <View style={styles.header}>
              {/* we need to shorten the name so that it wont break the structure of the ui */}
                  <Text style={styles.userName}>Usrname here</Text>    
              <TouchableOpacity style={styles.btn}>
                <Text style={styles.userName}>Next Stranger</Text>
              </TouchableOpacity>
          </View>
          <View style={styles.chats}>
            <ActivityIndicator style={styles.loader} size='large' color='#21618c'/>  
          </View>
          <View style={styles.footer}>
              <TouchableOpacity>
              <Icon name='image' size={30} color='#21618c'/>
              </TouchableOpacity>
              <TextInput style={styles.input} placeholder='Message here' placeholderTextColor='black' multiline = {true}/>
              <TouchableOpacity style={styles.btn}>
          <Icon name='arrow-right' size={30} color='#21618c' onPress={senNotification}/>
                </TouchableOpacity>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    header: {
        marginTop:Constants.statusBarHeight+5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 10,
        marginBottom:10
    },
    userName: {
        fontSize: 18,
        paddingHorizontal: 5,
        textAlign: 'center',
    },
    container: {
      backgroundColor:'#aed6f1',
      flex: 1,
    },
    btn: {
      backgroundColor: '#3498db',
      padding: 8, 
      borderRadius:5
    },
    chats: {
        flex: 8,
        borderColor: 'black',
        borderTopWidth: 1,
        borderBottomWidth:1,
    },
    footer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 10,
        marginBottom:5
    },
    input: {
        width: '70%',
        color: 'black',
        borderBottomWidth: 2,
        borderColor: 'black',
        padding: 5,
    },
    loader: {
        marginTop:70
    }
})
