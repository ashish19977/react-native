 import React from 'react'
import { View, Text, Button } from 'react-native'
 
export default class LifeCycleDemo extends React.Component{   
    state = {
      
        showCounter: true
    }

    handleToggleCounter = () => {
        this.setState({showCounter:!this.state.showCounter})
    }
    render() {
        return (
            (this.state.showCounter)?
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Button title="Hide Counter" onPress={this.handleToggleCounter}/>
                    <Counter/>
                </View> :
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Button title="Show Counter" onPress={this.handleToggleCounter}/>
                    <Text>Counter is Hidden</Text>
                </View>
        )
    }
}

class Counter extends React.Component{
    state = {
        count: 0,
    }

    //obviously contructor will be called once component is created

    //then component didmount just after componenet has mounted on the VDOM
    componentDidMount() {
        this.interval=setInterval(this.inc,1000)
    }

    //then this shouldComponentUpdate method will be called to check if component should update on or not
    // by default it return true thats why component rerender on every state change
    // but we can control this cycle by this method simply returning false will stop the updating of app
    shouldComponentUpdate(nextProps, nextState) {
        return (this.state.count%2)
    }
    //this method will only be called once the permisson is granted or say true is returned by the shouldComponentUpdate
    componentDidUpdate() {
        console.log("Updating Component with state count = "+this.state.count)
    }

    //this is called jsut before unmounting a componenet
    // we can do neccessary clean up before component willunmount
    // here we are clearing our time interval
    //if we will not clear the interval it will keep existing in memeory even after the component is unmounted
    componentWillUnmount() {
       clearInterval(this.interval)
    }
    
    inc = () => {
        console.log("increamenet")
        this.setState({count:this.state.count+1})
    }
    render() {
        return (
            <View>
                <Text>{this.state.count}</Text>
            </View>
        )
    }
}