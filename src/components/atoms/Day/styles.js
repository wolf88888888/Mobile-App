import {
    StyleSheet,
    Dimensions
} from 'react-native';

const { scale, width } = Dimensions.get('window');
let paddingH = 30;
let dayWidth = (width - paddingH) / 7;
const mod = (scale * (width - paddingH)) % 7;
if (mod) {
    dayWidth = (((7 - mod) / scale) + (width - paddingH)) / 7;
}
export default StyleSheet.create({
    dayContainer: {
        width: dayWidth,
        justifyContent: 'center',
        alignItems: 'center'
    },
    startContainer: {
        borderTopLeftRadius: 100,
        borderBottomLeftRadius: 100
    },
    endContainer: {
        borderTopRightRadius: 100,
        borderBottomRightRadius: 100
    },
    today: {
        borderWidth: 1,
        borderColor: '#cccccc',
        backgroundColor: '#ffffff'
    },
    day: {
        width: dayWidth - 10,
        height: dayWidth - 10,
        borderRadius: dayWidth / 2,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center'
    },
    dayText: {
        fontFamily: 'FuturaStd-Light',
        fontSize: 18,
        textAlign: 'center'
    },
    dayTextDisabled: {
        fontFamily: 'FuturaStd-Medium',
        fontSize: 18,
        color: '#898c8d',
        textAlign: 'center'
    }
});

