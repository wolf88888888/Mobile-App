import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        right: 18,
        bottom: 10,
        paddingVertical: 8,
        paddingHorizontal: 15,
        alignItems: 'center',
        // backgroundColor: '#cc8068',
        backgroundColor: '#000',
        marginTop: 15,
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 3,
        shadowOpacity: 0.6
    },
    fabText: {
        fontFamily: 'FuturaStd-Medium',
        color: '#fff',
        fontSize: 13,
        width: 88,
    },
});

export default styles;
