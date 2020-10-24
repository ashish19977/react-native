import React from 'react'
import { Picker, StyleSheet, View } from 'react-native'
import * as Tts from 'expo-speech'


const SelectionComponent = React.memo(props => {
    
    const setCountry = async country => {
        const isPlaying = await Tts.isSpeakingAsync()
        if(isPlaying)
            Tts.stop()  
        props.setCountry(country)
    }

    const setCat = async cat => {
        const isPlaying = await Tts.isSpeakingAsync()
        if(isPlaying)
            Tts.stop()  
        props.setCat(cat)
    }    
    return(
        <View style={styles.main}>
            <Picker
                selectedValue = { props.selectedCat }
                style = {{ height: 40, width: 180 }}
                onValueChange = { (itemValue,itemIndex) => setCat(itemValue)}
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
                onValueChange = { (itemValue,itemIndex) => setCountry(itemValue)}
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