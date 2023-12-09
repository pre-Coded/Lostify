const { StyleSheet } = require("react-native")

module.exports =  StyleSheet.create({
    largeText : {
        fontSize : 24,
    },
    mediumText : {
        fontSize : 20,
    },
    smallText : {
        fontSize : 16,
    },
    smallerText : {
        fontSize : 12,
    },
    boldText : {
        fontWeight : '600',
    },
    mediumBoldText : {
        fontWeight : '400',
    },
    backgroundColor : {
        backgroundColor : '#121212',
    },
    activeColor : {
        
    },
    flexRowBetween : {
        display : 'flex',
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'space-between',
    },
})