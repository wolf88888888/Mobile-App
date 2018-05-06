import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#f0f1f3',
        fontFamily: 'FuturaStd-Light'
    },textStyle:{
      fontSize:25,
      fontWeight:'bold',
      margin:10,
      paddingLeft:5,
      fontFamily: 'FuturaStd-Light'
    },ComponentView:{
      alignItems:'center',
      flexDirection:'row',
      padding:13,
      justifyContent:'space-between'
    },firstText:{
      fontSize:20,
      paddingLeft:5
    },ImageStyle:{
      width:40,
      height:40,
      paddingRight:5
    }
});

export default styles;
