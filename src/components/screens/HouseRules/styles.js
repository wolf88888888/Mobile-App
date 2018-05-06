import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#f0f1f3'
    },View:{
      alignItems:'center',
      flexDirection:'row',
      padding:13,
      justifyContent:'space-between'
    },text:{
      fontSize:20,
      paddingLeft:5
    },textTitle:{
      fontSize:25,
      fontWeight:'bold',
      margin:10,
      paddingLeft:5
  }
});

export default styles;
