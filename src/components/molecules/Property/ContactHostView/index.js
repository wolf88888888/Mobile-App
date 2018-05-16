import React, { Component } from 'react';
import {
        Text,
        TouchableOpacity,
        View,
        Dimensions
      } from 'react-native';
import PropTypes from 'prop-types';
import Image from 'react-native-remote-svg';
import StarView from '../../../atoms/StarView';
import RatingProgreeBar from '../../../atoms/RatingProgreeBar'
import StarRatings from '../../../atoms/StarRatings';
import ReadMoreView from '../../../atoms/ReadMoreView'
import styles from './styles';

const dimensionWindows = Dimensions.get('window');
const mainWidth = (dimensionWindows.width - 130) / 2;

class ContactHostView extends Component {
    static propTypes = {
        avatar: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        detail: PropTypes.string.isRequired,
    };

    static defaultProps = {
        avatar: null,
        name: "",
        detail: "",
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>The Host</Text>
                <View style={styles.personalInfo}>
                    <View style={styles.avatarContainer}>
                        <View>
                            <Image style={styles.avatar} source = {this.props.avatar} />
                        </View>
                        <View style={styles.infoContainer}>
                            <Text style={styles.name}>{this.props.name}</Text>
                            <Text style={styles.info}>{this.props.detail}</Text>
                        </View>
                    </View>
                    <View style={styles.contactContainer}>
                        <Text style={styles.contact}>Contact Host</Text>
                    </View>
                </View>
            </View>
        );
    }
}

export default ContactHostView;
