import { StyleSheet, Dimensions } from 'react-native';

const dimensionWindows = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
      flexDirection:'column',
    },

    descriptionView: {
        flexDirection: 'column',
        marginLeft: 20,
        marginRight: 20,
    },

    titleContainter: {
        flexDirection:'row',
        justifyContent: 'space-between'
    },

    title: {
        fontFamily: 'futura',
        fontSize: 15,
        color: '#000000'
    },

    detail: {
        fontFamily: 'FuturaStd-Light',
        fontSize: 12,
        lineHeight:20,
        color: '#000000'
    },

    subtitle: {
        fontFamily: 'futura',
        fontSize:12,
        color:'#000000',
        marginTop:15
    },

    subdetail: {
        fontFamily: 'FuturaStd-Light',
        fontSize: 10,
        color: '#000000',
        lineHeight: 17,
        marginTop: 5
    },

    info: {
        zIndex: 1,
        flexDirection: 'column',
        height:55,
        marginTop:20,
        marginLeft:45,
        marginRight:45,
        justifyContent:'center',
        backgroundColor:'#ffffff'
    },

    infoContainer: {
        flexDirection: 'column',
        justifyContent:'center',
        backgroundColor:'#ffffff',
        marginLeft: 10
    },

    location: {
          fontFamily: 'futura',
          fontSize: 13,
          color: '#000000',
          marginTop: 5,
    },

    description: {
          fontFamily: 'FuturaStd-Light',
          fontSize: 10,
          lineHeight:15,
          color: '#000000',
    },

    map: {
        zIndex: -1,
        marginTop:-65,
        alignSelf: 'stretch',
        width: dimensionWindows.width,
        height: dimensionWindows.width * 5 / 6.5,
    },

    subView: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "red",
        height: 500,
    }
});

export default styles;