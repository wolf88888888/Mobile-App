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
        width: 210,
        height: 210,
        marginTop: 30
    },
    title: {
        fontFamily: 'futura',
        fontSize: 24,
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
});

export default styles;
