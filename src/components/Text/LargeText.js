import React from "react";

import { Text, View } from "react-native";

const LargeText = ({ text, color }) => {
    return (
        
            <Text
                style={{
                    color: color,
                    fontSize: 30,
                    fontWeight: 500,
                }}
            >
                {text}
            </Text>

    )
}

export default LargeText;