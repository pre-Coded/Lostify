import React, { useContext } from 'react';

import { View, Text, Dimensions, Platform, Image } from 'react-native'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';

import Icon from 'react-native-vector-icons/AntDesign'
import SearchScreen from '../screens/SearchScreen';
import UploadScreen from '../screens/UploadScreen';
import NotificationScreen from '../screens/NotificationScreen';
import { flexRowBetween } from '../assets/style';
import { useNavigation } from '@react-navigation/native';
import FirebaseContxt from '../context/FirebaseContext';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const CustomTabBar = (props) => {
    return (
        
    )
}

const TabNavigator = () => {
    const { width } = Dimensions.get('window');

    // const navigation = useNavigation();

    const halfWindow = Math.floor(width / 2);
    const { unreadCount } = useContext(FirebaseContxt);

    // console.log(halfWindow);

    return (
        <Tab.Navigator
            sceneContainerStyle={{
                backgroundColor: '#131F25',
            }}
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    position: 'absolute',
                    height: 65,
                    borderTopWidth: 0,
                    backgroundColor: 'black',
                },
                tabBarHideOnKeyboard: true,
            }}

            tabBar = {
                (props) => <CustomTabBar {...props} />
            }
        >
            <Tab.Screen
                name='Home'
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{
                            top: Platform.OS === 'ios' ? 11 : 0,
                            alignSelf: 'center',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 2,
                            width: 65,
                            aspectRatio: 1,
                        }}>
                            <Icon
                                name="home"
                                size={focused ? 28 : 25}
                                color={focused ? '#FA7800' : 'rgba(255,255,255,0.4)'}
                            />
                            {
                                focused &&
                                <Text
                                    style={{
                                        color: focused ? '#Fa7800' : 'rgba(255,255,255,0.4)',
                                        fontSize: 10,
                                    }}>
                                    Home
                                </Text>
                            }
                        </View>
                    )
                }}
            />

            <Tab.Screen
                name='Search'
                component={SearchScreen}

                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{
                            top: Platform.OS === 'ios' ? 11 : 0,
                            alignSelf: 'center',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 2,
                            width: 65,
                            aspectRatio: 1,
                        }}>
                            <Icon
                                name="search1"
                                size={focused ? 28 : 25}
                                color={focused ? '#FA7800' : 'rgba(255,255,255,0.4)'}
                            />
                            {
                                focused &&
                                <Text
                                    style={{
                                        color: focused ? '#Fa7800' : 'rgba(255,255,255,0.4)',
                                        fontSize: 10,
                                    }}>
                                    Search
                                </Text>
                            }
                        </View>
                    )
                }}
            />

            <Tab.Screen
                name='Add'
                component={UploadScreen}

                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{
                            top: Platform.OS === 'ios' ? 11 : 0,
                            alignSelf: 'center',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 2,
                            width: 65,
                            aspectRatio: 1,
                        }}>
                            <Icon
                                name="pluscircle"
                                size={focused ? 28 : 25}
                                color={focused ? '#FA7800' : 'rgba(255,255,255,0.4)'}
                            />
                            {
                                focused &&
                                <Text
                                    style={{
                                        color: focused ? '#Fa7800' : 'rgba(255,255,255,0.4)',
                                        fontSize: 10,

                                    }}>
                                    Post
                                </Text>
                            }
                        </View>
                    )
                }}
            />

            <Tab.Screen
                name='Notification'
                component={NotificationScreen}

                options={
                    {
                        tabBarIcon: ({ focused }) => (
                            <View style={{
                                top: Platform.OS === 'ios' ? 11 : 0,
                                alignSelf: 'center',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 2,
                                width: 70,
                                aspectRatio: 1,
                            }}>
                                {
                                    unreadCount > 0 ?
                                        <View style={{
                                            position: 'absolute',
                                            top: 22,
                                            left: 28,
                                            backgroundColor: '#Fa7820',
                                            height: 10,
                                            aspectRatio: 1,
                                            borderRadius: 100,
                                        }} /> : ''
                                }


                                <Icon
                                    name="notification"
                                    size={focused ? 28 : 25}
                                    color={focused ? '#FA7800' : 'rgba(255,255,255,0.4)'}
                                />
                                {
                                    focused &&
                                    <Text
                                        style={{
                                            color: focused ? '#Fa7800' : 'rgba(255,255,255,0.4)',
                                            fontSize: 10,

                                        }}>
                                        Notification
                                    </Text>
                                }
                            </View>
                        )
                    }
                }
            />

            <Tab.Screen
                name='profile'
                component={ProfileScreen}

                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{
                            top: Platform.OS === 'ios' ? 11 : 0,
                            alignSelf: 'center',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 2,
                            width: 65,
                            aspectRatio: 1,
                        }}>
                            <Icon
                                    name="user"
                                    size={focused ? 28 : 25}
                                    color={focused ? '#FA7800' : 'rgba(255,255,255,0.4)'}
                            />
                            {
                                focused &&
                                <Text
                                    style={{
                                        color: focused ? '#Fa7800' : 'rgba(255,255,255,0.4)',
                                        fontSize: 10,

                                    }}>
                                    Profile
                                </Text>
                            }
                        </View>
                    )
                }}
            />
        </Tab.Navigator>
    )
}

export default TabNavigator;
