import { StyleSheet, Dimensions } from 'react-native';

const dimensionWindows = Dimensions.get('window');
const checkWidth = (dimensionWindows.width - 150) / 2;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#f0f1f3',
    },

    footer:{
        position:'absolute',
        bottom:0,
        left:0,
        right:0,
        zIndex:10,
    },

    topAlert: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft:30,
        marginRight:30,
    },

    logo: {
        width:85,
        height:85
    },

    title: {
        fontSize:20,
        fontFamily: 'FuturaStd-Medium',
        justifyContent:'center',
        alignItems:'center',
        marginTop:25,
        color:'black'
    },

    description: {
        marginTop:20,
        justifyContent:'center',
        alignItems:'center',
        fontFamily: 'FuturaStd-Light',
        marginTop:10,
        textAlign: 'center'
    },

    msg: {
        marginTop:10,
        fontFamily: 'FuturaStd-Light',
        fontSize:12,
        textAlign: 'center',
        color:'black'
    },

    checkContainer: {
        width: checkWidth * 2,
        height: 60,
        flexDirection: 'row',
        backgroundColor:'#fff',
        borderWidth: 0.3,
        borderColor: '#ccc'
    },

    checkInfoView: {
        width: checkWidth,
        flexDirection: 'column'
    },

    subTitle: {
        marginTop: 10,
        fontFamily: 'FuturaStd-Light',
        fontSize:15,
        color: '#000',
        textAlign: 'center'
    },

    subInfo: {
        fontFamily: 'FuturaStd-Light',
        fontSize:16,
        color: '#d97b61',
        textAlign: 'center'
    },

    guestContainer: {
        marginLeft:10,
        width: 100,
        height: 60,
        flexDirection: 'column',
        backgroundColor:'#fff',
        borderWidth: 0.3,
        borderColor: '#ccc'
    },
});

export default styles;
