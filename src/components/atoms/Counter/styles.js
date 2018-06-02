import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection:'row',
      flexWrap:'wrap',
      width: 130
    },
    value: {
        fontFamily: 'FuturaStd-Light',
        fontSize:17,
        color: '#54575a',
        textAlign: 'center',
        width:50,
    },
    ButtonImage: {
        width: 35,
        height: 35,
        opacity: 1,
    },

    DisableImage: {
        width: 35,
        height: 35,
        opacity: 0.8,
    }
});

export default styles;
