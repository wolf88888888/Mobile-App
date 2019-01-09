import { StyleSheet } from 'react-native';
import Dimensions from 'Dimensions';

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#DA7B61'
    },
    main_container: {
        flex: 1,
        flexDirection: 'column',
        height: height,
    },
    main: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
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
        margin: 11.5,
        paddingLeft: 18,
        paddingRight: 18
    },
    finePrintView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    finePrintText: {
        paddingLeft: 18,
        flex: 0.8,
        color: '#fff',
        fontSize: 13,
        fontFamily: 'FuturaStd-Light',
    },
    switchContainer: {
        alignSelf: 'center',
        marginRight: 20,
    },
    switchCheckView: {
        position: 'absolute',
        top: 10,
        left: 10
    },
    switchCheckText: {
        color: '#DA7B61',
        fontSize: 10.5
    },
    nextButtonView: {
        display: 'flex',
        alignItems: 'flex-end',
        width: '100%',
        paddingRight: 18,
        marginTop: 36,
        marginBottom: 36
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
        paddingLeft: 2,
        paddingBottom: 2
    },
    buttonText: {
        color: '#fff',
        fontSize: 17
    },
    lowOpacity: {
        opacity: 0.3,
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
    },
    getStartedImage: {
        width: 400,
        height: 80
    }
});

export default styles;
