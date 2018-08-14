import { StyleSheet, Dimensions } from 'react-native';
const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: '#f0f1f3'
      },
      heading: {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          width: '100%',
          padding: 20,
          marginTop: 25,
          marginLeft: 15,
      },
      btn_backImage:{
          height: 28,
          width: 28,
      },
    navItem: {
        borderBottomWidth: 0.5,
        borderColor: '#e2e4e3',
        padding: 10,
        paddingBottom: 20,
        paddingTop: 20,
        marginLeft: 10,
        marginRight: 10,
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    navItemText: {
      fontFamily: 'FuturaStd-Light',
      fontSize: 21,
      color:'#000'
    },
    listItemText:{
      fontFamily: 'FuturaStd-Light',
      fontSize: 21,
      marginLeft:20,
      color:'#000'
  },
    navText:{
      marginTop: 10,
      fontFamily: 'FuturaStd-Light',
      fontSize: 15,
    },
  
    listItem:{flex:1,
      flexDirection:'row',
      justifyContent:'flex-start'
  },
    arrowSvg:{
      height: 25,
      width: 25
    }
  });

export default styles;