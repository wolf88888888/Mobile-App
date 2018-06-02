import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Keyboard,ListView,TextInput,FlatList,br
    } from 'react-native';
import PropTypes from 'prop-types';
import Image from 'react-native-remote-svg';
import BackButton from '../../../atoms/BackButton';
import styles from './styles';
import ReviewTitle from '../../../molecules/ReviewTitle';
import HostInfo from '../../../atoms/Property/HostInfo';
import Footer from '../../../atoms/Footer';
import Textarea from '../../../atoms/Textarea';

class ReviewSend extends Component {
    static propTypes = {
        navigation: PropTypes.shape({
            navigate: PropTypes.func
        })
    }

    static defaultProps = {
        navigation: {
            navigate: () => {}
        }
    }

    constructor(){
        super();
        this.onClose = this.onClose.bind(this);
        this.onNext = this.onNext.bind(this);
        this.state = {
            placeholder: 'Tell your host a little about yourself, and why you are coming.',
            text: '',
        };
    }

    onClose() {
        this.props.navigation.goBack();
    }

    onNext() {
        this.props.navigation.navigate('ReviewPayScreen');
    }

    render() {
        const { navigate } = this.props.navigation;

        return (
            <View style={styles.container}>
                <BackButton onPress={this.onClose}/>
                <ReviewTitle
                    text="Send your message to your host"
                    pageNumber="STEP 3 OF 4 "
                    optional="(optional)"/>

                <View style={styles.body}>
                    <HostInfo
                        avatar={require('../../../../assets/temple/avatar.png')}
                        pageNumber="Britney"
                        text="Cia,Greece"/>
                    <Textarea
                        containerStyle={styles.textareaContainer}
                        style={styles.textarea}
                        onChangeText={(text) => this.setState({text})}
                        defaultValue={this.state.text}
                        placeholder={this.state.placeholder}
                        placeholderTextColor={'#c7c7c7'}
                        underlineColorAndroid={'transparent'}
                    />
                </View>
                <Footer style={styles.footer} button={'Next'} onClick={this.onNext}/>
            </View>
        );
    }
}

export default ReviewSend;
