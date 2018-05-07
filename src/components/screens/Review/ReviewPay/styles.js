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
           borderTopWidth:10,
           borderTopColor:'#ddd',

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
             marginTop:50,
             fontSize:15,
             color:'black'
           }
});

export default styles;
