/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import  { GestureDetector } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { FirebaseProvider } from './src/context/FirebaseContext';

import { StatusBar } from 'react-native';

import StackNavigator from './src/navigation/StackNavigator';
import { useNavigation } from '@react-navigation/native';

const App = () => {

  return (
    <FirebaseProvider>
      <SafeAreaProvider>
        <StatusBar barStyle={'light-content'} backgroundColor={'#131F25'}/>
        <StackNavigator />
      </SafeAreaProvider>
    </FirebaseProvider>
  )
}

export default App;
