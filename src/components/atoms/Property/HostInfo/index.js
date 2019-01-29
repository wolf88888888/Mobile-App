import React from 'react';
import {
    TouchableOpacity,
    View,
    Text
} from 'react-native';
import Image from 'react-native-remote-svg';

import styles from './styles';

const defaulProps = {
    avatar: null,
    text: '',
    pageNumber:'',
};
/* eslint-disable */
const HostInfo = ({
    avatar,
    text,
    pageNumber,
}) => (
    <View style={styles.Item}>
            <View style={styles.imgItem}>
                <Image style={styles.img} source = {avatar} />
            </View>

            <View style={styles.nameItem}>
              <Text style={styles.titleText}>{pageNumber}</Text>
              <Text style={styles.optionalText}>{text}</Text>
            </View>

    </View>
);

HostInfo.defaulProps = defaulProps;

export default HostInfo;
