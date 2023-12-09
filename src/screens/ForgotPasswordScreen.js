import { useLinkProps, useNavigation } from '@react-navigation/native';
import React, { useState, useContext } from 'react'

import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Button from '../components/Button';
import Logo from '../components/Logo';
import FirebaseContxt from '../context/FirebaseContext';
import Icon from 'react-native-vector-icons/Feather'
import SmallText from '../components/Text/SmallText';

const ForgotPasswordScreen = ({ navigation }) => {

    const [userDetail, setUserDetails] = useState({
        email: '',
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const { resetPassword } = useContext(FirebaseContxt);

    return (
        <SafeAreaView>
            <ScrollView contentContainerStyle={{
                backgroundColor: '#131F25',
                height: '100%',
                width: '100%',
                alignContent: 'center',
                justifyContent: 'center',
                padding: 8,
                gap: 4,
            }}>
                <View style={{
                    marginBottom : 10,
                }}>
                    <Logo />
                </View>
                <TextInput
                    placeholder='Email'
                    onChangeText={(newText) => {
                        setUserDetails((prevUserDetails) => ({
                            ...prevUserDetails,
                            email: newText,
                        }));
                    }}
                    value={userDetail.email}
                    placeholderTextColor={'rgba(255,255,255,0.8)'}
                    style={{
                        color: 'white',
                        height: 56,
                        width: '100%',
                        backgroundColor: 'rgba(0,0,0,0.4)',
                        paddingHorizontal: 10,
                        fontSize: 16,
                        borderRadius: 10,
                    }}
                />

                {
                    success ? <View style={{
                        marginVertical : 10,
                        alignSelf : 'center'
                    }}>
                        <Text style={{
                            color : '#8CC63F',
                            fontWeight : 600,
                            fontSize : 12,
                            textAlign : 'center',
                        }}>
                            Reset password link successfully sent to your registered email { userDetail.email }.
                        </Text>
                    </View> : ''
                }

                <View style={{
                    alignItems: 'center',
                    marginTop: 20,
                }}>
                    <Button text={'Reset Password'} onPress={async () => {
                        setLoading(prev => !prev);
                        try {
                            const res = await resetPassword(userDetail?.email);
                            setSuccess(true);
                        } catch (e) {
                            console.log(e);
                        }

                        setLoading(prev => !prev);
                    }} loading = { loading }/>
                </View>

                <View style={{
                    marginTop: 10,
                }}>
                    <Button outline={true} text={'Go Back'} onPress={ () => navigation.goBack() }/>
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

export default ForgotPasswordScreen;