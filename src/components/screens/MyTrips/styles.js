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
    title: {
        fontFamily: 'futura',
        fontSize: 24,
        color: '#1f2427',
        marginLeft: 14,
        marginTop: 30
    },
    subtitle: {
        fontFamily: 'futura',
        fontSize: 19,
        marginRight: 10,
        color: '#1f2427'
    },
    subtext: {
        fontFamily: 'FuturaStd-Light',
        fontSize: 16,
        marginTop: 8,
        color: '#767b7d'
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
        height: 58,
        width: 58,
        position: 'absolute',
        top: -20,
        left: 30
      },
      flatList:{
        marginLeft: 14,
        marginRight: 18
    },
    List:{
        marginLeft: 4
   
    },
    img_round:{
        height:75,
        width: 75,
        borderRadius: 40,
        backgroundColor:'#cc8068',
        lineHeight: 0,
        alignItems: 'center'

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
    }

});

export default styles;
