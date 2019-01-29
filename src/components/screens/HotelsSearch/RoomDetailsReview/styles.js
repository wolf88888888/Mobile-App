import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee',
    },
    backButton: {
        marginLeft: 10,
        marginBottom: 40
    },
    btn_backImage:{
        height: 24,
        width: 24,
        marginTop: 44,
        marginLeft: 16,
        marginBottom: 32
    },
    steps: {
        fontSize: 10,
        fontFamily: 'FuturaStd-Medium',
        color: '#a2c5bf'
    },
    content: {
        paddingHorizontal: 20,
        marginBottom: 10,
    },
    heading: {
        color: 'black',
        fontFamily: 'FuturaStd-Medium',
        marginTop: 5,
        fontSize: 20,
        marginBottom: 30
    },
    hotelInfoContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    hotelThumbView: {
        flex: 0.38
    },
    hotelInfoView: {
        flexDirection: 'column',
        justifyContent: 'flex-end',
        flex: 0.7,
        paddingTop: 7,
        paddingHorizontal: 12
    },
    hotelThumb: {
        resizeMode: 'cover',
        width: '100%',
        height: 90
    },
    floatingBar: {
        padding: 17,
        position:'absolute',
        bottom:0,
        alignSelf:'center',
        height: 90,
        width: '100%',
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center'
    },
    detailsView: {
        flex: 1
    },
    payButtonView: {
        flex: 0.8,
        alignItems: 'center'
    },
    payButton: {
        backgroundColor: '#DA7B61',
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 16
    },
    confirmPayText: {
        color: 'white',
        fontSize: 18,
        fontFamily: 'FuturaStd-Light'
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
    listItem: {
        flex: 1,
        alignContent: 'center',
        marginLeft: 20,
        marginRight: 20,
        borderBottomColor: '#e3e3e3',
        borderBottomWidth: 1,
        flexDirection: 'row'
    },
    listItemNameWrapper: {
        marginTop: 15,
        marginBottom: 15,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    listItemRhsWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        alignContent:'center',
        justifyContent:'flex-end',
        flexWrap: 'wrap',
    },
    listItemText: {
        fontFamily: 'FuturaStd-Light',
        fontSize: 16,
        color: '#000'
    },
    hotelName: {
        color: 'black',
        fontFamily: 'FuturaStd-Medium',
        fontSize: 16,
    },
    hotelPlace: {
        fontFamily: 'FuturaStd-Light',
        fontSize: 10,
        color: '#54585b',
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
    bold400: {
        fontWeight: '400'
    },
    fontFuturaStd: {
        fontFamily: 'FuturaStd-Light'
    },
    fontFuturaMed: {
        fontFamily: 'FuturaStd-Medium'
    },
    rhs: {
        fontSize: 16,
        fontFamily: 'FuturaStd-Light',
        color: '#d97b61'
    },
    flatList: {
        marginTop: 15
    },
    modalView: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    popup: {
        backgroundColor: '#eee',
        alignSelf: 'stretch',
        marginHorizontal: 10,
        borderRadius: 4,
        padding: 15
    },
    labelCloseView: {
        flexDirection: 'row'
    },
    walletPasswordLabel: {
        fontFamily: 'FuturaStd-Light',
        fontSize: 16
    },
    closeButtonView: {
        flex: 1,
        alignItems: 'flex-end'
    },
    closeButtonSvg: {
        height: 20,
        width: 20
    },
    walletPasswordInput: {
        backgroundColor: '#fff',
        padding: 15,
        fontSize: 16,
        marginTop: 15,
        borderWidth: 1,
        borderColor: '#b6b6b6',
        fontFamily: 'FuturaStd-Light',
    },
    confirmButton: {
        fontFamily: 'FuturaStd-Light',
        backgroundColor: '#DA7B61',
        padding: 15,
        alignItems: 'center',
        marginTop: 15,
        borderRadius: 2
    },
    confirmButtonText: {
        fontFamily: 'FuturaStd-Light',
        color: '#fff',
        fontSize: 15
    }
});

export default styles;
