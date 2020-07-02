import React from 'react'
import { SectionList, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import Contact from './contact'
import {connect} from 'react-redux'

function ContactList(props) {
    const renderItem = ({ item }) => {
        return <Contact contact={item} navigation={props.navigation}/>
    }
    const renderSectionHeader = ({ section }) => <View style={styles.sectionHeader}><Text style={styles.sectionHeaderTitle}>{section.title}</Text></View>
    
    const contactByLetter=props.contacts.reduce((obj,con)=>{
        var f=con.name[0].toUpperCase()
        return({
        ...obj,
        [f]:[...obj[f]||[],con]
          })
        },{})   
    const sections = Object.keys(contactByLetter).sort().map(letter => ({ title: letter, data: contactByLetter[letter] }))
    

        return ((props.contacts.length>0)?
            <SectionList
                sections={sections}
                extraData={props.contacts}
                renderItem={renderItem}
                renderSectionHeader={renderSectionHeader}
                removeClippedSubviews={true}
        /> :<View style={styles.emptyContactView}><Text style={{color:"white"}}>No Contacts</Text></View>
        )
    }

const styles = StyleSheet.create({
    emptyContactView: {
        justifyContent: "center",
        alignItems: "center",
      flex:2
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
    }
})

ContactList.propTypes = {
    contacts:PropTypes.array  
}
mapPropsToState = state => {
    return {
        contacts:state.contactReducer.contacts
    }
}
export default connect(mapPropsToState,null)(ContactList)

