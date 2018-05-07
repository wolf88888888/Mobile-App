import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#f0f1f3',
        fontFamily: 'FuturaStd-Light',
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
         flexDirection: 'row',
         justifyContent:'space-between'
       },
       searchButtonView: {
             width: 150,
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
             fontSize:18,
             color:'black',
             fontFamily: 'FuturaStd-Light',
         },

});

export default styles;
