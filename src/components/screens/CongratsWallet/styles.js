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
        justifyContent: 'center'
    },
    walletCongratsImage: {
        maxWidth: '55%',
        maxHeight: '30%',
        marginTop: 50,
        marginBottom: 30
    },
    bigTitle: {
        fontSize: 30,
        color: '#FFF',
        fontFamily: 'FuturaStd-Light',
        margin: 10
    },
    subTitle: {
        fontSize: 25,
        color: '#FFF',
        fontFamily: 'FuturaStd-Light',
        margin: 10
    }
});

export default styles;
