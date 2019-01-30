import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#DA7B61'
    },
    main: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
    },
    titleView: {
        display: 'flex',
        width: '100%',
        marginTop: 0,
        marginLeft: 20,
        marginBottom: 2
    },
    titleText: {
        fontFamily: 'FuturaStd-Medium',
        fontSize: 21,
        color: '#fff',
        marginTop: 15
    },
    titleText1: {
        fontFamily: 'FuturaStd-Medium',
        fontSize: 21,
        color: '#fff',
        marginTop: 0
    },
    titleText2: {
        fontFamily: 'FuturaStd-Medium',
        fontSize: 21,
        color: '#fff',
        marginTop: 15
    },
    infoText: {
        fontFamily: 'FuturaStd-Light',
        fontSize: 12.5,
        color: '#fff',
        margin: 20,
        lineHeight: 20
    },
    inputView: {
        width: '100%',
        marginTop: 11,
        marginBottom: 11,
        paddingLeft: 18,
        paddingRight: 18
    },
    nextButtonView: {
        display: 'flex',
        alignItems: 'flex-end',
        width: '100%',
        paddingRight: 18,
        marginTop: 0
    },
    nextButton: {
        height: 50,
        width: 50,
        backgroundColor: '#273842',
        borderRadius: 25,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        paddingLeft: 2,
        paddingBottom: 2
    }
});

export default styles;
