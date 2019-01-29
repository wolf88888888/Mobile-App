import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        marginHorizontal: 15,
        backgroundColor: '#f0f1f3',
    },

    mainMenu:{
        marginHorizontal: 15,
        marginTop: 12
    },

    InboxView: {
        flex: 1,
        paddingTop: 40,
    },

    tr:{
        alignSelf: 'center',
        width: '95%',
        height: 'auto',
        paddingTop: 25,
        paddingBottom: 25,
        borderBottomWidth: 0.5,
        borderBottomColor: '#ccc',
        marginLeft: 5,
        marginRight: 5,
    },
    trTopView:{
        flex: 1,
        flexDirection: 'row',
        marginBottom: 10,
    },

    trImgView:{
        width: '18%',
    },
    trAvatar:{
        height: 45,
        width: 45,
        borderRadius: 22.5,
    },

    messageBox:{
        flex:1,
    },

    trBottomView:{
    },

    messageView:{
      height: 400,
      marginTop: 50
    },

    messageTitle:{
        fontFamily: 'FuturaStd-Light',
        fontSize: 15,
       // color: '#DA7B61',
        letterSpacing: 1,
        backgroundColor: 'transparent',
        fontWeight: '200',
    },

    messageSubTitle:{
        fontFamily: 'FuturaStd-Light',
        fontSize: 12,
        fontWeight: '100',
        lineHeight: 13,
        letterSpacing: 1,
        backgroundColor: 'transparent',
        color:'#000'
    },
    messageValues:{
        fontFamily: 'FuturaStd-Light',
        fontSize:12,
        color: '#000',
        width:'100%',
        flex: 1,
        lineHeight: 20,
        letterSpacing: 1,
        backgroundColor: 'transparent',
        justifyContent: 'space-around',
        alignItems:'flex-end',
        marginLeft: 5,
        marginRight: 5,
    },

    review:{
       color: '#a7c8c2'
    },

    discussion:{
        color: '#DA7B61',
    },

    heading: {
        fontFamily: 'FuturaStd-Medium',
        fontSize: 20,
        color: '#000',
        marginTop: 10,
        marginBottom: 5,
        color:'#000'
    },
    subHeading:{
        fontFamily: 'FuturaStd-Light',
        fontSize: 12,
        color:'#000'
    },
    topText:{
        marginHorizontal: 20,
        marginTop: 10,
        justifyContent: 'center',
    },

    message:{
       justifyContent: 'flex-start',
    },

    LogInButton: {
        height: 50,
        width: "50%",
        backgroundColor: '#DA7B61',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    LogInButtonHide:{
        height: 0,
        width: 0,
    },

    buttonText: {
        color: '#fff',
        fontSize: 17,
        fontFamily: 'FuturaStd-Light'
    },

    btn_backImage:{
        height: 25,
        width: 25,
        resizeMode: 'contain'
      },
      userView:{
          marginTop: 5,
          flex: 1,
          flexDirection: 'row',
      },
      leftView:{
        flex:1
      },
      rightView:{
         marginRight:5,
        alignItems: 'center',
        justifyContent: 'center',
      },

      messageTimeTitle:{
          fontFamily: 'FuturaStd-Light',
          fontSize: 12
      },
      lastView:{
          marginTop:5,
          width: 8,
          height: 8,
      },
      statusView:{
          width: 8,
          height: 8,
          borderRadius: 4,
          backgroundColor: '#D87A61',
      },
      backButton:{
          marginTop: 45,
          marginLeft: 15,
          marginBottom: 0
      },

    rateText: {
        marginTop: 10
    },

    normalText: {
        fontFamily: 'FuturaStd-Light',
        fontSize: 13,
        lineHeight: 20,
        marginTop: 10,
    },

    readmore: {
        fontFamily: 'FuturaStd-Light',
        fontSize: 12,
        marginTop: -2,
    },
});
export default styles;
