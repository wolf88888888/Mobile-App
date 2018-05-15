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

class RatingView extends Component {

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
                <Text style={styles.title}>User Rating & Review</Text>

                <View style={styles.totalRate}>
                    <View style={styles.totalRateBox}>
                        <Text style={styles.totalRateTitle}>4.1</Text>
                        <Text style={styles.totalReviews}>73 reviews</Text>
                    </View>
                    <View style={styles.individualRateGroup}>
                        <RatingProgreeBar style={{width:mainWidth, height:25}} width={mainWidth} title={'Value for money'} rate={4.8}/>
                        <RatingProgreeBar style={{width:mainWidth, height:25}} width={mainWidth} title={'Value for money'} rate={4.8}/>
                        <RatingProgreeBar style={{width:mainWidth, height:25}} width={mainWidth} title={'Value for money'} rate={4.8}/>
                    </View>
                    <View style={styles.individualRateGroup}>
                        <RatingProgreeBar style={{width:mainWidth, height:25}} width={mainWidth} title={'Value for money'} rate={4.8}/>
                        <RatingProgreeBar style={{width:mainWidth, height:25}} width={mainWidth} title={'Value for money'} rate={4.8}/>
                        <RatingProgreeBar style={{width:mainWidth, height:25}} width={mainWidth} title={'Value for money'} rate={4.8}/>
                    </View>
                </View>

                <View style={styles.personalRateView}>
                    <View>
                        <Image style={styles.avatar} source = {require('../../../../assets/temple/avatar.png')} />
                    </View>
                    <View style={styles.ratingConatiner}>
                        <View style={styles.personalInfo}>
                            <Text style={styles.name}>Jesse - </Text>
                            <Text style={styles.date}>October 2017</Text>
                        </View>
                        <StarRatings
                            maximumValue = {5}
                            minimumValue = {0}
                            value = {4.2}
                            style = {styles.rating}
                            starStyle={{width:9, height:9,}}
                            emptyStarImage={<Image style={styles.rateImage} source={require('../../../../assets/empty-star.svg')}/>}
                            filledStarImage={<Image style={styles.rateImage} source={require('../../../../assets/empty-star-full.svg')}/>}/>
                    </View>
                </View>
                <ReadMoreView
                    numberOfLines={3}
                    style={styles.rateText}
                    onReady={this._handleTextReady}
                    buttonStyle={styles.readmore}>
                    <Text style={styles.normalText}>
                         The apartment was in a good location and we were able
                         to park our car a 5 minute walk away for a fair price!
                         The apartment was clean and had everything.
                         The apartment was in a good location and we were able
                         to park our car a 5 minute walk away for a fair price!
                         The apartment was clean and had everything.
                         The apartment was in a good location and we were able
                         to park our car a 5 minute walk away for a fair price!
                         The apartment was clean and had everything.
                     </Text>
                </ReadMoreView>
                <TouchableOpacity>
                    <Text style={styles.more}>Read all 73 reviews</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default RatingView;
