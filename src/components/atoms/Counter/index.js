import React, { Component } from 'react';
import {
        Text,
        TouchableOpacity,
         View
       } from 'react-native';
import Image from 'react-native-remote-svg';
import PropTypes from 'prop-types';

import styles from './styles';

class Counter extends Component {
    static propTypes = {
        count: PropTypes.number.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
          count:0
        };
        this.state.count = this.props.count;
        this.onMinus = this.onMinus.bind(this);
        this.onPlus = this.onPlus.bind(this);
    }

    componentDidMount() {
    }

    onMinus() {
        if (this.state.count > 0) {
            this.setState({ count: this.state.count - 1});

            if (this.props.onChanged) {
                this.props.onChanged(this.state.count - 1);
            }
        }
    }

    onPlus() {
        this.setState({ count: this.state.count + 1});
        if (this.props.onChanged) {
            this.props.onChanged(this.state.count + 1);
        }
    }

    render() {
        const { count } = this.props;
        return (
            <View style={styles.container}>
              <TouchableOpacity onPress={this.onMinus}>
                  <Image source={require('../../../assets/minus.svg')} style={ this.state.count > 0 ? styles.ButtonImage : styles.DisableImage }/>
              </TouchableOpacity>
              <Text style={styles.value}>{this.state.count > 0 ? this.state.count : "0+"}</Text>
              <TouchableOpacity onPress={this.onPlus}>
                  <Image source={require('../../../assets/plus.svg')} style={styles.ButtonImage}/>
              </TouchableOpacity>
            </View>
        );
    }
}

export default Counter;
