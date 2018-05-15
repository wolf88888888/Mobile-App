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
           paddingTop:17,
           paddingLeft:20,
           paddingBottom:17,
           borderTopWidth:3,
           borderTopColor:'#ddd',

         },
     searchButtonView: {
           width:'98%',
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
       },
       redUnderline:{
         color:'#DA7B61',
         borderBottomWidth:3,
         fontFamily: 'FuturaStd-Light',
         textDecorationLine: 'underline',
         borderBottomColor:'#DA7B61'
       },
       text:{
         fontFamily: 'FuturaStd-Light',
         marginLeft:20,
         marginTop:35,
         fontSize:14,
         color:'black'
       }
});

export default styles;
