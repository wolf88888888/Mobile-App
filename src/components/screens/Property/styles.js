import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
        backgroundColor: '#f0f1f3'
    },
    searchAreaView: {
        width: '100%',
        height: 105,
        backgroundColor: '#f0f1f3',
        paddingTop: 40,
        paddingLeft: 17,
        paddingRight: 17
    },
    webView: {
        marginTop: 10
    },
    itemView:{
        height: '77%'
    },
    sectionView: {
        width: '100%',
        paddingLeft: 17,
        paddingRight: 17
    },
    subtitleView: {
        width: '100%',
        paddingTop: 18,
        paddingBottom: 5,
        borderBottomWidth: 0.5,
        borderColor: '#cc8068'
    },
    subtitleText: {
        fontSize: 16,
        fontFamily: 'FuturaStd-Light'
    },
    tilesView: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    text: {
        color: '#000'
    },
    section1: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 18,
        marginRight: 18
    },
    dateView: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: 10
    },
    btnCheckInDate: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#ffffff'
    },
    btnCheckOutDate: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#ffffff'
    },
    btnGuests: {
        flex: 0.3,
        alignItems: 'center',
        backgroundColor: '#ffffff'
    },
    btn_text: {
        fontFamily: 'FuturaStd-Light',
        fontSize: 16,
        color: '#1f2427',
        paddingTop: 10
    },
    betweenButtons: {
        marginTop: 8,
        marginBottom: 8,
        width: 1,
        backgroundColor: '#ccc'
    },
    btn_subtext: {
        fontFamily: 'FuturaStd-Light',
        fontSize: 12,
        color: '#d97b61',
        paddingBottom: 10
    },
    btnSettings: {
        flex: 0.25,
        marginLeft: 10,
        alignItems: 'center',
        backgroundColor: '#ffffff',
        paddingTop: 15
    },
    btn_SettingImages: {
        height: 25,
        width: 25,
        resizeMode: 'contain'
    },
    btnSearch: {
        margin: 10,
        marginLeft: 18,
        marginRight: 18,
        padding: 14,
        alignItems: 'center',
        backgroundColor: '#cc8068'
    },
    searchText: {

        fontFamily: 'FuturaStd-Light',
        fontSize: 20,
        color: '#fff'
    },
    discoverView: {
        padding: 18
    },
    discoverText: {
        fontSize: 16,
        marginBottom: 15,
        fontWeight: '500'
    },
    discoverImage: {
        width: (Dimensions.get('window').width - 42)/2,
        height: 100
    },
    topDestinationsView: {
        padding: 18
    },
    topDestinationsText: {
        fontSize: 16,
        marginBottom: 15,
        fontWeight: '500'
    },
    topDestinationsImage: {
        width: (Dimensions.get('window').width - 42)/3.5,
        height: 150
    },
    discoverItemButton: {
        marginRight: 6
    },
    popularHotelsView: {
        paddingHorizontal: 18,
        paddingBottom: 18
    },
    popularHotelsText: {
        fontSize: 16,
        marginBottom: 15,
        fontWeight: '500'
    },
    cardsView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        
    },
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
    fab: {
        position: 'absolute',
        right: 18,
        bottom: 10,
        paddingVertical: 8,
        paddingHorizontal: 15,
        alignItems: 'center',
        backgroundColor: '#cc8068',
        marginTop: 15,
        justifyContent: 'center',
        shadowColor: '#858585',
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowRadius: 2,
        shadowOpacity: 0.5
    },
    fabText: {
        fontFamily: 'FuturaStd-Light',
        color: '#fff'
    },
    bottomSvg: {
        height: 80
    },
    exploreSvg: {
        height: 80,
        width: Dimensions.get('window').width,
        alignSelf: 'stretch'
    },
    bottomGap: {
        height: 50
    },
    backButton:{
        marginTop: 25,
        marginLeft: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    btn_backText: {
        marginLeft: 5,
        marginTop: 28,
        fontFamily: 'FuturaStd-Medium',
    },
    btn_backImage:{
        height: 24,
        width: 24,
        resizeMode: 'contain'
    },
    titleConatiner: {
        width:'100%',
        flexDirection: 'row',
        alignItems: 'center',
    }
});
export default styles;
