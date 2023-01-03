import { StyleSheet, Text, View, ScrollView, SafeAreaView, FlatList, TouchableOpacity, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Avatar } from "react-native-paper";
// import Card from '../../component/Card'
// import Icon from 'react-native-vector-icons/FontAwesome5'



const screenWidth = Dimensions.get( 'window' ).width;
const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
];

const Dashboard = () =>
{
    const [ userData, setUserData ] = useState( {} )
    const navigation = useNavigation();
    useEffect( () =>
    {
        const userLogin = async () =>
        {
            const isLogin = await AsyncStorage.getItem( 'user' );
            if ( isLogin === null )
            {
                navigation.navigate( "home" )
            }
            else
            {
                const user = JSON.parse( isLogin );
                setUserData( user )
            }
        }
        userLogin()
    }, [] )

    const logoutHandler = async () =>
    {
        await AsyncStorage.clear();
        window.alert( 'logout Successfully !' )
        navigation.navigate( "home" )
    }
    return (
        <View style={ styles.dashboard__mainContainer }>
            <View style={ styles.dashboard__leftSection }>
                <View style={ styles.profile__container }>
                    <Text style={ [ styles.profile__heading, styles.profile__text ] }>Profile</Text>
                    <Avatar.Icon size={ 100 } icon="account" style={ { backgroundColor: '#171923', marginVertical: 6 } } />
                    {/* <Image
                        style={ styles.profileImage }
                        source={ require( "../../assets/profile.png" ) }
                    /> */}
                    <Text style={ styles.profile__text }>{ userData.fullName }</Text>
                    <Text style={ styles.profile__text }>{ userData.email }</Text>
                    <Text style={ styles.profile__text }>+91 { userData.mobile }</Text>
                    <TouchableOpacity style={ styles.buttonStyle }
                        onPress={ () => logoutHandler() }
                    >
                        <Text style={ styles.buttonText }>logout</Text>
                    </TouchableOpacity>

                    {/* Add Task Icon */ }
                    <TouchableOpacity>
                        <Avatar.Icon size={ 40 } icon="plus" style={ { backgroundColor: '#171923', marginTop: 16 } } />
                    </TouchableOpacity>
                </View>
                <View style={ styles.profile__icons }>
                    <Avatar.Icon size={ 40 } icon="facebook" style={ styles.social__icons } />
                    <Avatar.Icon size={ 40 } icon="twitter" style={ styles.social__icons } />
                    <Avatar.Icon size={ 40 } icon="linkedin" style={ styles.social__icons } />
                    <Avatar.Icon size={ 40 } icon="instagram" style={ styles.social__icons } />
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={ false }
                showsHorizontalScrollIndicator={ false } style={ styles.dashboard__rightSection }>
                <SafeAreaView >
                    {/* <View style={ styles.card__row }> */ }
                    <FlatList data={ DATA }
                        showsVerticalScrollIndicator={ false }
                        showsHorizontalScrollIndicator={ false }
                        horizontal={ true }
                        keyExtractor={ ( item ) => item.id }
                        renderItem={ ( { item } ) =>
                        {
                            return (
                                <View style={ styles.item }>
                                    <View style={ styles.todo_content_wrapper }>
                                        <Text style={ styles.todo_title }>{ item.title }</Text>
                                        <Text style={ styles.todo_task }>
                                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate.
                                        </Text>
                                    </View>
                                    <View style={ styles.todo_action_wrapper }>
                                        {/* update Button */ }
                                        <TouchableOpacity
                                            style={ { backgroundColor: '#fa8231', borderRadius: 4 } }
                                        // onPress={ () => logoutHandler() }
                                        >
                                            <Text style={ styles.todo_buttonText }>Update</Text>
                                        </TouchableOpacity>


                                        {/* Delete Button */ }
                                        <TouchableOpacity
                                            style={ { backgroundColor: 'red', borderRadius: 4 } }
                                        // onPress={ () => logoutHandler() }
                                        >
                                            <Text style={ styles.todo_buttonText }>Delete</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )
                        } }
                    >
                    </FlatList>
                    {/* </View> */ }
                </SafeAreaView>
            </ScrollView >
        </View >
    )
}

const styles = StyleSheet.create( {
    dashboard__mainContainer: {
        minHeight: '100%',
        width: '100%',
        backgroundColor: '#171923',
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: screenWidth < 768 ? 'column-reverse' : 'row',
        justifyContent: 'space-between',
        gap: 8,
    },
    dashboard__leftSection: {
        height: screenWidth < 768 ? 'auto' : '100%',
        width: screenWidth < 768 ? '100%' : '30%',
        backgroundColor: '#171923',
        padding: 16,
        display: 'flex',
        alignItems: 'space-between',
        justifyContent: 'space-between',
        paddingVertical: screenWidth < 768 ? 16 : 32,
    },
    profile__container: {
        padding: 16,
        // height: '100%',
        width: '100%',
        backgroundColor: '#fff',
        borderTopLeftRadius: 16,
        borderBottomRightRadius: 16,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 32
    },
    profileImage: {
        width: "50%",
        height: 100,
        color: '#fff',
        aspectRatio: 1,
    },
    profile__text: {
        width: "100%",
        fontSize: 16,
        marginVertical: 1,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    profile__heading: {
        backgroundColor: '#171923',
        color: '#fff',
        fontSize: 24,
        paddingVertical: 10,
        textTransform: 'uppercase'
    },
    buttonStyle: {
        height: 40,
        width: '100%',
        marginTop: 12,
        borderWidth: 1,
        backgroundColor: '#171923',
        padding: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 16,
        borderBottomRightRadius: 16
    },
    buttonText: {
        fontWeight: 'bold',
        color: '#fff',
        fontSize: screenWidth < 768 ? 16 : 20,
        textTransform: 'uppercase'
    },
    profile__icons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 16,
        marginVertical: 32
    },
    social__icons: {
        // backgroundColor: '#fff'
        padding: 8,
        borderRadius: '50%',
        backgroundColor: '#fff',
        color: '#171923',
    },

    // Right Section Starts From Here
    dashboard__rightSection: {
        flex: screenWidth < 768 ? 5 : null,
        height: screenWidth < 768 ? '100%' : '100%',
        width: screenWidth < 768 ? '100%' : '70%',
        // backgroundColor: 'red',
        marginTop: screenWidth < 768 ? 16 : null,
        padding: 16,
    },
    cards__container: {
        // backgroundColor: 'green',
        minHeight: '100%',
        width: '100%',
    },
    item: {
        height: 340,
        width: 340,
        backgroundColor: '#171923',
        marginRight: 16,
        padding: 16,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        // alignItems: 'space-between',
    },
    todo_content_wrapper: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 4
    },
    todo_action_wrapper: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    todo_title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingVertical: 8,
        color: '#171923',
        backgroundColor: '#fff'
    },
    todo_task: {
        color: '#fff',
        textAlign: 'justify',
        // fontWeight: 'regular',
        fontSize: 16,
    },
    todo_buttonText: {
        fontWeight: 'bold',
        color: '#fff',
        fontSize: screenWidth < 768 ? 12 : 16,
        textTransform: 'uppercase',
        paddingVertical: 8,
        paddingHorizontal: 16,
    }
} )
export default Dashboard
