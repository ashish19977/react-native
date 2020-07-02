import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Audio } from 'expo-av'

export default class Audios extends React.Component {
  state = {
    hasPermssion: false,
    musicStatus: 'Tap on Play',
    pause: 'Pause',
    soundLoaded: false,
  }
  componentDidMount() {
    this.getAudioPermisssion()
  }
  componentWillUnmount() {
    if (this.sound !== undefined) (async () => await this.sound.unloadAsync())()
  }
  getAudioPermisssion = async () => {
    let { status } = await Audio.requestPermissionsAsync()
    if (status === 'granted') {
      this.setState({ hasPermssion: true })
      await Audio.setAudioModeAsync({ playThroughEarpieceAndroid: false })
      this.sound = new Audio.Sound()
    } else this.setState({ hasPermssion: false })
  }
  //for sound and above methods are for recording
  controlsClick = async control => {
    if (!this.sound || this.state.soundLoaded === false) return
    if (control === 'replay') {
      await this.sound.replayAsync()
      this.setState({ musicStatus: 'Replaying...' })
      return
    }
    if (control === 'pause') {
      let pausePos
      if (this.state.pause === 'Pause') {
        pausePos = await this.sound.pauseAsync()
        this.setState({ pause: 'Resume', musicStatus: 'Paused' })
      } else {
        try {
          await this.sound.setStatusAsync({ positionMillis: pausePos, shouldPlay: true })
          this.setState({ pause: 'Pause', musicStatus: 'Playing...' })
        } catch (error) {
          console.log(error)
        }
      }
    } else if (this.state.soundLoaded === true) {
      await this.sound.stopAsync()
      this.sound = undefined
      this.setState({ pause: 'Pause', musicStatus: 'Tap on Play', soundLoaded: false })
    }
  }

  playMusic = async () => {
    if (this.state.musicStatus !== 'Tap on Play') return

    try {
      this.sound = new Audio.Sound()
      await this.sound.loadAsync(require('../assets/sample1.mp3'))
      await this.sound.playAsync()
      this.setState({ musicStatus: 'Playing...', soundLoaded: true })
      this.sound.setOnPlaybackStatusUpdate(async ({ didJustFinish, positionMillis }) => {
        if (didJustFinish === true) {
          await this.sound.unloadAsync()
          this.setState({ musicStatus: 'Tap on Play', soundLoaded: false })
        }
      })
    } catch (error) {
      console.log(error)
    }
  }
  render() {
    let controls = (
      <TouchableOpacity style={styles.control}>
        <TouchableOpacity style={styles.btns} onPress={this.playMusic}>
          <Text>Play</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btns} onPress={() => this.controlsClick('pause')}>
          <Text>{this.state.pause}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btns} onPress={() => this.controlsClick('stop')}>
          <Text>Stop</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btns} onPress={() => this.controlsClick('replay')}>
          <Text>Replay</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    )
    return (
      <View>
        <TouchableOpacity style={styles.btns}>
          <Text>{this.state.musicStatus}</Text>
        </TouchableOpacity>
        {controls}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  control: {
    flexDirection: 'row',
    margin: 10,
    backgroundColor: '#fe7eb2',
    borderRadius: 5,
    justifyContent: 'space-around',
  },
  mainContainer: {
    flex: 1,
  },
  btns: {
    padding: 10,
    borderRadius: 5,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fedf7e',
  },
})
