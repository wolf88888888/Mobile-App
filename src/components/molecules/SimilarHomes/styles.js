import { StyleSheet, Dimensions } from 'react-native';
const dimensionWindows = Dimensions.get('window');

const containWidth = dimensionWindows.width * 0.6;
const containHeight = containWidth * 2 / 3;
const styles = StyleSheet.create({
    container: {
        marginTop:10,
        marginBottom:10,
        flexDirection:'column',
    },

    title:{
        fontFamily: 'FuturaStd-Medium',
        fontSize:16,
        marginLeft:20,
        marginBottom:10,
        color: '#000000',
    },

    listItem: {
        width: containWidth,
        height: containHeight + 90,
        flexDirection:'column',
        marginLeft:5,
        marginRight:5,
        backgroundColor:'#ffffff',
        borderWidth:0.3,
        borderColor:'#cccccc',
    },

    likeButton: {
        zIndex: 1,
    },

    logoImage: {
        zIndex: -1,
        marginTop: -90,
        alignSelf: 'stretch',
        width: containWidth,
        height: containHeight,
    },

    info: {
        marginLeft: 5,
        marginTop: 10,
        fontFamily: 'FuturaStd-Light',
        fontSize: 8,
        color: '#a2c5bf'
    },

    name:{
        fontFamily: 'FuturaStd-Medium',
        fontSize:16,
        marginLeft:5,
        color: '#000000',
    },

    rateViewContainer: {
        flexDirection: 'row',
    },

    rateText:{
        fontFamily: 'FuturaStd-Light',
        fontSize:10,
        marginLeft:5,
        color:'#898c8d',
    },

    price: {
        fontFamily: 'FuturaStd-Light',
        fontSize:12,
        marginLeft:5,
        marginTop:10,
        color: '#000000',
    }
});

export default styles;
