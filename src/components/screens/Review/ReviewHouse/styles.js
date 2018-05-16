import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#f0f1f3',
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
         paddingBottom:18,
         borderTopWidth:3,
         borderTopColor:'#ddd',
         flexDirection: 'row',
         justifyContent:'space-between'
       },
     searchButtonView: {
           width: 170,
           backgroundColor: '#DA7B61',
           justifyContent: 'center',
           alignItems: 'center',
           marginTop: 8,
           right:10,
           paddingLeft:10,
           marginRight:6
       },
       searchButtonText: {
           color: '#fff',
           fontFamily: 'FuturaStd-Light',
           fontSize: 17,
           padding: 14,
           alignItems: 'center'
       },
       footerText1:{
           fontSize:17,
           color:'black',
           fontFamily: 'FuturaStd-Light',
           paddingTop:10
       },
       footerText2:{
           fontSize:17,
           color:'black',
           fontFamily: 'FuturaStd-Light',
           marginTop:2
       },

});

export default styles;
