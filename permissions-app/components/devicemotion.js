import React from 'react'
import { View, Text, StyleSheet, Image, Button } from 'react-native'
import { Magnetometer as mg } from 'expo-sensors'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default class Motion extends React.Component{
    state = {
        motionOjb: null,
        mgAvailableStatus: 'Checking Device Motion Sension on Device...',
        direction: '',
        compassStatus:"Off"
    }
    componentDidMount() {
        this.checkMGAvailablity()
    }
    componentWillUnmount() {
        mg.removeAllListeners()
    }

    checkMGAvailablity = async () => {
        let status = await mg.isAvailableAsync()
        this.setState({
            mgAvailableStatus: (status === true) ? "Yes Device Motion Sensor Available on device" :
            "No Device Motion Sension Available"
        })
        if (status === true) {
            mg.setUpdateInterval(1000)
            this.onMGUpdate()
        }
    }
    onMGUpdate = async () => {
        this.mgSubscription = mg.addListener(m => {
            let angle=this.calculateAngle(m)
            this.setDirection(parseInt(angle))
        })
    }

    
    calculateAngle = (m) => {
        let angle = 0;
      let {x, y, z} = m
      if (Math.atan2(y, x) >= 0)
        angle = Math.atan2(y, x) * (180 / Math.PI)
      else
          angle = (Math.atan2(y, x) + 2 * Math.PI) * (180 / Math.PI)
        
      return Math.round(angle);
    }
    
    setDirection = (a) => {
        console.log(a)
        //when we put device earpiece in west direction holding phone horintally then angle is 0deg
            if ((a <= 15)||(a<=359&&a>=346))
                this.setState({ direction: 'W' })
            else if (a>=16&&a<=75)
                this.setState({ direction: 'NW' })
            else if (a>=76&&a<=105)
                this.setState({ direction: 'N' })
            else if (a>=106&&a<=165)
                this.setState({ direction: 'NE' })
            else if (a >= 166 && a <= 215)
                this.setState({ direction: 'E' })
            else if (a>=216&&a<=255)
                this.setState({ direction: 'SE' })
            else if (a>=256&&a<=285)
                this.setState({ direction: 'S' })
            else if (a>=285&&a<=345)
                this.setState({ direction: 'SW' })
            else
                this.setState({direction:'Wait'})
        }
    
    toggleCompass = async () => {
        if (this.state.compassStatus === 'Off') {
            mg.removeAllListeners()
            this.setState({compassStatus:"On"})
        }
        else {
            this.checkMGAvailablity()
            this.setState({compassStatus:"Off"})
        }
            
    }

    render() {
       // console.log(this.state.r) , { transform: [{ rotate: this.state.r }] }]
        return (
            <View style={styles.mainContainer}>
                <TouchableOpacity disabled={true} style={styles.heading}>
                    <Text style={styles.mgStatusText}>{this.state.mgAvailableStatus}</Text>
                </TouchableOpacity>
                <View style={styles.compass}>
                    <Text style={{color:"#fa5e04",fontWeight:"700",fontSize:20}}>{this.state.direction}</Text>
                    <Image style={[styles.img]} source={require('../assets/compass.png')} />  
                </View>    
                <Button title={`Toggle Compass : ${this.state.compassStatus}`} onPress={this.toggleCompass}/>
            </View>
    )
}
}

const styles = StyleSheet.create({
    heading: {
        backgroundColor: "#bdd6ff",
        justifyContent: "center",
        alignItems: "center",
        margin: 5,
        borderRadius: 5,
        padding:5,
    },
    img: {
        height: 200,
        width: 200,
    },
    compass: {
        marginTop:100,
        margin:5,
        alignItems: "center",
    },
    mgStatusText: {
        fontSize: 17,
        textAlign: "center",
        padding: 5,
      color:"#3751f3"
    },
    mainContainer: {
        flex: 1,
        alignItems: "center",
        backgroundColor:"#f6f5fa"
    }
})
