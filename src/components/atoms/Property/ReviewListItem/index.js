import React from 'react';
import {
    TouchableOpacity,
    View,
    Text
} from 'react-native';

import styles from './styles';

const defaulProps = {
    textFirst: '',
    textLast:'',
};
/* eslint-disable */
const ReviewListItem = ({
    textFirst,
    textLast,
}) => (
      <View style={styles.container}>
          <Text style={styles.textFirst}>{textFirst}</Text>
          <Text style={styles.textLast}>{textLast}</Text>
      </View>
);

ReviewListItem.defaulProps = defaulProps;

export default ReviewListItem;
