import { StyleSheet, Dimensions } from 'react-native';

const dimensionWindows = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems:'center',
        width: (dimensionWindows.width - 40) / 5,
        marginTop:5
    },

    detailImage: {
        width:22,
        height:22,
    },

    detailView: {
        flexDirection:'row',
        marginTop:5,
    },

    detailText: {
        fontFamily: 'FuturaStd-Light',
        fontSize:12,
        color:'#56595c',
    },

    detailTopText: {
      fontFamily: 'FuturaStd-Light',
      fontSize:6,
      color:'#56595c',
    }
});

export default styles;
