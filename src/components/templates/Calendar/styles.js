import {
    StyleSheet,
    Dimensions
} from 'react-native';

const { scale, width } = Dimensions.get('window');
let iconSize = 30;
let resultFontSize = 22;
let weekTextFontSize = 16;
let slashLength = 70;
if (width < 350) {
    resultFontSize = 20;
    weekTextFontSize = 14;
    iconSize = 20;
    slashLength = 70;
}

const primaryColor = '#d87a61';

export default StyleSheet.create({
    container: {
        flex: 1
    },
    ctrl: {
        flex: 1.5,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingHorizontal: 15,
        bottom: 15
    },
    result: {
        flex: 2,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#ffffff',
        marginHorizontal: 15,
        marginTop: 15,
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
        fontSize: 18,
        fontWeight: '400'
    },
    startText: {
        fontFamily: 'FuturaStd-Light',
        lineHeight: 30,
        textAlign: 'center'
    },
    endText: {
        fontFamily: 'FuturaStd-Light',
        lineHeight: 30,
        textAlign: 'center'
    },
    week: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    weekText: {
        fontFamily: 'FuturaStd-Light',
        flex: 1,
        fontSize: weekTextFontSize,
        textAlign: 'center'
    },
    scroll: {
        flex: 9,
        borderTopWidth: 3,
        borderColor: '#d6d7da'
    },
    scrollArea: {
        flex: 1
    },
    btn: {
        flex: 2,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    confirmContainer: {
        overflow: 'hidden',
        backgroundColor: primaryColor,
        margin: 15,
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

