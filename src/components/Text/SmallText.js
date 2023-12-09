import React from "react";

import { Text } from "react-native";

const SmallText = ({text, color}) => {
    return (
    <Text
        style={{
            color : color,
            fontSize : 11,
            fontWeight : 500,
            letterSpacing : 1,
        }}
    >
        {text}
    </Text>)
}

export default SmallText;