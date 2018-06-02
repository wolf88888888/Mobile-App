import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        marginHorizontal: 15,
    },

    mainMenu:{
        marginHorizontal: 15,
        marginTop: 12
    },

    InboxView: {
        flex: 1,
        backgroundColor: '#f0f1f3',
    },

    tr:{
        alignSelf: 'center',
        width: '95%',
        height: 'auto',
        paddingTop: 25,
        paddingBottom: 25,
        borderBottomWidth: 0.5,
        borderBottomColor: '#ccc',
        paddingRight: 10,
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
        height: 50,
        width: 50,
        borderRadius: 25,
    },

    messageBox:{
       width: '82%',
    },

    trBottomView:{
    },

    messageView:{
      height: 400,
      marginTop: 50
    },

    messageTitle:{
        fontFamily: 'futura',
        fontSize: 16,
       // color: '#DA7B61',
        letterSpacing: 1,
        backgroundColor: 'transparent'
    },

    messageSubTitle:{
        //fontSize: Sizes.scale(12),
        //color: '#DA7B61',
        fontFamily: 'FuturaStd-Light',
        fontSize: 14,
        fontWeight: '200',
        lineHeight: 15,
        letterSpacing: 1,
        backgroundColor: 'transparent'
    },
    messageValues:{
        fontFamily: 'FuturaStd-Light',
        fontSize: 14,
        lineHeight: 18,
        letterSpacing: 1,
        backgroundColor: 'transparent',
        color: '#555759'
    },

    review:{
       color: '#a7c8c2'
    },

    discussion:{
        color: '#cc8068',
    },

    heading: {
        fontFamily: 'futura',
        fontSize: 20,
        color: '#000',
        marginBottom: 10,
        color:'#222'
    },
    subHeading:{
        fontFamily: 'FuturaStd-Light',
        fontSize: 12,
        color:'#222'
    },
    topText:{
        //alignItems: 'center',
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
        width: '65%',
      },
      rightView:{
        width: '30%',
        alignItems: 'center',
        justifyContent: 'center'
      },
      messageTimeTitle:{
          fontFamily: 'FuturaStd-Light',
          fontSize: 14
      },
      lastView:{
        width: '5%',
        justifyContent: 'center'
      },
      statusView:{
          width: 10,
          height: 10,
          borderRadius: 10 / 2,
          backgroundColor: '#cc8068',
      },
      backButton:{
          marginTop: 45,
          marginLeft: 15,
          marginBottom: 0
        }
});
export default styles;
