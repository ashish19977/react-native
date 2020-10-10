import React, { useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'


const colors = [ 'rgba(218,247,166,', 'rgba(255,195,0,', 'rgba(255,87,51,',
    'rgba(199,0,57,', 'rgba(247,67,132,', 'rgba(67,110,247,',
    'rgba(142,68,173,', 'rgba(39,174,96,', 'rgba(127,140,141,',
    'rgba(22,160,133,', 'rgba(211,84,0,'
]


const ItemComponent = ({ data }) => {
    const bgColor = colors[Math.floor(Math.random()*colors.length)]
    
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
                    <Text style={styles.txt}> {data.content || data.description || data.title} </Text>
                </View>
                
                <View style={styles.source}>
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
    source: { flexDirection:'row',justifyContent:'flex-end',padding: 5 },
    detail: { flex:1,flexDirection:'row', padding: 5 }
})

export { ItemComponent }