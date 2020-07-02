import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack' 
import Contact from './components/contact';
import Home from './components/home'
import Map from './components/map';
import CameraCompo from './components/camera';
import Calender from './components/calender';
import Audio from './components/audio'
import Recorder from './components/recorder';
import Motion from './components/devicemotion';
import ImagePicker from './components/imagepicker';
import MusicLib from './components/music.js';

const Stack = createStackNavigator()


export default class App extends React.Component {
  
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home}/>
          <Stack.Screen name="Contact" component={Contact} options={{ headerTitle: "Back" }}/>
          <Stack.Screen name="Map" component={Map} options={{ headerTitle: "Back" }}/>
          <Stack.Screen name="CameraCompo" component={CameraCompo} options={{ headerTitle: "Back" }} />
          <Stack.Screen name="Calender" component={Calender} options={{ headerTitle: "Back" }} />
          <Stack.Screen name="Audio" component={Audio} options={{ headerTitle: "Back" }} />
          <Stack.Screen name="Recorder" component={Recorder} options={{ headerTitle: "Back" }} />
          <Stack.Screen name="Motion" component={Motion} options={{ headerTitle: "Back" }} />
          <Stack.Screen name="ImagePicker" component={ImagePicker} options={{ headerTitle: "Back" }}/>
          <Stack.Screen name="MusicLib" component={MusicLib} options={{ headerTitle: "Back" }}/>
          </Stack.Navigator>
        </NavigationContainer>
    );
  }
}


