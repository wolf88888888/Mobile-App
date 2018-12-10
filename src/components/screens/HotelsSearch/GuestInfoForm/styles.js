import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#eee'
    },
    backButton: {
        marginLeft: 10,
        marginBottom: 40
    },
    btn_backImage:{
        height: 24,
        width: 24,
        marginTop: 44,
        marginLeft: 16,
        marginBottom: 32
    },
    steps: {
        fontSize: 10,
        fontFamily: 'FuturaStd-Medium',
        color: '#a2c5bf'
    },
    content: {
        flex: 1,
        paddingHorizontal: 20
    },
    heading: {
        color: 'black',
        fontFamily: 'FuturaStd-Medium',
        marginTop: 5,
        fontSize: 20,
        marginBottom: 30
    },
    hotelInfoContainer: {
        flexDirection: 'row'
    },
    hotelThumbView: {
        flex: 0.38
    },
    hotelInfoView: {
        flexDirection: 'column',
        justifyContent: 'flex-end',
        flex: 0.7,
        paddingTop: 7,
        paddingHorizontal: 12
    },
    hotelThumb: {
        resizeMode: 'cover',
        width: '100%',
        height: 90
    },
    
    hotelName: {
        color: 'black',
        fontFamily: 'FuturaStd-Medium',
        fontSize: 16,
    },
    hotelPlace: {
        fontFamily: 'FuturaStd-Light',
        fontSize: 10,
        color: '#54585b',
    },
    
    bold400: {
        fontWeight: '400'
    },
    form: {
        flex: 1,
        marginTop: 20
    },
    labelGuest: {
        fontFamily: 'FuturaStd-Light',
        fontSize: 16
    },
    inputFieldsView: {
        flexDirection: 'row',
        marginTop: 10
    },
    genderFlex: {
        flex: 0.30
    },
    firstNameFlex: {
        flex: 0.35
    },
    lastNameFlex: {
        flex: 0.35
    },
    gender: {
        height: 50,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'auto',
        shadowColor: '#858585',
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowRadius: 2,
        shadowOpacity: 0.5
    },
    formField: {
        height: 50,
        backgroundColor: '#fff',
        textAlign: 'center',
        shadowColor: '#858585',
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowRadius: 2,
        shadowOpacity: 0.5,
        fontSize: 16,
        fontFamily: 'FuturaStd-Light'
    },
    genderText: {
        fontSize: 14,
        fontFamily: 'FuturaStd-Light'
    },
    spaceRight: {
        marginRight: 10
    },
    guestInfoWrapper: {
        marginTop: 15,
        flex: 1
    }
});

export default styles;
