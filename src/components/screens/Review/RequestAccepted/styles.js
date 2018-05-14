import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#f0f1f3',
        fontFamily: 'FuturaStd-Light'
    },
    footer:{
           position:'absolute',
           backgroundColor: '#ffffff',
           bottom:0,
           left:0,
           right:0,
           zIndex:10,
           paddingTop:10,
           paddingLeft:20,
           paddingBottom:10,


         },
         searchButtonView: {
               width:'100%',
               backgroundColor: '#DA7B61',
               justifyContent: 'center',
               alignItems: 'center',
               right:10,
               paddingLeft:10,
           },
           searchButtonText: {
               color: '#fff',
               fontFamily: 'FuturaStd-Light',
               fontSize: 17,
               padding: 14,
               alignItems: 'center'
           },redUnderline:{
             color:'#DA7B61',
             borderBottomWidth:1,
             fontFamily: 'FuturaStd-Light',
             borderBottomColor:'#DA7B61'
           },text:{
             fontFamily: 'FuturaStd-Light',
             marginLeft:20,

             paddingLeft:20,
             paddingRight:20,
             alignItems:'center',
             justifyContent:'center',
             fontSize:15,
             color:'black'
           },
           addButton:{

              backgroundColor:'#DA7B61',
              width:100,
              height:100,
              borderRadius:50,
              alignItems:'center',
              justifyContent:'center',
              elevation:8
              },
            addButtonText:{
              color:'#fff',
              fontSize:24
            },
            centerItem:{
                justifyContent:'center',
                alignItems:'center'
            },
            titleText:{
                fontSize:22,
                fontFamily: 'FuturaStd-Light',
                justifyContent:'center',
                alignItems:'center',
                marginTop:20,
                color:'black'
            },

            mainText:{
                marginTop:20,
                justifyContent:'center',
                alignItems:'center',
                fontFamily: 'FuturaStd-Light',
                marginTop:10,
                paddingLeft:30,
                paddingRight:30

            },space10:{
              marginTop:40
            },
              block:{

                paddingTop:10,
                paddingBottom:10,
                paddingLeft:20,
                paddingRight:20,
                flexDirection: 'row',
                justifyContent:'space-between'

              },
              firstBlock:{
                height:70,
                width:250,
                borderWidth:0.2,
                backgroundColor:'white',

              },
              secondBlock:{
                height:70,
                width:110,
                borderWidth:0.2,
                backgroundColor:'white',
                fontFamily: 'FuturaStd-Light',
                justifyContent:'center',
                alignItems:'center',

              },texthead:{
                fontSize:20
              },textsub:{
                fontSize:20,
                color:'#DA7B61',
                fontFamily: 'FuturaStd-Light',
                justifyContent:'center',
                alignItems:'center',

              }
});

export default styles;
