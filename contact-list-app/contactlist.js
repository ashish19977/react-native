import React from 'react' 
import { View, Text,TextInput, Button,Platform,StyleSheet } from 'react-native'
import { Section } from './sectionList.js'
import constants from 'expo-constants'

export default class Contact extends React.Component {
    key = "0"
    state = {
        contacts: [{ name: "ashish", number: 9846968372, key: this.key }],
        number: '',
        name: '',
    }

    handleName = name => {
        if (name.match(/[^a-zA-Z]/g) === null)
            this.setState({ name: name })
    }

    handleNumber = (number) => {
        if (number.length <= 10 && number.match(/[^0-9]/g) === null) { this.setState({ number: number }) }
    }

    handleAdd = () => {
        console.log(Platform.isAndroid)
        if (this.state.number.length === 10 && this.state.name.length >= 1) {
            this.key = parseInt(this.key)
            this.key += 1
            this.key = this.key.toString()
            let contact = { name: this.state.name, number: this.state.number, key: this.key }
            let contacts = [...this.state.contacts, contact].sort((contact1, contact2) => contact1.name > contact2.name)
            this.setState(prevState => ({ contacts: contacts, name: '', number: '' }))
        }
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.appheading}>
                    <Text style={{ fontSize: 28 }}>Contact List</Text>
                </View>

                <View style={styles.addContactContainer}>
                    <Text>Name</Text>
                    <TextInput value={this.state.name} style={{ backgroundColor: "white", margin: 10, padding: 5 }} placeholder="Enter name" onChangeText={name => this.handleName(name)} />
                    <Text>Phone Number</Text>
                    <TextInput value={this.state.number} keyboardType={Platform.OS === ("android" || "ios ") ? "number-pad" : "default"} style={{ backgroundColor: "white", margin: 10, padding: 5 }} placeholder="Enter Mob number" onChangeText={no => this.handleNumber(no)} />
                    <Button title="Add Contact" onPress={this.handleAdd}></Button>
                </View>

                <View style={[styles.appheading, { marginTop: 8 }]}>
                    <Text style={{ fontSize: 20 }}>All Contacts</Text>
                </View>
                {/* <ScrollView style={{ flex: 1}}>
        {this.state.contacts.map(contact => {
          return(
            <View key={contact.key} style={styles.contact}>
              <Text style={{ fontSize: 20 }}>{contact.name}</Text>
              <Text style={{ fontSize: 20 }}>{contact.number}</Text>
          </View>)
        })}
      </ScrollView> */}
                {/* <Flat contacts={this.state.contacts} /> */}
                <Section contacts={this.state.contacts} />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    addContactContainer: {
      justifyContent: 'space-between',
      backgroundColor: 'rgba(255,255,255,.4)'
    },
    appheading: {
      backgroundColor: "rgba(255,255,255,.4)",
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20
    },
    container: {
      flex: 1,
      backgroundColor: 'black',
      marginTop: constants.statusBarHeight
    },
  })