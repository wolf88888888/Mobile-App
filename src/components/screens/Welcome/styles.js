import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#DA7B61'
    },
    splashImage: {
        width: 100,
        height: 78,
        marginTop: 4
    },
    buttonCollectionWrap: {
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'stretch',
        marginHorizontal: 48
    },
    logInButton: {
        marginBottom: 20,
        borderColor: 'white',
        borderWidth: 1.5
    },
    facebookButton: {
        backgroundColor: 'black',
        elevation: 3
    },
    createAccountButton: {
        marginTop: 20
    },
    titleText: {
        color: '#fff',
        fontSize: 25,
        fontFamily: 'FuturaStd-Light',
        marginBottom: 73
    },
    finePrintText: {
        marginTop: 60,
        marginLeft: 10,
        marginRight: 10,
        color: '#fff',
        fontSize: 13,
        fontFamily: 'FuturaStd-Light'
    },
    lowOpacity: {
        opacity: 0.3,
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end'
    },
    getStartedImage: {
        width: 400,
        height: 80
    }
});


export default styles;
