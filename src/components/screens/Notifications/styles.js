import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#eee',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    placeholderImageView: {
        marginTop: 20
    },
    placeholderImage: {
        width: 250,
        height: 210,
        marginTop: 30
    },
    hotelImage: {
        marginBottom: 10,
        marginTop: 10,
        height: 150,
    },
    title: {
        fontFamily: 'futura',
        fontSize: 24,
        color: '#1f2427',
        marginLeft: 14,
        marginTop: 30
    },
    subtitle: {
        fontFamily: 'futura',
        fontSize: 16,
        marginRight: 10,
        color: '#1f2427'
    },
    subtext: {
        fontFamily: 'FuturaStd-Light',
        fontSize: 12,
        marginTop: 8,
        color: '#767b7d'
    },
    hoteltext: {
        fontFamily: 'FuturaStd-Light',
        fontSize: 12,
        color: '#000'
    },
    buttonExplore: {
        backgroundColor: '#cc8068',
        paddingHorizontal: 60,
        paddingVertical: 15,
        marginTop: 90
    },
    exploreBtnText: {
        fontFamily: 'FuturaStd-Light',
        fontSize: 18,
        color: '#fff'
    },
    btn_backImage:{
        height: 28,
        width: 28,
        marginTop: 44,
        marginLeft: 16
      },
    btn_ImageNumber:{
        height: 58,
        width: 58,
        marginTop: 34,
        marginLeft: 6
      },
      senderImage:{
        height: 50,
        width: 50,
        borderRadius: 25,
        borderColor: 'white',
        borderWidth: 1,
        position: 'absolute',
      },
      flatList:{
        width : '100%',
    },
    List:{
        marginLeft: 4
   
    },
    img_round:{
        margin: 10,
        height:50,
        width: 50,
        borderRadius: 25,
        backgroundColor:'#cc8068',
        flexDirection : 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    img_round_text:{
        color : 'white',
        textAlign: 'center'
    },
    innertext:{
        color: '#fff',
        fontSize: 30,
        marginTop: 5
    },
    Listcontainer:{
        marginBottom: 30
       // marginTop :30
    },
    chatToolbar: {
        alignSelf: 'flex-start',
        marginBottom: 30
    },
    imageViewWrapper: {
        position: 'relative',
    },
    flatListMainView : {width: '100%', flex: 1, flexDirection: 'row'},
    flatListDataView : {width: '75%',},
    flatListTitleView : {marginTop: 8},
    flatListBottomView : {flex: 1, flexDirection: 'row'},
    flatListUserProfileView : {height: 50, width:50, position: "absolute", bottom: 5, right: 5}
});

export default styles;
