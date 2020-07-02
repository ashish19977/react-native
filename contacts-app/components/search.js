import React from 'react'
import { View, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native'
import constants from 'expo-constants'
import {connect} from 'react-redux'

class SearchBar extends React.Component{
    goToSeachPage = () => {
        this.props.navigation.push('SearchResult')
    }
    render() {
        return (
                <TouchableOpacity style={styles.searchContainer} onPress={this.goToSeachPage}>
                <TextInput showSoftInputOnFocus={false} style={styles.searchInput} placeholder="Search contacts"
                    onFocus={this.goToSeachPage} />
                <Image source={{ uri: this.props.user.photoUrl }} style={styles.img}/>
                </TouchableOpacity>
        )
    }
}  

const styles = StyleSheet.create({
    img: {
        height: 30, width: 30, borderRadius: 15,
        marginRight:5
    },
    searchInput: {
        color: "white",
        paddingLeft:150
    },
    searchContainer: {
    flexDirection:"row",
    marginTop: 5,
    backgroundColor: 'rgba(255,255,255,.1)',
    paddingVertical: 8,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 3,
    marginHorizontal: 5,
    borderRadius: 3
}
})
mapPropsToState =state=> {
    return {
        user:state.userReducer.user
    }
}

export default connect(mapPropsToState)(SearchBar)