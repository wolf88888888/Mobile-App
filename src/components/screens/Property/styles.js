import { StyleSheet } from 'react-native';

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
});

export default styles;
