import { StyleSheet, Dimensions } from 'react-native';

const dimensionWindows = Dimensions.get('window');
const containWidth = (dimensionWindows.width - 100) / 6;
const imageWidth = containWidth;
const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:5,
        marginLeft:5,
        marginRight:5,
        width: containWidth,
        height: containWidth,
    },

    facilityMore: {
        fontFamily: 'FuturaStd-Light',
        fontSize:18,
        color: '#d97b61',
    },

    facilityImage: {
        borderColor:'#cccccc',
        borderWidth:0.3,
        width: imageWidth,
        height: imageWidth,
    },
});

export default styles;
