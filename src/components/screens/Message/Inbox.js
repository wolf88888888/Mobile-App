import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    ScrollView,
    FlatList,
    ToastAndroid
} from 'react-native';
import FontAwesome, {Icons} from 'react-native-fontawesome';
import {imgHost} from '../../../config'
// import Image from 'react-native-remote-svg'; import GoBack from
// '../common/GoBack';
import {ListView} from 'react-native';
import SplashScreen from 'react-native-smart-splash-screen';
import {getMyConversations, approveMessage, declineMessage} from '../../../utils/requester';
import InboxMessagesView from './InboxMessagesView';
import BackButton from '../../atoms/BackButton';
import DialogProgress from 'react-native-dialog-progress'

// You will find all component related to style in this class
import styles from './inboxStyle';

class Inbox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            data: [],
            page: 1,
            seed: 1,
            error: null,
            refreshing: false,
            inboxMessages : []
          };
    }

    componentDidMount() {
        // here is the method to load all chats related to this id = 68
        const options = {
            title:"",
            message:"Loading Message...",
            isCancelable:true
        };

        DialogProgress.show(options);
        getMyConversations()
        .then(res => res.response.json())
        // here you set the response in to json
        .then(parsed => {
            DialogProgress.hide();
            this.setState({
                inboxMessages : parsed.content,
            });
        })
        .catch(err => {
            DialogProgress.hide();
            ToastAndroid.showWithGravityAndOffset('Cannot get messages, Please check network connection.', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 0, 200);
            console.log(err);
        });
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.InboxView}>
            {/* Main Container Start */}

                <BackButton onPress={this.onBackPress}/>
                <ScrollView>
                    <View style={[styles.topText]}>
                    {/* Top Text Start */}
                        <Text style={[styles.heading]}>Inbox</Text>
                        <Text style={styles.subHeading}>You have {this.state.inboxMessages.length} unread messages</Text>
                    {/* Top Text end */}
                    </View>
                    <FlatList data={this.state.inboxMessages} // Data source
                    // List Start
                        renderItem={({item, index}) => (
                        <TouchableOpacity style={[styles.tr]} onPress={() => navigate('Chat')}>
                            {/* Press to go on chat screen start*/}
                                <InboxMessagesView
                                    inboxMessage={item}>
                                </InboxMessagesView>
                            {/* Press to go on chat screen end*/}
                        </TouchableOpacity>
                    )
                    // List End
                    }/>
                </ScrollView>

            {/* Main Container End */}
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
