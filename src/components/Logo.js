import React from 'react'

import { View, Text } from 'react-native'

import Antdesign from 'react-native-vector-icons/AntDesign'

const Logo = (props) => {
  return (
    <View style={{
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      gap: 6,
    }}>
      <Text
        style={{
          color: 'white',
          fontSize: 36,
        }}>
        L
      </Text>
      <Antdesign
        name={'find'}
        size={ props.size ? props.size : 28}
        color={'#Fa7800'}
      />
      <Text
        style={{
          color: 'white',
          fontSize: 36,
        }}>
        STIFY
      </Text>
    </View>
  )
}

export default Logo;