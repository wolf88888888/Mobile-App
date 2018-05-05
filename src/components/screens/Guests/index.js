import React, { Component } from 'react';
import {
    Text,
    View,
    AsyncStorage,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard
    } from 'react-native';
import Image from 'react-native-remote-svg';
import PropTypes from 'prop-types';

import CloseButton from '../../atoms/CloseButton';
import Counter from '../../atoms/Counter';
import GuestRow from '../../molecules/GuestRow';

import styles from './styles';

class Guests extends Component {
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
        this.state = {
          adults:0,
          children:0,
          infants:0,
        };
        const { params } = this.props.navigation.state;
        this.state.adults = params ? params.adults : 0;
        this.state.children = params ? params.children : 0;
        this.state.infants = params ? params.infants : 0;
    }

    onClose() {
      this.props.navigation.goBack();
    }

    onAdults(value) {
      this.state.adults = value;
    }

    onChildren(value) {
      this.state.children = value;
    }

    onInfants(value) {
      this.state.infants = value;
    }

    onDone() {
      console.log(this.state.adults);
      console.log(this.state.children);
      console.log(this.state.infants);
      this.props.navigation.goBack();
      if (this.props.navigation.state.params && this.props.navigation.state.params.updateData) {
        this.props.navigation.state.params.updateData({ adults: this.state.adults, children: this.state.children, infants: this.state.infants });
      }
    }

    render() {
        const { navigate } = this.props.navigation;

        return (
            <View style={styles.container}>
              <CloseButton onPress={() => this.onClose()}/>
              <View style={styles.bodyRows}>
                <GuestRow title={"Adults"} subtitle={""} count={this.state.adults} onChanged={this.onAdults.bind(this)}/>
                <GuestRow title={"Children"} subtitle={"Age 2-12"} count={this.state.children} onChanged={this.onChildren.bind(this)}/>
                <GuestRow title={"Infants"} subtitle={"Under 2"} count={this.state.infants} onChanged={this.onInfants.bind(this)}/>
              </View>
              <View style={styles.bottomView}>
                <TouchableOpacity style={styles.doneButtonView} onPress={() => this.onDone()}>
                    <Text style={styles.doneButtonText}>Done</Text>
                </TouchableOpacity>
              </View>
            </View>
        );
    }
}

export default Guests;
