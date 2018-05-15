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
        fontFamily: 'FuturaStd-Medium',
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
        fontFamily: 'FuturaStd-Medium',
        fontSize:12,
        color:'#000000',
        marginTop:15
    },

    subdetail: {
        fontFamily: 'FuturaStd-Light',
        fontSize: 10,
        color: '#000000',
        marginTop: 5
    },


    map: {
        alignSelf: 'stretch',
        marginTop:10,
        width: dimensionWindows.width,
        height: dimensionWindows.width * 5 / 8,
    },
});

export default styles;
