import {
    StyleSheet,
    Dimensions
} from 'react-native';

const { scale, width } = Dimensions.get('window');
let iconSize = 30;
let resultFontSize = 17;
let weekTextFontSize = 15;
let slashLength = 70;
if (width < 350) {
    resultFontSize = 15;
    weekTextFontSize = 13;
    iconSize = 20;
    slashLength = 70;
}

const primaryColor = '#DA7B61';

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'column',
        justifyContent: 'flex-start'
    },
    result: {
        height:80,
        marginTop:28,
        marginLeft:15,
        marginRight:15,
        paddingHorizontal:slashLength / 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        borderWidth: 0.5,
        borderColor: '#d6d7da'
    },
    resultSlash: {
        width: slashLength,
        height: 1 / scale,
        transform: [
            {
                rotateZ: '-75deg'
            }
        ]
        
    },
    resultPart: {
        flex: 1
    },
    resultText: {
        fontSize: resultFontSize
    },
    clearText: {
        fontFamily: 'FuturaStd-Light',
        fontSize: 15,
        fontWeight: '400'
    },
    weekdayText: {
        fontFamily: 'FuturaStd-Light',
        lineHeight: 23,
        textAlign: 'center'
    },
    dateText: {
        fontFamily: 'FuturaStd-Light',
        lineHeight: 25,
        textAlign: 'center',
        fontSize: resultFontSize + 1
    },
    week: {
        height: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal:15
    },
    weekText: {
        fontFamily: 'FuturaStd-Light',
        flex: 1,
        fontSize: weekTextFontSize,
        textAlign: 'center'
    },
    scroll: {
        flex: 1,
        borderTopWidth: 3,
        borderColor: '#d6d7da',
        paddingHorizontal:15
    },
    btn: {
        height: 90,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    confirmContainer: {
        overflow: 'hidden',
        backgroundColor: primaryColor,
        marginLeft: 15,
        marginRight: 15,
        marginTop: 17,
        marginBottom: 17,
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    confirmContainerDisabled: {
        backgroundColor: '#cccccc'
    },
    confirmText: {
        fontFamily: 'FuturaStd-Light',
        fontSize: 17,
        color: '#ffffff',
        textAlign: 'center'
    },
    confirmTextDisabled: {
        color: '#1f2427'
    },
    closeIcon: {
        padding: 1,
        width: iconSize,
        height: iconSize
    }
});

