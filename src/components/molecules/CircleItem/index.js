import React from 'react';
import {
    TouchableOpacity,
    View,
    Text
} from 'react-native';
import Image from 'react-native-remote-svg';

import styles from './styles';

const defaulProps = {
    text: '',
    pageNumber:'',

};
/* eslint-disable */
const CircleItem = ({
    text,
    pageNumber,

}) => (
    <View style={styles.Item}>

            <View style={styles.imgItem}>
                <Image style={styles.img} source = {require('../../../assets/image.jpg')} />
            </View>

            <View style={styles.nameItem}>
              <Text style={styles.titleText}>{pageNumber}</Text>
              <Text style={styles.optionalText}>{text}</Text>
            </View>

    </View>
);

CircleItem.defaulProps = defaulProps;

export default CircleItem;
