import React from 'react';
import {
    TouchableOpacity,
    View,
    Text
} from 'react-native';

import styles from './styles';

const defaulProps = {
    text: '',
    pageNumber:'',
    optional:'',
    titleStyle: {}
};
/* eslint-disable */
const ReviewTitle = (props) => (
    <View style={[styles.container, props.style]}>
        <Text style={styles.greenText}>{props.pageNumber}</Text>
        <View style={styles.nameItem}>
            <Text style={[styles.titleText, props.titleStyle]}>{props.text}</Text>
            <Text style={styles.optionalText}>{props.optional}</Text>
        </View>
        {
            props.extra && 
                (<Text style={styles.extraText}>{props.extra}</Text>)
        }
    </View>
);

ReviewTitle.defaulProps = defaulProps;

export default ReviewTitle;
