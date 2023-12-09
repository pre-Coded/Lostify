import React from 'react'

import {
    TouchableOpacity,
    Text, StyleSheet, ActivityIndicator
} from 'react-native'



import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons' ;

const Button = (props) => {
    // console.log("icon", props.icon);

    return (
        <TouchableOpacity
            onPress={props.onPress}
            style={[style.container, props.marginTop, {
                backgroundColor: (props.outline) ? 'transparent' : '#FA7800',
                borderWidth : props.outline ? 1 : 0,
                borderColor : props.outline ? '#FA7800' : '',
            },]}
        >
            {
                props.loading ?
                    <ActivityIndicator color={'white'} size={24} /> :
                    <>
                        {
                            props.icon?.length > 0 && 
                            <MaterialCommunityIcons 
                                name = { props.icon }
                                size = {24}
                                color = {'white'}
                            />
                        }

                        <Text style={style.text}>
                            {props.text}
                        </Text>

                    </>
            }
        </TouchableOpacity>
    )
}

const style = StyleSheet.create({
    container: {
        // paddingVertical : 6,
        // paddingHorizontal : 10,
        // height: 48,
        // width: '100%',
        flex : 1,
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
    },

    text: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
        letterSpacing: 1,
    },

});

export default Button