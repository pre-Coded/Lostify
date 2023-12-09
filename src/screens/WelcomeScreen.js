import React, { useContext, useEffect } from 'react'

import {
    View,
    Text,
    Touchable,
    TouchableOpacity,
    StatusBar,
    ImageBackground,
    ActivityIndicator,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/Button';
import Logo from '../components/Logo';
import FirebaseContxt from '../context/FirebaseContext';
import TabNavigator from '../navigation/TabNavigator';
import backgroundImage from '../assets/images/backgroundImage.png'
import SmallText from '../components/Text/SmallText';
import UploadScreen from './UploadScreen';
import ConfirmUploadScreen from './ConfirmUploadScreen';
import NotificationScreen from './NotificationScreen';

import messaging from '@react-native-firebase/messaging';
import ErrorScreen from './ErrorScreen';
import LoginScreen from './LoginScreen';
import ContactUsScreen from './ContactUsScreen';
import SeeAllItemScreen from './SeeAllItemScreen';

import Antdesign from 'react-native-vector-icons/AntDesign';

const WelcomeScreen = ({ navigation }) => {
    const { user, initializing, notificationClick } = useContext(FirebaseContxt);

    const handlePress = async (id) => {
        try {
            const res = await notificationClick(id);

            console.log("Notificicatoin click >> ", res.data());

            const details = res.data();

            if (res) {
                navigation.navigate('singleItemPage', { details, type: details?.type })
            }

        } catch (e) {
            console.log("notification click >> ", e);
        }
    }

    useEffect(() => {
        const subNot = messaging().onNotificationOpenedApp(remoteMessage => {
            const res = JSON.parse(remoteMessage.data.data);
            const id = res.data.id;
            handlePress(id);
        });

        return subNot;
    }, [])

    if (initializing) return <View
    source={require('../assets/images/backgroundImage.png')}
    style={{
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    }}>
        <Antdesign
        name={'find'}
        size={ 60 }
        color={'#Fa7800'}
        />
    </View>;

    if (user) return <TabNavigator />;

    return <LoginScreen />
}

export default WelcomeScreen