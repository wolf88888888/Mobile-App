import { StyleSheet, Dimensions } from 'react-native';
const dimensionWindows = Dimensions.get('window');

const containWidth = dimensionWindows.width * 0.3;
const containHeight = containWidth * 2 / 3;

const styles = StyleSheet.create({
    container:{
        marginTop:30,
        marginLeft:20,
        marginRight:20,
        flexDirection:'row'
    },

    majorContainer: {
        marginLeft:10,
        flexDirection:'column',
        justifyContent: 'flex-end',
        height: containHeight,
    },

    detailContainer: {
        flexDirection:'column',
    },

    info: {
        fontFamily: 'FuturaStd-Light',
        color:'#a2c5bf',
        fontSize: 9,
    },

    title: {
        fontFamily: 'FuturaStd-Medium',
        fontSize:15,
        color: '#000000',
    },

    description:{
        fontFamily: 'FuturaStd-Light',
        fontSize:10,
        color:'#54585b',
    },

    img:{
        alignSelf: 'stretch',
        width: containWidth,
        height: containHeight,
    }
});


export default styles;
