import { StyleSheet, Dimensions } from 'react-native';

const dimensionWindows = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        width: 200,
        flex:1,
        height:20,
        paddingBottom:10,
        flexDirection:'column',
    },

    descriptionView: {
        flexDirection:'row',
        justifyContent:'space-between',
    },

    description: {
        fontFamily: 'FuturaStd-Light',
        fontSize: 11,
        lineHeight: 20,
        flexDirection:'row',
        color:'#000000'
    },

    progress:{

    }
});

export default styles;
