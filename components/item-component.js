import React, { useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { speak } from '../services'

const colors = [ 'rgba(218,247,166,', 'rgba(255,195,0,', 'rgba(255,87,51,',
    'rgba(199,0,57,', 'rgba(247,67,132,', 'rgba(67,110,247,',
    'rgba(142,68,173,', 'rgba(39,174,96,', 'rgba(127,140,141,',
    'rgba(22,160,133,', 'rgba(211,84,0,'
]

//en-IN hi-IN
const ItemComponent = ({ data, selectedCountry }) => {
    const bgColor = colors[Math.floor(Math.random()*colors.length)]
    
    const detail = data.description || data.content

    const [ isPlaying, setIsPlaying ] = useState(false)

    const playNews = async news => {
        if( isPlaying )
            return
        try{
            await speak( news, { cb: setIsPlaying, selectedCountry } )
        }catch(e){
            setIsPlaying(false)
        }
        
    }
    
    return(
        <TouchableOpacity style={[styles.main, { backgroundColor: bgColor+'1)'}]}>
            
            <View style={styles.imgView}>
                { data.urlToImage ?
                    <Image 
                    defaultSource = { require('../assets/default.png') }
                    progressiveRenderingEnabled = {true}
                    source={{ uri: data.urlToImage }} style={styles.img}/> 
                    :
                    <Image source={require('../assets/default.png')} style={styles.img}/> 
                }
            </View>


            
            <View style={styles.detailsView}>
            
                <View style={styles.detail} >
                    <Text style={styles.txt}> { detail } </Text>
                </View>
                <View style={styles.source}>
                    <TouchableOpacity style={ styles.plyBtn } onPress={() => playNews(detail)}>
                        <Text>{ isPlaying ? 'Playing ...' : 'Play'  }</Text>
                    </TouchableOpacity>
                    <Text>{data.source.name || 'Anonomous'}</Text>
                </View>
            
            </View>
        
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    main:{
        borderRadius: 5,
        height: 100,
        margin: 5,
        flexDirection: 'row', 
    },
    imgView:{
        width:'30%',
    },
    img:{
        height:'100%',
        width:'100%',
        borderRadius: 5,
    },
    detailsView:{
        justifyContent:'center',
        marginLeft: '2%',
        borderRadius: 5,
        width:'68%',
    },
    headline:{
        maxHeight:'10%',
        backgroundColor:'yellow'
    },
    content:{
        maxHeight:'80%'
    },
    txt:{ padding: 5, textAlign: "left",color: 'rgba(0,0,0,.8)' },
    source: { flexDirection:'row',justifyContent:'space-between',padding: 3},
    detail: { flex:1, flexDirection:'row', padding: 5 },
    plyBtn:{
        borderColor:'white',
        borderWidth: 1,
        paddingHorizontal: 5,
        paddingVertical: 1,
        borderRadius: 5,
        display: 'flex',
        justifyContent:'center',
    }
})

export { ItemComponent }