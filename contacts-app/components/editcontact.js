import React from 'react'
import { TextInput, View, Button, StyleSheet, Text, StatusBar, Platform, Alert } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import {updateContacts} from '../redux/actions-creator'

class Edit extends React.Component{
    state = {
        name: (this.props.route.params)?this.props.route.params.contact.name:"",
        number: (this.props.route.params) ? this.props.route.params.contact.number.toString() : "",
        key: (this.props.route.params) ? this.props.route.params.contact.key : new Date().getTime().toString(),
        edited:false
    }

    handleNameChange = name => {
            this.setState({ name: name,edited:true})
    }

    handleNumberChange = number => {
        if (number.length <= 12 && number.match(/[^0-9]/g) === null) { this.setState({ number: number,edited:true}) }
    }

    handleAdd = () => {
        if (this.state.name.match(/[a-zA-Z]/) !== null && this.state.number.length >= 1) {
            let newContact = { ...this.state,number:parseInt(this.state.number) }
            delete newContact.edited
            let { contacts } = this.props
            contacts.push(newContact)
            this.props.updateContacts({ contacts: [...contacts]})
            this.props.navigation.goBack()
        }
    }

    handleEdit = () => {
        let { contacts}=this.props
        let index = contacts.findIndex(contact => contact.name === this.state.name && contact.key !== this.state.key)
        if (this.state.name.match(/[a-zA-Z]/) !== null && this.state.number.length >= 1) {
            if (index > 0) {
                Alert.alert("Duplicate contact !", "Do you want to replace?",
                    [
                        { text: 'Cancel', style: 'cancel' },
                        {
                            text: 'OK', onPress: () => {
                                console.log(index)
                                contacts.splice(index, 1)
                                index = contacts.findIndex(contact => (contact.key === this.state.key))
                                contacts.splice(index, 1)
                                this.props.updateContacts({ contacts: [...contacts, { ...this.state, number: parseInt(this.state.number) }] })
                                this.props.navigation.goBack()
                            }
                        }
                    ])
            }
            else if (!this.state.edited)
                this.props.navigation.goBack()
            else {
                index = contacts.findIndex(contact => (contact.key === this.state.key))
                this.props.contacts.splice(index, 1)
                this.props.updateContacts({ contacts: [...contacts, { ...this.state, number: parseInt(this.state.number) }] })
                this.props.navigation.goBack()
            }
        }
    }
    handleCancel = () => {
        this.props.navigation.goBack()
    }

    handleDelete = () => {
        let { contacts}=this.props
        let index = contacts.findIndex(contact => (contact.key === this.state.key))
        contacts.splice(index, 1)
        this.props.updateContacts({ contacts:[...contacts] })
        this.props.navigation.goBack()
    }
    render() {
        StatusBar.setBackgroundColor("white")
        let btn=(this.props.route.params)?<><TouchableOpacity style={styles.btn} onPress={this.handleEdit}>
            <Text>Save</Text></TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={this.handleDelete}>
            <Text>Delete</Text>
        </TouchableOpacity></>:<TouchableOpacity style={styles.btn} onPress={this.handleAdd}>
            <Text>Add</Text></TouchableOpacity>
        return (
            <View style={styles.appContainer}>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} value={this.state.name} onChangeText={name => this.handleNameChange(name)} placeholder="Enter name"/>
                    <TextInput style={styles.input} keyboardType={Platform.OS === ("android" || "ios ") ? "number-pad" : "default"} value={this.state.number} onChangeText={no => this.handleNumberChange(no)} placeholder="Enter phone number"/>
                    </View>
                    <View style={styles.btnContainer}>
                    {btn}
                    <TouchableOpacity style={styles.btn}  onPress={this.handleCancel}>
                        <Text>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>    
        )
    }
}

const styles = StyleSheet.create({
    btnContainer: {
        marginHorizontal: 20,
        flexDirection: "row",
        marginTop:50,
        justifyContent:"space-around"
    },
    btn: {
        borderWidth: 1,
      backgroundColor:"#808b96",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        borderRadius:5
    },

    inputContainer: {
        marginTop:180,
        justifyContent: "center",
    },
    input:{
        backgroundColor: "rgba(255,255,255,.2)",
        color:"white",
        borderRadius: 5,
        padding: 10,
        margin:10
    },
    appContainer: {
        backgroundColor:"black",
        flex:1
    }
})
mapPropsToState = state => {
    return {
        contacts:state.contactReducer.contacts
    }
}
mapDispatchToStore = dispatch => {
    return {
        updateContacts: ({ contacts }) => dispatch(updateContacts({contacts}))
    }
}

export default connect(mapPropsToState,mapDispatchToStore)(Edit)