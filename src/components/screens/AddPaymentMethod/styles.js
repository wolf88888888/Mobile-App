import { StyleSheet, Dimensions } from 'react-native';
const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'stretch',
      backgroundColor: '#f0f1f3'
      },
      backButton:{
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 45,
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
      fontFamily: 'FuturaStd',
      fontSize: 22,
      color:'#000'
    },
    listItemText:{
      fontFamily: 'FuturaStd-Light',
      fontSize: 17,
      marginLeft:20,
      color:'#000'
  },
    navText:{
      marginTop: 12,
      fontFamily: 'FuturaStd-Light',
      fontSize: 15,
    },
  
    listItem:{flex:1,
      flexDirection:'row',
      justifyContent:'flex-start',
      alignItems: 'center'
  },
  leftIcon:{
    height: 30,
    width: 30
  },
    arrowSvg:{
      height: 25,
      width: 25
    }
  });

export default styles;