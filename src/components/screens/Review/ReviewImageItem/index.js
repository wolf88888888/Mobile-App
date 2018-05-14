import React from 'react';
import {
    TouchableOpacity,
    View,
    Text
} from 'react-native';
import Image from 'react-native-remote-svg';
import PopoverTooltip from 'react-native-popover-tooltip'
import styles from './styles';

const defaulProps = {
    text: '',
    pageNumber:'',
    optional:''
};
/* eslint-disable */
const ReviewImageItem = ({
    text,
    pageNumber,
    optional

}) => (
    <View style={styles.Item}>

            <View style={styles.imgItem}>
                <Image style={styles.img} source = {require('../../../assets/image.jpg')} />
            </View>

            <View style={styles.nameItem}>
              <Text style={styles.greenText}>{pageNumber}</Text>
              <Text style={styles.titleText}>{text}</Text>
              <Text style={styles.optionalText}>{optional}</Text>
            </View>

    </View>
);

ReviewImageItem.defaulProps = defaulProps;

export default ReviewImageItem;
