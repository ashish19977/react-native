import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'

export default class Contact extends React.PureComponent{
    gotoEdit = (contact) => {
        this.props.navigation.navigate("Edit",{contact})
    }
    render() {
        return (
            <TouchableOpacity style={styles.contactContainer} onPress={()=>this.gotoEdit(this.props.contact)}>
                <Text style={styles.contactDetailText}>{this.props.contact.name}</Text>
            </TouchableOpacity>    
        )
    }
}

const styles = StyleSheet.create({
    contactContainer: {
      //  backgroundColor:"red",
        margin: 7,
        paddingVertical:8
    },
    contactDetailText: {
        color: "white",
        fontSize: 17,
        paddingLeft:30,
        fontWeight:"200"
    }
})