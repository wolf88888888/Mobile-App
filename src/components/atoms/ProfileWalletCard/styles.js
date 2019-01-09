import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    cardBox: {
        backgroundColor: '#da7b60',
        marginTop: 20,
        marginLeft: 15,
        marginRight: 15,
        borderRadius: 10,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingTop: 5,
        paddingBottom: 15
    },
    walletAddres: {
        color: '#fff',
        fontFamily: 'FuturaStd-Light',
        fontSize: 11.5,
        margin: 20,
        marginTop: 10,
        marginBottom: 30
    },
    logo: {
          width: 80,
          height: 55,
          borderRadius: 10,
          marginLeft: 10
    },
    logoBackground: {
        position: 'absolute',
        bottom: -5,
        left: -33,
        opacity: 0.1,
        width: '60%',
        height: '60%'
    },
    balanceLabel: {
        fontSize: 10,
        color: '#fff',
        marginLeft: 20,
        fontFamily: 'FuturaStd-Light'
    },
    balanceText: {
        fontSize: 18.5,
        color: '#fff',
        marginLeft: 20,
        fontFamily: 'FuturaStd-Medium'
    },
    addMore: {
        position: 'absolute',
        bottom: 15,
        right: 20,
        width: 43,
        height: 43,
        borderRadius: 50,
        backgroundColor: '#213742',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    addMorePlus: {
        color: '#fff',
        fontSize: 16
    },
});

export default styles;
