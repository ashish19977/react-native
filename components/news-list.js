import React from 'react'
import { ActivityIndicator, FlatList } from 'react-native'
import { ItemComponent } from './item-component'

const NewsListComponent = props => {
    return(
        <FlatList
            data = {props.data}
            initialNumToRender={10}
            renderItem={({ item }) => <ItemComponent data = { item } selectedCountry = { props.selectedCountry }/>}
            keyExtractor={item => item.title}
            ListEmptyComponent = { () => <ActivityIndicator color='black' size='large'/> }
        />
        
    )
}

export { NewsListComponent }