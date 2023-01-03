import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const Footer = () =>
{
    const year = new Date().getFullYear();
    return (
        <View style={ styles.footer__container }>
            <Text style={ styles.footer__content }>
                Made With ❤ By Md Amir { year }
            </Text>
        </View>
    )
}

const styles = StyleSheet.create( {
    footer__container: {
        position: 'fixed',
        bottom: 0,
        left: 0,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 5,
        height: '8%',
        width: '100%',
        backgroundColor: '#171923'
    },
    footer__content: {
        color: '#CBD5E0',
        fontWeight: 'bold',
        fontSize: 16,
        wordSpacing: '1px'
    }
} )

export default Footer