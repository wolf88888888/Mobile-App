import { StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';
import React, {Component} from 'react';

import styles from './styles';

class Terms extends Component {

    constructor(props) {
        super(props);
        this.onDecline = this.onDecline.bind(this);
        this.state = {
        }
    }

    componentDidMount() {
    }

    onDecline() {
		let resetAction = StackActions.reset({
			index: 0,
			actions: [
				NavigationActions.navigate({routeName: 'Welcome'})
			]
		});
		this.props.navigation.dispatch(resetAction);
    }

    render() {
        const { navigate } = this.props.navigation;
        const { params } = this.props.navigation.state;
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="rgba(0,0,0,0)"
                    translucent
                    barStyle="dark-content"/>

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
