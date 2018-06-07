import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#f0f1f3'
    },

    closeButton: {
        zIndex: 1,
    },

    body: {
        zIndex: -1,
        flexDirection: 'column',
        marginTop:-80
    },

    lineStyle:{
        borderWidth:0.3,
        borderColor:'#cccccc',
        marginTop:15,
        marginBottom:15,
        marginLeft:20,
        marginRight:20,
    },

    historyStyle: {
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 20,
        marginRight: 20,
    },

    report: {
        fontFamily: 'FuturaStd-Light',
        fontSize:16,
        marginTop:15,
        marginLeft:20,
        marginRight:20,
        marginBottom:25,
        color: '#000000',
    }
});

export default styles;
