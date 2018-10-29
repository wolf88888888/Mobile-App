import { StyleSheet, Dimensions } from 'react-native';
const dimensions = Dimensions.get('window');
const imageHeight = Math.round(dimensions.width * 0.25);
const imageWidth = Math.round(dimensions.width * 0.32);
const styles = StyleSheet.create({
    
    card: {
        flexDirection: 'row',
        marginLeft: 15,
        marginRight: 15,
        marginTop: 7.5,
        marginBottom: 7.5,
        paddingRight: 10,
        height: imageHeight,
        backgroundColor: 'white',    
    },
    popularHotelsImage: {
        height: imageHeight, 
        width: imageWidth,
    },
    favoritesButton: {
        position: 'absolute',
        height: 20, 
        width: 20,
        top: 5,
        right: 5
    },
    favoriteIcon: {
        height: 20,
        width: 20
    },
    cardContent: {
        flex: 1,
    },
    placeName: {
        marginTop: 8,
        marginLeft: 8,
        fontSize: 18,
        color: 'black',
        fontWeight: '100',
        fontFamily: 'FuturaStd-Medium',
    },
    aboutPlaceView: {
        marginLeft: 8,
        flexDirection: 'row',
        marginTop: 4
    },
    placeReviewText: {
        fontFamily: 'FuturaStd-Light',
        fontSize: 12,
        color: '#aeaeae'
    },
    placeReviewNumber: {
        fontFamily: 'FuturaStd-Light',
        fontSize: 12,
        color: '#aeaeae'
    },
    totalReviews: {
        fontFamily: 'FuturaStd-Light',
        fontSize: 12,
        color: '#aeaeae'
    },
    ratingIconsWrapper: {
        flexDirection: 'row'
    },
    costView: {
        width: '100%',
        flexDirection: 'row',
        position: 'absolute',
        bottom: 10,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    cost: {
        color: 'black',
        fontSize: 17,
        fontFamily: 'FuturaStd-Medium'
    },
    costLoc: {
        color: 'black',
        fontSize: 13,
        fontFamily: 'FuturaStd-Medium'
    },
    perNight: {
        fontSize: 10,
        fontFamily: 'FuturaStd-Light',
        color: 'black',
    },
    star: {
        height: 8,
        width: 8,
        marginTop: 2
    },
});

export default styles;
