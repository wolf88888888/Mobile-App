
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
        width: 135,
        height: 135,
        marginTop: 75
    },
    title: {
        fontFamily: 'FuturaStd-Medium',
        fontSize: 22,
        color: '#000',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10,
        textAlign: "center"
    },
    subtitle: {
        fontFamily: 'FuturaStd-Light',
        fontSize: 16,
        marginRight: 10,
        color: '#000',
        textAlign: "center"
    },
    subtext: {
        fontFamily: 'FuturaStd-Light',
        fontSize: 15,
        marginTop: 5,
        marginLeft: 20,
        marginRight: 20,
        color: '#000',
        textAlign: "center"
    },
    buttonExplore: {
        backgroundColor: '#D87A61',
        paddingHorizontal: 10,
        paddingVertical: 12.5,
        marginTop: 50,
    },
    exploreBtnText: {
        fontFamily: 'FuturaStd-Light',
        fontSize: 17,
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
