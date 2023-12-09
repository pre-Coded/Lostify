import React from 'react'
import { ActivityIndicator, View } from 'react-native'

const Loader = () => {
    return (
        <View style={{
            height: '100%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor : 'rgba(0,0,0,0.5)',
            position: 'absolute',
            overflow : 'hidden', 
        }}>
            <ActivityIndicator color={'white'} size="large" />
        </View>
    )
}

export default Loader