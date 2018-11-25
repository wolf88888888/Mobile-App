import { StyleSheet, Dimensions } from 'react-native';

const dimensionWindows = Dimensions.get('window');
const containWidth = (dimensionWindows.width - 65) / 7;
const imageWidth = (dimensionWindows.width - 120) / 9;
const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft:2,
        marginRight:2,
        width: containWidth,
        height: containWidth,
    },

    facilityMore: {
        fontFamily: 'FuturaStd-Light',
        fontSize:18,
        color: '#d97b61',
    },

    facilityImage: {
        width: imageWidth,
        height: imageWidth,
    },

    imageBackground: {
        borderColor:'#cccccc',
        borderWidth:0.3,
        flexDirection: 'column',
        backgroundColor: 'white',
        width: containWidth,
        height: containWidth,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default styles;
