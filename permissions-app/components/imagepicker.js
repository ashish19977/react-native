import React from 'react' 
import { View, StyleSheet, Text, Image } from 'react-native'
import {TouchableOpacity} from 'react-native-gesture-handler'
import * as IP from 'expo-image-picker'
import { Camera } from 'expo-camera'
export default class ImagePicker extends React.Component{
    state = {
        uploadStatus: 'No Image Uplaoded Yet',
    }

    componentDidMount() {
        this.askForPermission()
    }

    askForPermission = async () => {
        let { status } = await IP.requestCameraRollPermissionsAsync()
        this.setState({ hasCamRollPermission: (status === 'granted') ? true : false })
        console.log(status)
    }

    selectImage = async () => {
        let {cancelled,uri} = await IP.launchImageLibraryAsync()
        if (cancelled === true)
            this.setState({ uploadStatus: "Upload Cancelled"})
        else
            this.setState({uri:uri,uploadStatus:"Image Uploaded Successfully"})
    }

    requestCamera = async () => {
        let { status } = await Camera.requestPermissionsAsync()
        this.setState({ hasCameraPermission: (status === 'granted') ? true : false })
        console.log(status)
        return (status === 'granted') ? true : false
    }

    lauchCamera = async () => {
        // uplaoding an image require both cameraroll as well as camera permission
        if (this.state.hasCamRollPermission===true) {
            //has permission already given for cam roll then we will ask for cam permsiion
            let camPermission =await this.requestCamera()
            if (camPermission === true) {
                //lauch camera
                let {cancelled,uri} = await IP.launchCameraAsync()
                if (cancelled === true)
                    this.setState({ uploadStatus: "Camera Pic Cancelled to Upload" })
                else
                    this.setState({uri:uri,uploadStatus:"Image Uploaded Successfully"})
            }
            else
                this.setState({uploadStatus:"Camera Permission Denied"})
        }
        else
            this.setState({uploadStatus:"Camera Roll Permission Denied"})
    }

    render() {
        let image=(this.state.uri)?<Image style={styles.img} source={{uri:this.state.uri}} />:null
        return (
            <View style={styles.mainContainer}>
                <View style={styles.uploadOptionsView}>
                    <TouchableOpacity style={styles.btns}>
                        <Text style={{color:"#ff6d0d"}} onPress={this.selectImage}>
                            Upload A Pic
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btns,{backgroundColor:"#ccffb5"}]}>
                        <Text style={{color:"#277a03"}} onPress={this.lauchCamera}>
                            Take A Pic
                        </Text>
                    </TouchableOpacity>
                </View>
                {image}
                <TouchableOpacity style={styles.imgUploadContainer}>
                    <Text style={{color: "#8a007d" }}>
                        {this.state.uploadStatus}
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    uploadOptionsView: {
        justifyContent: "space-evenly",
        flexDirection:"row"
    },
    imgUploadContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 50,
        padding: 10,
        backgroundColor: "#ffb5f8",
        borderRadius:5,
    },
    img: {
        height: 300,
        width: 300,
        borderRadius: 5,
        marginTop:50
    },
    mainContainer: {
        flex: 1,
        marginTop: 30,
      alignItems:"center"
    },
    btns: {
        justifyContent: "center",
        alignItems: "center",
        margin: 5,
        marginHorizontal:30,
        padding: 10,
        backgroundColor: "#ffceaf",
        borderRadius:5,
    }
})