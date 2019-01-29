import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container:{
        height: 40,
        marginTop:30,
        marginLeft:20,
        marginRight:20,
        justifyContent:'space-between',
        flexDirection:'row'
    },

    textFirst:{
        color:'black',
        fontSize:15,
        fontFamily: 'FuturaStd-Light',
        alignSelf: "center"
    },

    textLast:{
        flex: 1,
        color:'#DA7B61',
        fontSize:15,
        textAlign:'right',
        fontFamily: 'FuturaStd-Light',
    }
});

export default styles;
