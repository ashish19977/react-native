import React, { useState } from 'react'
import { Picker, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const SelectionComponent = React.memo(props => {
    return(
        <View style={styles.main}>
            {/* business entertainment general health science sports technology */}
            
            <Picker
                selectedValue = { props.selectedCat }
                style = {{ height: 40, width: 180 }}
                onValueChange = { (itemValue,itemIndex) => props.setCat(itemValue)}
            >
                <Picker.Item color='#3498db' label='Business' value='business'/>
                <Picker.Item color='#3498db' label='Entertainment' value='entertainment'/>
                <Picker.Item color='#3498db' label='General' value='general'/>
                <Picker.Item color='#3498db' label='Health' value='health'/>
                <Picker.Item color='#3498db' label='Science' value='science'/>
                <Picker.Item color='#3498db' label='Sports' value='sports'/>
                <Picker.Item color='#3498db' label='Technology' value='technology'/>
            </Picker>

            <Picker
                style={{ color:'red'}}
                selectedValue = { props.selectedCountry }
                style = {{ height: 40, width: 150 }}
                onValueChange = { (itemValue,itemIndex) => props.setCountry(itemValue)}
            >
                <Picker.Item color='#d35400' label='India' value='in'/>
                <Picker.Item color='#d35400' label='Australia' value='au'/>
                <Picker.Item color='#d35400' label='England' value='gb'/>
                <Picker.Item color='#d35400' label='France' value='fr'/>
                <Picker.Item color='#d35400' label='Indonesia' value='id'/>
                <Picker.Item color='#d35400' label='Phillipines' value='ph'/>
                <Picker.Item color='#d35400' label='USA' value='us'/>
            </Picker>
        </View>
    )
}) 

const styles = StyleSheet.create({
    main:{
        marginTop: 36,
        flexDirection:"row",
        justifyContent:'space-around',
        alignItems:'center',
        borderBottomWidth: 2,
        borderColor: 'green'
    }
})

export { SelectionComponent }