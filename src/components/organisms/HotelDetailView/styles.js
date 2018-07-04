import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flexDirection:'column',
    },

    topView: {
        backgroundColor: '#ffffff',
        marginTop:-20,
        marginLeft:15,
        marginRight:15,
        paddingBottom:10
    },

    topTitleText:{
        fontFamily: 'futura',
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

    addressText: {
        fontFamily: 'FuturaStd-Light',
        fontSize:10,
        paddingTop:3,
        paddingBottom:2,
        paddingLeft:10,
        paddingRight:10,
        color:'#000',
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
      fontFamily: 'futura',
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
