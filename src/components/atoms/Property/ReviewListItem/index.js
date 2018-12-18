import React from 'react';
import {
    View,
    Text
} from 'react-native';

import styles from './styles';

/* eslint-disable */
const ReviewListItem = ({
    textFirst,
    textLast,
    styleContainer,
    styleFirst,
    styleLast,
}) => (
      <View style={[styles.container, styleContainer]}>
          <Text style={[styles.textFirst, styleFirst]}>{textFirst}</Text>
          <Text style={[styles.textLast, styleLast]}>{textLast}</Text>
      </View>
);

ReviewListItem.defaulProps = {
    textFirst: '',
    textLast:'',
    styleLast: null
};

export default ReviewListItem;
