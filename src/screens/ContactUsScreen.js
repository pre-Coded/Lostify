import { useNavigation } from '@react-navigation/native'
import React from 'react'

import { SafeAreaView, ScrollView, View, Text, TouchableOpacity } from 'react-native'
import Logo from '../components/Logo'
import LargeText from '../components/Text/LargeText'
import MediumText from '../components/Text/MediumText'
import SmallText from '../components/Text/SmallText'

const ContactUsScreen = () => {

    const navigation = useNavigation();

    const sentence = 'We value your feedback! If you have any grievances, concerns, or suggestions regarding Lostify, please don\'t hesitate to reach out to us. Our dedicated support team is here to assist you. You can contact us at princekr.it.21@gmail.com .Your satisfaction is our priority!'

    return (
        <SafeAreaView>
            <ScrollView  contentContainerStyle={{
                minHeight: '100%',
                gap: 10,
                paddingHorizontal: 6,
                alignItems  :'center',
                justifyContent : 'center',
                gap : 20,
            }}>
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6,
                }}>

                    <Text style={{
                        fontSize : 32,
                        color : 'white',
                    }}>
                        Contact Us
                    </Text>

                    <Text style={{
                        fontSize : 20,
                        color : '#888888', 
                        textAlign : 'center',
                    }}>
                        {sentence}
                    </Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('home')}>
                    <Logo />
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}

export default ContactUsScreen