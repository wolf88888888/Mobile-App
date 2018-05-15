import React, { Component } from 'react';
import {
        Text,
        TouchableOpacity,
        View,
        ListView,
        Dimensions
      } from 'react-native';
import Image from 'react-native-remote-svg';
import PropTypes from 'prop-types';
import CardView from 'react-native-cardview'

import FacilityView from '../../../atoms/FacilityView'
import StarRatings from '../../../atoms/StarRatings';
import PropertyDetailsView from '../PropertyDetailsView'
import ReadMoreView from '../../../atoms/ReadMoreView'

import styles from './styles';

class PropertySummaryView extends Component {

    static get propTypes() {
        return {
        }
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
              <Image style={styles.logoImage} source={require('../../../../assets/temple/overview.jpg')} />
              <CardView style={styles.topView}
                  cardElevation={1.5}
                  cardMaxElevation={1.5}
                  cornerRadius={0}>
                  <Text style={styles.topTitleText}>
                      Garden Loft Apartment
                  </Text>
                  <View style={[styles.rateViewContainer, {height:ratingHeight}]}>
                      <Text style={[styles.rateText, {
                      fontSize:ratingSize, height:ratingHeight, paddingTop:2}]}>
                          Excellent 4.1/5
                      </Text>
                      <StarRatings
                          maximumValue = {5}
                          minimumValue = {0}
                          value = {4.2}
                          style = {{width:60, height:ratingHeight, paddingTop:0}}
                          starStyle={{width:ratingSize, height:ratingSize,}}
                          emptyStarImage={<Image style={{width:ratingSize, height:ratingSize,}} source={require('../../../../assets/empty-star.svg')}/>}
                          filledStarImage={<Image style={{width:ratingSize, height:ratingSize,}} source={require('../../../../assets/empty-star-full.svg')}/>}/>

                      <Text style={[styles.rateText, {fontSize:ratingSize, height:ratingHeight, paddingTop:2, paddingLeft:0}]}>
                          73 Reviews
                      </Text>
                  </View>
                  <View style={styles.lineStyle} />
                  <PropertyDetailsView guests={4} size={85} bathroom={1} bedroom={1}/>
              </CardView>

              <View style={styles.descriptionView}>
                  <Text style={styles.normalText}>In the historic quarter of Santo Spirito,on the left bank of the ricer Arno,studio apartment is perfect for those traveling alone or as a couple.To walk berween Santo Spirito,Pante Vecchio and Babali Gardens is a magical experience.</Text>
                  <Text style={styles.smallTitle}>The Space</Text>
                  <ReadMoreView
                      numberOfLines={2}
                      onReady={this._handleTextReady}
                      buttonStyle={styles.readmore}>
                      <Text style={styles.spaceText}>
                          On the third floor of a typical Florentine building, the apartment
                          consists of an entrance with wardrobes and loft with double bed,
                          On the third floor of a typical Florentine building, the apartment
                          consists of an entrance with wardrobes and loft with double bed,
                          On the third floor of a typical Florentine building, the apartment
                          consists of an entrance with wardrobes and loft with double bed,
                          On the third floor of a typical Florentine building, the apartment
                          consists of an entrance with wardrobes and loft with double bed
                       </Text>
                  </ReadMoreView>
              </View>
          </View>
        );
    }
}

export default PropertySummaryView;
