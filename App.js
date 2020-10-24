import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SelectionComponent } from './components/selection-component';
import { NewsListComponent } from './components/news-list'
import { fetchNews } from './services';
import AsyncStorage from '@react-native-community/async-storage';
import { AppLoading } from 'expo'

export default function App() {
  const [isReady,setIsReady] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState('in')
  const [selectedCat, setCat] = useState('business')
  const [data,setData] = useState({})

  const loadApp = async() => {
    try{
      let config = await getItemsFromAsyncStorage()
      if(config!=null){
        console.log('here',null)
        config = JSON.parse(config)
        setSelectedCountry(config.country)
      }
    }
    catch(e){
      console.log(e)
    }
  }

  const getItemsFromAsyncStorage = async() => {
    try{
      let config = await AsyncStorage.getItem('news-stand-config')
      return config ? JSON.parse(config) : null
    }
    catch(e){
      console.log(e)
    }
  }

  const setCountry = async country => {
    try{
      let config = { }
      const configFromStorage = await getItemsFromAsyncStorage()
      if(configFromStorage){
        config = configFromStorage
      }
      config.country = country
      await AsyncStorage.setItem('news-stand-config',JSON.stringify(config))
      console.log('from storage',await getItemsFromAsyncStorage())
      console.log(await AsyncStorage.getAllKeys())
      setSelectedCountry(country)
    }catch(e){
      console.log(e)
    }
  }
  
  useEffect(() => {
      fetchNews({country: selectedCountry, category: selectedCat, setData})
  },[selectedCountry,selectedCat])
  
  if(!isReady){
    return <AppLoading startAsync={loadApp()} onFinish= {setIsReady(true)} onError={console.log('App loading failed')}/>
  }
  return ( 
    <View style={styles.container}>
      <SelectionComponent setCountry = { setCountry } selectedCountry = { selectedCountry } selectedCat ={selectedCat} setCat ={setCat}/>
      <NewsListComponent data = { data.articles } selectedCountry = { selectedCountry } />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.8)',
  },
});
