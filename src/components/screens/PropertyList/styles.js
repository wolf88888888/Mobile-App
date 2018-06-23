import { StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('screen');
const dimensionWindows = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'stretch',
        backgroundColor: '#f0f1f3',
        height:'100%',
        position:'relative',
        paddingBottom: 10
    },
    searchAreaView: {
        width: '100%',
        height: 125,
        backgroundColor: '#f0f1f3',
        paddingTop: 40,
        paddingLeft: 17,
        paddingRight: 17
    },
    //Flatlist styles
    flatList:{
        marginLeft: 14,
        marginRight: 18
    },
    card: {
        height: 230,
        width: '100%',
        backgroundColor: '#fff',
        marginBottom: 10,
        
    },
    popularHotelsImage: {
        height: 150,
        width: null
    },

    cardContent: {
        padding: 5
    },
    locationContainer: {
        flexDirection: 'row'
    },
    locationText: {
        fontSize: 9,
        fontFamily: 'FuturaStd-Light',
        marginTop: 2
    },
    placeName: {
        color: 'black',
        marginTop: 8,
        fontSize: 15,
        fontFamily: 'FuturaStd-Light'
    },
    aboutPlaceView: {
        flexDirection: 'row',
        marginTop: 2
    },
    placeReviewText: {
        fontSize: 8,
        color: '#aeaeae'
    },
    placeReviewNumber: {
        fontSize: 8,
        color: '#aeaeae'
    },
    totalReviews: {
        fontSize: 8,
        color: '#aeaeae'
    },
    ratingIconsWrapper: {
        flexDirection: 'row'
    },
    star: {
        height: 8,
        width: 8,
        marginTop: 2
    },
    costView: {
        flexDirection: 'row',
        marginTop: 10
    },
    cost: {
        fontSize: 12,
        fontFamily: 'FuturaStd-Light'
    },
    perNight: {
        fontSize: 10,
        fontFamily: 'FuturaStd-Light',
        marginTop: 2
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
    showAllButton: {
        padding: 14,
        alignItems: 'center',
        backgroundColor: '#cc8068'
    },
    showAllText: {
        color: '#fff',
        fontFamily: 'FuturaStd-Light',
        fontSize: 18
    },
    listHotelView: {
        padding: 18,
        alignItems: 'center'
    },
    hostHeader: {
        fontSize: 12,
        fontFamily: 'FuturaStd-Light',
    },
    hostDescription: {
        fontFamily: 'FuturaStd-Light',
        textAlign: 'center',
        fontSize: 18,
        marginHorizontal: 30
    },
    getStartedButton: {
        paddingVertical: 14,
        paddingHorizontal: 50,
        alignItems: 'center',
        backgroundColor: '#cc8068',
        marginTop: 15
    },
    backButton:{
        marginTop: 25,
        marginLeft: 15,
    },
    btn_backImage:{
        height: 24,
        width: 24,
        resizeMode: 'contain'
      },
});
export default styles;