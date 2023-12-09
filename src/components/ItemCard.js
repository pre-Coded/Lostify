import React, { useContext, useState } from 'react'
import { Touchable, TouchableOpacity, View, Text, Image, ActivityIndicator, Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native'


import FirebaseContxt from '../context/FirebaseContext'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Loader from '../screens/Loader'

const ItemCard = ({ type, details, id }) => {

    var { width } = Dimensions.get('screen');
    var postWidth = Math.floor(width / (3.1));

    const navigation = useNavigation();

    const { findTime } = useContext(FirebaseContxt);

    let ImageSouce = require('../assets/images/NoImage.png')

    if (details?.url.length > 0) {
        ImageSouce = { uri: details.url, headers: { Accept: '*/*' } };
    }

    const [imgLoading, setImgLoading] = useState(false);

    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('singleItemPage', { details, type: details?.type })}
            style={{
                height: postWidth + 10,
                width : postWidth,
                borderRadius: 2,
                position: 'relative',
                overflow: 'hidden',
                marginHorizontal : 2,
                marginBottom : 4,
            }}
        >
            {imgLoading &&  <Loader /> }

            <Image
                source={ImageSouce}

                onError={(error) => console.error('Image load error:', error)}

                alt={'Image'}
                resizeMode='cover'

                onLoadStart={() => {
                    setImgLoading(true);
                }}

                onLoad={() => {
                    setImgLoading(false);
                }}

                onLoadEnd={() => {
                    setImgLoading(false);
                }}

                style={{
                    height: '100%',
                    width: '100%',
                }}
            />

            <View style={
                {
                    position: 'absolute',
                    top: 4,
                    right: 4,
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                }
            }>
                {
                    type === 'yourpost' &&
                    <>
                        <TouchableOpacity onPress={async () => {
                            try {

                                // await deletePost(id);
                                console.log("Deleted");
                                navigation.navigate('uploadconfirm', { type: 'delete', id: id });

                            } catch (e) {
                                console.log("Error >> ", e);
                            }
                        }}>
                            <MaterialCommunityIcons
                                name={'delete'}
                                color={'#E44D26'}
                                size={34}
                            />
                        </TouchableOpacity>
                    </>
                }
            </View>

            <View style={{
                position: 'absolute',
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                width: '100%',
                height: '35%',
                bottom: 0,
                paddingHorizontal: 2,
                paddingVertical: 4,
                paddingBottom: 4,
                justifyContent: 'space-between'
            }}>

                {/* Header */}
                <Text
                    numberOfLines={1}
                    style={{
                        color: 'white',
                        fontSize: 15,
                        fontWeight: 400,
                        letterSpacing: 0.8,
                    }}>
                    {
                        details?.data.title
                    }
                </Text>

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}>
                    {/* Time */}
                    <Text style={{
                        color: 'white',
                        fontSize: 10,
                        letterSpacing: 0.5,
                        fontWeight: 500
                    }}>
                        {
                            findTime(details?.timeStamp)
                        }
                    </Text>

                    {/* distance */}
                    <Text 
                    numberOfLines={1}
                    style={{
                        flex : 0.8,
                        color: 'white',
                        fontSize: 10,
                        letterSpacing: 0.5,
                        fontWeight: 500,
                        textAlign : 'right',
                    }}>
                        {
                            details?.data.nearby
                        }
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default ItemCard;

// Let's say that the value of this.state.loading was false before the first render.

// When the first render happens, this.state.loading ? returns the Image component, onLoadStart is triggered and this.state.loading is set to true.

// When the second render happens, this.state.loading is found to be true and this.state.loading ? returns the DotIndicator component. All the hard work done by the Image component during the previous the render is lost. In fact, Image component was never present in that context.

// Hence, onLoadingEnd will never be triggered, because Image component never appeared in the second render.

// And the DotIndicator will forever go round and round and round... Waiting for it's lost love.
