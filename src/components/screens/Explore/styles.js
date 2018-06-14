import { StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('screen');

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
        width: '68%',
       // height: 105,
        backgroundColor: '#f0f1f3',
        paddingTop: 40,
        paddingLeft: 17,
        paddingRight: 17
    },
    blank:{
        height: 70,
        backgroundColor: '#fff'
    },
    SearchAndPickerwarp:{
        display: 'flex',
        flexDirection: 'row',
        marginBottom:10
    },
    bottomWrapper:{
     marginTop:20,
      flex: 1,
     justifyContent: 'center', 
     alignItems: 'center'
    },
    getStartedButton:
    {
       // width: '100%',
       //  backgroundColor: '#DA7B61',
       //  marginTop: 10,
       //  marginBottom: 10,

     },

    pickerWrap:{
        width: '32%',
        paddingTop: 40,
        paddingRight: 17,
        alignSelf: 'flex-start',
        justifyContent: 'flex-end',  
        alignItems: 'flex-start'
    },
    picker:{
       width: '100%'
    },
     placeholderImageView: {
        marginTop: 10,
        alignSelf: 'flex-start',
        flex: 1
    },
    footerImageWrap: {
        justifyContent: 'center', 
        alignItems: 'center',
        flex: 1
    },
    footerImage: {
        width: '100%'
    },
    hotelLoc: {
        fontSize: 14,
        fontFamily: 'FuturaStd-Light',
        paddingLeft: 5,
        marginTop: 5
    },
    hotelName: {
        fontSize: 18,
        fontFamily: 'FuturaStd-Light',
        paddingLeft: 5
    }, 
    hotelRating: {
        fontSize: 12,
        color: '#ccc',
        fontFamily: 'FuturaStd-Light',
        paddingLeft: 5
    },
    hotelPrice: {
        fontSize: 14,
        fontFamily: 'FuturaStd-Light',
        paddingLeft: 5,
        marginTop: 10,
        paddingBottom: 10
    },
     placeholderImageViewCard: {
        alignSelf: 'flex-start',
        flex: 1,
        backgroundColor : '#fff',
        shadowColor: '#858585',
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowRadius: 2,
        shadowOpacity: 0.5,
        position: 'relative',
        marginRight: 10

    },
    arrowSvg: {
        height: 20,
        width: 20,
        backgroundColor: "blue",
        position: "absolute",
        right: 20,
        top: 10
    },
    placeholderImage: {
        width: 156,
        height: 120,
        marginRight: 10
        //  margin:20,
        //  padding:20,
        // marginTop: 20
    },
    itemView:{
        height: '83%'
    },
    catWrapper:{
        flex: 1,
        flexDirection:'row',
        //justifyContent:'flex-start',
        //alignItems: 'flex-start',
        paddingTop: 10,
        paddingLeft: 17,
        paddingRight: 17,
        //alignContent: 'flex-start',
        alignItems: 'center',
        justifyContent: 'center',
    },
    catRow: {
        flex:1,
        flexDirection:'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        alignContent: 'flex-start',
        width: '50%'
    },
    homeCat: {

    }, 
    catTitle: {
        justifyContent:'flex-start',
        fontSize: 24,
        paddingLeft: 17,
        fontFamily: 'FuturaStd-Light',
        paddingTop: 10
    },
    searchButtonView: {
        width: '90%',
        backgroundColor: '#DA7B61',
        alignItems: 'center',
        flex: 1,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 17,
        marginRight: 17
    },
    searchButtonText: {
        color: '#fff',
        fontFamily: 'FuturaStd-Light',
        fontSize: 17,
        padding: 14
    },
    title: {
        fontFamily: 'FuturaStd-Light',
        fontSize: 24,
        color: '#1f2427',
        marginLeft: 14,
        marginTop: 30,
        textAlign: "center"
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
        height: 190,
        width: '48%',
        backgroundColor: '#fff',
        marginBottom: 10,
        marginHorizontal: 5,
        
    },
    popularHotelsImage: {
        height: 100,
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
        marginTop: 15
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
        paddingVertical: 0,
        paddingHorizontal: 50,
        alignItems: 'center',
        backgroundColor: '#cc8068',
        marginTop: 15,
        marginBottom: 15
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

    //model styling
    modalView: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    popup: {
        backgroundColor: '#eee',
        alignSelf: 'stretch',
        marginHorizontal: 10,
        borderRadius: 4,
        padding: 15
    },
    labelCloseView: {
        flexDirection: 'row'
    },
    walletPasswordLabel: {
        fontFamily: 'futura',
        fontSize: 18
    },
    closeButtonView: {
        flex: 1,
        alignItems: 'flex-end'
    },
    closeButtonSvg: {
        height: 20,
        width: 20
    },
    confirmButton: {
        fontFamily: 'FuturaStd-Light',
        backgroundColor: '#DA7B61',
        padding: 15,
        alignItems: 'center',
        marginTop: 15,
        borderRadius: 2
    },
    confirmButtonText: {
        fontFamily: 'FuturaStd-Light',
        color: '#fff',
        fontSize: 16
    },
    autocompleteText: {
        fontFamily: 'FuturaStd-Light'
    },
    autocompleteTextWrapper: {
        backgroundColor: '#ffffff',
        width: width - 34,
        justifyContent: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 17,
        paddingRight: 17
    },
});
export default styles;
