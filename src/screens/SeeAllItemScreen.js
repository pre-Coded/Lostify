import React, { useEffect, useContext, useState, useCallback } from "react";
import { FlatList, SafeAreaView, View, Dimensions, TouchableOpacity, ActivityIndicator, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation, useRoute } from "@react-navigation/native";
import LargeText from "../components/Text/LargeText";
import FirebaseContxt from "../context/FirebaseContext";
import ItemCard from "../components/ItemCard";

import Antdesign from 'react-native-vector-icons/AntDesign'
import MediumText from "../components/Text/MediumText";
import { createTestScheduler } from "jest";
import Button from "../components/Button";
import { ColorSpace } from "react-native-reanimated";

const SeeAllItemScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();

    const [width, setWidth] = useState(Math.floor(Dimensions.get('window').width / 180));

    const { fetchAllItem, allItem, user } = useContext(FirebaseContxt);

    const { type, refresh } = route.params;


    const [title, setTitle] = useState('Title');
    const [loading, setLoading] = useState(false);


    const fetchItem = async () => {
        if (type === 'lost') {
            setTitle('Lost Item')
        } else if (type === 'found') {
            setTitle('Found Item');
        } else if (type === 'yourpost') {
            setTitle('Your Posts');
        } else if (type === 'Id Card') {
            setTitle('Id Cards');
        } else if (type === 'Bottle') {
            setTitle('Bottle');
        } else if (type === 'Bag') {
            setTitle('Bags');
        } else if (type === 'Watch') {
            setTitle('Watches');
        } else if (type === 'Umbrella') {
            setTitle('Umbrellas');
        } else if (type === 'Key') {
            setTitle('Keys')
        }
    }


    const [fetchMore, setFetchMore] = useState(false);
    const [item, setItem] = useState([]);
    const loadMore = async () => {
        try {
            setFetchMore(true);
            const arr = await fetchAllItem(allItem[allItem.length - 1]?.data.timeStamp, type);

            if (arr === false) {
                setFetchMore(false); return;
            };

            setItem((prev) => ([...prev, ...arr]));
            setFetchMore(false);
        } catch (e) {
            console.log("Error in fetching >> ", e);
        }
    };

    const fetchDetails = async () => {
        var arr;

        setLoading(true);

        if (allItem.length > 0) {

            if (type === 'lost' || type === 'found') {
                arr = allItem.filter(item => item.data.type === type);
            } else if (type === 'yourpost') {
                arr = allItem.filter(item => item.data.user === user?.email);
            } else {
                arr = allItem.filter(item => item.data.tag === type);
            }

            setItem((prev) => ([...prev, ...arr]));
        } else {
            try {
                arr = await fetchAllItem(undefined, type);
                setItem((prev) => ([...prev, ...arr]));
            } catch (e) {
                console.log("Error in loading >> ", e);
            }
        }

        setLoading(false);
    };

    useEffect(() => {
        fetchDetails();
        fetchItem();
    }, [type])

    return (
        <SafeAreaView>
            <View style={{
                height: '100%',
            }}>

                <View style={{
                    marginBottom: 10,
                    flexDirection: 'row',
                    gap: 6,
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    marginLeft: 6,
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
                        {title}
                    </Text>
                </View>

                {
                    loading ?
                        <View style={{
                            height: '100%',
                            width: '100%',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <ActivityIndicator color={'white'} size={30} />
                        </View>
                        :
                        (
                            item.length > 0 ?
                                <FlatList
                                    showsVerticalScrollIndicator={true}
                                    data={item}
                                    numColumns={3}
                                    renderItem={(item) =>
                                        <ItemCard confirmDelelte={() => { setDelete(true) }} id={item.item.id} type={type} details={item.item.data} />
                                    }
                                    keyExtractor={item => item.id}

                                    onEndReachedThreshold={0.1}

                                    ListFooterComponent={
                                        fetchMore ?
                                            <View style={{marginTop : 10,}}>
                                                <ActivityIndicator size={'large'} color={'white'} />
                                            </View>
                                            :
                                            <View style={{height : 48, marginTop: 10 }}>
                                                <Button text={'See More'} icon={'arrow-down'} outline={false} onPress={loadMore} />
                                            </View>
                                    }
                                />
                                :
                                <View style={{
                                    height: '100%',
                                    width: '100%',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                    <MediumText text={'No Posts'} color={'#999999'} />
                                </View>
                        )
                }
            </View>
        </SafeAreaView>
    )
}

export default SeeAllItemScreen;