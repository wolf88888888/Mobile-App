import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex:1,
        backgroundColor: '#f0f1f3'
    },

    webview: {
        width:'100%',
        flex:1
    },

    loading: {
        position:'absolute',
        top:80,
        left:0,
        right:0
    }
});
export default styles;
