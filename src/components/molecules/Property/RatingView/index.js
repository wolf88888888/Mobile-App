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
const RNPropTypes = PropTypes || React.PropTypes;

class RatingView extends Component {
    static propTypes = {
        rateTotalVal: RNPropTypes.number.isRequired,
        reviewNum: RNPropTypes.number.isRequired,
        avatar: RNPropTypes.number.isRequired,
        name: RNPropTypes.string.isRequired,
        date: RNPropTypes.string.isRequired,
        clientRate: RNPropTypes.number.isRequired,
        clientDescription: RNPropTypes.string.isRequired,
        reviewNum: RNPropTypes.number.isRequired,

        rateTitle0: RNPropTypes.string.isRequired,
        rateVal0: RNPropTypes.number.isRequired,
        rateTitle1: RNPropTypes.string.isRequired,
        rateVal1: RNPropTypes.number.isRequired,
        rateTitle2: RNPropTypes.string.isRequired,
        rateVal2: RNPropTypes.number.isRequired,
        rateTitle3: RNPropTypes.string.isRequired,
        rateVal3: RNPropTypes.number.isRequired,
        rateTitle4: RNPropTypes.string.isRequired,
        rateVal4: RNPropTypes.number.isRequired,
        rateTitle5: RNPropTypes.string.isRequired,
        rateVal5: RNPropTypes.number.isRequired,
    };

    static defaultProps = {
      rateTotalVal: 0,
      reviewNum: 0,
      avatar: null,
      name: "",
      date: "",
      clientRate: 0,
      clientDescription: "",
      reviewNum: 0,

      rateTitle0: "",
      rateVal0: 0,
      rateTitle1: "",
      rateVal1: 0,
      rateTitle2: "",
      rateVal2: 0,
      rateTitle3: "",
      rateVal3: 0,
      rateTitle4: "",
      rateVal4: 0,
      rateTitle5: "",
      rateVal5: 0,
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    _handleTextReady = () => {
        console.log('ready!');
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>User Rating & Review</Text>

                <View style={styles.totalRate}>
                    <View style={styles.totalRateBox}>
                        <Text style={styles.totalRateTitle}>{this.props.rateTotalVal}</Text>
                        <Text style={styles.totalReviews}>{this.props.reviewNum} reviews</Text>
                    </View>
                    <View style={styles.individualRateGroup}>
                        <RatingProgreeBar style={{width:mainWidth, height:25}} width={mainWidth} title={this.props.rateTitle0} rate={this.props.rateVal0}/>
                        <RatingProgreeBar style={{width:mainWidth, height:25}} width={mainWidth} title={this.props.rateTitle1} rate={this.props.rateVal1}/>
                        <RatingProgreeBar style={{width:mainWidth, height:25}} width={mainWidth} title={this.props.rateTitle2} rate={this.props.rateVal2}/>
                    </View>
                    <View style={styles.individualRateGroup}>
                        <RatingProgreeBar style={{width:mainWidth, height:25}} width={mainWidth} title={this.props.rateTitle3} rate={this.props.rateVal3}/>
                        <RatingProgreeBar style={{width:mainWidth, height:25}} width={mainWidth} title={this.props.rateTitle4} rate={this.props.rateVal4}/>
                        <RatingProgreeBar style={{width:mainWidth, height:25}} width={mainWidth} title={this.props.rateTitle5} rate={this.props.rateVal5}/>
                    </View>
                </View>

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
                         {this.props.clientDescription}
                     </Text>
                </ReadMoreView>
                <TouchableOpacity>
                    <Text style={styles.more}>Read all {this.props.reviewNum} reviews</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default RatingView;
