import { useLinkProps, useNavigation } from '@react-navigation/native';
import React, { useState, useContext, useDebugValue } from 'react'

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
import MediumText from '../components/Text/MediumText';

const SignUpScreen = ({ }) => {

    const navigation = useNavigation();

    const [userDetail, setUserDetails] = useState({
        email: '',
        pass: '',
        username: '',
    });

    const [error, setError] = useState({
        email: false,
        pass: false,
    })

    const [loading, setLoading] = useState(false);

    const [passwordVisible, setPasswordVisible] = useState(false);

    const { emailPasswordSignUp, googleSignIn } = useContext(FirebaseContxt);

    return (
        <SafeAreaView>
            <ScrollView contentContainerStyle={{
                backgroundColor: '#131F25',
                height: '100%',
                width: '100%',
                alignContent: 'center',
                justifyContent: 'center',
                paddingHorizontal: 6,
                // paddingTop: 10,
                gap: 4,
            }}>
                <View style={{
                    marginBottom: 10,
                }}>
                    <Logo />
                </View>

                <TextInput
                    placeholder='Username'
                    onChangeText={(newText) => {
                        setUserDetails((prevUserDetails) => ({
                            ...prevUserDetails,
                            username: newText,
                        }));
                        console.log(newText);
                    }}
                    value={userDetail.username}
                    placeholderTextColor={'rgba(255,255,255,0.8)'}
                    style={{
                        color: 'white',
                        height: 56,
                        width: '100%',
                        backgroundColor: 'rgba(0,0,0,0.2)',
                        paddingHorizontal: 10,
                        fontSize: 16,
                        borderRadius: 10,
                        borderWidth: error.username ? 0.5 : 0,
                        borderColor: error.username ? 'red' : null,
                    }}
                    autoCorrect={false}
                    autoCapitalize={'none'}
                />

                <TextInput
                    placeholder='Email'
                    onChangeText={(newText) => {
                        setUserDetails((prevUserDetails) => ({
                            ...prevUserDetails,
                            email: newText,
                        }));
                        console.log(newText);
                    }}
                    value={userDetail.email}
                    placeholderTextColor={'rgba(255,255,255,0.8)'}
                    style={{
                        color: 'white',
                        height: 56,
                        width: '100%',
                        backgroundColor: 'rgba(0,0,0,0.2)',
                        paddingHorizontal: 10,
                        fontSize: 16,
                        borderRadius: 10,
                        borderWidth: error.email ? 0.5 : 0,
                        borderColor: error.email ? 'red' : null,
                    }}
                    autoCorrect={false}
                    autoCapitalize={'none'}
                />
                <View style={{
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: 'rgba(0,0,0,0.4)',
                    borderRadius: 10,
                    paddingHorizontal: 10,
                    borderWidth: error.pass ? 0.5 : 0,
                    borderColor: error.pass ? 'red' : null,
                }}>
                    <TextInput
                        placeholder='Password'
                        secureTextEntry={!passwordVisible}
                        onChangeText={(newText) => {
                            setUserDetails((prevUserDetails) => ({
                                ...prevUserDetails,
                                pass: newText,
                            }));
                            console.log(newText);
                        }}

                        value={userDetail.pass}
                        placeholderTextColor={'rgba(255,255,255,0.8)'}
                        style={{
                            color: 'white',
                            height: 56,
                            fontSize: 16,
                            width: '90%'
                        }}
                        autoCorrect={false}
                        autoCapitalize={'none'}
                    />

                    <TouchableOpacity
                        onPress={() => setPasswordVisible(prev => !prev)}
                    >
                        {
                            passwordVisible ?
                                <Icon
                                    name={'eye'}
                                    size={24}
                                    color={'#444444'}
                                /> :
                                <Icon
                                    name={'eye-off'}
                                    size={24}
                                    color={'#444444'}
                                />
                        }
                    </TouchableOpacity>
                </View>


                <TouchableOpacity onPress={() => navigation.navigate('login')} style={{ marginVertical: 4, }}>
                    <Text style={{
                        color: '#666666',
                        fontSize: 14,
                        textAlign: 'right'
                    }}>Alread a user ?</Text>
                </TouchableOpacity>

                <View style={{
                    alignItems: 'center',
                    marginTop: 20,
                }}>
                    <Button text={'Sign Up'} onPress={async () => {
                        setLoading(prev => !prev);
                        try {
                            const email = userDetail.email.toLowerCase();
                            const ref = await emailPasswordSignUp(email, userDetail.pass, userDetail.username);

                            if (ref) {
                                navigation.navigate('home');
                            } else {
                                return setError((prev) => ({
                                    ...prev, email: true
                                }))
                            }

                        } catch (e) {

                            if (e.code === 'auth/invalid-email' || e.code === 'auth/user-not-found' || e.code === 'auth/email-already-in-use') {
                                setError((prev) => ({
                                    ...prev, email: true,
                                }))
                            }

                            if (e.code === 'auth/wrong-password' || e.code === 'auth/internal-error') {
                                setError((prev) => ({
                                    ...prev, pass: true,
                                }))
                            }

                            console.log("error", e);
                        }

                        setLoading(prev => !prev);
                    }} loading={loading} />
                </View>

                <View style={{
                    flexDirection: 'row',
                    gap: 8,
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 40,
                    marginVertical: 20,
                }}>
                    <View style={{
                        height: 2,
                        width: '40%',
                        backgroundColor: '#666666',
                        alignSelf: 'center',
                    }} />

                    <MediumText text={'Or'} color={'white'} />

                    <View style={{
                        height: 2,
                        width: '40%',
                        backgroundColor: '#666666',
                    }} />

                </View>

                <View style={{
                    alignItems: 'center',
                }}>
                    <Button icon={'google'} outline={true} text={'Sign Up with Google'} onPress={async () => {
                        await googleSignIn();
                        navigation.navigate('Home');
                    }} />
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

export default SignUpScreen;