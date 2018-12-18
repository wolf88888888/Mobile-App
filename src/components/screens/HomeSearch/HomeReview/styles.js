import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#f0f1f3',
        justifyContent: 'flex-start'
    },

    scrollView: {
        flex: 1,
    },

    content: {
        flex: 1,
        flexDirection: 'row'
    },
    
    heading: {
        color: 'black',
        fontFamily: 'FuturaStd-Medium',
        marginTop: 5,
        fontSize: 20,
        marginBottom: 30
    },
    body: {
        zIndex: -1,
        flexDirection: 'column',
        marginTop:-90
    },

    lineStyle:{
        borderWidth:0.3,
        borderColor:'#cccccc',
    },

    roomfacility: {
        marginTop:5
    },

    placeholderImageView: {
        marginTop: 40
    },
    placeholderImage: {
        width: 135,
        height: 135,
        marginTop: 75
    },

    etcContaner: {
        flexDirection:'row',
        justifyContent:'space-between',
        marginLeft: 20,
        marginRight: 20
    },

    etcName: {
        fontFamily: 'FuturaStd-Light',
        color: '#000000',
        fontSize: 15,
    },

    etcButton: {
        fontFamily: 'FuturaStd-Light',
        color: '#d97b61',
        fontSize: 15,
    },

    subView: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#FFFFFF",
        height: 100,
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

    pricePeriodWrapper: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        paddingVertical: 2
    },

    price: {
        color: 'black',
        fontSize: 17
    },
    
    fontFuturaStd: {
        fontFamily: 'FuturaStd-Light'
    },

    fontFuturaMed: {
        fontFamily: 'FuturaStd-Medium'
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

    payButtonView: {
        flex: 1,
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

    subContainer: {
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:30,
        marginLeft:20,
        marginRight:20,
    },

    subTitle:{
        color:'black',
        fontSize:15,
        fontFamily: 'FuturaStd-Light',
    },
});

export default styles;
