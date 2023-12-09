import React, { useContext, useEffect } from 'react'
import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import Logo from '../components/Logo'

import profileImg from '../assets/images/profile.png'
import FirebaseContxt from '../context/FirebaseContext'
import { useNavigation } from '@react-navigation/native'
import messaging from '@react-native-firebase/messaging';
import MediumText from '../components/Text/MediumText'
import LargeText from '../components/Text/LargeText'

import Antdesign from 'react-native-vector-icons/AntDesign'

const NotificationCard = ({ id, type, title, body, time, url }) => {

  const navigation = useNavigation();

  const { notificationClick } = useContext(FirebaseContxt);

  const handlePress = async () => {
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

  return (
    <TouchableOpacity

      onPress={handlePress}

      style={{
        flexDirection: 'row',
        height: 80,
        marginHorizontal: 6,
        borderRadius: 5,
        alignItems: 'center',
        gap: 10,
        marginBottom: 10,
      }}>
      <View
        onPress={() => navigation.navigate('profile')}
        style={{
          height: 58,
          aspectRatio: 1,
          borderRadius: 100,
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <Image
          resizeMode='cover'
          source={url?.length > 0 ? { uri: url } : profileImg}
          alt="Profile"
          style={{
            height: '100%',
            width: '100%',
          }}
        />
      </View>

      <View style={{
        flex: 1,
        gap: 2,
        justifyContent: 'center',
        overflow: 'hidden',
      }}>
        <Text
          numberOfLines={1}
          style={{
            fontSize: 18,
            color: 'white'
          }}>
          {
            title
          }
        </Text>

        <Text
          numberOfLines={1}
          style={{
            fontSize: 13,
            color: '#666666'

          }}>
          {
            body
          }
        </Text>

        <View style={{
          alignSelf: 'flex-end'
        }}>
          <Text
            numberOfLines={1}
            style={{
              fontSize: 13,
              color: '#666666'
            }}>
            {
              time
            }
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}


const NotificationScreen = () => {

  const { notification, findTime, requestUserPermission, setUnreadCount } = useContext(FirebaseContxt);

  notification.sort((a, b) => b.timeStamp - a.timeStamp);

  useEffect(() => {
    setUnreadCount(0);
    requestUserPermission();
  }, [])

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={{
        minHeight: '100%',
        paddingBottom: 100,
      }}>
        <View style={{
          // paddingTop: 10,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection : 'row',
          position : 'relative'
        }}>
          <LargeText text={'Notification'} color={'white'} />
        </View>

        <View style={{
          marginTop: 10,
          position: 'relative',
        }}>
          {
            notification.map((item) => {
              return (
                <NotificationCard key={item.id} id={item.id} title={item.title} type={item.type} time={findTime(item.timeStamp)} body={item.body} url={item.url} />
              )
            })
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default NotificationScreen