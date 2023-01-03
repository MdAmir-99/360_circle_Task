import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity, View, StyleSheet, Text, Image, Dimensions } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';


const screenWidth = Dimensions.get( 'window' ).width;

const Navbar = () =>
{
    const navigation = useNavigation();
    const [ isLogin, setIsLogin ] = useState( false )
    const [ userData, setUserData ] = useState( {} )

    useEffect( () =>
    {
        const isUserLogin = async () =>
        {
            const user = await AsyncStorage.getItem( 'user' )
            if ( user !== null )
            {
                const data = JSON.parse( user );
                setIsLogin( true )
                setUserData( data );
                console.log( data, "DATATATATATAT" )
            }
            else
            {
                navigation.navigate( "home" );
            }
        }
        isUserLogin()



    }, [] )

    const logoutHandler = async () =>
    {
        await AsyncStorage.clear();
        setIsLogin( false )
        window.alert( 'logout Successfully !' )
        navigation.navigate( "home" )
    }


    return (
        <View style={ styles.menuContainer }>
            <View style={ styles.menuLogo }>
                <TouchableOpacity
                    style={ styles.buttonStyle }
                    onPress={ () => navigation.navigate( "home" ) }>
                    {/* <Text>Course</Text> */ }
                    <Text style={ styles.menuText }>
                        Brand Name
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={ styles.menuIcons }>
                { isLogin ?
                    <>
                        <TouchableOpacity
                            style={ styles.buttonStyle }
                            onPress={ logoutHandler }>
                            <Text style={ styles.menuText }>
                                logout
                            </Text>
                        </TouchableOpacity>
                        <Text style={ { color: '#fff', fontWeight: 'bold' } }>{ userData.fullName }</Text>
                        <TouchableOpacity
                            style={ styles.buttonStyle }
                            onPress={ () => navigation.navigate( "profile" ) }>
                            <Image
                                style={ styles.iconStytle }
                                source={ require( "../assets/profile.png" ) }
                            />
                        </TouchableOpacity>
                    </>
                    :
                    <>
                        <TouchableOpacity
                            style={ styles.buttonStyle }
                            onPress={ () => navigation.navigate( "home" ) }>
                            <Text style={ styles.menuText }>
                                login
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={ styles.buttonStyle }
                            onPress={ () => navigation.navigate( "register" ) }>
                            <Text style={ styles.menuText }>
                                register
                            </Text>
                        </TouchableOpacity>
                    </> }


            </View>

        </View>
    );
};

const styles = StyleSheet.create( {
    menuContainer: {
        // marginTop: 16,
        height: screenWidth < 768 ? 72 : 65,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: screenWidth < 768 ? 8 : 20,
        alignItems: 'center',
        paddingVertical: screenWidth < 768 ? 10 : null,
        backgroundColor: '#171922',
    },
    menuLogo: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8
    },
    menuText: {
        textTransform: "uppercase",
        color: '#fff',
        fontWeight: 'bold',
        paddingRight: screenWidth < 768 ? 8 : null,
        // letterSpacing: '1px'
    },
    iconStytle: {
        width: "100%",
        height: 50,
        color: '#fff',
        aspectRatio: 1,
    },
    menuIcons: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: screenWidth < 768 ? 8 : 20,
    }
} );

export default Navbar;