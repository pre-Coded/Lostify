import React, { useState, useContext } from 'react'
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, FlatList, Dimensions, ActivityIndicator, Keyboard } from 'react-native'

import Icon from 'react-native-vector-icons/Entypo'
import ItemCard from '../components/ItemCard'
import MediumText from '../components/Text/MediumText'
import FirebaseContxt from '../context/FirebaseContext'

const SearchScreen = () => {
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);

    const [item, setItem] = useState([]);

    const { width } = Dimensions.get('window');

    const numColumns = Math.floor(width / 180);

    const { searchItem } = useContext(FirebaseContxt);

    const handleSearch = async () => {
        if (search.length <= 0) return;

        setLoading(true);
        try {
            const result = await searchItem();
            var itemList = [];

            result.forEach(documentSnapshot => {
                itemList.push({
                    id: documentSnapshot.id,
                    data: documentSnapshot.data()
                });
            });

            console.log(itemList[0].data.title);

            const query = search.toLowerCase();
            const filteredArray = itemList.filter((item) => (
                item.data.title.toLowerCase().includes(query) || item.data.tag.toLowerCase().includes(query) ||
                item.data.user.toLowerCase().includes(query) || item.data.type.toLowerCase().includes(query)
            ));


            filteredArray.sort((a, b) => b.data.timeStamp - a.data.timeStamp);

            setItem(filteredArray);
        } catch (e) {
            console.log('Error in searching >> ', e);
        }
        setLoading(false);
    }

    return (
        <SafeAreaView>
            <View style={{
                backgroundColor: 'rgba(0,0,0,0.4)',
                height: 60,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginHorizontal: 6,
                borderRadius: 10,
                paddingHorizontal: 6,
            }}>

                <TextInput
                    placeholder='Get Your Items Quick'
                    placeholderTextColor={'#888888'}
                    onChangeText={(newText) => {
                        setSearch(newText)
                    }}

                    value={search}

                    style={{
                        flex: 1,
                        fontSize: 16,
                        color: '#999999',
                    }}
                    autoCorrect={false}
                    autoCapitalize={'none'}
                    onSubmitEditing={handleSearch}
                />

                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6,
                }}>
                    {
                        search && <TouchableOpacity
                            onPress={() => {
                                setSearch('');
                                setItem([]);
                            }}
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                            <Icon
                                name='cross'
                                size={24}
                                color={'#888888'}
                            />
                        </TouchableOpacity>
                    }

                    <TouchableOpacity
                        onPress={handleSearch}
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <Icon
                            name='magnifying-glass'
                            size={32}
                            color={'white'}
                        />
                    </TouchableOpacity>
                </View>
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
                                data={item}
                                showsVerticalScrollIndicator={false}
                                numColumns={3}
                                renderItem={(item) =>
                                    <ItemCard details={item.item.data} />
                                }
                                keyExtractor={item => item.id}

                                style={{
                                    marginTop : 10,
                                }}
                            /> :

                            <View style={{
                                height: '90%',
                                width: '100%',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>

                                <MediumText text={'No Posts'} color={'#888888'} />
                            </View>
                    )
            }
        </SafeAreaView>
    )
}

export default SearchScreen