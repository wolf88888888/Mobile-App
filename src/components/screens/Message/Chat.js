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
import ImagePicker from 'react-native-image-picker';
import Requester, { getCurrencyRates, sendMessage, getChatMessages, getMyHeaders } from '../../../utils/requester';
import styles from './styles';
import SplashScreen from 'react-native-smart-splash-screen';
import moment from 'moment';

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
        SplashScreen.close({
            animationType: SplashScreen.animationType.scale,
            duration: 0,
            delay: 0
        });
    }

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            data: [],
            page: 1,
            seed: 1,
            error: null,
            refreshing: false,
            messages : [],
            name : '',
          };
    }

    componentDidMount() {
        // here is the method to load all chats related to this id = 68
        getChatMessages(68)
        .then(res => res.response.json())
        // here you set the response in to json 
        .then(parsed => {
            // here you parse your json
            let messageDate = moment(parsed.content[0].createdAt, 'DD/MM/YYYY HH:mm:ss').format('DD/MM/YYYY');
            // messageDate to set your date
            // here you set you data from json into your variables
            this.setState({
                messages : parsed.content,
                name : parsed.content[0].recipient.fullName
            });
        })
        .catch(err => {
            console.log(err);
        });
    }
    


    render() {
        const { navigate } = this.props.navigation;
        return (
            <KeyboardAvoidingView style={styles.container} behavior={(Platform.OS === 'ios') ? 'padding' : null} enabled>
                <View style={styles.chatToolbar}>
                {/* back button is define here start*/}
                <TouchableOpacity onPress={this.onBackPress} style={{marginTop: 45, marginLeft: 15, marginBottom: 0}}>
                    <Image style={styles.btn_backImage} source={require('../../../../src/assets/svg/arrow-back.svg')} />
                </TouchableOpacity>
                {/* back button is define here end*/}
                </View>

                {/* Here is the top section view where all the details are related to the receiver start*/}
                <View style={styles.requestView}>
                    <Text style={styles.requestTo}>{this.state.name}</Text>
                    <Text style={styles.requestTitle}>Garden Left Apartment</Text>
                    <View style={styles.dateWrapper}>
                        <Text style={styles.dateText}>Thu 25 Jan - Sat 27 Jan</Text>
                        <SeparatorDot height={25} width={15}/>
                        <Text style={styles.dateText}>2 guests</Text>
                        <SeparatorDot height={26} width={15}/>
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
                {/* Here is the top section view where all the details are related to the receiver end*/}

                {/* Here is the flatlist where all the message are going to be set start */}
                <FlatList inverted style={styles.listBg}
                    data={this.state.messages}// Data source
                    renderItem={({ item }) =>
                        (
                            <MessageView
                                isCurrentUser = {item.currentUserSender}
                                sender={item.sender.email === AsyncStorage.getItem(`${domainPrefix}.auth.username`)}
                                message={item}>
                            </MessageView>
                        
                        )
                    }
                />
                {/* Here is the flatlist where all the message are going to be set end */}

                {/* This section contain the bottom area where you can write your message and send image from gallery or camera start */}
                <View style={styles.footerView}>{/* Footer View for sending message etc */}
                    <TextInput style={styles.footerInputText}
                        underlineColorAndroid="rgba(0,0,0,0)" // Removing android underline for default edittext
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
            </KeyboardAvoidingView>// Ending Main View
        );
    }

    // Methods
    onCameraPress = () => {
        // ImagePickerIOS.openSelectDialog({}, imageUri => {
        //   this.setState({ image: imageUri });
        // }, error => console.log(error));
        // ImagePicker.launchCamera(this.options, (response)  => {
        //   // Same code as in above section!
        // });
        ImagePicker.launchCamera({}, (response) => {
        // Same code as in above section!
        });
    }

    onGalleryPress = () => {
        ImagePicker.launchImageLibrary({}, (response) => {
        // Same code as in above section!
        });
    }
    onBackPress = () => {
        this.props.navigation.navigate('MESSAGES');
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
            <View style={{height: 3, width: 3, backgroundColor: '#000', borderRadius: 1.5}}></View>
        </View>
    )
}


export default Chat;
