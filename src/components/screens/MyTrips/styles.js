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
        color: '#1f2427'
    },
        subtitle: {
        fontFamily: 'futura',
        fontSize: 19,
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
        marginLeft: 16,
      },
    btn_ImageNumber:{
        height: 58,
        width: 58,
        marginTop: 34,
        marginLeft: 6,
      },
      senderImage:{
        height: 58,
        width: 58,
        marginTop: 4,
        marginLeft: 16,
      },
      flatList:{
        marginLeft: 14,
        marginRight: 18
    },
    img_round:{
        height: 58,
        width: 58,
        borderRadius: 30,
        backgroundColor:'#cc8068'
    }

});

export default styles;
