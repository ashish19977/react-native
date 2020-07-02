import React from 'react'
import { Image, View, Text, StyleSheet, Button, ScrollView } from 'react-native'
import { Camera } from 'expo-camera'

export default class CameraCompo extends React.Component{
    state = {
        hasPermission: false,
        type: Camera.Constants.Type.front,
        uris: [],
        flashMode: 'off',
        desc:"No photos taken yet"
    }
    componentDidMount() {
        this.askPermission()
    }
    
    askPermission = async () => {
        let { status} = await Camera.requestPermissionsAsync()
        if (status !== 'granted') {
            this.setState({ hasPermission: false })
            return
        }

    }

    takePhoto = async () => {
        this.setState({desc:"Saving photo"})
        if (this.camRef) {
            let {uri} = await this.camRef.takePictureAsync()
            this.setState({ uris: [...this.state.uris, uri] })
            this.setState({desc:`Total photos : ${this.state.uris.length}`})
        }
        else {
            console.log(this.camRef)
       }
    }
    changeCamera = () => {
        this.setState({type:(this.state.type===Camera.Constants.Type.front)?Camera.Constants.Type.back:Camera.Constants.Type.front})
    }
    flashOnOff = () => {
        this.setState({ flashMode: (this.state.flashMode === 'on') ? 'off' : 'on' })
    }
    render() {
        let images = (this.state.uris.length > 0) ?
            this.state.uris.map((uri,i) => <Image key={i.toString()} style={styles.img} source={{uri:uri}}/>):null
        return (
            <View style={styles.appContainer}>
                <View style={styles.imgContainer}>
                <Text>{this.state.desc}</Text>
                    <ScrollView horizontal>
                        {images}
                    </ScrollView>
                </View>
                <Camera autoFocus="on" flashMode={this.state.flashMode}
                    onCameraReady={()=>console.log("cam is ready")}
                    ref={ref => this.camRef = ref} style={{ flex: 1 }} type={this.state.type}>
                    <View style={styles.camBtnsContainer}>
                        <Button title="Take Photo" onPress={this.takePhoto}/>
                        <Button title="Flip Camera" onPress={this.changeCamera} />
                        <Button title={`Flash : ${this.state.flashMode}`} onPress={this.flashOnOff}/>
                    </View>  
                </Camera>  
            </View>    
        )
    }

}

const styles = StyleSheet.create({
    imgContainer: {
        marginVertical: 5,
       
    },
    img: {
        height: 100,
        width: 100,
        margin:5
    },
    camBtnsContainer: {
        opacity:.5,
        flexDirection: "row",
        margin: 5,
        position: "absolute",
        bottom: 0,
        left: 0,
        right:0,
        justifyContent:"space-around",
    },
    appContainer: {
        flex: 1,
    }
})