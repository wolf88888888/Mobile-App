import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    month: {
        paddingTop: 15,
        paddingBottom: 10
    },
    monthTitle: {
        paddingHorizontal: 20
    },
    monthTitleText: {
        fontFamily: 'FuturaStd-Light',
        fontSize: 18,
        lineHeight: 18,
        fontWeight: '300'
    },
    dayRow: {
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'stretch',
        alignItems: 'center',
        paddingVertical: 5
    }
});

