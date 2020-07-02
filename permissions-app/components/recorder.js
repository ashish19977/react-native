import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import {Audio} from 'expo-av'

export default class Recorder extends React.Component{
    constructor(props) {
        super(props)
        this.recording = null
        this.sound = null
    }
    state = {
        hasPermission: false,
        playBackStatus: 'Tap To Start Recording',
        showControls: false,
        playing: false,
        isrecording: false,
        pauseBtnStatus:'Pause'
    }
    componentDidMount = () => {
        this.getRecordingPermission()
    }

    getRecordingPermission = async () => {
        let { status } =await Audio.requestPermissionsAsync()
        if (status !== 'granted')
            this.setState({ playBackStatus: "Permission denied to record!!!", hasPermission: false })
        else {
            this.setState({ hasPermission: true })
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                interruptionModeIOS: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
                playsInSilentModeIOS: true,
                shouldDuckAndroid:true,
                interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
                playThroughEarpieceAndroid:false,staysActiveInBackground:true
            })
            }
    }

    startRecording = async () => {
        if (this.sound !== null) {
           
            console.log(this.sound)
            await this.sound.unloadAsync();
            this.sound.setOnPlaybackStatusUpdate(null);
            this.sound = null;
        }
        if (this.recording !== null) {
            console.log(this.recording)
            this.recording.setOnRecordingStatusUpdate(null);
            this.recording = null;
        }
        const recording = new Audio.Recording();
    await recording.prepareToRecordAsync(this.recordingSettings);
    recording.setOnRecordingStatusUpdate(this._updateScreenForRecordingStatus);

    this.recording = recording;
        await this.recording.startAsync();
        this.setState({showControls:true,playBackStatus:'Recording...',isrecording:true})
    }

    stopRecording = async () => {
        try {
            await this.recording.stopAndUnloadAsync();
          } catch (error) {
            // Do nothing -- we are already unloaded.
        }
        const { sound, status } = await this.recording.createNewLoadedSoundAsync()
        this.sound = sound;
        this.sound.setOnPlaybackStatusUpdate(({ didJustFinish, isPlaying }) => {
            if (didJustFinish === true)
                this.setState({ showControls: false, playBackStatus: 'Tap to Start Recording', playing: false,isrecording:false })
            else if (isPlaying === true)
            this.setState({ showControls: true, playBackStatus: 'Playing recording...', playing: true,isrecording:true })
        })
        await this.sound.playAsync()
    }

    pauseRecordingSound = async() => {
        if (this.state.playing) {
            this.setState({pauseBtnStatus:"Resume",playing:false})
            await this.sound.pauseAsync()
        }        
        else{
            this.setState({pauseBtnStatus:'Pause'})
            await this.sound.playAsync()
        }
    }

    render() {
               let controls=(this.state.showControls===true)?<TouchableOpacity style={styles.controlsCotnainer}>
                   <TouchableOpacity style={styles.controls}  onPress={this.pauseRecordingSound}><Text>{this.state.pauseBtnStatus}</Text></TouchableOpacity> 
                        <TouchableOpacity style={styles.controls} disabled={this.state.playing} onPress={this.stopRecording}><Text>Play</Text></TouchableOpacity> 
                </TouchableOpacity>:null

        return (
            <View style={styles.mainContainer}>
                <TouchableOpacity style={styles.btns} disabled={this.state.isrecording} onPress={this.startRecording}>
                    <Text>
                        {this.state.playBackStatus}
                    </Text>
                </TouchableOpacity>
                {controls}
                </View>
        )
    }
}

const styles = StyleSheet.create({
    controls: {
        backgroundColor: "#d0c214",
        padding: 10,
        borderRadius:5,
    },
    controlsCotnainer: {
        justifyContent: "space-evenly",
        alignItems: "center",
        padding: 5,
        flexDirection:"row",
        marginTop: 10,
        margin:5,
    },
    mainContainer: {
        flex: 1,
    },
    btns: {
        margin: 5,
        padding: 8,
        flexDirection:"row",
        borderRadius:5,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:"#f4add4"
    },
})