import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    floatingBar: {
        padding: 17,
        position:'absolute',
        bottom: 0,
        alignSelf:'center',
        height: 90,
        width: '100%',
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center'
    },
    detailsView: {
        flex: 1,
    },
    pricePeriodWrapper: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        paddingVertical: 2
    },
    price: {
        color: 'black',
        fontSize: 17
    },
    period1: {
        marginTop: 5,
        fontSize: 10,
        color: '#000',
    },
    period2: {
        marginTop: 5,
        fontSize: 10,
        color: '#000',
    },
    fontFuturaStd: {
        fontFamily: 'FuturaStd-Light'
    },
    fontFuturaMed: {
        fontFamily: 'FuturaStd-Medium'
    },
    nextButtonView: {
        flex: 0.8,
        alignItems: 'center',
    },
    nextButton: {
        backgroundColor: '#DA7B61',
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 16
    },
    nextText: {
        color: 'white',
        fontSize: 18,
        fontFamily: 'FuturaStd-Light'
    },
});

export default styles;
