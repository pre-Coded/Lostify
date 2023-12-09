import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { TouchableOpacity, View, Text } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const FilterButton = (props) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('seeallitem', { type : props.text });
  }

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={{
        height : 88,
        aspectRatio: 1,
        borderRadius: 10,
        backgroundColor: props.bgColor,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 6,
        gap: 12,
      }}
    >
      <MaterialCommunityIcons
        name={props.icon}
        size={30}
        color={'white'}
      />
      <Text style={{
        fontSize: 12,
        letterSpacing: 1,
        color: 'white',
        fontWeight : 600,
      }}>{props.text}</Text>
    </TouchableOpacity>
  )
}

export default FilterButton