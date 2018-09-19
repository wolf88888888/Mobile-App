import { StyleSheet, Dimensions } from 'react-native';
const dimensionWindows = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#f0f1f3'
    },

    containerHotels:{
        marginTop: 10,
        flex: 1
    },
});
export default styles;
