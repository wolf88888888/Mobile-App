import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection:'row',
      width:'100%',
      height: 80,
    },

    titleStyle:{
      fontFamily: 'FuturaStd',
      fontSize:20,
      color: '#54575a',
    },

    subtitleStyle:{
      fontFamily: 'FuturaStd',
      fontSize:13,
      color: '#54575a',
    },

    headStyle: {
      marginLeft: 15,
    },

    countStyle: {
      marginRight: 15,
    },
});

export default styles;
