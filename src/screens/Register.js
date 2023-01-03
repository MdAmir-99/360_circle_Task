import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, Dimensions } from 'react-native'
import { useNavigation } from "@react-navigation/native";
import CheckBox from 'expo-checkbox'
import React, { useState } from 'react'
import axios from 'axios';


const screenWidth = Dimensions.get( 'window' ).width;

const Register = () =>
{
    const [ agree, setAgree ] = useState( false )
    const [ fullName, setFullname ] = useState( '' );
    const [ email, setEmail ] = useState( '' );
    const [ mobile, setMobile ] = useState( '' );
    const [ password, setPassword ] = useState( '' );
    const [ confirmPassword, setConfirmPassword ] = useState( '' );
    const navigation = useNavigation();

    const submitHandler = async () =>
    {
        try
        {
            const url = 'http://localhost:8080/user/register';
            const config = {
                method: 'POST',
                data: JSON.stringify( { fullName, email, mobile, password, confirmPassword } ),
                headers: {
                    "Content-Type": "application/json"
                }
            };

            const { data } = await axios( url, config );
            setFullname( '' )
            setEmail( '' )
            setMobile( '' )
            setPassword( '' )
            setConfirmPassword( '' )
            console.log( data, "DATA From API" )

        } catch ( error )
        {
            console.log( error )
        }
    }
    return (
        <>
            <View style={ styles.login__container }>
                <View style={ styles.login__form__container }>
                    <SafeAreaView>
                        <TextInput
                            style={ styles.inputStyle }
                            value={ fullName }
                            onChangeText={ ( fullName ) => setFullname( fullName ) }
                            placeholder="Enter Name..."

                        />
                        <TextInput
                            style={ styles.inputStyle }
                            value={ email }
                            onChangeText={ ( email ) => setEmail( email ) }
                            placeholder="Enter Email..."

                        />
                        <TextInput
                            style={ styles.inputStyle }
                            value={ mobile }
                            onChangeText={ ( mobile ) => setMobile( mobile ) }
                            placeholder="Enter Mobile Number..."
                            keyboardType="numeric"
                        />
                        <TextInput
                            style={ styles.inputStyle }
                            value={ password }
                            onChangeText={ ( password ) => setPassword( password ) }
                            placeholder="Enter Password..."
                            secureTextEntry={ true }
                        />
                        <TextInput
                            style={ styles.inputStyle }
                            value={ confirmPassword }
                            onChangeText={ ( confirmPassword ) => setConfirmPassword( confirmPassword ) }
                            placeholder="Confirm Password..."
                            secureTextEntry={ true }
                        />
                        <View style={ styles.checkBox__wrapper }>
                            <CheckBox
                                value={ agree }
                                onChange={ () => setAgree( !agree ) }
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
                            <Text style={ styles.buttonText }>register</Text>
                        </TouchableOpacity>
                    </SafeAreaView>
                </View>
            </View>
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
        // flex: 1,
        height: undefined,
        padding: screenWidth < 768 ? 16 : 32,
        width: screenWidth < 768 ? '90%' : '40%',
        borderWidth: 2,
        borderColor: '#fff',
        // backgroundColor: '#1A202C',
        borderRadius: 10,
        // marginVertical: screenWidth < 768 ? 20 : 32
    },
    inputStyle: {
        height: 40,
        width: '100%',
        marginVertical: 12,
        borderWidth: 1,
        padding: 10,
        border: '2px solid #fff',
        color: '#fff'
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
        // letterSpacing: '.5px',
        fontSize: screenWidth < 768 ? 16 : 20,
        textTransform: 'uppercase'
    },
    checkBox__wrapper: {
        height: 40,
        width: '100%',
        marginVertical: screenWidth < 768 ? 8 : 12,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 16,
    },
    checkBox__text: {
        color: '#fff',
    },

} )

export default Register