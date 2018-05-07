import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        padding: 16
    },
    pickerRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    datesPickerViewIncomplete: {
        display: 'flex',
        flexDirection: 'row',
        width: 210,
        height: 50,
        backgroundColor: '#fff',
        borderColor: '#dbdbdb',
        borderWidth: 0.5,
        justifyContent: 'space-around',
        padding: 8
    },
    datesPickerViewComplete: {
        display: 'flex',
        flexDirection: 'row',
        width: 210,
        height: 50,
        backgroundColor: '#f0f1f3',
        borderColor: '#dbdbdb',
        borderWidth: 0.5,
        justifyContent: 'space-around',
        padding: 8
    },
    datePickerView: {
        display: 'flex',
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
        width: 65,
        height: 50,
        backgroundColor: '#f0f1f3',
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
    optionsPickerViewComplete: {
        display: 'flex',
        flexDirection: 'column',
        width: 50,
        height: 50,
        backgroundColor: '#f0f1f3',
        borderColor: '#dbdbdb',
        borderWidth: 0.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconText: {
        color: '#000',
        fontSize: 28
    },
    searchButtonView: {
        width: '100%',
        backgroundColor: '#DA7B61',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 8
    },
    searchButtonText: {
        color: '#fff',
        fontFamily: 'FuturaStd-Light',
        fontSize: 17,
        padding: 14
    }
});
