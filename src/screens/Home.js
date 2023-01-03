import { View, Alert, Text, StyleSheet, SafeAreaView, TextInput, Dimensions, TouchableOpacity, Button } from 'react-native'
import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from 'react'
import CheckBox from 'expo-checkbox'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
// import Navbar from '../../component/Navbar';

const screenWidth = Dimensions.get( 'window' ).width;
console.log( screenWidth, "Hdhu" )

const Home = () =>
{
    const navigation = useNavigation();
    const [ agree, setAgree ] = useState( false )
    const [ email, setEmail ] = useState( '' );
    const [ password, setPassword ] = useState( '' );

    useEffect( () =>
    {
        const userLogin = async () =>
        {
            const isLogin = await AsyncStorage.getItem( 'user' )
            console.log( isLogin, "fdufduyg" )
            if ( isLogin )
            {
                navigation.navigate( "dashboard" )
            }
        }
        userLogin()
    }, [] )

    const submitHandler = async () =>
    {
        try
        {
            const url = 'http://localhost:8080/user/login';
            const config = {
                method: 'POST',
                data: JSON.stringify( { email, password } ),
                headers: {
                    "Content-Type": "application/json"
                }
            };

            const { data } = await axios( url, config );

            console.log( data.message, "12" )
            setEmail( '' )
            setPassword( '' )
            setAgree( false )
            if ( data.status === true )
            {
                const userData = JSON.stringify( data.data )
                await AsyncStorage.setItem( 'user', userData )
                window.alert( data.message )
                navigation.navigate( "dashboard" )
                Alert.alert(
                    "Alert Title",
                    "My Alert Msg",
                    [
                        {
                            text: "Cancel",
                            onPress: () => console.log( "Cancel Pressed" ),
                            style: "cancel"
                        },
                        { text: "OK", onPress: () => console.log( "OK Pressed" ) }
                    ]
                );

            }

        } catch ( error )
        {

            console.log( error.response.data.message )
            window.alert( error.response.data.message )
        }
    }
    return (
        <>
            {/* <Navbar /> */ }
            <View style={ styles.login__container }>
                <View style={ styles.login__form__container }>
                    <SafeAreaView>
                        <TextInput
                            style={ styles.inputStyle }
                            value={ email }
                            onChangeText={ ( data ) => setEmail( data ) }
                            placeholder="Enter Email..."
                        />
                        <TextInput
                            style={ styles.inputStyle }
                            value={ password }
                            onChangeText={ ( data ) => setPassword( data ) }
                            placeholder="Enter Password..."
                            secureTextEntry={ true }
                        />
                        <View style={ styles.checkBox__wrapper }>
                            <CheckBox
                                value={ agree }
                                onValueChange={ () => setAgree( !agree ) }
                                color={ agree ? '#171923' : undefined }
                            />
                            <Text style={ styles.checkBox__text }>
                                I have read and agreed with the TC
                            </Text>
                        </View>
                        <TouchableOpacity style={ [ styles.buttonStyle, {
                            backgroundColor: agree ? '#fff' : 'grey'
                        } ] }
                            onPress={ () => submitHandler() }
                            disabled={ !agree }
                        >
                            <Text style={ styles.buttonText }>login</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={ () => navigation.navigate( "fPassword" ) }  >
                            <Text style={ styles.forgetPassword__text }>Forgot Password</Text>
                        </TouchableOpacity>
                    </SafeAreaView>
                </View>
            </View >

        </>
    )
}

const styles = StyleSheet.create( {
    login__container: {
        flex: 1,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#171923',
        padding: screenWidth < 768 ? 20 : 32,
    },
    login__form__container: {
        height: undefined,
        padding: screenWidth < 768 ? 16 : 32,
        width: screenWidth < 768 ? '90%' : '40%',
        borderWidth: 2,
        borderColor: '#fff',
        borderRadius: 10,
        // marginVertical: screenWidth < 768 ? 20 : 32
    },
    inputStyle: {
        height: 40,
        width: '100%',
        marginVertical: 12,
        borderWidth: 1,
        padding: 10,
        borderWidth: 2,
        borderBottomColor: '#fff',
        border: '2px solid #fff',
        color: '#fff',
        zIndex: 200
    },
    buttonStyle: {
        height: 40,
        width: '100%',
        marginTop: 12,
        borderWidth: 1,
        color: '#171923',
        padding: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 16,
        borderBottomRightRadius: 16
    },
    buttonText: {
        fontWeight: 'bold',
        color: '#171923',
        fontSize: screenWidth < 768 ? 16 : 20,
        textTransform: 'uppercase'
    },
    forgetPassword__text: {
        color: '#fff',
        textAlign: 'center',
        marginTop: 32,
        cursor: 'pointer'
    },
    checkBox__wrapper: {
        height: 40,
        width: '100%',
        marginVertical: 12,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 16,
    },
    checkBox__text: {
        color: '#fff',
    }

} )

export default Home