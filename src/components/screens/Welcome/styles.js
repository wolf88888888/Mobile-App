import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#DA7B61',
        justifyContent: 'space-between'
    },
    splashImage: {
        width: 150,
        height: 80,
        marginTop: '20%',
        resizeMode:'contain'
    },
    titleText: {
        color: '#fff',
        fontSize: 25,
        fontFamily: 'FuturaStd-Light',
        marginBottom: '15%'
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
        backgroundColor: '#223843',
        elevation: 3
    },
    createAccountButton: {
        marginTop: 20
    },
    recoverButton: {
        marginTop: -20
    },
    finePrintText: {
        marginLeft: 30,
        marginRight: 30,
        color: '#fff',
        fontSize: 13,
        fontFamily: 'FuturaStd-Light',
        textAlign: 'justify',
        position: 'absolute',
        bottom:'15%',
    }
});


export default styles;
