import React from 'react'
import { FlatList, Text ,View, StyleSheet} from 'react-native'
import PropTypes from 'prop-types'

const Flat = (props) => {
    const renderItem = ({ item }) =>
    {
        return(
            <View style={styles.contact}>
                <Text style={{ fontSize: 20,color:"orange" }}>{item.name}</Text>
                <Text style={{ fontSize: 18 }}>{item.number}</Text>
                </View>
        )
        }
    return (
        <FlatList data={props.contacts} renderItem={renderItem}/>
    )
}

Flat.propTypes = {
    contacts:PropTypes.array
}

const styles = StyleSheet.create({
    contact:{
        backgroundColor: 'rgba(255,255,255,.4)',
        margin:5
        }, 
})
export { Flat }