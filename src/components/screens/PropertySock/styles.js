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
        flex: 1,
    },
    
    switchButton: {
        position: 'absolute',
        bottom: 15,
        right: 20,
        width: 56,
        height: 56,
        borderRadius: 50,
        backgroundColor: '#D87A61',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },

    icon: {
        color: '#fff',
        fontSize: 24
    },
});
export default styles;
