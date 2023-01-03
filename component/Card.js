import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Card = ( { item } ) =>
{
    console.log( item.title, "HHUHU456464646465456456" )
    return (
        <View style={ styles.item }>
            <Text style={ styles.title }>{ item.title }Hello</Text>
        </View>
    )
}

export default Card
const styles = StyleSheet.create( {
    item: {
        height: 56,
        width: 56,
        backgroundColor: 'blue',
        padding: 32

    },
    title: {
        height: '100%',
        width: '100%',
        fontSize: 20,
        color: '#fff'
    }

} )
