import {StyleSheet, Dimensions} from 'react-native';
const dimensionWindows = Dimensions.get('window');

export default styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#eee'
    },
    backButton:{
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 25,
        marginLeft: 15,
    },
    btn_backImage:{
        height: 24,
        width: 24,
        resizeMode: 'contain'
    },
    titleText: {
        color: '#000',
        fontSize: 22,
        fontFamily: 'FuturaStd-Light',
        marginLeft: 20,
    },
    headerIcons: {
        height: 45,
        width: 45
    },
    tick: {
        width: 20,
        height: 20,
        position: 'absolute',
        right: 0,
        top: 0
    },
    residence: {
        height: 80,
        width: 80,
        borderRadius: 50,
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: '#b1b1b1',
        justifyContent: 'center',
        alignItems: 'center'
    },
    residenceView: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        borderBottomColor: '#d4d4d4',
        borderBottomWidth: 1,
        paddingBottom: 15
    },
    residenceType: {
        textAlign: 'center',
        marginTop: 10,
        color: '#656565',
        fontFamily: 'FuturaStd-Light'
    },
    subContainer: {
        flexDirection: 'column',
        borderBottomColor: '#d4d4d4',
        borderBottomWidth: 1,
        paddingBottom: 15,
        marginLeft: 10,
    },
    subtitleText: {
        marginTop: 15, 
        marginBottom: 5,
        marginLeft: 5,
        fontSize: 18,
        fontFamily: 'FuturaStd-Medium',
    },
    searchButtonView: {
        backgroundColor: '#DA7B61',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        height: dimensionWindows.height*0.08,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 17,
        marginRight: 17
    },
    searchButtonText: {
        color: '#fff',
        fontFamily: 'FuturaStd-Light',
        fontSize: dimensionWindows.width * 0.05,
        padding: 14
    },
})
