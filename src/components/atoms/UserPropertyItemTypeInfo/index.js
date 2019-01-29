import React from 'react';
import {
    TouchableOpacity,
    View,
    Text
} from 'react-native';

import styles from './styles';

const defaulProps = {
    title: '',
    info:'',
};
/* eslint-disable */
const UserPropertyItemTypeInfo = (props) => (
      <TouchableOpacity style={[styles.container, props.styles]} onPress={props.onPress}>
          <Text style={styles.title}>{props.title}</Text>
          <Text style={styles.info}>{props.info}</Text>
      </TouchableOpacity>
);

UserPropertyItemTypeInfo.defaulProps = defaulProps;

export default UserPropertyItemTypeInfo;
