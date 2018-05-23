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
        title: RNPropTypes.string.isRequired,
        rateExp: RNPropTypes.string.isRequired,
        rateVal: RNPropTypes.number.isRequired,
        reviewNum: RNPropTypes.number.isRequired,
        guests: RNPropTypes.number.isRequired,
        size: RNPropTypes.number.isRequired,
        bathroom: RNPropTypes.number.isRequired,
        bedroom: RNPropTypes.number.isRequired,
        description: RNPropTypes.string.isRequired,
        space: RNPropTypes.string.isRequired,
    };

    static defaultProps = {
        title: '',
        rateExp: '',
        rateVal: 0,
        reviewNum: 0,
        guests: 0,
        size: 0,
        bathroom: 0,
        bedroom: 0,
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
        const ratingSize = 8;
        return (
          <View style={styles.container}>
              <Image style={styles.logoImage} source={this.props.logo} />
              <CardView style={styles.topView}
                  cardElevation={1.5}
                  cardMaxElevation={1.5}
                  cornerRadius={0}>
                  <Text style={styles.topTitleText}>
                      {this.props.title}
                  </Text>
                  <View style={[styles.rateViewContainer, {height:ratingHeight}]}>
                      <Text style={[styles.rateText, {
                      fontSize:ratingSize, height:ratingHeight, paddingTop:2}]}>
                          {this.props.rateExp} {this.props.rateVal}/5
                      </Text>
                      <Text style={[styles.rateText, {fontSize:ratingSize, height:ratingHeight, paddingTop:2, paddingLeft:0}]}>
                          {this.props.reviewNum} Reviews
                      </Text>
                  </View>
                  <View style={styles.lineStyle} />
              </CardView>

              <View style={styles.descriptionView}>
                  <Text style={styles.normalText}>{this.props.description}</Text>
                  <Text style={styles.smallTitle}>The Space</Text>
                  <ReadMoreView
                      numberOfLines={3}
                      onReady={this._handleTextReady}
                      buttonStyle={styles.readmore}>
                        <Text style={styles.spaceText}>
                            {this.props.space}
                       </Text>
                  </ReadMoreView>
              </View>
          </View>
        );
    }
}

export default UserProfileSummary;
