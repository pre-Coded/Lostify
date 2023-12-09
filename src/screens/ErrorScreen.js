import { NavigationContainer, useNavigation, useRoute } from '@react-navigation/native'
import React from 'react'
import { ScrollView, View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from '../components/Button'
import Logo from '../components/Logo'
import LargeText from '../components/Text/LargeText'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const ErrorScreen = (props) => {
    const navigation = useNavigation();

    const { text } = useRoute().params;

  return (
    <SafeAreaView>
        <ScrollView contentContainerStyle={{
            minHeight : '80%',
            // paddingTop : 10,
            paddingHorizontal : 4,
            alignItems : 'center',
            justifyContent : 'center',
        }}>
            <View style={{
                marginVertical : 20,
                position : 'absolute',
                top : 10,
            }}>
                <Logo/>
            </View>

            <MaterialIcons 
                name = {'error-outline'}
                size = {150}
                color = {'#FA7800'}
            />

            <Text style={{
                color : '#FA7800',
                fontSize : 40,
                letterSpacing : 1.5,
                fontWeight : 600,
                textAlign : 'center',
            }}>
                {props.text || text}
            </Text>

            <View style={{
                width : '100%',
                height : 48,
                marginTop : 16,
            }}>
                <Button outline={true} text={'Go Back'} onPress={ () => navigation.goBack()}/>
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default ErrorScreen