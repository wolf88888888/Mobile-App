import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 90,
        position: 'relative'
    },
    iconView: {
        position: 'absolute',
        top: 40,
        left: 18,
        width: 24,
        height: 24,
        borderRadius: 12,
        borderColor: '#fff',
        borderWidth: 1.5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    iconText: {
        color: '#fff',
        fontSize: 8
    }
});

export default styles;
