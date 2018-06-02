import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#222',
    },
    layoutIndicator: {
        height: 15,
        position: 'absolute',
        bottom: 25,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'transparent',
    },
    indicator: {
        margin: 3,
        opacity: 0.9
    },
    indicatorSelected: {
        opacity: 1,
    },
    containerImage : {
        flex: 1,
        width: Dimensions.get('window').width,
    },
    overlay: {
        opacity: 0.5,
        backgroundColor: 'black',
    },
    layoutText: {
        position: 'absolute',
        paddingHorizontal: 15,
        bottom: 30,
        left: 0,
        right: 0,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: 'column',
        backgroundColor: 'transparent',
    },
    textTitle: {
        fontWeight: 'bold',
        fontSize: 15,
        color: 'white',
    },
    textCaption: {
        fontWeight: '400',
        fontSize: 12,
        color: 'white',
    }
});


export default styles;