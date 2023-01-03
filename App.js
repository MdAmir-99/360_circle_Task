import { View, Text } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from './src/screens/Home';
import Register from './src/screens/Register';
import Profile from './src/screens/Profile';
import Navbar from './component/Navbar'
// import Footer from './src/screens/Footer';
import ForgotPassword from './src/screens/ForgotPassword';
import Dashboard from './src/screens/Dashboard';



export default function App ()
{

  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Navbar />
      {/* Home Screen */ }
      <Stack.Navigator initialRouteName="Home">
        {/* home screen  */ }
        <Stack.Screen
          name="home"
          component={ Home }
          options={ {
            headerShown: false,
          } }
        />

        {/* Register Screen */ }
        <Stack.Screen
          name="register"
          component={ Register }
          options={ {
            headerTitleStyle: {
              display: 'flex',
              alignItems: 'center',
              height: 65,
              fontSize: 25,
              color: '#171923',
              // fontFamily: "Nunito_600SemiBold",
            },
            headerStyle: {
              backgroundColor: '#fff',
            },
            headerTitle: "User SignUp Form",
            headerTitleAlign: "center",
            headerTintColor: '#171923'
          } }
        />

        {/* Profile Screen */ }
        <Stack.Screen
          name="profile"
          component={ Profile }
          options={ {
            headerTitleStyle: {
              display: 'flex',
              alignItems: 'center',
              height: 65,
              fontWeight: 'bold',
              fontSize: 25,
              color: '#171923',
              // fontFamily: "Nunito_600SemiBold",
            },
            headerStyle: {
              backgroundColor: '#fff',
            },
            headerTitleAlign: "center",
            headerTintColor: '#171923',
            headerTitle: "Profile",
          } }
        />

        {/* Forgot Password*/ }
        <Stack.Screen
          name="fPassword"
          component={ ForgotPassword }
          options={ {
            headerTitleStyle: {
              display: 'flex',
              alignItems: 'center',
              height: 65,
              color: '#171923',
              fontSize: 25,
              // fontFamily: "Nunito_600SemiBold",
            },
            headerStyle: {
              backgroundColor: '#fff',
            },
            headerTitle: "Change Password",
            headerTitleAlign: "center",
            headerTintColor: '#171923'
          } }
        />

        {/* UserDashboard Screen */ }
        <Stack.Screen
          name="dashboard"
          component={ Dashboard }
          options={ {
            headerTitleStyle: {
              display: 'flex',
              alignItems: 'center',
              height: 65,
              fontWeight: 'bold',
              fontSize: 25,
              color: '#171923',
              // fontFamily: "Nunito_600SemiBold",
            },
            headerStyle: {
              backgroundColor: '#fff',
            },
            headerTitleAlign: "center",
            headerTintColor: '#171923',
            headerTitle: "User Dashboard",
          } }
        />

      </Stack.Navigator>
      {/* <Footer /> */ }
    </NavigationContainer>
  );
}
