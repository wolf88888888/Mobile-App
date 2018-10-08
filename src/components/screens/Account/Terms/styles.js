import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        backgroundColor: '#f0f1f3',
        padding: 15
    },
    title: {
        color: '#000',
        fontFamily: 'FuturaStd-Medium',
        fontSize: 22,
    },

    paragraph: {
        color: '#444',
        fontFamily: 'FuturaStd-Light',
        fontSize: 17,
        lineHeight: 20,
    },

    buttonsView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    acceptButtonView: {
        display: 'flex',
        flexDirection: 'row',
        width: 140,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        borderRadius: 25,
        backgroundColor: '#DA7B61'
    },
    declineButtonView: {
        display: 'flex',
        flexDirection: 'row',
        width: 140,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        borderRadius: 25,
        borderColor: '#DA7B61',
        borderWidth: 1.5,
        backgroundColor: '#f0f1f3'
    },
    acceptButtonText: {
        color: '#fcf9f8',
        fontFamily: 'FuturaStd-Light',
        fontSize: 17
    },
    declineButtonText: {
        color: '#DA7B61',
        fontFamily: 'FuturaStd-Light',
        fontSize: 17
    }
});

export default styles;
