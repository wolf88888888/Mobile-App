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
import styles from './inboxStyle';

TimeAgo.locale(en);
const timeAgo = new TimeAgo('en-US');

export default function InboxMessagesView(props) {
    const messageCreatedAt = moment(props.inboxMessage.lastMessage.createdAt, 'DD/MM/YYYY HH:mm:ss');
    return (
        // here is the sender view return
        <View>
            <View style={styles.trTopView}>
                {/* This view is divided in 2 section this one in section 1 start*/}
                <View style={styles.trImgView}>
                    {/* To set section 1 it is divided in 3 part this one is part 1 where you can set images start*/}
                    <Image
                        source={{ uri: 'https://static.locktrip.com/' + props.inboxMessage.userInfo.image }}
                        style={[styles.trAvatar]}
                        resizeMode={"cover"} />
                    {/* To set section 1 it is divided in 2 part this one is part 1 where you can set images end*/}
                </View>
                <View style={[styles.messageBox]}>
                    {/* To set section 2 it is divided in 2 part this one is part 2 where you can set Name, Date, Status .etc start*/}
                    <View style={[styles.userView]}>
                        <View style={[styles.leftView]}>
                            {/* To set section 2 it is divided in 3 part this one is part 1 where you can set name and status start*/}
                            <Text style={[styles.messageTitle, styles.discussion]}>
                                {props.inboxMessage.userInfo.fullName} - Confirmed
                                    </Text>
                            {/* <Text
                                            style={[
                                            styles.messageTitle, item.status == "Confirmed"
                                                ? styles.discussion
                                                : styles.review
                                        ]}>{item.user}
                                            - {item.status}</Text> */}
                            {/* To set section 2 it is divided in 3 part this one is part 1 where you can set name and status end*/}
                        </View>
                        <View style={[styles.rightView]}>
                            {/* To set section 2 it is divided in 3 part this one is part 2 where you can set time start*/}
                            <Text style={[styles.messageTimeTitle]}>{messageCreatedAt < moment().add('-1', 'days') ? messageCreatedAt.format('HH:mm') : timeAgo.format(new Date(messageCreatedAt))}</Text>
                            {/* To set section 2 it is divided in 3 part this one is part 2 where you can set time end*/}
                        </View>
                        <View style={[styles.lastView]}>
                            {/* To set section 2 it is divided in 3 part this one is part 3 where you can set status start*/}
                            <View style={[styles.statusView]}></View>
                            {/* To set section 2 it is divided in 3 part this one is part 3 where you can set status end*/}
                        </View>
                    </View>
                    <Text
                        style={[
                            styles.messageSubTitle, {
                                marginBottom: 2,
                                marginTop: 5
                            }
                        ]}>{props.inboxMessage.lastMessage.createdAt}</Text>
                    <Text style={[styles.messageSubTitle]}>Garden Loft Apartment</Text>
                    {/* To set section 2 it is divided in 2 part this one is part 2 where you can set Name, Date, Status .etc end*/}
                </View>
                {/* This view is divided in 2 section this one in section 1 end*/}
            </View>
            <View style={styles.trBottomView}>
                {/* This view is divided in 2 section this one in section 2 start*/}
                <Text style={[styles.messageValues]}>{props.inboxMessage.lastMessage.message}</Text>
                {/* <TouchableOpacity onPress={() => console.log('here')}> */}
                    {/* This section is to set the button if the status in 'Review' start*/}
                    {/* <View
                        style={item.status === 'Review'
                            ? styles.LogInButton
                            : styles.LogInButtonHide}>
                        <Text style={styles.buttonText}>
                            Write Review
                                    </Text>
                    </View> */}
                    {/* This section is to set the button if the status in 'Review' start*/}
                {/* </TouchableOpacity> */}
                {/* This view is divided in 2 section this one in section 2 end*/}
            </View>
        </View>
    );        
}

InboxMessagesView.propTypes = {
    inboxMessage: PropTypes.object,
};
