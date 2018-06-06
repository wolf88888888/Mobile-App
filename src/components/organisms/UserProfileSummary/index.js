import React, { Component } from 'react';
import {
        Text,
        TouchableOpacity,
        View,
        ListView,
        Dimensions,
        ViewPropTypes
      } from 'react-native';
import Image from 'react-native-remote-svg';
import PropTypes from 'prop-types'
import CardView from 'react-native-cardview'

import ReadMoreView from '../../atoms/ReadMoreView'

import styles from './styles';


const RNViewPropTypes = ViewPropTypes || View.propTypes;
const RNPropTypes = PropTypes || React.PropTypes;

class UserProfileSummary extends Component {
    static propTypes = {
        username: RNPropTypes.string.isRequired,
        place: RNPropTypes.string.isRequired,
        member_date: RNPropTypes.string.isRequired,
        reviews: RNPropTypes.number.isRequired,
        references: RNPropTypes.number.isRequired,
        isVerified: RNPropTypes.bool.isRequired,
        description: RNPropTypes.string.isRequired,
        space: RNPropTypes.string.isRequired,
    };

    static defaultProps = {
        username: '',
        place: '',
        member_date: '',
        reviews: 0,
        references: 0,
        isVerified: false,
        description: '',
        space: '',
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        const ratingHeight = 12;
        const ratingSize = 10;
        return (
            <View style={styles.container}>
                <Image style={styles.logoImage} source={this.props.logo} />
                <CardView style={styles.topView}
                    cardElevation={1.5}
                    cardMaxElevation={1.5}
                    cornerRadius={0}>
                    <Text style={styles.topTitleText}>
                        {this.props.username}
                    </Text>
                    <View style={[styles.infoViewContainer, {height:ratingHeight}]}>
                        <Text style={[styles.infoText, {
                            fontSize:ratingSize, height:ratingHeight, paddingTop:2}]}>
                            {this.props.place} • Member since {this.props.member_date}
                        </Text>
                    </View>
                    <View style={styles.rateViewContainer}>
                        <View style={styles.reviewContainer}>
                            <Text style={styles.highlightView}>{this.props.reviews}</Text><Text style={styles.subtitleText}>Reviews</Text>
                        </View>
                        <View style={styles.reviewContainer}>
                            <Text style={styles.highlightView}>{this.props.references}</Text><Text style={styles.subtitleText}>References</Text>
                        </View>
                        <View style={styles.reviewContainer}>
                            {
                                this.props.isVerified?
                                    <Image source={require("../../../assets/svg/check.svg")} style={styles.Verified}/>
                                :
                                    <Image source={require("../../../assets/svg/uncheck.svg")} style={styles.Verified}/>
                            }
                            <Text style={styles.subtitleText}>Verified</Text>
                        </View>
                    </View>
                </CardView>

                <View style={styles.descriptionView}>
                    <Text style={styles.normalText}>{this.props.description}</Text>
                </View>
            </View>
        );
    }
}

export default UserProfileSummary;
