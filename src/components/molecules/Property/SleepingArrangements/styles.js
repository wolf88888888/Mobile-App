import { StyleSheet, Dimensions } from 'react-native';

const dimensionWindows = Dimensions.get('window');
const containWidth = dimensionWindows.width / 3;

const styles = StyleSheet.create({
    container: {
      flexDirection:'column',
      marginLeft:20,
    },

    title:{
      fontFamily: 'FuturaStd-Medium',
      fontSize: 17 ,
      color: '#000000',
      marginTop: 10,
      marginBottom: 10,
    },

    facilities: {
        flexDirection: 'row',
    },

    list: {
    },

    item: {
        width:containWidth,
        height:70,
        flexDirection:'column',
        borderColor:'#cccccc',
        backgroundColor:'#ffffff',
        borderWidth:0.3,
        marginLeft:0,
        marginRight:10
    },

    imageContent: {
        height:25,
        marginTop:5
    },

    room: {
        marginLeft:10,
        marginTop:5,
        fontFamily: 'FuturaStd-Light',
        fontSize:12,
        color: '#000000'
    },

    description: {
        marginLeft:10,
        fontFamily: 'FuturaStd-Light',
        fontSize:11,
        color: '#54575a'
    }
});

export default styles;
