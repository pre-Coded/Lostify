import React from 'react'

import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  Linking,
  TouchableOpacity
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import Antdesign from 'react-native-vector-icons/AntDesign'

import PhoneCall from 'react-native-phone-call';

import profileImg from '../assets/images/profile.png'
import Button from '../components/Button';
import LargeText from '../components/Text/LargeText';
import MediumText from '../components/Text/MediumText';
import SmallText from '../components/Text/SmallText';
import ErrorScreen from './ErrorScreen';

const SingleItemPage = () => {

  const navigation = useNavigation();
  const route = useRoute();

  const { details, type } = route.params;

  const dialNumber = () => {

    const phoneNumber = details?.data.number;

    const args = {
      number: phoneNumber,
      prompt: true,
      skipCanOpen: true
    };

    PhoneCall(args).catch((error) => console.error('Error making the phone call:', error));
  };

  if (!details) {
    return <ErrorScreen text={'Post Not Found'} />
  }

  let ImageSouce = require('../assets/images/NoImage.png')

  if (details.url.length > 0) {
    ImageSouce = { uri: details.url, headers: { Accept: '*/*' } };
  }

  return (
    <SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          // paddingTop: 10,
          paddingHorizontal: 6,
          paddingBottom: 20,
        }}>

        <View style={{

          marginBottom: 10,
          flexDirection: 'row',
          gap: 6,
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Antdesign
              name={'find'}
              size={32}
              color={'#Fa7800'}
            />
          </TouchableOpacity>

          <Text style={{
            color: 'white',
            fontWeight: 600,
            fontSize: 24,
          }}>
            {type === 'lost' ? 'Lost Item' : 'Found Item'}
          </Text>
        </View>

        <View style={{
          height: 360,
          width: '100%',
          borderRadius: 5,
          borderWidth: 0.5,
          borderColor: '#444444',
          overflow: 'hidden',
          marginBottom: 6,
        }}>
          <Image
            source={ImageSouce}
            resizeMode='cover'
            style={{
              height: '100%',
              width: '100%',
            }}
          />
        </View>

        <View style={{
          gap: 4,
          marginBottom: 10,
        }}>

          <View style={{
            marginBottom: 10,
          }}>
            <MediumText text={details?.data.title} color={'white'} />
            <SmallText text={details?.data.desc} color={'white'} />
          </View>

          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            marginTop: 2,
          }}>

            <View style={{
              backgroundColor: '#333333',
              paddingVertical: 4,
              paddingHorizontal: 10,
              borderRadius: 10,
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
              <Text style={{
                color: 'white',
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: 1,
              }}>
                {type === 'lost' ? 'Lost By' : 'Found By'}
              </Text>
            </View>

            <Text style={{
              color: 'white',
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: 1,
            }}>
              {" " + details?.data.name}
            </Text>

          </View>

          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}>

            <View style={{
              backgroundColor: '#333333',
              paddingVertical: 4,
              paddingHorizontal: 10,
              borderRadius: 10,
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
              <Text style={{
                color: 'white',
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: 1,
              }}>
                Color :
              </Text>
            </View>

            <Text style={{
              color: 'white',
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: 1,
            }}>
              {" " + details?.data.color}
            </Text>

          </View>

          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}>

            <View style={{
              backgroundColor: '#333333',
              paddingVertical: 4,
              paddingHorizontal: 10,
              borderRadius: 10,
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
              <Text style={{
                color: 'white',
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: 1,
              }}>
                Location :
              </Text>
            </View>

            <Text style={{
              color: 'white',
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: 1,
            }}>
              {" " + details?.data.nearby}
            </Text>

          </View>

        </View>

        <View style={{
          height : 48,
          marginTop: 8,
        }}>
          <Button icon={'call-made'} text={'Contact'} onPress={dialNumber} width={'100%'} />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SingleItemPage