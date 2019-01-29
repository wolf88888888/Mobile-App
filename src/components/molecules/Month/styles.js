import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    month: {
        paddingTop: 5,
        paddingBottom: 7
    },
    monthTitle: {
        paddingHorizontal: 10
    },
    monthTitleText: {
        fontFamily: 'FuturaStd-Light',
        fontSize: 18,
        lineHeight: 20,
    },
    dayRow: {
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'stretch',
        alignItems: 'center',
        paddingVertical: 5
    }
});

