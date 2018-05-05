import React, { Component } from 'react';
import {
        Text,
        TouchableOpacity,
        View
      } from 'react-native';
import Image from 'react-native-remote-svg';
import PropTypes from 'prop-types';
import Counter from '../../atoms/Counter'

import styles from './styles';

class GuestRow extends Component {
    componentDidMount() {
    }

    onChanged(value) {
      if (this.props.onChanged) {
        this.props.onChanged(value);
      }
    }

    render() {
        const { title, subtitle, count } = this.props;
        return (
            <View style={styles.container}>
              <View style={styles.headStyle}>
                <Text style={styles.titleStyle}>{title}</Text>
                {subtitle != "" && (<Text style={styles.subtitleStyle}>{subtitle}</Text>)}
              </View>
              <Counter style={styles.countStyle} count={count} onChanged={this.onChanged.bind(this)}/>
            </View>
        );
    }
}

GuestRow.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired
};

export default GuestRow;
