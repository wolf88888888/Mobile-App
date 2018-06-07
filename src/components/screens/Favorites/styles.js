
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
        marginTop: 10
    },
    placeholderImage: {
        width: 300,
        height: 210,
        marginTop: 20
    },
    title: {
        fontFamily: 'futura',
        fontSize: 24,
        color: '#1f2427',
        marginLeft: 14,
        marginTop: 30
    },
    subtitle: {
        fontFamily: 'futura',
        fontSize: 19,
        marginRight: 10,
        color: '#1f2427'
    },
    subtext: {
        fontFamily: 'FuturaStd-Light',
        fontSize: 16,
        marginTop: 8,
        color: '#767b7d'
    },
    buttonExplore: {
        backgroundColor: '#cc8068',
        paddingHorizontal: 60,
        paddingVertical: 15,
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
        marginRight: 18
    },
    Listcontainer:{
        marginBottom: 30
    },
    chatToolbar: {
        alignSelf: 'flex-start',
        marginBottom: 30
    }

});

export default styles;
