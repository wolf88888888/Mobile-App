import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    leftIconView: {
        top: 13,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 50
    },
    leftIconText: {
        color: '#5a5a5c',
        fontSize: 20
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#fff',
        height: 50
    },
    input: {
        flex: 1,
        marginLeft: -3,
        marginRight: 20,
        color: '#000',
        fontSize: 17,
        fontFamily: 'FuturaStd-Light'
    }
});
