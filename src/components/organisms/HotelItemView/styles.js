import { StyleSheet, Dimensions } from 'react-native';
const dimensions = Dimensions.get('window');
const imageHeight = Math.round(dimensions.width * 0.25);
const imageWidth = Math.round(dimensions.width * 0.32);
const styles = StyleSheet.create({
    
    card: {
        flexDirection: 'row',
        marginTop: 18,
        paddingTop: 2,
        paddingLeft: 2,
        paddingRight: 24,
        height: imageHeight,
        width: '100%',
        backgroundColor: 'white',    
    },
    popularHotelsImage: {
        height: imageHeight, 
        width: imageWidth,
    },
    favoritesButton: {
        position: 'absolute',
        top: 10,
        right: 10
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
        fontWeight: 'normal',
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
        width: '96%',
        flexDirection: 'row',
        position: 'absolute',
        bottom: 10,
        right: 0,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    cost: {
        flex:1.05,
        color: 'black',
        fontSize: 18,
        fontFamily: 'FuturaStd-Medium'
    },
    costLoc: {
        flex:1.35,
        color: 'black',
        fontSize: 14,
        fontFamily: 'FuturaStd-Medium'
    },
    perNight: {
        flex:0.6,
        fontSize: 10,
        fontFamily: 'FuturaStd-Light',
    },
    star: {
        height: 8,
        width: 8,
        marginTop: 2
    },
});

export default styles;
