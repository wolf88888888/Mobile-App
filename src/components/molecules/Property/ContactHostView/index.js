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


    _handleTextReady = () => {
        console.log('ready!');
    }

    render() {
        const { title, subtitle, count } = this.props;
        return (
            <View style={styles.container}>
                <Text style={styles.title}>The Host</Text>
                <View style={styles.personalInfo}>
                    <View style={styles.avatarContainer}>
                        <View>
                            <Image style={styles.avatar} source = {require('../../../../assets/temple/avatar.png')} />
                        </View>
                        <View style={styles.infoContainer}>
                            <Text style={styles.name}>Britney</Text>
                            <Text style={styles.info}>Oia, Greece • Joined in May 2011</Text>
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
