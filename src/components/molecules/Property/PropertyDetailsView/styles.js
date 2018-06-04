import { StyleSheet, Dimensions } from 'react-native';
const dimensionWindows = Dimensions.get('window');

const logoWidth = dimensionWindows.width;
const logoHeight = logoWidth * 35 / 54;
const styles = StyleSheet.create({
    container: {
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop:5,
        marginLeft:5,
        marginRight:5,
    },
});

export default styles;
