import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView,Platform } from 'react-native';
import { Flat } from './flatList.js'  // render this to see FlatList Implemention
import LifeCycleDemo from  './lifecycledemo' // render this to see Lifecycle demo implemention
import Contact from './contactlist.js';
import { NavigationContainer } from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack' 

const stack=createStackNavigator()


export default class App extends React.Component {
  render() {
    return(
      <NavigationContainer>
        <stack.Navigator initialRouteName="Home">
          <stack.Screen name="Home" component={props => <Contact {...props}/>}/>
          </stack.Navigator>
      </NavigationContainer>
    )}
}

