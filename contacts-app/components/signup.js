import React from 'react'
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import * as GSignIn from 'expo-google-app-auth'
import { connect } from 'react-redux'
import { signInSuccessful, signInFail } from '../redux/actions-creator'
import { AsyncStorage } from 'react-native'; 
import {GOOGLE_KEY} from '../keys.js'

class SignUp extends React.Component{
    async componentDidMount() {
        // await AsyncStorage.clear()
        if (this.props.loggedIn)
            this.props.navigation.replace("Home")
    }
    signUp = async () => {
        console.log("here")
        if (this.props.loggedIn) {
            this.props.navigation.replace("Home")
            return
        }
        try {
            const { type, user } = await GSignIn.logInAsync({
                androidClientId: GOOGLE_KEY
            })
            if (type === 'success') {
                console.log(user)
                this.props.signInSuccessful({ user })
            }
        } catch (err) {
            console.log(err)
        }
    }
    render() {
        let img = (this.props.loggedIn) ? <><Image source={{ uri: this.props.user.photoUrl }} style={styles.img} />
            <Text style={styles.name}>{this.props.user.name}</Text></> :
        <Image source={require('../assets/useravtar.png')} style={styles.img} />
        return(
            <View style={styles.mainContainer}> 
                <View style={styles.imgView}>
                    {img}
                </View>
                <TouchableOpacity style={styles.signupBtn} onPress={this.signUp}>
                    <Text style={styles.signupText}>
                       {(this.props.loggedIn)?"Cool lets get started":"Sign in with"}
                    </Text>
                    {!this.props.loggedIn && <Icon name="google" color="white" size={25} />}
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    name: {
        padding:10,
        color:"white"
    },
    img: {
        height: 100,
        width: 100,
        borderRadius:50,
    },
    imgView: {
        justifyContent: "center",
        alignItems:"center"
    },
    signupText: {
        fontSize: 25,
        marginRight: 10,
        color:"white"
    },
    signupBtn: {
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#107ddd",
        padding: 5,
        marginTop: 50,
        marginHorizontal:20,
        borderRadius:5
    },
    mainContainer: {
        flex: 1,
        justifyContent: "center",
        backgroundColor:"rgba(0,0,0,.9)"
    }
})

mapPropsToState = state => {
    return {
        loggedIn: state.userReducer.loggedIn,
        user:state.userReducer.user
    }
}

mapDispatchToStore = dispatch => {
    return {
        signInSuccessful: ({ user }) => dispatch(signInSuccessful({ user }))
    }
}

export default connect(mapPropsToState,mapDispatchToStore)(SignUp)