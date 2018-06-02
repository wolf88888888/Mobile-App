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
        marginTop: 40,
        marginBottom: 15
    },
    placeholderImage: {
        width: 195,
        height: 195,
        marginTop: 30
    },
    title: {
        color: '#1f2427',
        fontFamily: 'futura',
        fontSize: 24,
        textAlign: 'center',
        width: '90%'
    },
    subtext: {
        fontFamily: 'FuturaStd-Light',
        fontSize: 16,
        marginTop: 20,
        width: '80%',
        color: '#767b7d',
        textAlign: 'center'
    },
    buttonDiscover: {
        backgroundColor: '#d87a61',
        paddingHorizontal: 10,
        paddingVertical: 15,
        marginTop: 30
    },
    discoverBtnText: {
        fontFamily: 'FuturaStd-Light',
        fontSize: 18,
        color: '#fff'
    }
});

export default styles;
