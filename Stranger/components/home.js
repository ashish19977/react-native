import React,{useEffect} from 'react';
import { StyleSheet, View, Image, Dimensions, ImageBackground, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';

export default function Home(props) {
  return (
    <View style={styles.container}>
      <Image style={styles.img} source={require('../assets/Home.png')} />
      <View style={styles.subContainer}>
         <View style={styles.inputView}>
        <TextInput placeholder='Username here' placeholderTextColor='black' style={styles.input} />
          <TouchableOpacity>
                      <Icon name='arrow-right' size={40} onPress={()=>props.navigation.push('Chat')}/>
        </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#d6eaf8',
    flex: 1,
  },
  img: {
    height: null,
    width:null,
    flex:1,
    resizeMode: 'contain',
  },
  subContainer: {
    position: 'absolute',
    bottom:100,
    width: '100%',
    alignItems: 'center',
  },
  inputView: {
    flexDirection: 'row',
    marginHorizontal: 20,
  },
  input: {
    color: 'black',
    padding: 5,
    flex:1,
    fontSize: 16,
    marginRight:25,
    textAlign:'center',
    borderWidth:1,
    borderRadius: 5,
  },
  warning: {
    fontSize: 18,
    color:'#fc556e',
    paddingVertical: 8,
    textAlign:'center'
  }
})
