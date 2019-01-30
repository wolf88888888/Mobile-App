import React, {Component} from 'react';
import { StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';
import Toast from 'react-native-easy-toast';
import Hyperlink from 'react-native-hyperlink'

import ProgressDialog from '../../../atoms/SimpleDialogs/ProgressDialog';
import requester from '../../../../initDependencies';
import { PUBLIC_URL } from '../../../../config';
import styles from './styles';

class Terms extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showProgress: false
        }
    }

    onDecline = () => {
		let resetAction = StackActions.reset({
			index: 0,
			actions: [
				NavigationActions.navigate({routeName: 'Welcome'})
			]
		});
		this.props.navigation.dispatch(resetAction);
    }

    onNext = () => {
        // this.props.navigation.navigate('CreateWallet', { ...params });
        const { params } = this.props.navigation.state;
        const {navigate} = this.props.navigation;
        let user = params;
        user['image'] = PUBLIC_URL + "images/default.png";

        console.log(user);

        this.setState({ showProgress: true });
        requester.register(user, null).then(res => {
            this.setState({ showProgress: false });
            console.log(res);
            if (res.success) {
                navigate('CongratulationRegister')
            } else {
                res.errors.then(data => {
                    const { errors } = data;
                    Object.keys(errors).forEach((key) => {
                        if (typeof key !== 'function') {
                            this.refs.toast.show(errors[key].message, 1500);
                            console.log('Error logging in:', errors[key].message);
                        }
                    });
                });
            }
        })
        .catch(err => {
            this.setState({ showProgress: false });
            this.refs.toast.show('Register is Failed, Please check network connection.', 1500);
            console.log(err);
        });
    }

    render() {
        const { params } = this.props.navigation.state;
        console.log("Terms params", params);
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="rgba(0,0,0,0)"
                    translucent
                    barStyle="dark-content"/>

                <Text style={styles.title}>Before continuing</Text>
                <Hyperlink linkDefault={ true } linkStyle={{ color: '#00f', fontSize: 17, textDecorationLine:'underline' }}>
                <Text style={styles.paragraph}>I accept the terms and conditions found on https://locktrip.com/terms.html</Text>
                </Hyperlink>
                <Text style={styles.paragraph}>I understand that if I forget my wallet password, the only way to recover it would be through the mnemonic keywords provided during the wallet creation. It is my sole responsibility to write them and store them in a safe place. I also understand the dangers associated with Blockchain based assets and under no circumstances will I hold LockTrip responsible for any loss that could arise due to any type of security breach and/or forgotten wallet password or mnemonic keywords.</Text>

                <View style={styles.buttonsView}>
                    <TouchableOpacity onPress={ this.onNext }>
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
                <ProgressDialog
                    visible={this.state.showProgress}
                    title=""
                    message="Registering..."
                    animationType="slide"
                    activityIndicatorSize="large"
                    activityIndicatorColor="black"/>
                    
                <Toast
                    ref="toast"
                    position='bottom'
                    opacity={0.8}
                    positionValue={150}
                />
            </View>
        );
    }
}

export default Terms;
