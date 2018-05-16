import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flexDirection:'column',
      marginLeft: 17.5,
      marginRight: 17.5,
    },

    title:{
      fontFamily: 'FuturaStd-Medium',
      fontSize:17,
      color: '#000000',
      marginTop: 10,
      marginBottom: 10
    },

    facilities: {
        flexDirection: 'row',
        justifyContent:'space-between'
    },
});

export default styles;
