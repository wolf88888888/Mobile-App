import { StyleSheet, Dimensions } from 'react-native';

const dimensionWindows = Dimensions.get('window');
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
    },

    personalInfo: {
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop: 10
    },

    avatarContainer: {
        flexDirection:'row'
    },

    avatar: {
        width:60,
        height:60,
        borderRadius:30
    },

    infoContainer: {
        marginLeft: 10,
        flexDirection: 'column',
        justifyContent: 'center'
    },

    name: {
        fontFamily: 'FuturaStd-Light',
        fontSize: 15,
        color:'#000000'
    },

    info: {
        fontFamily: 'FuturaStd-Light',
        fontSize: 9,
        marginTop: 5
    },

    contactContainer: {
        marginLeft:10,
        flexDirection:'column',
        justifyContent:'center'
    },

    contact: {
        fontFamily: 'FuturaStd-Light',
        color: '#d97b61',
        fontSize: 15,
    }
});

export default styles;
