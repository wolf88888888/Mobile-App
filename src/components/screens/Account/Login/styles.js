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
        alignItems: 'center',
        marginTop: 40
    },
    titleView: {
        display: 'flex',
        width: '100%',
        marginTop: 16,
        marginLeft: 36,
        marginBottom: 16
    },
    titleText: {
        color: '#fff',
        fontSize: 22,
        fontFamily: 'FuturaStd-Light'
    },
    inputView: {
        width: '100%',
        margin: 11,
        paddingLeft: 18,
        paddingRight: 18
    },
    buttonWrapper: {
        width: '70%',
    },
    LogInButton: {
        height: 50,
        backgroundColor: '#273842',
        borderRadius: 25,
        marginTop: 90,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: '#fff',
        fontSize: 17,
        fontFamily: 'FuturaStd-Light'
    },
    lowOpacity: {
        opacity: 0.3,
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    getStartedImage: {
        width: 400,
        height: 80,
    },
    btn_backImage:{
        height: 28,
        width: 28,
        marginTop: 44,
        marginLeft: 16,
      }
});

export default styles;
