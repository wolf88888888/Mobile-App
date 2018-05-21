import { StyleSheet, Dimensions } from 'react-native';
const dimensionWindows = Dimensions.get('window');

const logoWidth = dimensionWindows.width;
const logoHeight = logoWidth * 35 / 54;
const styles = StyleSheet.create({
    container: {
      flexDirection:'column',
    },

    logoImage: {
        alignSelf: 'stretch',
        width: logoWidth,
        height: logoHeight,
    },

    topView: {
        backgroundColor: '#ffffff',
        marginTop:-20,
        height:125,
        marginLeft:15,
        marginRight:15,
    },

    topTitleText:{
        fontFamily: 'FuturaStd-Medium',
        fontSize:19,
        marginTop:5,
        marginLeft:10,
        marginRight:10,
        color:'#000000'
    },

    rateViewContainer: {
        flexDirection: 'row',
    },

    rateText:{
        fontFamily: 'FuturaStd-Light',
        fontSize:9,
        paddingLeft:10,
        paddingRight:10,
        color:'#898c8d',
    },

    lineStyle:{
        borderWidth:0.3,
        borderColor:'#cccccc',
        margin:7,
    },

    detailsStyle: {
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop:5,
        marginLeft:5,
        marginRight:5,
    },

    normalText:{
        fontFamily: 'FuturaStd-Light',
        fontSize:12,
        lineHeight: 20,
    },

    smallTitle:{
      fontFamily: 'FuturaStd-Medium',
      fontSize:12,
      marginTop:5,
      lineHeight: 20,
      color:'#000000'
    },

    descriptionView: {
        marginHorizontal: 10,
        padding: 10,
    },

    spaceText: {
        fontFamily: 'FuturaStd-Light',
        fontSize:10,
        lineHeight: 20,
    },

    readmore: {
        fontFamily: 'FuturaStd-Light',
        fontSize: 10,
        marginTop: -2,
    }
});

export default styles;
