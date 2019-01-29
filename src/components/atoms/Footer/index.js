import React, { Component } from 'react';
import {
        Text,
        TouchableOpacity,
        View
      } from 'react-native';
import Image from 'react-native-remote-svg';
import PropTypes from 'prop-types';

import styles from './styles';

class Footer extends Component {

    static propTypes = {
        info0: PropTypes.string,
        unit0: PropTypes.string,
        info1: PropTypes.string,
        unit1: PropTypes.string,
        button: PropTypes.string,
        fullButton: PropTypes.bool,
    }

    static defaultProps = {
        info0: '',
        unit0: '',
        info1: '',
        unit1: '',
        button: '',
        fullButton: false,
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        const { fullButton } = this.props;
        return (
            <View style={[styles.container, this.props.style]}>
                {
                  fullButton?
                      <View style={styles.subContainer}>
                          <TouchableOpacity style={styles.FullButtonView} onPress={this.props.onClick}>
                              <Text style={styles.ButtonText}>{this.props.button}</Text>
                          </TouchableOpacity>
                      </View>
                  :
                      <View style={styles.subContainer}>
                          <View style={styles.infoContainer}>
                              <View style={{flexDirection:'row'}}>
                                  <Text style={styles.info0}>{this.props.info0}</Text>
                                  <Text style={styles.unit}> {this.props.unit0}</Text>
                              </View>
                              <View style={{flexDirection:'row'}}>
                                  <Text style={styles.info1}>{this.props.info1}</Text>
                                  <Text style={styles.unit}> {this.props.unit1}</Text>
                              </View>
                          </View>
                          <TouchableOpacity style={styles.ButtonView} onPress={this.props.onClick}>
                              <View >
                                  <Text style={styles.ButtonText}>{this.props.button}</Text>
                              </View>
                          </TouchableOpacity>
                      </View>
                }
            </View>
        );
    }
}

export default Footer;
