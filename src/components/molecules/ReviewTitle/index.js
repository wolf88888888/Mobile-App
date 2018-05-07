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
    optional:''
};
/* eslint-disable */
const ReviewTitle = ({
    text,
    pageNumber,
    optional

}) => (
    <View style={styles.Item}>

            <Text style={styles.greenText}>{pageNumber}</Text>
            
            <View style={styles.nameItem}>
              <Text style={styles.titleText}>{text}</Text>
              <Text style={styles.optionalText}>{optional}</Text>
            </View>

    </View>
);

ReviewTitle.defaulProps = defaulProps;

export default ReviewTitle;
