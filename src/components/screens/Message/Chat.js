import {
    AsyncStorage,
    FlatList,
    KeyboardAvoidingView,
    Platform,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import React, { Component } from 'react';

import BackButton from '../../atoms/BackButton';
import Image from 'react-native-remote-svg';
import MessageView from './MessageView';
import ProgressDialog from '../../atoms/SimpleDialogs/ProgressDialog';
import PropTypes from 'prop-types';
import Toast from 'react-native-simple-toast';
import { domainPrefix } from '../../../config';
import moment from 'moment';
import requester from '../../../initDependencies';
import styles from './styles';

// import ImagePicker from 'react-native-image-picker';







//import Message View for chat


class Chat extends Component {

    static propTypes = {
        navigation: PropTypes.shape({
            navigate: PropTypes.func,
        })
    }

    static defaultProps = {
        navigation: {
            navigate: () => { }
        }
    }

    componentWillMount() {
        // Remove Splash
        console.disableYellowBox = true;
    }

    constructor(props) {
        super(props);
        console.log(props.navigation.state.params);
        this.sendMessage = this.sendMessage.bind(this);

        this.state = {
            showProgress: false,
            messages: [],
            username: '',
            text: '',
        };
    }

    async componentDidMount() {
        const { params } = this.props.navigation.state;
        this.state.username = await AsyncStorage.getItem(`${domainPrefix}.auth.username`)
        //here is the method to load all chats related to this id = 68

        this.setState({ showProgress: true });
        requester.getChatMessages(params.id).then(res => {

            // here you set the response in to json
            res.body.then(data => {
                // here you parse your json
                //let messageDate = moment(parsed.content[0].createdAt, 'DD/MM/YYYY HH:mm:ss').format('DD/MM/YYYY');
                // messageDate to set your date
                // here you set you data from json into your variables
                console.log(data);
                this.setState({
                    showProgress: false,
                    messages: data.content,
                });

                // if (params.unread == "true") {
                // this.changeMessageFlag(params.id, params.unread);
                this.changeMessageFlag(params.id, "false");
                // }
            }).catch(err => {
                this.setState({ showProgress: false });
                Toast.showWithGravity('Cannot create wallet, Please check network connection.', Toast.SHORT, Toast.BOTTOM);
                console.log(err);
            });
        });
    }

    changeMessageFlag(id, unread) {
        let conversationObj = {
            conversationId: id,
            unread: unread === 'true' ? 'false' : 'true'
        };
        console.log(conversationObj);

        requester.changeMessageStatus(conversationObj).then(() => {
            console.log("changeMessageFlag");
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
        });
    }

    sendMessage() {
        const { params } = this.props.navigation.state;
        const { text } = this.state;

        if (text == "") {
            console.log(this.state.messages);
            return;
        }

        this.setState({ showProgress: true });

        let message = {
            recipient: params.userInfo.id,
            message: text
        };

        requester.sendMessage(message, params.id).then(res => {
            res.body.then(data => {
                console.log(data);
                this.setState({
                    showProgress: false,
                    text: '',
                    messages: [data, ...this.state.messages]
                });
            });
        }).catch(err => {
            this.setState({ showProgress: false });
            Toast.showWithGravity('Cannot create wallet, Please check network connection.', Toast.SHORT, Toast.BOTTOM);
            console.log(err);
        });
    }

    renderInfo() {
        return (
            <View style={styles.infoView}>
                <Text style={styles.requestTitle}>Garden Left Apartment</Text>
                <View style={styles.dateWrapper}>
                    <Text style={styles.dateText}>Thu 25 Jan - Sat 27 Jan</Text>
                    <SeparatorDot height={17} width={15} />
                    <Text style={styles.dateText}>2 guests</Text>
                    <SeparatorDot height={17} width={15} />
                    <Text style={styles.price}>$615 </Text>
                </View>
                {/* This view contain 2 buttons Approve and Decline start */}
                <View style={styles.requestButtonView}>
                    <TouchableOpacity style={styles.btn_requestapproveView}>
                        <Text style={styles.btn_requestapprove}>Approve</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn_requestdeclineView}>
                        <Text style={styles.btn_requestdecline}>Decline</Text>
                    </TouchableOpacity>
                </View>
                {/* This view contain 2 buttons Approve and Decline end */}
            </View>
        );
        //return null;
    }

    render() {
        const { params } = this.props.navigation.state;
        const { navigate, goBack } = this.props.navigation;
        return (
            <KeyboardAvoidingView style={styles.container} behavior={(Platform.OS === 'ios') ? 'padding' : null} enabled>

                <BackButton onPress={() => goBack()} />
                {/* Here is the top section view where all the details are related to the receiver start*/}
                <View style={styles.requestView}>
                    <Text style={styles.requestTo}>Conversation with {params.userInfo.fullName}</Text>
                    {false && this.renderInfo()}
                </View>
                {/* Here is the top section view where all the details are related to the receiver end*/}

                {/* Here is the flatlist where all the message are going to be set start */}
                <FlatList inverted style={styles.listBg}
                    data={this.state.messages}
                    renderItem={({ item }) =>
                        (
                            <MessageView
                                isCurrentUser={item.currentUserSender}
                                message={item}>
                            </MessageView>

                        )
                    }
                />
                {/* Here is the flatlist where all the message are going to be set end */}

                {/* This section contain the bottom area where you can write your message and send image from gallery or camera start */}
                <View style={styles.footerView}>{/* Footer View for sending message etc */}
                    <TextInput style={styles.footerInputText}
                        underlineColorAndroid="rgba(0,0,0,0)"
                        onChangeText={(text) => this.setState({ text })}
                        value={this.state.text}
                        placeholder="Write message" />
                    {/* camera button is here */}
                    {/* gallery button is here */}
                    <TouchableOpacity onPress={this.sendMessage}>
                        <Text style={styles.sendButton}>Send</Text>
                    </TouchableOpacity>
                </View>
                {/* This section contain the bottom area where you can write your message and send image from gallery or camera end */}

                <ProgressDialog
                    visible={this.state.showProgress}
                    title=""
                    message="Loading..."
                    animationType="slide"
                    activityIndicatorSize="large"
                    activityIndicatorColor="black" />
            </KeyboardAvoidingView>// Ending Main View
        );
    }
}

function SeparatorDot(props) {
    return (
        <View style={{ height: props.height, width: props.width, alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ height: 3, width: 3, backgroundColor: '#1f2427', borderRadius: 1.5 }}></View>
        </View>
    )
}


export default Chat;
