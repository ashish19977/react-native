import React from 'react'
import {TextInput,View,StyleSheet, Text, TouchableOpacity,StatusBar, KeyboardAvoidingView} from 'react-native'
import Contact from './contact'
import {connect} from 'react-redux'

class SearchResult extends React.Component{
    state = {
    matchedContacts:[]    
    }
    ref=React.createRef()
    focusOnInput = () => {
        this.ref.current.focus()
    }
    searchContacts = name => {
        this.setState({
            matchedContacts: this.props.contacts.filter(contact => {
                return (contact.name.toLowerCase().match(name.toLowerCase())) ? contact : undefined
            })})
    }
    handleBack = () => {
        this.props.navigation.goBack()
    }
    render() {
        StatusBar.setBackgroundColor("white")
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.appContainer}>
                <TouchableOpacity style={styles.searchContainer} onPress={this.focusOnInput}>
                    <TextInput style={styles.searchInput} placeholder="Search contact" ref={this.ref} autoFocus onChangeText={name => this.searchContacts(name)} />
                </TouchableOpacity>
                <View style={styles.matchedContactsView}>
                    {(this.state.matchedContacts.length <= 0) ? <Text style={styles.searchTxt}>Search contacts</Text> :
                        this.state.matchedContacts.map(contact => <Contact contact={contact} key={contact.key} navigation={this.props.navigation}/>)}
                </View>
           </KeyboardAvoidingView>
        )
    }
}
const styles = StyleSheet.create({
    searchTxt: {
        color: "orange",
        textAlign:"center"
    },
    appContainer: {
        flex: 1,
        backgroundColor:'rgba(0,0,0,.9)'
    },
    searchInput: {
        color:"white",
        fontSize:16,
        padding: 10,
        textAlign:"center"
    },
    matchedContactsView:{},
    searchContainer: {
        borderRadius:5,
        margin:5,
       backgroundColor:"rgba(255,255,255,.2)"
   }
})

mapPropsToState = state => {
    return {
        contacts:state.contactReducer.contacts
    }
}
export default connect(mapPropsToState,null)(SearchResult)