import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    propertyContainer: {
        flex: 0.2,
        height: 50,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    property: {
        width: 27,
        height: 27
    },
    info: {
        fontFamily: 'FuturaStd-Light',
        fontSize: 10,
        color: '#000'
    }
});
export default styles;
