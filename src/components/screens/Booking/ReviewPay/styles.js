import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#f0f1f3',
    },

    footer:{
         position:'absolute',
         bottom:0,
         left:0,
         right:0,
         zIndex:10,
     },

    redUnderline:{
        color:'#DA7B61',
        borderBottomWidth:3,
        fontFamily: 'FuturaStd-Light',
        textDecorationLine: 'underline',
        borderBottomColor:'#DA7B61'
    },

    text:{
        fontFamily: 'FuturaStd-Light',
        marginLeft:20,
        marginRight:20,
        marginTop:35,
        fontSize:13,
        color:'black'
    }
});

export default styles;
