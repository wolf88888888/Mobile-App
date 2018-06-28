
import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#eee',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    placeholderImageView: {
        marginTop: 40
    },
    placeholderImage: {
        width: '90%',
        height: 200,
    },
    title: {
        fontFamily: 'FuturaStd-Medium',
        fontSize: 28,
        color: '#000',
        marginLeft: 20,
        marginTop: 0
    },
    subtitle: {
        fontFamily: 'FuturaStd-Light',
        fontSize: 20,
        marginTop: 8,
        color: '#000'
    },
    subtext: {
        fontFamily: 'FuturaStd-Light',
        fontSize: 15,
        marginTop: 5,
        color: '#000'
    },
    buttonExplore: {
        backgroundColor: '#D87A61',
        paddingHorizontal: 15,
        paddingVertical: 12.5,
        marginTop: 90
    },
    exploreBtnText: {
        fontFamily: 'FuturaStd-Light',
        fontSize: 18,
        color: '#fff'
    },
    btn_backImage:{
        height: 28,
        width: 28,
        marginTop: 44,
        marginLeft: 16
    },
    flatList:{
        
    },
    Listcontainer:{
        
    },
    chatToolbar: {
        alignSelf: 'flex-start',
        marginBottom: 20,
        marginTop: 70,
    }

});

export default styles;
