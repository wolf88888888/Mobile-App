import React from 'react';
import {
    TouchableOpacity,
    View,
    Text,
} from 'react-native';
import Image from 'react-native-remote-svg';

import styles from './styles';

const defaulProps = {
    title: '',
    onPress:()=>{},
};
/* eslint-disable */
const UserPropertyItemTypeAction = (props) => (
    <TouchableOpacity style={[styles.container, props.style]} onPress={props.onPress}>
        <Text style={styles.title}>{props.title}</Text>
        <Image source={require("../../../assets/png/arrow-circled.png")} style={styles.avatar}/>
    </TouchableOpacity>
);

UserPropertyItemTypeAction.defaulProps = defaulProps;

export default UserPropertyItemTypeAction;
