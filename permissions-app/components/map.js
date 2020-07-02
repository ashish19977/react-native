import React from 'react'
import { View, StyleSheet, Text, Button, TouchableOpacity, TextInput } from 'react-native'
import MapView from 'react-native-maps'
import * as Location from 'expo-location'
import Marker from 'react-native-maps'

export default class Map extends React.Component {
    state = {
        placeName: 'California USA',
        region: {
            latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.5,
                    longitudeDelta:0.5,
        },
        searchedAddress:""
    }
    componentDidMount() {
        this.getCordsForIntialPosition()
    }
    getCordsForIntialPosition = async () => {
        let { status } = await Location.requestPermissionsAsync()
        if (status !== 'granted') {
            console.log("Permission Denied")
            return
        }
    }

    getUserCurrentLocation = async () => {
        this.setState({placeName:"GETTING current location..."})
        let {coords} = await Location.getCurrentPositionAsync()
        this.setState(prevState => ({ region: { latitude: coords.latitude, longitude: coords.longitude,longitudeDelta:1,latitudeDelta:1 } }))
        let place = await Location.reverseGeocodeAsync({ latitude: coords.latitude, longitude: coords.longitude })
        this.setState({placeName:place[0].city+","+place[0].region})
    }
    handleInput = (address) => {
       this.setState({searchedAddress:address})
    }
    searchAddress = async () => {
        this.setState({placeName:"Searching..."})
        let [coords] = await Location.geocodeAsync(this.state.searchedAddress)
        if(coords)
            this.setState(prevState => ({ region: { latitude: coords.latitude, longitude: coords.longitude, longitudeDelta: 1, latitudeDelta: 1 },placeName:this.state.searchedAddress}))
        else
        {
            this.setState({placeName:"No adress Found"})
            }
    }
    render() {
        return (
            <View style={styles.container}>
                <Text>{this.state.placeName}</Text>
                <TouchableOpacity style={styles.inputOpacity}>
                    <TextInput style={{color:"white"}} placeholder="Search address on map" onChangeText={ad=>this.handleInput(ad)}></TextInput>
                    <Button title="Search" onPress={this.searchAddress}/>
                </TouchableOpacity>
                <Button title="Get Current Location" onPress={this.getUserCurrentLocation}/>
                <MapView style={styles.map} region={this.state.region}>
                    <MapView.Marker coordinate={this.state.region}
                        title={this.state.placeName}
                        draggable onDragEnd={({ nativeEvent })=>console.log(nativeEvent)}
                    />
                </MapView>
            </View>
        )
    }
}

var styles = StyleSheet.create({
    inputOpacity: {
        flexDirection: "row",
        justifyContent:"space-between",
        backgroundColor: "rgba(0,0,0,.8)",
        padding: 5,
        borderRadius: 3,
        margin:2
},
    container: {
      flex: 1,
    },
      map: {
        position: 'absolute',
        top: 100,
        left: 0,
        right: 0,
        bottom: 0,
      }
  });