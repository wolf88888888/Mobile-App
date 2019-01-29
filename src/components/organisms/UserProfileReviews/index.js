import React, { Component } from 'react';
import {
        Text,
        TouchableOpacity,
        View,
        ViewPropTypes
      } from 'react-native';
import Image from 'react-native-remote-svg';
import PropTypes from 'prop-types'
import ReadMoreView from '../../atoms/ReadMoreView'
import StarRatings from '../../atoms/StarRatings';
import styles from './styles';

const RNViewPropTypes = ViewPropTypes || View.propTypes;
const RNPropTypes = PropTypes || React.PropTypes;

class UserProfileReviews extends Component {
    static propTypes = {
        reviews: RNPropTypes.number.isRequired,
        avatar: RNPropTypes.number.isRequired,
        name: RNPropTypes.string.isRequired,
        date: RNPropTypes.string.isRequired,
        clientRate: RNPropTypes.number.isRequired,
        clientDescription: RNPropTypes.string.isRequired,
    };

    static defaultProps = {
        reviews: 0,
        avatar: null,
        name: '',
        date: '',
        clientRate: 0,
        clientDescription: "",
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{this.props.reviews} Reviews</Text>
                <View style={styles.personalRateView}>
                    <View>
                        <Image style={styles.avatar} source={this.props.avatar} />
                    </View>
                    <View style={styles.ratingConatiner}>
                        <View style={styles.personalInfo}>
                            <Text style={styles.name}>{this.props.name} - </Text>
                            <Text style={styles.date}>{this.props.date}</Text>
                        </View>
                        <StarRatings
                            maximumValue = {5}
                            minimumValue = {0}
                            value = {this.props.clientRate}
                            style = {styles.rating}
                            starStyle={{width:9, height:9,}}
                            emptyStarImage={<Image style={styles.rateImage} source={require('../../../assets/png/empty-star.png')}/>}
                            filledStarImage={<Image style={styles.rateImage} source={require('../../../assets/png/empty-star-full.png')}/>}/>
                    </View>
                </View>
                <ReadMoreView
                    numberOfLines={3}
                    style={styles.rateText}
                    onReady={this._handleTextReady}
                    buttonStyle={styles.readmore}>
                    <Text style={styles.normalText}>
                         {this.props.clientDescription}
                     </Text>
                </ReadMoreView>
                <TouchableOpacity>
                    <Text style={styles.more}>Read all reviews</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default UserProfileReviews;
