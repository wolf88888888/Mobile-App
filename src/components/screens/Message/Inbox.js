import {
    FlatList,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import React, { Component } from 'react';

import InboxMessagesView from './InboxMessagesView';
import ProgressDialog from '../../atoms/SimpleDialogs/ProgressDialog';
import Toast from 'react-native-simple-toast';
import requester from '../../../initDependencies';
import styles from './inboxStyle';


class Inbox extends Component {
    static self;
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

        Inbox.self = this;
    }

    componentWillMount(){
		this.list = [
			this.props.navigation.addListener('didFocus', this._onFocus),
        ];
        
        this.refreshMessage();
    }

    componentDidMount() {

    }

    _onFocus() {
        that = Inbox.self;
        if (!that.isLoading) {
            that.refreshMessage(false);
        }
	};

    refreshMessage(isShowProgress = true) {
        console.log("refreshMessage");
        this.isLoading = true;
        if (isShowProgress) {
            this.setState({ showProgress: true});
        }
        requester.getMyConversations().then(res => {
            // here you set the response in to json
            res.body.then(data => {
                // this.setState({ showProgress: false });
                this.setState({
                    showProgress: false,
                    inboxMessages: data.content,
                });
                this.isLoading = false;
            }).catch(err => {
                console.log(err);
                this.isLoading = false;
                if (isShowProgress) {
                    this.setState({ showProgress: false });
                    Toast.showWithGravity('Cannot get messages, Please check network connection.', Toast.SHORT, Toast.BOTTOM);
                }
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
                <View style={[styles.topText]}>
                    {/* Top Text Start */}
                    <Text style={[styles.heading]}>Inbox</Text>
                    <Text style={styles.subHeading}>You have {this.state.inboxMessages.length} unread messages</Text>
                    {/* Top Text end */}
                </View>
                <ScrollView>
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
}
export default Inbox;
