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
import Icon from 'react-native-vector-icons/AntDesign'
import MediumText from '../components/Text/MediumText';
import SmallText from '../components/Text/SmallText';

const LoginScreen = ({ }) => {

    const navigation = useNavigation();

    const [userDetail, setUserDetails] = useState({
        email: '',
        pass: '',
    });

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState({
        email: false,
        pass: false,
    })

    const [passwordVisible, setPasswordVisible] = useState(false);

    const { emailPasswordLogin, googleSignIn } = useContext(FirebaseContxt);

    return (
        <SafeAreaView>
            <ScrollView contentContainerStyle={{
                backgroundColor: '#131F25',
                height: '100%',
                width: '100%',
                alignItems: 'center',
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

                {/* <TextInput
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
                        backgroundColor: 'rgba(0,0,0,0.4)',
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

                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 4,
                    marginVertical: 4,
                }}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('signup')}
                    >
                        <Text style={{
                            color: '#666666',
                            fontSize: 14,
                        }}>New Here ?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('resetpassword')}>
                        <Text style={{
                            color: '#666666',
                            fontSize: 14,
                        }}>Forgot Password ?</Text>
                    </TouchableOpacity>
                </View>

                <View style={{
                    alignItems: 'center',
                    marginTop: 20,
                }}>
                    <Button text={'Log In'} onPress={async () => {

                        if (userDetail.email.length === 0 || userDetail.pass.length === 0) {
                            return setError((prev) => ({
                                ...prev,
                                email: true,
                                pass: true,
                            }))
                        }

                        setLoading(prev => !prev);

                        try {
                            await emailPasswordLogin(userDetail.email, userDetail.pass);
                            navigation.navigate('home');
                        } catch (e) {

                            console.log("Error >> ", e);

                            if (e.code === 'auth/invalid-email' || e.code === 'auth/user-not-found') {
                                setError((prev) => ({
                                    ...prev, email: true,
                                }))
                            } else if (e.code === 'auth/wrong-password' || e.code === 'auth/internal-error') {
                                setError((prev) => ({
                                    ...prev, pass: true,
                                }))
                            } else {
                                setError((prev) => ({
                                    ...prev, error: true, pass: true,
                                }))
                            }
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

                </View> */}

                
                <View style={{
                    height : 48,
                    width : '100%',
                }}>
                    <Button icon={'google'} outline={false} text={'Get Started with Google'} onPress={async () => {
                        if(loading === true) return;

                        setLoading(true);
                        await googleSignIn()
                        setLoading(false);
                        }} loading={loading}    
                    />
                </View>

                {/* </View> */}

                <View style={{
                }}>
                    <Text style={{
                        marginTop : 6,
                        fontSize : 12, 
                        color : '#888888',
                        textAlign : 'center',
                    }}>
                        Please use your official NITJ account to get started.
                    </Text>
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

export default LoginScreen