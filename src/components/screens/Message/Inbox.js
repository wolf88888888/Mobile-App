import {
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import React, { Component } from 'react';

import BackButton from '../../atoms/BackButton';
import InboxMessagesView from './InboxMessagesView';
import { ListView } from 'react-native';
import ProgressDialog from '../../atoms/SimpleDialogs/ProgressDialog';
import PropTypes from 'prop-types';
import SplashScreen from 'react-native-smart-splash-screen';
import Toast from 'react-native-simple-toast';
import { imgHost } from '../../../config'
import requester from '../../../initDependencies';
import styles from './inboxStyle';

// import Image from 'react-native-remote-svg'; import GoBack from
// '../common/GoBack';








// You will find all component related to style in this class


class Inbox extends Component {
    constructor(props) {
        super(props);
        this.onConversation = this.onConversation.bind(this);
        this.state = {
            loading: false,
            data: [],
            page: 1,
            seed: 1,
            error: null,
            refreshing: false,
            inboxMessages: [],
            showProgress: false,
        };
    }

    componentDidMount() {
        this.setState({ showProgress: true });
        requester.getMyConversations().then(res => {
            // here you set the response in to json
            res.body.then(data => {
                // this.setState({ showProgress: false });
                this.setState({
                    showProgress: false,
                    inboxMessages: data.content,
                });
                console.log("message");
                console.log(data.content);
            }).catch(err => {
                    this.setState({ showProgress: false });
                    Toast.showWithGravity('Cannot get messages, Please check network connection.', Toast.SHORT, Toast.BOTTOM);
                    console.log(err);
                });
        });
    }

    onConversation(item) {
        const { navigate } = this.props.navigation;
        if (item.unread == "true") {
            let messages = this.state.inboxMessages;

            let message = messages.find(x => x.id === item.id);
            let messageIndex = messages.findIndex(x => x.id === item.id);

            message.unread = 'false';

            messages = messages.filter(x => x.id !== item.id);
            messages.splice(messageIndex, 0, message);

            this.setState({ inboxMessages: messages });
        }
        navigate('Chat', item);
        // let messages = this.state.messages;
        //
        // let message = messages.find(x => x.id === id);
        // let messageIndex = messages.findIndex(x => x.id === id);
        //
        // message.unread = unread === 'true' ? 'false' : 'true';
        //
        // messages = messages.filter(x => x.id !== id);
        // messages.splice(messageIndex, 0, message);
        //
        // this.setState({ messages: messages });
    }

    render() {
        return (
            <View style={styles.InboxView}>
                {/* Main Container Start */}

                <BackButton onPress={this.onBackPress} />
                <ScrollView>
                    <View style={[styles.topText]}>
                        {/* Top Text Start */}
                        <Text style={[styles.heading]}>Inbox</Text>
                        <Text style={styles.subHeading}>You have {this.state.inboxMessages.length} unread messages</Text>
                        {/* Top Text end */}
                    </View>
                    <FlatList data={this.state.inboxMessages} // Data source
                        // List Start
                        renderItem={({ item, index }) => (
                            <TouchableOpacity style={[styles.tr]} onPress={() => { this.onConversation(item) }}>
                                {/* Press to go on chat screen start*/}
                                <InboxMessagesView
                                    inboxMessage={item}>
                                </InboxMessagesView>
                                {/* Press to go on chat screen end*/}
                            </TouchableOpacity>
                        )
                            // List End
                        } />
                </ScrollView>

                {/* Main Container End */}

                <ProgressDialog
                    visible={this.state.showProgress}
                    title=""
                    message="Loading Message..."
                    animationType="slide"
                    activityIndicatorSize="large"
                    activityIndicatorColor="black" />
            </View>
        );
    }

    // to go back on the previous screen use this function start
    onBackPress = () => {

        this
            .props
            .navigation
            .navigate('PROFILE');
    }
    // to go back on the previous screen use this function end
}
export default Inbox;
