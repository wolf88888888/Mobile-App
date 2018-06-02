import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flexDirection:'column',
      marginLeft: 20,
      marginRight: 20,
    },

    titleContainter: {
        flexDirection:'row',
        justifyContent: 'space-between'
    },

    title: {
        fontFamily: 'FuturaStd-Light',
        fontSize: 15,
        color: '#000000'
    },

    facilities: {
        flexDirection: 'row',
        justifyContent:'space-between'
    },
});

export default styles;
