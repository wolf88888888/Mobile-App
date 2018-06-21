import React, {Component} from 'react';
import { StatusBar, StyleSheet, Text, View, TouchableOpacity, AsyncStorage } from 'react-native';
import PropTypes from 'prop-types';
import { register, login } from '../../../utils/requester';
import { domainPrefix } from '../../../config';
import styles from './styles';

class Terms extends Component {
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

    constructor(props) {
        super(props);
        this.onDecline = this.onDecline.bind(this);
        this.state = {
        }
    }

    componentDidMount() {
    }

    onDecline() {
        const { params } = this.props.navigation.state;
        const { pop } = this.props.navigation;
        if (params.isFB) {
            pop(2);
        }
        else {
            pop(3);
        }
    }

    render() {
        const { navigate, goBack, pop } = this.props.navigation;
        const { params } = this.props.navigation.state;
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="rgba(0,0,0,0)"
                    translucent
                    barStyle="dark-content"
                />

                <Text style={styles.title}>Before continuing</Text>
                <Text style={styles.paragraph}>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</Text>
                <Text style={styles.paragraph}>I agree many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</Text>

                <View style={styles.buttonsView}>
                    <TouchableOpacity onPress={() => navigate('CreateWallet', { ...params })}>
                        <View style={styles.acceptButtonView}>
                            <Text style={styles.acceptButtonText}>Accept</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.onDecline}>
                        <View style={styles.declineButtonView}>
                            <Text style={styles.declineButtonText}>Decline</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default Terms;
