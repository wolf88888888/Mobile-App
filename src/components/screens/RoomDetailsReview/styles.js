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
        width: 24,
        height: 24,
        marginTop: 40,
        marginLeft: 18,
    },
    steps: {
        fontSize: 12,
        fontFamily: 'FuturaStd-Light',
        color: '#afafaf'
    },
    content: {
        paddingHorizontal: 20
    },
    heading: {
        fontFamily: 'FuturaStd-Light',
        marginTop: 5,
        fontSize: 24,
        fontWeight: '200',
        marginBottom: 25
    },
    hotelInfoContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    hotelThumbView: {
        flex: 0.3
    },
    hotelInfoView: {
        flexDirection: 'column',
        flex: 0.7,
        paddingTop: 7,
        paddingHorizontal: 8,
        justifyContent: 'flex-end'
    },
    hotelThumb: {
        resizeMode: 'cover',
        width: '100%',
        height: 60
    },
    floatingBar: {
        height: 80,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center'
    },
    detailsView: {
        flex: 1,
        padding: 8
    },
    payButtonView: {
        flex: 1,
        alignItems: 'center'
    },
    payButton: {
        backgroundColor: '#DA7B61',
        padding: 12
    },
    confirmPayText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '100',
        fontFamily: 'FuturaStd-Light'
    },
    pricePeriodWrapper: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        paddingVertical: 2
    },
    price: {
        fontSize: 16
    },
    listItem: {
        flex: 1,
        alignContent: 'center',
        marginLeft: 15,
        marginRight: 15,
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
        fontWeight: '100',
        color: '#262626'
    },
    hotelName: {
        fontFamily: 'FuturaStd-Light',
        fontSize: 15,
        fontWeight: '200'
    },
    hotelPlace: {
        fontFamily: 'FuturaStd-Light',
        fontSize: 11,
        color: '#7c7c7c',
        fontWeight: '100'
    },
    period1: {
        marginTop: 5,
        fontSize: 11,
        color: '#535353',
        fontWeight: '100'
    },
    period2: {
        marginTop: 3,
        fontSize: 11,
        color: '#535353',
        fontWeight: '100'
    },
    bold400: {
        fontWeight: '400'
    },
    fontFuturaStd: {
        fontFamily: 'FuturaStd-Light'
    },
    rhs: {
        fontSize: 16,
        fontFamily: 'FuturaStd-Light',
        color: '#DA7B61'
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
        fontFamily: 'futura',
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
        fontSize: 15,
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
