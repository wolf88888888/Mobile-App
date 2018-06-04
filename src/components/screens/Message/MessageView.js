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
import styles from './styles';

TimeAgo.locale(en);
const timeAgo = new TimeAgo('en-US');

export default function MessageView(props) {
    const messageCreatedAt = moment(props.message.createdAt, 'DD/MM/YYYY HH:mm:ss');
    if (props.isCurrentUser) {
            return (
                // here is the sender view return
                <View style={styles.rowStyle}>
                    <View style={styles.rowStyle}>
                        {/* here we set the sender image */}
                        <Image style={styles.imageStyle}source={{ uri: props.message.sender.image }}/>
                        <View style={styles.viewStyle}>
                            {/* here we set the sender message text */}
                            <Text style={styles.listChild}>{props.message.message}</Text>
                            {/* here we set sender date or time of this message */}
                            <Text style={styles.listChild}>{messageCreatedAt < moment().add('-1', 'days') ? messageCreatedAt.format('HH:mm') : timeAgo.format(new Date(messageCreatedAt))}</Text>
                        </View>
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
                        <Text style={styles.listChildSender}>{messageCreatedAt < moment().add('-1', 'days') ? messageCreatedAt.format('HH:mm') : timeAgo.format(new Date(messageCreatedAt))}</Text>
                    </View>
                    {/* here we set the receiver image */}
                    <Image style={styles.imageStyleSender}
                        source={{ uri: props.message.recipient.image }} />
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
