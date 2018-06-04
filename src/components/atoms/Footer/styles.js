import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        height: 80,
        backgroundColor: '#ffffff',
        borderTopWidth:0.3,
        borderTopColor:'#ddd',
    },

    subContainer: {
        flexDirection: 'row',
        justifyContent:'space-between',
    },

    infoContainer: {
        flexDirection:'column',
        justifyContent:'center',
        marginLeft:15,
    },

    info0: {
        fontFamily: 'FuturaStd-Medium',
        color: '#000000',
        fontSize: 16,
        lineHeight:20,
    },

    unit: {
        fontFamily: 'FuturaStd-Light',
        color: '#000000',
        fontSize: 10,
        lineHeight:20,
    },

    info1: {
        fontFamily: 'FuturaStd-Light',
        color: '#000000',
        fontSize: 16,
        lineHeight:20,
    },

    ButtonView: {
        backgroundColor: '#DA7B61',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 15,
        width: 160
    },

    FullButtonView: {
        flex: 1,
        backgroundColor: '#DA7B61',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 15,
    },

    ButtonText: {
        color: '#fff',
        fontFamily: 'FuturaStd-Light',
        fontSize: 16,
        padding: 14,
        alignItems: 'center'
    },
});

export default styles;
