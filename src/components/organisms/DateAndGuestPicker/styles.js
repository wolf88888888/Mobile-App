import { StyleSheet, Dimensions } from 'react-native';
const dimensionWindows = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        marginTop: 17,
    },
    pickerRow: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
    },
    datesPickerViewIncomplete: {
        display: 'flex',
        flexDirection: 'row',
        height: 50,
        borderColor: '#dbdbdb',
        borderWidth: 0.5,
        justifyContent: 'space-around',
        padding: 8,
        backgroundColor:'#fff'
    },
    datesPickerViewComplete: {
        display: 'flex',
        flexDirection: 'row',
        height: 50,
        borderColor: '#dbdbdb',
        borderWidth: 0.5,
        justifyContent: 'space-around',
        padding: 8,
        backgroundColor:'#fff'
    },
    datePickerView: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    separator: {
        width: 0,
        borderWidth: 0.5,
        borderColor: '#d6d6d6'
    },
    guestPickerViewIncomplete: {
        display: 'flex',
        flexDirection: 'column',
        width: 65,
        height: 50,
        backgroundColor: '#fff',
        borderColor: '#dbdbdb',
        borderWidth: 0.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    guestPickerViewComplete: {
        display: 'flex',
        flexDirection: 'column',
        width: 80,
        height: 50,
        marginLeft: 7,
        backgroundColor: '#fff',
        borderColor: '#dbdbdb',
        borderWidth: 0.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    label: {
        fontFamily: 'FuturaStd-Light',
        fontSize: 17,
        color: '#000',
        top: 2
    },
    value: {
        fontFamily: 'FuturaStd-Light',
        fontSize: 10,
        color: '#DA7B61'
    },
    optionsPickerViewIncomplete: {
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        marginLeft:7,
        width: 50,
        height: 50,
        borderColor: '#dadadb',
        borderWidth: 0.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    optionsPickerViewComplete: {
        display: 'flex',
        flexDirection: 'column',
        width: 50,
        height: 50,
        backgroundColor: '#fff',
        borderColor: '#dbdbdb',
        borderWidth: 0.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconText: {
        width: '55%',
        height:'55%',
    },
    searchButtonView: {
        width: '100%',
        height: dimensionWindows.height * 0.08,
        backgroundColor: '#DA7B61',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 8
    },
    searchButtonText: {
        color: '#fff',
        fontFamily: 'FuturaStd-Light',
        fontSize: dimensionWindows.width * 0.05,
        padding: 14
    }
});
