import React from 'react'
import { view, StyleSheet, Text, ScrollView, View } from 'react-native'
import * as Contacts from 'expo-contacts'

export default class Contact extends React.Component{
    state = {
        contacts: [],
        loading: true,
        message:"Fetching contacts"
    }
    componentDidMount()
    {
        console.log("try to accessing contacts permission")
        this.getPhoneContacts()
    }
    getPhoneContacts = async () => {
        let status   = await Contacts.requestPermissionsAsync();
        if (status.status === 'granted') {
            let { data } = await Contacts.getContactsAsync()
            let contactsFromDevcie = data.filter(contact =>contact.phoneNumbers !== undefined).map(contact => ({
                name:contact.name,number:parseInt(contact.phoneNumbers[0].number),key:contact.id
            }))
            console.log(contactsFromDevcie.length)
            this.setState({contacts:contactsFromDevcie,loading:false})
        }
        else {
            console.log(status)
        }
    }


    render() {
        return(this.state.loading)?<View style={styles.appContainer}>
            <Text>
                {this.state.message}
            </Text>
        </View> :
            <ScrollView style={{padding:10}}><Text style={{fontSize:25,fontWeight:"bold"}}>Total Contacts : {this.state.contacts.length}</Text>
                {this.state.contacts.map(contact => <Text key={contact.key}>{contact.name}</Text>)}
            </ScrollView>
    }
} 

const styles = StyleSheet.create({
    appContainer: {
        flex: 1,
        backgroundColor:"pink",
        justifyContent: "space-evenly",
        alignItems:"center"
    }
})

