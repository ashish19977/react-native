import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import Home from './components/home'
import SignUp from './components/signup'
import SearchResult from './components/search-result'
import Edit from './components/editcontact'
import { store, persistor } from './redux/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'


const Stack = createStackNavigator()

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SignUp" screenOptions={{ animationEnabled: false }}>
        <Stack.Screen name="SignUp" component={SignUp} options={{headerShown:false}}/>
          <Stack.Screen name="Home" component={Home} options={{headerShown:false}}/>
          <Stack.Screen name="SearchResult" component={SearchResult} options={{headerTitle:"Back", headerTintColor:"rgba(255,255,255,.8)",headerStyle:{backgroundColor:"rgba(0,0,0,.9)"}}}/>
          <Stack.Screen name="Edit" component={Edit} options={{headerTitle:"Back", headerTintColor:"rgba(255,255,255,.8)",headerStyle:{backgroundColor:"rgba(0,0,0,.9)"}}}/>
        </Stack.Navigator>
        </NavigationContainer>
        </PersistGate>
        </Provider>
      )
  }
}

export default  App