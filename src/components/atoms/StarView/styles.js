import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    starContainer: {
        flex:1,
        flexDirection: 'row',
    },
    backgroundStarView: {
        width: 16,
        height: 16,
    },
    forgroundStarView: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: 16,
        overflow: 'hidden',
    },
});

export default styles;
