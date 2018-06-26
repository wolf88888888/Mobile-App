import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
        backgroundColor: '#f0f1f3'
    },
    //backbutton
    backButton:{
        marginTop: 45,
        marginLeft: 15,
    },
    btn_backImage:{
        height: 24,
        width: 24,
        resizeMode: 'contain'
    },
    //title
    title:{
        marginTop: 45,
        marginLeft: 15,
        fontFamily: 'FuturaStd-Light',
        fontSize: 30,
        fontWeight:'normal',
        color : '#000'
    },
    subtTitle:{
        marginTop: 10,
        marginLeft: 15,
        fontFamily: 'FuturaStd-Light',
        fontSize: 18,
        fontWeight:'normal',
        color : '#000'
    },
    //flatlist items
    flatList: {
        marginBottom: 200,
        marginLeft: 15,
        marginRight: 15,
    },
    viewForImage: {
        flexDirection: 'column',
        width: '100%', 
        height: 200
    },
    flatListItemImage: {
        width: '100%',
        height: 200,
    },
    title1:{
        marginTop: 10,
        marginLeft: 6,
        fontFamily: 'FuturaStd-Light',
        fontSize: 14,
        fontWeight:'normal',
        color : '#bacfc9'
    },
    title2:{
        marginTop: 4,
        marginLeft: 6,
        fontFamily: 'FuturaStd-Light',
        fontSize: 20,
        fontWeight:'normal',
        color : '#25292c'
    },
    title3:{
        marginTop: 4,
        marginLeft: 6,
        fontFamily: 'FuturaStd-Light',
        fontSize: 10,
        fontWeight:'normal',
        color : '#8f9191'
    },
    title4:{
        marginTop: 12,
        marginLeft: 6,
        marginBottom: 10,
        fontFamily: 'FuturaStd-Light',
        fontSize: 16,
        fontWeight:'normal',
        color : '#272a2c'
    },
});
export default styles;
