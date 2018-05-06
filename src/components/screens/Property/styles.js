import { StyleSheet } from 'react-native';
import {
    Text,
    View,
    TouchableOpacity,
    Keyboard,ListView,Button,ScrollView,TextInput,Dimensions
    } from 'react-native';

    const numColumns = 6;
        const styles = StyleSheet.create({
        container: {
             flex: 1
        },
        scrollContainer:{
             flex:1,

        },
        scrollView:{

        },
        footer:{
             position:'absolute',
             backgroundColor: '#ffffff',
             bottom:0,
             left:0,
             right:0,
             zIndex:10,
             paddingTop:20,
             paddingLeft:20,
             paddingBottom:20,
             borderTopWidth:10,
             borderTopColor:'#ddd',
             flexDirection: 'row',
             flex:1,
             justifyContent:'space-between'

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

        },
        textInput:{
             alignSelf:'stretch',
             color:'#fff',
             padding:20,
             backgroundColor:'#252525',
             borderTopWidth:2,
             borderTopColor:'#ededed'
        },
        searchButtonView: {
              width: '100%',
              backgroundColor: '#DA7B61',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 8,
              right:10,
              paddingLeft:10,

          },
          searchButtonText: {
              color: '#fff',
              fontFamily: 'FuturaStd-Light',
              fontSize: 17,
              padding: 14,
              alignItems: 'center'
          },
          footerText:{
              fontSize:18
          },
          logoContainer:{
               alignItems:'center',
               flexGrow:1,
               justifyContent:'center',
               position:'absolute',
               zIndex:-1
         },
         logo:{
               height:220
         },
         redText:{
               color:'red'
         },
         smallTitle:{
               fontSize:18,
               marginTop:10

         },
         textTitle:{
               fontSize:22,
               fontWeight:'bold',
               marginTop:20

         },
         normalText:{
            fontSize:18,
            padding:10
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
         sideView: {
               width: 140,
               height:100,
               alignItems:'center',
               justifyContent: 'center',
               backgroundColor: 'rgb(162,197,191)',
               marginLeft:2,
               marginRight:2

         },
             bigReviews:{
               fontSize:30,
               color: '#fff'
         },
             smallReviews:{
               fontSize:12,
               color: '#fff'
         },
         sideViewFirst: {
               width: 100,
               height:100,
               backgroundColor: 'rgb(162,197,191)',
               justifyContent: 'center',
               alignItems: 'center',
               marginLeft:2,
               marginRight:2

         },
         sideText:{
             fontSize:15
         },space:{
           marginTop:120
         },circleImg:{
           width:40,
           height:40,
           borderRadius:50
         }
        });

        export default styles;
