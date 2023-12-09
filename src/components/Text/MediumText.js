import React from "react";

import { Text } from "react-native";

const MediumText = ({text, color}) => {
    return (
    <Text
        style={{
            color : color,
            fontSize : 22,
            fontWeight : 500,
            letterSpacing : 1,
        }}
    >
        {text}
    </Text>
    )
}

export default MediumText;