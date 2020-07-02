import React from 'react';
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import Home from './components/home';
import Chat from './components/chat';

const Stack=createStackNavigator()
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home' headerMode={false} screenOptions={{ animationEnabled: false }}>
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='Chat' component={Chat} />
      </Stack.Navigator>
      </NavigationContainer>
  )
}

