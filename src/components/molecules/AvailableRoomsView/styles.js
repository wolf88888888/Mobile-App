import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flexDirection:'column',
      marginLeft: 17.5,
      marginRight: 17.5,
    },

    title:{
      fontFamily: 'futura',
      fontSize:17,
      color: '#000000',
      marginTop: 10,
      marginBottom: 10
    },

    listItem: {
        width: "100%",
        height: 75,
        flexDirection:'column',
        marginTop:5,
        marginBottom:5,
        paddingLeft:10,
        paddingRight:10,
        backgroundColor:'#ffffff',
        // borderWidth:0.3,
        // borderColor:'#cccccc',
    },

    name: {
        fontFamily: 'FuturaStd-Light',
        fontSize: 13,
        color: '#000',
        marginTop: 10,
    },

    price: {
        fontFamily: 'FuturaStd-Light',
        fontSize: 11,
        color: '#000',
        marginTop: 7,
    },

    book: {
        fontFamily: 'futura',
        fontSize: 10,
        fontSize: 12.5,
        color: '#d97b61',
        alignSelf: 'flex-end'
    }
});

export default styles;