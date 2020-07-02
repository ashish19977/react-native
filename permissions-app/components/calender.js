import React from 'react'
import * as Calendar from 'expo-calendar'
import { Text, View, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default class Calender extends React.Component{
    state = {
        hasPermssion: false,
        calId: null,
        allCalIds:[],
        status: "",
        allEvents: [],
        color: '',
        time:'Getting clock ready...'
    }
    componentDidMount() {
        this.timeInterval=this.timer
        console.log("mounted")
        this.askCalenderPermission()
    }

    componentWillUnmount() {
        clearInterval(this.timeInterval)
    }
    timer=setInterval(() => {
        this.setState({ time: new Date(new Date().getTime()).toString().substring(16, 25)})
    }, 1000)

    askCalenderPermission = async () => {
        let { status } = await Calendar.requestCalendarPermissionsAsync();
        if (status === 'granted') {
            this.setState({ hasPermssion: true })
            this.getCalendars()
        }
        else
            this.setState({hasPermssion:false})
    }

    //if we have calendar permission
    

    getCalendars = async () => {
        //let d=Calendar.deleteCalendarAsync("1")
        let allCals = await Calendar.getCalendarsAsync();
        if (allCals.length === 0)
        {
            this.createCalendar()
        }
        else {
            //getting the id of the calendar on whoich we have acesslevel owner 
            this.setState({ allCalIds: allCals.map(cal => cal.id)})
           
            let {id} = allCals.find(cal => cal.accessLevel === 'owner')
            this.setState({calId:id})
        }
    }

    createCalendar = async () => {
        try {
            var id = await Calendar.createCalendarAsync({
                title: "react-native-cal",
                color: "#ff3333",
                name:"custom cal",
                source: {
                    isLocalAccount: false,
                    name: "ashishmoria96@gmail.com", //important
                    type: "com.google" //importtant
                },
                isSynced: true,
                isVisible: true,
                timeZone: "Asia/Kolkata", //importtant
                ownerAccount: "ashishmoria96@gmail.com", //important
                accessLevel: 'owner',
            })
            //we will set id of the creted calendar in getcalanders
            this.getCalendars()
        }
        catch (err) {
            console.log(err)
        }
    }


    createEvent = async () => {
        this.setState({status:"Creating an Event ..."})
        let event = {
            startDate: new Date().toISOString(), //importtant
            endDate: new Date().toISOString(), //important
            timeZone: "Asia/Kolkata",
            title:"react app"
        }
        let eveId =undefined
        try {
            console.log("creating event")
            eveId = await Calendar.createEventAsync(this.state.calId, event)
            console.log(eveId)
            this.setState({status:"Event created... Check your calendar and click on get all events after 5-10 secs"})
        }
        catch (err) {
            console.log(err)
        }
    }

    getAllEvents = async () => {
        this.setState({status:"Getting All Events",color: '#8aff8c' })
        let allEvents = []
        try {
            allEvents = await Calendar.getEventsAsync(this.state.allCalIds, new Date("01/01/2020").toISOString(), new Date("12/31/2020").toISOString())
            this.setState({allEvents:allEvents,status:"All Events"})
        } catch (error) {
            console.log(error)
        }
    }
    
    render() {
        if(this.state.hasPermssion===true)
        return (
            <View style={styles.mainContainer}>
                <TouchableOpacity style={[styles.btns,{backgroundColor:'#8a8fff'}]} onPress={this.getAllEvents}>
                    <Text>{this.state.time}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btns} onPress={this.getAllEvents}>
                    <Text>Get All Events</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btns} onPress={this.createEvent}>
                    <Text>Create event</Text>
                </TouchableOpacity >
                <TouchableOpacity style={[styles.btns,{marginVertical:20,backgroundColor:"white"}]}>
                    <Text>{this.state.status}</Text>
                </TouchableOpacity>
                
                <View style={styles.contentView}>
                    {this.state.allEvents.map(event=><TouchableOpacity key={event.id} style={[styles.btns, { marginVertical: 10, backgroundColor:this.state.color}]}>
                        <Text>title: {event.title} id: {event.id}</Text>
                    </TouchableOpacity>)}
                </View>
                </View>
            )
        else
            return (
                <View style={styles.mainContainer}><Text>No Calendar permissions</Text></View>
            )
    }
}

const styles = StyleSheet.create({
    contentView: {
        flex: 1,
        padding:5,
        marginTop: 20,
        backgroundColor:"#ff9a9a"
    },
    mainContainer: {
        flex: 1,
        marginTop:30,
    },
    btns: {
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        margin: 5,
        padding: 5,
        backgroundColor:"#05cbd1"
    }
})