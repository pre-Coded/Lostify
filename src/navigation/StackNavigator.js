/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

 import React from 'react';
 
 import { NavigationContainer } from '@react-navigation/native';
 import { createStackNavigator } from '@react-navigation/stack';

import WelcomeScreen from '../screens/WelcomeScreen';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SingleItemPage from '../screens/SingleItemPage';
import ProfileScreen from '../screens/ProfileScreen';
import TabNavigator from './TabNavigator';
import SignUpScreen from '../screens/SignUpScreen';
import SeeAllItemScreen from '../screens/SeeAllItemScreen';
import AddItemScreen from '../screens/AddItemScreen';
import ConfirmUploadScreen from '../screens/ConfirmUploadScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import ErrorScreen from '../screens/ErrorScreen';
import ContactUsScreen from '../screens/ContactUsScreen';
 
 
 const Stack = createStackNavigator();
 
 const StackNavigator = () => {
   return (
     <NavigationContainer>

       <Stack.Navigator initialRouteName={'welcomePage'}
         screenOptions={{
           headerShown: false,
           cardShadowEnabled : false,
           cardStyle : {
            backgroundColor : '#131F25',
           }
         }}
 
       >
         <Stack.Screen
           name="welcomePage"
           component={WelcomeScreen}
         />

         <Stack.Screen
           name="home"
           component={TabNavigator}
         />
         
         <Stack.Screen
           name="login"
           component={LoginScreen}
         />

         <Stack.Screen
           name="contactus"
           component={ContactUsScreen}
         />

         <Stack.Screen
           name="signup"
           component={SignUpScreen}
         />

         <Stack.Screen
           name="resetpassword"
           component={ForgotPasswordScreen}
         />

         <Stack.Screen
           name="seeallitem"
           component={SeeAllItemScreen}
         />

         <Stack.Screen
           name="error"
           component={ErrorScreen}
         />
 
         {/* Upload Lost and Found */}
         <Stack.Screen
           name="additem"
           component={AddItemScreen}
         />

         <Stack.Screen
           name="uploadconfirm"
           component={ConfirmUploadScreen}
         />
 
         {/* SingleItemPage */}
         <Stack.Screen
           name="singleItemPage"
           component={SingleItemPage}
         />
 
         {/* Profile */}
         {/* <Stack.Screen
           name="profile"
           component={ProfileScreen}
         /> */}
 
       </Stack.Navigator>
     </NavigationContainer>
   )
 }
 
export default StackNavigator;
 