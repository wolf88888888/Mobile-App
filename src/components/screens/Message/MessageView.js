import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
    Text,
    View
} from 'react-native';

import Image from 'react-native-remote-svg';
import moment from 'moment';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import { imgHost, PUBLIC_URL } from '../../../config.js'
import styles from './styles';

TimeAgo.locale(en);
const timeAgo = new TimeAgo('en-US');

export default function MessageView(props) {
    const messageCreatedAt = moment(props.message.createdAt, 'DD/MM/YYYY HH:mm:ss');

    let imageAvatar = PUBLIC_URL + 'images/default.png';
    if (props.message.sender.image != '') {
        if (props.message.sender.image.indexOf("images/default.png".toLowerCase()) != -1){ 
            imageAvatar = { uri: PUBLIC_URL + 'images/default.png' };
        }
        else {
            imageAvatar ={uri:imgHost+props.message.sender.image}
        }
    }

    if (!props.isCurrentUser) {
            return (
                // here is the sender view return
                <View style={styles.rowStyle}>
                    {/* here we set the sender image */}
                    <Image style={styles.imageStyle} source={imageAvatar}/>
                    <View style={styles.viewStyle}>
                        {/* here we set the sender message text */}
                        <Text style={styles.listChild}>{props.message.message}</Text>
                        {/* here we set sender date or time of this message */}
                        <Text style={styles.listChild}>{messageCreatedAt > moment().add('-1', 'days') ? messageCreatedAt.format('HH:mm') : messageCreatedAt.format('DD MMM, HH:mm')}</Text>
                    </View>
                </View>
            );
        }
        else{
            return(
                // here is the sender view return
                <View style={styles.rowStyleSender}>
                    <View style={styles.viewStyleSender}>
                        {/* here we set the receiver message text */}
                        <Text style={styles.listChildSender}>{props.message.message}</Text>
                        {/* here we set receiver date or time of this message */}
                        <Text style={styles.listChildSender}>{messageCreatedAt < moment().add('-1', 'days') ? messageCreatedAt.format('HH:mm') : messageCreatedAt.format('DD MMM, HH:mm')}</Text>
                    </View>
                    {/* here we set the receiver image */}
                    <Image style={styles.imageStyleSender}
                        source={imageAvatar} />
                </View>
            );
        }

}

MessageView.propTypes = {
    message: PropTypes.object,
    sender: PropTypes.object,
    isCurrentUser: PropTypes.bool,
    queueMessage: PropTypes.bool,
    children: PropTypes.object
};
