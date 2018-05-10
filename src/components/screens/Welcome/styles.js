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
        width: 200,
        height: 80
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
    titleText: {
        color: '#fff',
        fontSize: 25,
        fontFamily: 'FuturaStd-Light',
        marginBottom: 73
    },
    finePrintText: {
        marginTop: 60,
        marginLeft: 30,
        marginRight: 30,
        color: '#fff',
        fontSize: 13,
        fontFamily: 'FuturaStd-Light',
        textAlign: 'justify'
    }
});


export default styles;
