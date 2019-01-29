import {StyleSheet, Dimensions} from 'react-native'

export default styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#eee'
    },
    closeView: {
        height: 80,
        justifyContent: 'flex-end',
        paddingLeft: 18
    },
    closeSvg: {
        height: 25,
        width:25
    },
    bottomBar: {
        backgroundColor: '#fff',
        height: 80,
        alignItems: 'center',
        padding: 15
    },
    doneButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: '#cc8068',
    },
    doneButtonText: {
        color: '#fff',
        fontSize: 18,
        fontFamily: 'FuturaStd-Light'
    },
    header: {
        height: '25%',
        justifyContent: 'center',
        alignItems: 'flex-end',
        flexDirection: 'row',
        borderBottomColor: '#d4d4d4',
        borderBottomWidth: 1,
        paddingBottom: 15
    },
    headerIcons: {
        height: 45,
        width: 45
    },
    residence: {
        height: 80,
        width: 80,
        borderRadius: 50,
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: '#b1b1b1',
        justifyContent: 'center',
        alignItems: 'center'
    },
    residenceType: {
        textAlign: 'center',
        marginTop: 10,
        color: '#656565',
        fontFamily: 'FuturaStd-Light'
    },
    residenceView: {
        marginHorizontal: 15
    },
    tick: {
        width: 20,
        height: 20,
        position: 'absolute',
        right: 0,
        top: 0
    },
    selected: {
        borderColor: '#cc8068'
    },
    starRatingView: {
        padding: 15
    },
    starRatingText: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    starView: {
        flexDirection: 'row',
        paddingTop: 15,
        justifyContent: 'space-between'
    },
    starBox: {
        backgroundColor: '#fff',
        height: 70,
        width: (Dimensions.get('window').width - 50)/5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    ratingNumber: {
        textAlign: 'center',
        fontSize: 18,
        color: '#999999'
    },
    star: {
        height: 20,
        width: 20,
        marginTop: 5
    },
    activeRating: {
        backgroundColor: '#cc8068'
    },
    activeRatingText: {
        color: '#fff'
    },
    pricingView: {
        padding: 15,
        borderTopWidth: 1,
        borderTopColor: '#c6c6c6'
    },
    emptyPricingView: {
        height : 0,
        width : 0
    },
    pricingText: {
        fontSize: 18,
        fontFamily: 'FuturaStd-Medium',
    },
    set: {
        alignSelf: 'stretch',
        paddingHorizontal: 18,
        height: '60%',
    },
    group: {
        flexDirection: 'row',
        paddingVertical: 25
    },
    type: {
        flex: 1,
        justifyContent: 'center'
    },
    countView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    typeText: {
        fontFamily: 'FuturaStd-Light',
        fontSize: 18
    },
    minusButton: {
        height: 34,
        width: 34,
        borderRadius: 17,
        backgroundColor: '#fff',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#cc8068'
    },
    minusText: {
        color: '#cc8068',
        fontSize: 30,
        marginTop: -5
    },
    plusButton: {
        height: 34,
        width: 34,
        borderRadius: 17,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#cc8068'
    },
    plusText: {
        color: '#cc8068',
        fontSize: 20,
        marginTop: -5
    },
    countText: {
        marginHorizontal: 18,
        fontFamily: 'FuturaStd-Light',
        fontSize: 20,
        marginTop: 5
    },
    typeSubText: {
        fontSize: 11,
        fontFamily: 'FuturaStd-Light',
        color: '#6e6e6e'
    },
    borderBottom: {
        borderBottomColor: '#e2e2e2',
        borderBottomWidth: 1
    }
})
