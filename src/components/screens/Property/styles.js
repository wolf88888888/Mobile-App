import { StyleSheet, Dimensions } from 'react-native';

const numColumns = 6;
const dimensionWindows = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#f0f1f3'
    },

    topButtonContainer: {
        zIndex: 1,
        flexDirection: 'row',
        justifyContent:'space-between',
    },

    scrollView: {
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

    footer:{
        flexDirection: 'row',
        justifyContent:'space-between',
        height:80,
        backgroundColor: '#ffffff',
    },

    amount: {
        fontFamily: 'FuturaStd-Medium',
        color: '#000000',
        fontSize: 16,
        lineHeight:20,
    },

    unit: {
        fontFamily: 'FuturaStd-Light',
        color: '#000000',
        fontSize: 11,
        lineHeight:20,
    },

    size: {
        fontFamily: 'FuturaStd-Light',
        color: '#000000',
        fontSize: 16,
        lineHeight:20,
    },

    ButtonView: {
        backgroundColor: '#DA7B61',
        justifyContent: 'center',
        alignItems: 'center',
        margin:15,
    },

    ButtonText: {
        color: '#fff',
        fontFamily: 'FuturaStd-Light',
        fontSize: 16,
        padding: 14,
        alignItems: 'center'
    },

});

export default styles;
