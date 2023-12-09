import React, { useState, useContext, useMemo, useCallback, useRef } from 'react'

import {
    View,
    Text,
    TextInput,
    Image,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    PermissionsAndroid
} from 'react-native';

import ImagePicker from 'react-native-image-crop-picker';

import Button from '../components/Button';

import Icon from 'react-native-vector-icons/AntDesign'

import FirebaseContxt from '../context/FirebaseContext';

import { useNavigation, useRoute } from '@react-navigation/native';

import Antdesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import LargeText from '../components/Text/LargeText';
import { FlatList } from 'react-native-gesture-handler';

import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';

import cameraIcon from '../assets/images/camera.png';
import galleryIcon from '../assets/images/picture.png';

const AddItemScreen = () => {

    const bottomSheetRef = useRef(null);
    const snapPoints = ['15%']
    const handlePresentModal = (type) => {
        type === 'open' ?
            bottomSheetRef.current?.present() :
            bottomSheetRef.current?.close()
    }

    const navigation = useNavigation();
    const route = useRoute();

    const [loadingFound, setLoadingFound] = useState(false);
    const [loadingLost, setLoadingLost] = useState(false);

    const { uploadItem } = useContext(FirebaseContxt);

    const title = useRef(null);
    const desc = useRef(null);
    const color = useRef(null);
    const number = useRef(null);
    const nearby = useRef(null);
    const name = useRef(null);


    const [error, setError] = useState('');
    const [image, setImage] = useState('');

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

    const [selectedTag, setSelectedTag] = useState('');

    const tagData = [
        'Key',
        'Id Card',
        'Bottle',
        'Bag',
        'Watch',
        'None'
    ];

    const handlePress = async (type) => {

        if (title.current?.value.length <= 0) {
            setError('title');
            return;
        };

        if (number.current?.value.length <= 0 || number.current?.value.length > 10) {
            setError('number');
            return;
        };

        const itemDetails = {
            title: title.current.value,
            name: name.current.value,
            desc: desc.current.value,
            color: color.current.value,
            nearby: nearby.current.value,
            number: number.current.value,
        }

        try {
            const res = await uploadItem(image, itemDetails, selectedTag, type);

            if (res) navigation.navigate('uploadconfirm', { type: type, title: itemDetails.title });
            else {
                navigation.navigate('error', { text: 'Error in uploading, please try again.' });
            }
        } catch (e) {
            console.log("Error Page.", e);
            navigation.navigate('error');
        }

    }

    return (
        <BottomSheetModalProvider>
            <SafeAreaView>
                <BottomSheetModal
                    ref={bottomSheetRef}
                    index={0}
                    snapPoints={snapPoints}
                    backgroundStyle={{
                        backgroundColor: 'black',
                    }}

                    containerStyle={{
                        borderRadius : 10,
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

                </BottomSheetModal>

                <View>

                    <View style={{
                        minHeight: '100%',
                        paddingHorizontal: 4,
                        gap: 6,
                    }}>
                        <View style={{
                            width: '100%',
                            position: 'relative',
                            flexDirection: 'row',
                            gap: 4,
                        }}>
                            <TouchableOpacity
                                style={{
                                    backgroundColor: 'rgba(0,0,0,0.4)',
                                    overflow: 'hidden',
                                    height: 120,
                                    aspectRatio: 1,
                                    borderRadius: 10,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                                onPress={() => { handlePresentModal('open') }}
                            >
                                <View style={{
                                    height: '100%',
                                    width: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: 4,
                                }}>
                                    {
                                        !image ?
                                            <Icon
                                                name="upload"
                                                size={35}
                                                color={'#888888'}
                                            /> :

                                            <View style={{
                                                height: '100%',
                                                width: '100%',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}>
                                                <Image
                                                    resizeMode='cover'
                                                    source={{ uri: image === '' ? '../assets/images/NoImage.png' : image }}
                                                    alt="Profile"
                                                    style={{
                                                        height: '100%',
                                                        width: '100%',
                                                    }} />
                                            </View>
                                    }
                                    {
                                        !image && <Text style={{ color: '#888888', fontSize: 10, }}>Photo</Text>
                                    }
                                </View>
                            </TouchableOpacity>


                            <View style={{
                                flex: 1,
                                justifyContent: 'space-between',
                                gap: 6,
                            }}>
                                <TextInput

                                    ref={title}
                                    onChangeText={(e) => title.current.value = e}

                                    placeholder="Product Title"
                                    placeholderTextColor={'rgba(255,255,255,0.8)'}
                                    style={{
                                        color: 'white',
                                        height: 56,
                                        width: '100%',
                                        backgroundColor: 'rgba(0,0,0,0.4)',
                                        paddingHorizontal: 10,
                                        fontSize: 16,
                                        borderRadius: 10,
                                        borderWidth: error === 'title' ? 1 : 0,
                                        borderColor: error === 'title' ? '#E44D26' : null,
                                    }}
                                />

                                <TextInput
                                    ref={name}
                                    onChangeText={(e) => name.current.value = e}

                                    placeholder={'Your Name'}

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
                            </View>
                        </View>

                        <TextInput
                            ref={desc}
                            onChangeText={(e) => desc.current.value = e}

                            placeholder='Description'
                            numberOfLines={4}

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

                        <TextInput
                            ref={nearby}
                            onChangeText={(e) => nearby.current.value = e}

                            placeholder='Location'

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

                        <TextInput
                            ref={color}
                            onChangeText={(e) => color.current.value = e}

                            placeholder='Color'
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

                        <TextInput
                            ref={number}
                            onChangeText={(e) => number.current.value = e}

                            placeholder='Contact Number'

                            inputMode={'numeric'}

                            placeholderTextColor={'rgba(255,255,255,0.8)'}
                            style={{
                                color: 'white',
                                height: 56,
                                width: '100%',
                                backgroundColor: 'rgba(0,0,0,0.4)',
                                paddingHorizontal: 10,
                                fontSize: 16,
                                borderRadius: 10,
                                borderWidth: error === 'number' ? 1 : 0,
                                borderColor: error === 'number' ? '#E44D26' : null,
                            }}
                        />

                        <View style={{
                            flexDirection: 'row',
                            gap: 10,
                        }}>
                            <View style={{
                                height: 52,
                                backgroundColor: 'rgba(0,0,0,0.6)',
                                borderRadius: 10,
                                alignItems: 'center',
                                justifyContent: 'center',
                                paddingHorizontal: 16,
                                paddingVertical: 6,
                            }}>
                                <Text style={{
                                    color: 'white',
                                    fontSize: 16,
                                }}>
                                    Add Tag
                                </Text>
                            </View>

                            <FlatList
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                data={tagData}
                                renderItem={
                                    (item) => {
                                        return (
                                            <TouchableOpacity
                                                onPress={() => setSelectedTag(item.item)}
                                                style={{
                                                    height: 52,
                                                    backgroundColor: item.item === selectedTag ? '#8CC63F' : 'rgba(0,0,0,0.4)',
                                                    borderRadius: 10,
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    paddingHorizontal: 16,
                                                    paddingVertical: 6,
                                                    marginRight: 6,
                                                }}>
                                                <Text style={{
                                                    color: 'white',
                                                    fontSize: 16,
                                                }}>
                                                    {
                                                        item.item
                                                    }
                                                </Text>
                                            </TouchableOpacity>
                                        )
                                    }
                                }
                            />
                        </View>

                        <View style={{ 
                            height : 42,
                            marginTop: 10, 
                            flexDirection : 'row', 
                            gap : 10,
                            width : '100%',
                        }}>
                            <Button outline={true} text={'I Found'} onPress={async () => {
                                if(loadingFound || loadingLost) return;

                                setLoadingFound(true);
                                try{
                                    await handlePress('found');
                                }catch(e){
                                    console.log("Error");
                                }
                                setLoadingFound(false);
                            } } loading={loadingFound} />

                            <Button outline={false} text={'I Lost'} onPress={async () => {
                                if(loadingFound || loadingLost) return;

                                setLoadingLost(true);
                                try{
                                    await handlePress('lost');
                                }catch(e){
                                    console.log("Error");
                                }
                                setLoadingLost(false);

                            } } loading={loadingLost} />
                        </View>

                    </View>
                </View>
            </SafeAreaView>
        </BottomSheetModalProvider>
    )
}

export default AddItemScreen;