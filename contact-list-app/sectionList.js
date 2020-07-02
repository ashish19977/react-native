import React from 'react'
import { SectionList, StyleSheet, Text, View } from 'react-native'
import PropTypes from 'prop-types'

const Section = (props) => {
    const renderItem = ({ item }) => {
        return(
        <View style={styles.contact}>
        <Text style={{ fontSize: 20,color:"orange" }}>{item.name}</Text>
        <Text style={{ fontSize: 18 }}>{item.number}</Text>
        </View>)
    }
    const renderSectionHeader = ({ section }) => <View style={styles.sectionHeader}><Text style={{ fontSize: 22}}>{section.title}</Text></View>
    var contactByLetter=props.contacts.reduce((obj,con)=>{
        var f=con.name[0].toUpperCase()
        return({
        ...obj,
        [f]:[...obj[f]||[],con]
          })
        },{})
       
    const sections = Object.keys(contactByLetter).sort().map(letter => ({title:letter,data:contactByLetter[letter] }))
    
    return (
        <SectionList
            sections={sections}
            renderItem={renderItem}
            renderSectionHeader={renderSectionHeader}
        />
    )
}

const styles = StyleSheet.create({
    contact:{
        backgroundColor: 'rgba(255,255,255,.4)',
        margin:5
    }, 
    sectionHeader: {
        justifyContent: "space-evenly",
        alignItems: "center",
        backgroundColor: "rgba(255,255,255,.8)",
        borderRadius: 50,
        marginLeft: 180,
        marginRight: 180,
    }
})

Section.prototype = {
    contacts:PropTypes.array
}

export { Section }

