import React, { Component } from 'react';
import {
        Text,
        TouchableOpacity,
        View
      } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

class CheckIn_OutView extends Component {

    static get propTypes() {
        return {
          // title: PropTypes.string.isRequired,
          // subtitle: PropTypes.string.isRequired,
          // type: PropTypes.string.isRequired,
          // count: PropTypes.number.isRequired
        }
    };

    constructor(props) {
        super(props);
        this.onFacilityMore = this.onFacilityMore.bind(this);
    }

    componentDidMount() {
    }


    onFacilityMore() {
        this.props.onFacilityMore();
    }

    render() {
        const { title, subtitle, count } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.titleContainter}>
                    <Text style={styles.title}>Check-In Time</Text>
                    <Text style={styles.title}>2PM - 10PM</Text>
                </View>
                <View style={[styles.titleContainter, {marginTop:30}]}>
                    <Text style={styles.title}>Check-Out Time</Text>
                    <Text style={styles.title}>12PM(noon)</Text>
                </View>
            </View>
        );
    }
}

export default CheckIn_OutView;
