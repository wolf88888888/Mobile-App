import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
 Platform,
    Text,
    View,
    AsyncStorage,
    FlatList,
    TextInput,
    KeyboardAvoidingView,
    TouchableOpacity
} from 'react-native';
import { domainPrefix } from '../../../config';
import Image from 'react-native-remote-svg';
// import ImagePicker from 'react-native-image-picker';
import { getMyConversations } from '../../../utils/requester';
import styles from './styles';
import moment from 'moment';
import BackButton from '../../atoms/BackButton';
import ProgressDialog from '../../atoms/SimpleDialogs/ProgressDialog';
import Toast from 'react-native-simple-toast';

//import Message View for chat
import MessageView from './MessageView';

class Chat extends Component {

    static propTypes = {
        navigation: PropTypes.shape({
            navigate: PropTypes.func,
        })
    }

    static defaultProps = {
        navigation: {
            navigate: () => {}
        }
    }

    componentWillMount(){
        // Remove Splash
        console.disableYellowBox = true;
    }

    constructor(props) {
        super(props);
        console.log(props.navigation.state.params);
        this.state = {
            showProgress: false,
            messages : [],
            username : '',
        };
    }

    async componentDidMount() {
        const {params} = this.props.navigation.state;
        this.state.username = await AsyncStorage.getItem(`${domainPrefix}.auth.username`)
        //here is the method to load all chats related to this id = 68

        this.setState({ showProgress: true });
        getMyConversations("/"+params.id+"?page=0")
        .then(res => res.response.json())
        // here you set the response in to json
        .then(parsed => {
            // here you parse your json
            //let messageDate = moment(parsed.content[0].createdAt, 'DD/MM/YYYY HH:mm:ss').format('DD/MM/YYYY');
            // messageDate to set your date
            // here you set you data from json into your variables
            this.setState({ showProgress: false });
            console.log(parsed);
            this.setState({
                showProgress: false,
                messages : parsed.content,
            });
        })
        .catch(err => {
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
                    <SeparatorDot height={17} width={15}/>
                    <Text style={styles.dateText}>2 guests</Text>
                    <SeparatorDot height={17} width={15}/>
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

                <BackButton  onPress={() => goBack()}/>
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
                                isCurrentUser = {item.currentUserSender}
                                sender={item.sender.email === this.state.username}
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
                        placeholder="Write message"/>
                        {/* camera button is here */}
                    <TouchableOpacity onPress={this.onCameraPress}>
                        <Image style={styles.btn_cameraImage} source={require('../../../../src/assets/camera.png')} />
                    </TouchableOpacity>
                    {/* gallery button is here */}
                    <TouchableOpacity onPress={this.onGalleryPress}>
                        <Image style={styles.btn_galleryImage} source={require('../../../../src/assets/gallery.png')} />
                    </TouchableOpacity>
                </View>
                {/* This section contain the bottom area where you can write your message and send image from gallery or camera end */}

                <ProgressDialog
                   visible={this.state.showProgress}
                   title=""
                   message="Loading..."
                   animationType="slide"
                   activityIndicatorSize="large"
                   activityIndicatorColor="black"/>
            </KeyboardAvoidingView>// Ending Main View
        );
    }

    // Methods
    onCameraPress = () => {
        // ImagePicker.launchCamera({}, (response) => {
        // // Same code as in above section!
        // });
    }

    onGalleryPress = () => {
        // ImagePicker.launchImageLibrary({}, (response) => {
        // // Same code as in above section!
        // });
    }

    sendMessage = () => {

        sendMessage('Abhi',597)
        .then(response => {
            console.log(response)
        })
        .catch(function(error){
            console.log(error);
        })
        console.log('api hit');
    }
}

function SeparatorDot(props) {
    return (
        <View style={{height: props.height, width: props.width, alignItems: 'center', justifyContent: 'center'}}>
            <View style={{height: 3, width: 3, backgroundColor: '#1f2427', borderRadius: 1.5}}></View>
        </View>
    )
}


export default Chat;
