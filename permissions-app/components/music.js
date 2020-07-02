import React from 'react'
import { View, StyleSheet, Text, Button } from 'react-native'
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler'
import * as MediaLib from 'expo-media-library'
import { Audio } from 'expo-av';


export default class MusicLib extends React.Component{
    state = {
        hasPermission: false,
        songs: [],
        songPlaying:false,
        hasAudioPermission: false,
        songStatus: 'Play',
    }
    componentDidMount() {
        this.getPermission()
        this.getAudioPermission()   
    }
    async componentWillUnmount() {
        if (this.sound)
            await this.sound.unloadAsync()
    }
    getAudioPermission = async () => {
        Audio.setAudioModeAsync({playsInSilentModeIOS:true,staysActiveInBackground:true,playThroughEarpieceAndroid:false})
        let { status } = await Audio.requestPermissionsAsync()
        this.setState({ hasAudioPermission: (status === 'granted') ? true : false })
    }
    getPermission = async () => {
        let { status } = await MediaLib.requestPermissionsAsync()
        this.setState({ hasPermission: (status === 'granted') ? true : false })
        if (status === 'granted') {
            this.getMusic()
        }
    }

    getMusic = async () => {
        let {assets:songs} = await MediaLib.getAssetsAsync({
           first: 5000,
            mediaType:[MediaLib.MediaType.audio]
          });
        songs = songs.map((song,i) => ({ index:i,duration: song.duration, key: song.id, uri: song.uri, fn: song.filename.split(".")[0] }))
        this.setState({ songs: songs,totalSongs:songs.length })
        // setting audio to use later
        this.sound=new Audio.Sound()
    }

    playMusic = async (key) => {
        let songToPlay = this.state.songs.find(song => song.key === key)
        try {
            this.setState({currentSong:songToPlay})
            if (this.state.songPlaying !== true&&this.state.songStatus!=='Paused') {
                await this.sound.loadAsync({ uri: (songToPlay.uri) })
                await this.sound.playAsync()
                this.setState({ songPlaying: true,songStatus:'Playing...'})
            }
            else {
                await this.sound.unloadAsync()
                await this.sound.loadAsync({ uri: songToPlay.uri})
                await this.sound.playAsync()
                this.setState({ songPlaying: true,songStatus:'Playing...'})
            }
        } catch (err) {
            let song = songToPlay
            song.fn="Song missing !!!"
            this.setState({currentSong:song})
        }
    }

    pausePlayMusic = async ()=>{
        if (this.state.songPlaying == true) {
            this.setState({ songStatus: 'Paused', songPlaying: false })
            await this.sound.pauseAsync()
        }
        else if(this.state.currentSong){
            this.setState({ songStatus: 'Playing...', songPlaying: true })
            await this.sound.playAsync()
        }
    }
    playNext = async () => {
        try {
            if (this.state.currentSong.index + 1 === this.state.totalSongs)
                return
            else {
                let nextSong = this.state.songs[this.state.currentSong.index + 1]
                await this.sound.unloadAsync()
                await this.sound.loadAsync({ uri: nextSong.uri })
                await this.sound.playAsync()
                this.setState({ currentSong: nextSong })
            }
        }catch (err) {
            let nextSong = this.state.songs[this.state.currentSong.index + 1]
            nextSong.fn="Song missing !!!"
            this.setState({currentSong:nextSong})
        }
    }
    playPrev = async () => {
        try {
            if (this.state.currentSong.index === 0)
                return
            else {
                let prevSong = this.state.songs[this.state.currentSong.index - 1]
                await this.sound.unloadAsync()
                await this.sound.loadAsync({ uri: prevSong.uri })
                await this.sound.playAsync()
                this.setState({ currentSong: prevSong })
           }
        }catch (err) {
            let prevSong = this.state.songs[this.state.currentSong.index -1]
            prevSong.fn="Song missing !!!"
            this.setState({currentSong:prevSong})
        }
    }
    render() {
        let currentSong=(this.state.currentSong)?this.state.currentSong.fn:"Play a song"
        return (
            <View style={styles.mainContainer}>
                <TouchableOpacity style={styles.currentSong}>
                    <Text style={{color:"#03427a"}}>
                        {currentSong}
                    </Text>
                </TouchableOpacity>
                <ScrollView style={styles.songsView}>
                    {(this.state.songs.length > 0) ? this.state.songs.map(song =>
                        <TouchableOpacity style={styles.allSongs} key={song.key} onPress={key =>this.playMusic(song.key)}>
                            <Text style={{ fontSize: 15 }}>
                                {(song.fn.length>60)?`${song.fn.substring(60)}`+"...":song.fn}
                            </Text>
                        </TouchableOpacity>) : <Text>Fecthing songs</Text>}
                </ScrollView>
                <View style={{justifyContent:"space-evenly",flexDirection:"row",margin:5}}>
                    <TouchableOpacity style={styles.controls} disabled={(this.state.currentSong)?false:true} onPress={this.playPrev}>
                        <Text style={{color:"#03427a"}}>
                            Prev    
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.controls} onPress={this.pausePlayMusic}>
                        <Text style={{color:"#03427a"}}>
                            {this.state.songStatus}   
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.controls} disabled={(this.state.currentSong)?false:true} onPress={this.playNext}>
                        <Text style={{color:"#03427a"}}>
                            Next   
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    currentSong: {
        padding: 10,
        backgroundColor: "#98cdfc",
        alignItems:"center"
    },
    allSongs: {
        padding: 10,
        backgroundColor: "pink",
        marginTop: 2,
    },
        songsView: {
        flex:1      
    },
    controls: {
        backgroundColor: "#98cdfc",
        justifyContent: "space-evenly",
        flexDirection: "row",
        padding: 10,
        borderRadius: 5,
        borderWidth:1,
        borderColor:"#03427a"
        },
    mainContainer: {
        flex: 1,
     
    }
})