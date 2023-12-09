import React, { useContext, useEffect, useState } from 'react'

import {
    View,
    Text,
    SafeAreaView,
    Touchable,
    TouchableOpacity,
    Image,
    FlatList,
    Button,
    ScrollView,
    ActivityIndicator,
    RefreshControl
} from 'react-native';
import FilterButton from '../components/FilterButton';
import ItemCard from '../components/ItemCard';

import style from '../assets/style';
import FirebaseContxt from '../context/FirebaseContext';

import profileImg from '../assets/images/profile.png'
import MediumText from '../components/Text/MediumText';
import SmallText from '../components/Text/SmallText';
import Logo from '../components/Logo';
import Loader from './Loader';

import Icon from 'react-native-vector-icons/AntDesign'

const HomeScreen = ({ navigation }) => {

    const { username, fetchAllItem } = useContext(FirebaseContxt);

    const [lostItem, setLostItem] = useState([]);
    const [foundItem, setFoundItem] = useState([]);

    const [refresh, setRefresh] = useState(false);

    // const handleRefresh = async () => {
    //     try{

    //     }catch(e){

    //     }
    // }

    const fetchDetails = async () => {
        setRefresh(true);
        var arr;
        try {
            arr = await fetchAllItem( undefined, 'all');

            const lostItem = arr.filter(item => item.data.type === 'lost');
            const foundItem = arr.filter(item => item.data.type === 'found');

            setLostItem(lostItem);
            setFoundItem(foundItem);
        } catch (e) {
            console.log("Error in loading >> ", e);
        }
        setRefresh(false);
    };

    useEffect(() => {
        fetchDetails();
    }, [])

    const data = [
        {
            text: 'Key',
            icon: 'key',
            bgColor: '#999999'
        },
        {
            text: 'Id Card',
            icon: 'id-card',
            bgColor: '#8CC63F'
        },
        {
            text: 'Bottle',
            icon: 'bottle-soda',
            bgColor: '#E44D26'
        },
        {
            text: 'Watch',
            icon: 'watch',
            bgColor: '#0071BC'
        },
        {
            text: 'Bag',
            icon: 'bag-personal',
            bgColor: '#DDAA00'
        },
    ]

    const renderFilterItem = (item) => {
        return (
            <FilterButton
                bgColor={item.item.bgColor}
                text={item.item.text}
                icon={item.item.icon}
            />
        )
    }

    let imageSource = require('../assets/images/profile.png');

    if (username?.profilePhoto !== "") {
        imageSource = { uri: username?.profilePhoto, headers: { Accept: '*/*' } };
    }

    const [imgLoad, setImgLoad] = useState(true);

    return (
        <SafeAreaView>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refresh}
                        onRefresh={fetchDetails}
                        tintColor={'white'}
                    />
                }

                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: 6,
                    paddingBottom: 40,
                    minHeight: '100%',
                }}
            >
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 16,
                }}>
                    < Logo />
                    <TouchableOpacity
                        onPress={() => navigation.navigate('seeallitem', { type: 'yourpost' })}
                        style={{
                            height: 45,
                            aspectRatio: 1,
                            borderRadius: 100,
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden',
                        }}
                    >
                        <Icon
                            name="edit"
                            size={30}
                            color={'#Fa7800'}
                        />
                    </TouchableOpacity>
                </View>
                {
                    !refresh &&

                    <>
                        <View
                            style={{ gap: 12, paddingBottom: 40 }}>

                            {/* filter section */}
                            <View style={{ gap: 8, }}>
                                <MediumText text={'Quick Filters'} color={'white'} />

                                {/* filterButton Section */}

                                <FlatList
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    data={data}
                                    renderItem={renderFilterItem}
                                    keyExtractor={item => item.text}
                                />

                            </View>



                            {/* Recently found item */}
                            <View style={{ gap: 4 }}>

                                <View style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}>
                                    <MediumText text={'Lost Items'} color={'white'} />
                                    <TouchableOpacity onPress={() => navigation.navigate('seeallitem', { type: 'lost' })}>
                                        <SmallText text={'See all'} color={'#FA7800'} />
                                    </TouchableOpacity>
                                </View>

                                <FlatList
                                    horizontal
                                    data={lostItem}
                                    showsHorizontalScrollIndicator={false}
                                    renderItem={(item) => <ItemCard id={item.item.id} details={item.item.data} />}
                                    keyExtractor={item => item.id}
                                />

                            </View>

                            {/* recently found item */}
                            <View style={{ gap: 4, }}>

                                <View style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}>
                                    <MediumText text={'Found Items'} color={'white'} />

                                    <TouchableOpacity onPress={() => navigation.navigate('seeallitem', { type: 'found' })}>
                                        <SmallText text={'See all'} color={'#FA7800'} />
                                    </TouchableOpacity>
                                </View>

                                {/* itemCard Section */}

                                <FlatList
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    data={foundItem}
                                    renderItem={(item) => <ItemCard id={item.item.id} details={item.item.data} />}
                                    keyExtractor={item => item.id}
                                />
                            </View>
                        </View>
                    </>
                }
            </ScrollView >
        </SafeAreaView >
    )
}

export default HomeScreen