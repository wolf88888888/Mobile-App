import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#f0f1f3'
    },

    backButton:{
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 25,
        marginLeft: 15,
    },
    btn_backImage:{
        height: 24,
        width: 24,
        resizeMode: 'contain'
      },
      titleText: {
        color: '#000',
        fontSize: 22,
        fontFamily: 'FuturaStd-Light',
        marginLeft: 20,
    },

    bodyRows: {
        flex: 1,
        flexDirection: 'column',
    },

    doneButtonText: {
        color: '#ffffff',
        fontFamily: 'FuturaStd-Light',
        fontSize: 17,
    },
    ChildText:{
        fontFamily: 'futura',
        fontSize: 17,
        marginLeft: 15,
    },
    doneButtonView: {
        flex: 1,
        flexDirection: 'column',
        width: '100%',
        backgroundColor: '#DA7B61',
        justifyContent: 'center',
        alignItems: 'center',
        height:50,
    },

    bottomView: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        padding:10,
        height:70,
    },
});

export default styles;
