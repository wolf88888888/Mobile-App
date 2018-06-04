import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#f0f1f3',
    },

    footer:{
         position:'absolute',
         bottom:0,
         left:0,
         right:0,
         zIndex:10,
     },
});

export default styles;
