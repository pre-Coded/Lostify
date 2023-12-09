import { NavigationContainer, useNavigation } from '@react-navigation/native';
import React, { useContext, useState, useRef } from 'react'

import {
  View,
  Text,
  Image,
  ScrollView,
  PermissionsAndroid,
  ActivityIndicator
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ImageCropPicker from 'react-native-image-crop-picker';
import { SafeAreaView } from 'react-native-safe-area-context';

import profileImg from '../assets/images/profile.png'
import Button from '../components/Button';
import MediumText from '../components/Text/MediumText';
import SmallText from '../components/Text/SmallText';
import FirebaseContxt from '../context/FirebaseContext';
import Loader from './Loader';

import { BottomSheetModal, BottomSheetModalProps, BottomSheetModalProvider } from '@gorhom/bottom-sheet';

import cameraIcon from '../assets/images/camera.png';
import galleryIcon from '../assets/images/picture.png';

import AntDesign from 'react-native-vector-icons/AntDesign'


const ProfileScreen = () => {
  const { logOut, username, uploadImage, updateUser, convertToHttps } = useContext(FirebaseContxt);

  const bottomSheetRef = useRef(null);

  // variables
  const snapPoints = ['15%']

  // callbacks
  // const handleSheetChanges = useCallback((index) => {
  //     console.log('handleSheetChanges', index);
  // }, []);

  const handlePresentModal = (type) => {
    type === 'open' ?
      bottomSheetRef.current?.present() :
      bottomSheetRef.current?.close()
  }


  // other things

  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const [image, setImage] = useState('');

  console.log(username);

  let imageSource = require('../assets/images/profile.png');

  if (username?.profilePhoto?.length > 0) {
    console.log(convertToHttps(username.profilePhoto));
    imageSource = { uri: (username.profilePhoto), headers: { Accept: '*/*' } };
  }

  // const handleProfilePhotoUpload = async (imgUrl) => {
  //   try {
  //     const url = await uploadImage(imgUrl);

  //     await updateUser('profilePhoto', url);

  //   } catch (e) {
  //     console.log("Profile Error >> ", e);
  //   }
  // }

  // const requestCameraPermission = async () => {

  //   setImgLoading(true);

  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.CAMERA,
  //       {
  //         title: 'Cool Photo App Camera Permission',
  //         message:
  //           'Cool Photo App needs access to your camera ' +
  //           'so you can take awesome pictures.',
  //         buttonNeutral: 'Ask Me Later',
  //         buttonNegative: 'Cancel',
  //         buttonPositive: 'OK',
  //       },
  //     );
  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       console.log('You can use the camera');

  //       ImageCropPicker.openCamera({
  //         width: 300,
  //         height: 400,
  //         cropping: true,
  //         compressImageQuality: 0.7,
  //       }).then(async (image) => {
  //         console.log(image);


  //         await handleProfilePhotoUpload(image.path);

  //         setImage(image.path);
  //       });

  //     } else {
  //       console.log('Camera permission denied');
  //     }
  //   } catch (err) {
  //     console.warn(err);
  //   }

  //   setImgLoading(true);
  // };

  const [imgLoading, setImgLoading] = useState(false);

  const handleLauchCamera = () => {
    ImagePicker.openCamera({
      cropping: true,
      compressImageQuality: 0.7,
    }).then(image => {
      console.log(image);
      setImage(image.path);
    }).catch((e) => console.log(e));

    handlePresentModal('close');
  };

  const handleImageSelect = async () => {
    ImagePicker.openPicker({
      cropping: true,
      compressImageQuality: 0.7,
    }).then(image => {
      console.log(image);
      setImage(image.path);
    }).catch((e) => console.log("error", e));

    handlePresentModal('close');
  };


  return (
    <BottomSheetModalProvider>
      <SafeAreaView>

        {/* <BottomSheetModal
          ref={bottomSheetRef}
          index={0}
          snapPoints={snapPoints}

          bottomInset= {65}

          backgroundStyle={{
            backgroundColor: 'rgba(0,0,0,0.3)',
            borderRadius: 10,
          }}

          handleIndicatorStyle={{
            backgroundColor: '#FA7800',
            width: 80,
          }}
          keyboardBehavior={'interactive'}
          enableHandlePanningGesture
        >
          <View style={{
            flexDirection: 'row',
            paddingHorizontal: 10,
            paddingTop: 10,
            gap: 10,
          }}>
            <TouchableOpacity onPress={handleLauchCamera}>
              <Image
                source={cameraIcon}
                resizeMode={'cover'}
                style={{
                  height: 70,
                  aspectRatio: 1,
                }}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={handleImageSelect}>
              <Image
                source={galleryIcon}
                resizeMode={'cover'}
                style={{
                  height: 70,
                  aspectRatio: 1,
                }}
              />
            </TouchableOpacity>

          </View>

        </BottomSheetModal> */}

        <View style={{
          height: '100%',
        }}>
          <View
            style={{
              // marginTop: 10,
              marginHorizontal: 6,
              height: 100,
              flexDirection: 'row',
            }}>

            <View
              style={{
                height: '100%',
                aspectRatio: 1,
                borderRadius: 100,
                alignItems: 'center',
                borderWidth: 1,
                borderColor: '#FA7800',
                padding: 2,
                justifyContent: 'center',
                // overflow: 'hidden',
              }}
            >

              {
                imgLoading && <View style={{
                  height: '100%',
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'transparent',
                  borderRadius: 100,
                  position: 'absolute',
                  overflow: 'hidden',
                }}>
                  <ActivityIndicator color={'white'} size="large" />
                </View>
              }

              <Image
                resizeMode='cover'
                source={imageSource}
                alt="Profile"
                style={{
                  height: '100%',
                  width: '100%',
                  borderRadius: 100,
                }}
              />

            </View>

            <View style={{
              height: '100%',
              justifyContent: 'center',
              gap: 6,
              marginLeft: 10,
            }}>
              <MediumText text={username?.username} color="white" />

              <SmallText text={username?.email} color="#888888" />
            </View>

          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              marginTop: 10,
              padding: 6,
              gap: 4,
              paddingBottom: 80
            }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('seeallitem', { type: 'yourpost' })}
              style={{
                height: 56,
                backgroundColor: '#333333',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
              }}>
              <SmallText text="Your Posts" color={'white'} />
            </TouchableOpacity>

            <TouchableOpacity 
            
            onPress={() => {
              navigation.navigate('contactus');
            }}
              
            style={{
              height: 56,
              backgroundColor: '#333333',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
            }}>
              <SmallText text={"Contact Us"} color="white" />
            </TouchableOpacity>

            <View style={{
              height : 48,
              marginTop: 8,
            }}>
              <Button text="Log Out" onPress={async () => {
                if(loading === true) return;

                try {
                  console.log("Happening")
                  setLoading(prev => !prev);
                  await logOut();
                  setLoading(prev => !prev);
                  navigation.navigate('welcomePage');
                } catch (e) {
                  console.log("Error in Signing Out.", e);
                }
              }} loading={loading} />
            </View>

          </ScrollView>
        </View>
      </SafeAreaView>
    </BottomSheetModalProvider>
  )
}

export default ProfileScreen;