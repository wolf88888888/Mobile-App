import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flexDirection:'column',
        marginLeft:20,
        marginRight:20
    },

    title: {
        fontFamily: 'FuturaStd-Medium',
        fontSize:17,
        color: '#000000',
        marginTop: 15,
        marginBottom: 10
    },

    personalRateView: {
        flexDirection: 'row',
        marginTop: 5
    },

    avatar: {
        width:45,
        height:45,
        borderRadius:22.5
    },

    personalInfo: {
        flexDirection: 'row',
    },

    name: {
        fontFamily: 'FuturaStd-Medium',
        fontSize: 12,
        color:'#000000'
    },

    date: {
        fontFamily: 'FuturaStd-Light',
        fontSize: 12,
        color:'#000000'
    },

    ratingConatiner: {
        marginLeft:10,
        flexDirection:'column',
        justifyContent:'center'
    },

    rating: {
        width:60,
        height:12,
        paddingTop:2
    },

    rateImage: {
        width:9,
        height:9,
    },

    rateText: {
        marginTop: 10
    },

    normalText: {
        fontFamily: 'FuturaStd-Light',
        fontSize: 13,
        lineHeight: 20,
        marginTop: 10,
    },

    readmore: {
        fontFamily: 'FuturaStd-Light',
        fontSize: 12,
        marginTop: -2,
    },

    more: {
      fontSize:13,
      color: '#d97b61',
      fontFamily: 'FuturaStd-Light'
    }
});

export default styles;
