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

    item : {
        flexDirection:'column',
    },

    ComponentView:{
        alignItems:'center',
        flexDirection:'row',
        marginLeft: 20,
        marginRight: 20,
        justifyContent:'space-between'
    },

    firstText:{
        marginTop: 20,
        fontSize:16,
        fontFamily: 'FuturaStd-Light',
        color: '#000000'
    },

    ImageStyle:{
        marginTop:10,
        width:30,
        height:30,
    },

    lineStyle:{
        borderWidth:0.3,
        borderColor:'#cccccc',
        marginTop:20,
        marginLeft:20,
        marginRight:20,
    },
});

export default styles;
