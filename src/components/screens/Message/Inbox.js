import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    ScrollView,
    FlatList
} from 'react-native';
import FontAwesome, {Icons} from 'react-native-fontawesome';
import {imgHost} from '../../../config'
// import Image from 'react-native-remote-svg'; import GoBack from
// '../common/GoBack';
import {ListView} from 'react-native';
import SplashScreen from 'react-native-smart-splash-screen';
import {getMyConversations, approveMessage, declineMessage} from '../../../utils/requester';
import InboxMessagesView from './InboxMessagesView';

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
        getMyConversations()
        .then(res => res.response.json())
        // here you set the response in to json 
        .then(parsed => {
            // here you parse your json
            // let messageDate = moment(parsed.content[0].createdAt, 'DD/MM/YYYY HH:mm:ss').format('DD/MM/YYYY');
            // messageDate to set your date
            // here you set you data from json into your variables
            this.setState({
                inboxMessages : parsed.content,
            });
        })
        .catch(err => {
            console.log(err);
        });
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.InboxView}>
            {/* Main Container Start */}

                <TouchableOpacity onPress={this.onBackPress} style={styles.backButton}>
                {/* Back Button Start */}
                        {/* Back Button Icon */}
                        <Image
                            style={styles.btn_backImage}
                            source={require('../../../../src/assets/icons/icon-back-black.png')}/> 
                {/* Back Button End */}
                </TouchableOpacity>

                <View style={[styles.topText]}>
                {/* Top Text Start */}
                    <Text style={[styles.heading]}>Inbox</Text>
                    <Text style={styles.subHeading}>You have 3 unread messages</Text>
                {/* Top Text end */}
                </View>
                <FlatList data={this.state.inboxMessages} // Data source
                // List Start
                    renderItem={({item}) => (
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