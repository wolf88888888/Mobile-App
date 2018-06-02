import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#f0f1f3',
    },

    title:{
        fontSize: 20,
        fontFamily: 'FuturaStd-Medium',
        marginLeft: 20,
        marginTop: 10,
        color: '#000000'
    },

    list: {
        marginTop: 20
    },


    item : {
        flexDirection:'column',
    },

    ComponentView:{
        flexDirection:'column',
        marginLeft: 20,
        marginRight: 20,
        justifyContent:'space-between'
    },

    text:{
        fontSize:16,
        lineHeight:60,
        fontFamily: 'FuturaStd-Light',
        color: '#000000',
    },

    lineStyle:{
        borderWidth:0.3,
        borderColor:'#cccccc',
        marginLeft:20,
        marginRight:20,
    },
});

export default styles;
