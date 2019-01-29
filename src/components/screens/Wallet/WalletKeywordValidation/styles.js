import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        flexDirection: 'column',
        backgroundColor: '#DA7B61'
    },
    main: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    titleView: {
        display: 'flex',
        width: '100%',
        marginTop: 16,
        marginLeft: 36,
        marginBottom: 2
    },
    titleText: {
        color: '#fff',
        fontSize: 22,
        fontFamily: 'FuturaStd-Light'
    },
    infoView: {
        display: 'flex',
        width: '100%',
        marginLeft: 36,
        marginTop: 20,
    },
    infoText: {
        color: '#fff',
        fontSize: 13.3,
        fontFamily: 'FuturaStd-Light',
        lineHeight: 20
    },
    inputView: {
        width: '100%',
        margin: 11,
        paddingLeft: 18,
        paddingRight: 18
    },
    nextButtonView: {
        display: 'flex',
        alignItems: 'flex-end',
        width: '100%',
        paddingRight: 18,
        marginTop: 36
    },
    buttonText: {
        color: '#fff',
        fontSize: 17,
        fontFamily: 'FuturaStd-Light'
    },
    nextButton: {
        height: 50,
        width: 50,
        backgroundColor: '#273842',
        borderRadius: 25,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        paddingLeft: 2,
        paddingBottom: 2
    },
    buttonsView: {
        paddingLeft: 23,
        paddingRight: 23,
        height: 50,
        alignItems: 'stretch',
        flexDirection: 'row'
    },
    acceptButtonView: {
        flexDirection: 'row',
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        borderColor: '#FFF',
        borderWidth: 1.5,
        backgroundColor: '#DA7B61'
    },
    declineButtonView: {
        flexDirection: 'row',
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        borderColor: '#FFF',
        borderWidth: 1.5,
        backgroundColor: '#FFF'
    },
    acceptButtonText: {
        color: '#DA7B61',
        fontFamily: 'FuturaStd-Light',
        fontSize: 17
    },
    declineButtonText: {
        textAlign: 'center',
        color: '#fcf9f8',
        fontFamily: 'FuturaStd-Light',
        fontSize: 14,
        padding: 5
    }
});

export default styles;
