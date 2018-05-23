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
    optional:''
};
/* eslint-disable */
const ReviewImageItem = ({
    text,
    info,
    description
}) => (
    <View style={styles.container}>
          <Image style={styles.img} source = {require('../../../assets/temple/overview.jpg')} />
          <View style={styles.majorContainer}>
              <View style={styles.detailContainer}>
                <Text style={styles.info}>{info}</Text>
                <Text style={styles.title}>{text}</Text>
                <Text style={styles.description}>{description}</Text>
              </View>
          </View>
    </View>
);

ReviewImageItem.defaulProps = defaulProps;

export default ReviewImageItem;
