import { StyleSheet, Dimensions } from 'react-native';
const dimensionWindows = Dimensions.get('window');
const { width } = dimensionWindows;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#f0f1f3'
    },

    SearchAndPickerwarp:{
        display: 'flex',
        flexDirection: 'row'
    },
    
    searchAreaView: {
        //width: '68%',
       // height: 105,
       flex:1,
        backgroundColor: '#f0f1f3',
        paddingTop: 40,
        paddingLeft: 15,
        paddingRight: 15
    },

    autocompleteText: {
        fontFamily: 'FuturaStd-Light'
    },

    autocompleteTextWrapper: {
        backgroundColor: '#fff',
        borderColor:'#00000011',
        width: width - 34,
        justifyContent: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        paddingRight: 15,
    },

    leftIconView: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height:50
    },

    leftIconText: {
        color: '#5a5a5c',
        fontSize: 16
    },
    
    pickerWrapHomes:{
        height: 50,
        backgroundColor: '#fff',
        flex: 1,
        alignSelf: 'flex-start',
    },

    countriesSpinner: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 40,
        justifyContent: 'flex-end',
        marginLeft: 15,
        marginRight: 15,
        backgroundColor: '#fff'
    },

    containerHotels:{
        marginTop: 2,
        flex: 1,
    },
    
    switchButton: {
        position: 'absolute',
        bottom: 15,
        right: 20,
        width: 56,
        height: 56,
        borderRadius: 50,
        backgroundColor: '#D87A61',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },

    icon: {
        color: '#fff',
        fontSize: 24
    },

    map: {
        alignItems: 'center',
        height: '100%',
    },

    map_item: {
        width: 140,
        paddingLeft: 5, 
        paddingRight: 5, 
        paddingTop: 5, 
        paddingBottom: 5, 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: '#fff'
    },

    location: {
        fontFamily: 'FuturaStd-Light',
        fontSize: 13,
        color: '#000000',
        marginTop: 5,
    },

    description: {
        fontFamily: 'FuturaStd-Light',
        fontSize: 10,
        lineHeight:15,
        fontWeight: 'bold',
        color: '#000000',
    },

    ratingsMap: {
        fontFamily: 'FuturaStd-Light',
        fontSize: 10,
        lineHeight:15,
        color: 'grey',
    },

    tabBar : {
        height:0,
        flexDirection: 'row',
        paddingTop: 0,
    },
});
export default styles;
