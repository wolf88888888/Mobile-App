import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#DA7B61'
    },
    main: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    walletCongratsImage: {
        width: 150,
        height: 150,
        marginTop: 140,
    },
    bigTitle: {
        fontFamily: 'FuturaStd-Light',
        fontSize: 28,
        color: '#FFF',
        marginTop: 13
    },
    subTitle: {
        fontSize: 20,
        color: '#FFF',
        fontFamily: 'FuturaStd-Light',
        marginTop: 5
    },

    gotoButtonContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 80
    },
});

export default styles;
