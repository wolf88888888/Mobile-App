import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#f0f1f3',
    },

    title:{
        fontSize: 20,
        fontFamily: 'FuturaStd-Light',
        marginLeft: 20,
        marginTop: 10,
        color: '#000000'
    },

    list: {
        marginTop: 10
    },

    ComponentView:{
        flexDirection:'row',
        marginLeft: 20,
        marginRight: 20,
        justifyContent:'space-between'
    },

    text:{
        marginTop:25,
        fontSize:15,
        fontFamily: 'FuturaStd-Light',
        color: '#000000'
    },


    lineStyle:{
        borderWidth:0.3,
        borderColor:'#cccccc',
        marginTop:25,
        marginLeft:20,
        marginRight:20,
    },
});

export default styles;
