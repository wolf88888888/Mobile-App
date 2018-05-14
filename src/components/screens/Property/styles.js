import { StyleSheet, Dimensions } from 'react-native';

const numColumns = 6;
const dimensionWindows = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#f0f1f3'
    },

    WhiteBackButton: {
        zIndex: 1,
    },

    scrollView: {
    },

    body: {
        zIndex: -1,
        flexDirection: 'column',
        marginTop:-90
    },

    logoImage: {
        alignSelf: 'stretch',
        width: dimensionWindows.width,
        height: dimensionWindows.width * 5 / 8,
    },

    titleView: {
        backgroundColor: '#ffffff',
        marginTop:-25,
        height:135,
        marginLeft:15,
        marginRight:15,
    },

    topTitleText:{
        fontFamily: 'FuturaStd-Bold',
        fontSize:21,
        paddingTop:10,
        paddingLeft:10,
        paddingRight:10,
        color:'#000000'
    },

    rateViewContainer: {
        flexDirection: 'row',
    },

    rateText:{
        fontFamily: 'FuturaStd-Light',
        fontSize:11,
        paddingLeft:10,
        paddingRight:10,
        color:'#898c8d',
    },

    lineStyle:{
        borderWidth:0.3,
        borderColor:'#cccccc',
        margin:7,
    },

    detailsStyle: {
      flexDirection:'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginLeft:5,
      marginRight:5,
    },

    normalText:{
        fontFamily: 'FuturaStd-Light',
        fontSize:14,
    },

    smallTitle:{
      fontFamily: 'FuturaStd-Bold',
      fontSize:14,
      marginTop:10
    },

    descriptionView: {
        marginHorizontal: 10,
        padding: 10,
    },

    spaceText: {
        fontFamily: 'FuturaStd-Light',
        fontSize:13,
    },

    map: {
        alignSelf: 'stretch',
        marginTop:10,
        width: dimensionWindows.width,
        height: dimensionWindows.width * 5 / 8,
    },

    footer:{
         backgroundColor: '#ffffff',
         paddingTop:20,
         paddingLeft:20,
         paddingBottom:20,
         borderTopColor:'#ddd',
         flexDirection: 'row',
         justifyContent:'space-between'
    },

        textInput:{
             alignSelf:'stretch',
             color:'#fff',
             padding:20,
             backgroundColor:'#252525',
             borderTopWidth:2,
             borderTopColor:'#ededed'
        },

        footerText:{
            fontFamily: 'FuturaStd-Light',
            fontSize:18
        },

        ButtonView: {
              width: '100%',
              backgroundColor: '#DA7B61',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 8,
              right:10,
              paddingLeft:10,

          },

          ButtonText: {
              color: '#fff',
              fontFamily: 'FuturaStd-Light',
              fontSize: 17,
              padding: 14,
              alignItems: 'center'
          },

          sidebar:{
               backgroundColor: '#ffffff',
               left:0,
               right:0,
               zIndex:10,
               paddingTop:10,
               paddingLeft:10,
               paddingBottom:10,
               flexDirection: 'row',
               flex:1,
               justifyContent:'space-between'

          },

          logoContainer:{
              position:'absolute',
              flexDirection: "row",
              alignItems: "stretch",
              backgroundColor: '#ff0000'
         },
         logo:{
              flex: 1,
              width: null,
              height: null
         },
         redText:{
               color:'red'
         },
         textTitle:{
               fontSize:22,
               fontWeight:'bold',
               marginTop:20

         },
         textView:{
            marginLeft:15,
            marginRight:15,
            marginTop:130
         },
         item:{
           backgroundColor:'#4D243D',
           alignItems:'center',
           justifyContent:'center',
           flex:1,
           margin:1,
           height:Dimensions.get('window').width/numColumns
         },
         itemText:{
           color:'#fff'
         },
         ComponentView:{
           alignItems:'center',
           flexDirection:'row',
           padding:13,
           justifyContent:'space-between'
         },
         firstText:{
           fontSize:22
         },
         firstRedText:{
           fontSize:22,
           color:'#DA7B61'
         },
         sideView: {
               width: 200,
               height:100,
               alignItems:'center',
               justifyContent: 'center',
               backgroundColor: 'rgb(162,0,191)',
               marginLeft:2,
               marginRight:2

         },
             smallReviews:{

         },
         sideText:{
             fontSize:15
         },space:{
           marginTop:120
         },circleImg:{
           width:40,
           height:40,
           borderRadius:50
         },circleImgBig:{
           width:60,
           height:60,
           borderRadius:50
         }
        });

        export default styles;
