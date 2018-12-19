import React from 'react';
import {
    View,
    Text,
    TextInput
} from 'react-native';

import styles from './styles';

/* eslint-disable */
const ReviewInputView = ({
    textFirst,
    textLast,
    styleContainer,
    styleFirst,
    styleLast,
    onChangeText
}) => (
      <View style={[styles.container, styleContainer]}>
            <Text style={[styles.textFirst, styleFirst]}>{textFirst}</Text>
            
            <TextInput
                underlineColorAndroid="transparent"
                style={[styles.textLast, styleLast]}
                value={textLast}
                onChangeText={(value) => onChangeText(value)}
                />
      </View>
);

ReviewInputView.defaulProps = {
    textFirst: '',
    textLast:'',
    onChangeText: (value) => {}
};

export default ReviewInputView;
