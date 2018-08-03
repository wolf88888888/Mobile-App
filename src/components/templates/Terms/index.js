import { AsyncStorage, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, {Component} from 'react';

import PropTypes from 'prop-types';
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
                <Text style={styles.paragraph}>I accept the terms and conditions found on https://locktrip.com/terms.html</Text>
                <Text style={styles.paragraph}>I understand that if I forget my wallet password, the only way to recover it would be through the mnemonic keywords provided during the wallet creation. It is my sole responsibility to write them and store them in a safe place. I also understand the dangers associated with Blockchain based assets and under no circumstances will I hold LockTrip responsible for any loss that could arise due to any type of security breach and/or forgotten wallet password or mnemonic keywords.</Text>

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
