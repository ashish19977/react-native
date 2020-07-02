import React from 'react' 
import { View,  StyleSheet, TouchableOpacity, Text, Alert } from 'react-native'
import SearchBar from './search'
import ContactList from './contact-list'
import constants from 'expo-constants'
import * as Contacts from 'expo-contacts'
import { connect } from 'react-redux'
import {getDeviceContacts} from '../redux/actions-creator'

class Home extends React.Component{
    state = {
        
        number: '',
        name: '',
        loading: true,
        message:"Importing Contacts From Your Device"
    }

    componentDidMount()
    {
        this.getPhoneContacts()
    }
    getPhoneContacts = async () => {
        
        let { status }  = await Contacts.requestPermissionsAsync();
        if (status === 'granted') {
            try {
                let { data } = await Contacts.getContactsAsync()
                let contactsFromDevcie = data.filter(contact => contact.phoneNumbers !== undefined).map(contact => ({
                    name: contact.name, number: parseInt(contact.phoneNumbers[0].number.split(' ').join('')), key: contact.id
                }))
                this.props.getDeviceContacts(contactsFromDevcie)
                this.setState(prevState => ({loading: false }))
            } catch (err) {
                console.log(err)
            }
        }
        else {
            this.setState({loading:false,message:"Cant't Import Device Contacts"})
        }
    }
    addContact = () => {
       this.props.navigation.push('Edit')
    }   
    render() {
        return (this.props.loading) ? <View style={styles.appContainer}>
            <Text style={{ color: "white", textAlign: "center", marginTop: 20 }}>{this.state.message}</Text>
            <TouchableOpacity style={styles.addBtn} onPress={this.addContact}><Text style={styles.plusSign}>&#x002B;</Text></TouchableOpacity>
        </View>:
            <View style={styles.appContainer}>
                <SearchBar navigation={this.props.navigation}/>
                <Text style={styles.noOFContacts}>{this.props.contacts.length}</Text>
                <View style={styles.contactsView}>
                    <ContactList navigation={this.props.navigation}/>   
                    <TouchableOpacity style={styles.addBtn} onPress={this.addContact}><Text style={styles.plusSign}>&#x002B;</Text></TouchableOpacity>
                </View>
           </View>
    }
}
const styles = StyleSheet.create({
    noOFContacts: {
        color: "white",
        fontWeight: "100",
        fontSize: 18,
        textAlign: "right",
        padding: 7
    },
    plusSign: {
        color: "white",
        fontSize: 40,
        paddingBottom:4,
    },
    contact:{
            backgroundColor: 'rgba(255,255,255,.4)',
            margin:5
        },
        sectionHeaderTitle: {
            color: "grey",
            fontSize: 25,
            padding: 2,
            fontWeight:"200"
        },
        sectionHeader: {
            margin:5,
        },
    addBtn: {
        position: "absolute",
        right: 25,
        bottom: 25,
        borderWidth: 1, height: 60,width:60,
        borderColor: 'rgba(255,255,255,.4)',backgroundColor:"black",
        justifyContent: "center",
        alignItems: "center",
        borderRadius:30
    },
    contactsView: {
        flex: 1,
    },
    appContainer: {
        marginTop: constants.statusBarHeight,
        flex: 1,
        backgroundColor:'rgba(0,0,0,.9)'
    }
})

mapPropsToState = state => {
    // console.log(state.contactReducer)
    return {
        contacts: state.contactReducer.contacts,
        loading:state.contactReducer.loading,
    }
}
mapDispatchToStore = dispatch => {
    return {
        getDeviceContacts: (contacts) => dispatch(getDeviceContacts({ contacts }))
    }
}

export default connect(mapPropsToState,mapDispatchToStore)(Home)