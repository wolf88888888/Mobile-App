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
import Slideshow from '../../atoms/Slideshow';
import StarRatings from '../../atoms/StarRatings';

import ImageCarousel from '../../atoms/ImagePage';

import styles from './styles';

const dimensionWindows = Dimensions.get('window');
const logoWidth = dimensionWindows.width;
const logoHeight = logoWidth * 35 / 54;

const RNViewPropTypes = ViewPropTypes || View.propTypes;
const RNPropTypes = PropTypes || React.PropTypes;

class HotelDetailView extends Component {

    static propTypes = {
        title: RNPropTypes.string.isRequired,
        rateExp: RNPropTypes.string.isRequired,
        rateVal: RNPropTypes.number.isRequired,
        reviewNum: RNPropTypes.number.isRequired,
        address: RNPropTypes.string.isRequired,
        dataSourcePreview: RNPropTypes.array
    };

    static defaultProps = {
        title: '',
        rateExp: '',
        rateVal: 0,
        reviewNum: 0,
        address: '',
        dataSourcePreview: []
    };

    constructor(props) {
        super(props);
        this.state = {
            position: 0,
            interval: null,
            dataSource: [],
        };

        console.log(props.dataSourcePreview);
        this.state.dataSource = props.dataSourcePreview;
    }

    componentDidMount() {
    }

    componentWillMount() {
        // this.setState({
        //     interval: setInterval(() => {
        //     this.setState({
        //         position: this.state.position === this.state.dataSource.length ? 0 : this.state.position + 1
        //     });
        //     }, 2000)
        // });
        console.log("width : " + logoWidth);
        console.log("height : " + logoHeight);
    }

    componentWillUnmount() {
        clearInterval(this.state.interval);
    }

    render() {
        const ratingHeight = 12;
        const ratingSize = 8;
        return (
          <View style={styles.container}>
            <View style={{width: logoWidth, height: logoHeight}}>
                <ImageCarousel
                  delay={1500}
                  style={styles.logoImage}
                  width={logoWidth}
                  height={logoHeight}
                  indicatorSize={12.5}
                  indicatorOffset={20}
                  indicatorColor="#D87A61"
                  images={this.state.dataSource} />
              </View>
              <CardView style={styles.topView}
                  cardElevation={1.5}
                  cardMaxElevation={1.5}
                  cornerRadius={0}>
                  <Text style={styles.topTitleText}>
                      {this.props.title}
                  </Text>
                  <View>
                        <Text style={styles.addressText}>
                            {this.props.address}
                        </Text>
                  </View>
                  <View style={[styles.rateViewContainer, {height:ratingHeight}]}>
                      <Text style={[styles.rateText, {
                      fontSize:ratingSize, height:ratingHeight, paddingTop:2}]}>
                          {this.props.rateExp} {this.props.rateVal}/5
                      </Text>
                      <StarRatings
                          maximumValue = {5}
                          minimumValue = {0}
                          value = {this.props.rateVal}
                          style = {{width:60, height:ratingHeight, paddingTop:0}}
                          starStyle={{width:ratingSize, height:ratingSize,}}
                          emptyStarImage={<Image style={{width:ratingSize, height:ratingSize,}} source={require('../../../assets/png/empty-star.png')}/>}
                          filledStarImage={<Image style={{width:ratingSize, height:ratingSize,}} source={require('../../../assets/png/empty-star-full.png')}/>}/>

                      {this.props.reviewNum != 0 &&
                          (<Text style={[styles.rateText, {fontSize:ratingSize, height:ratingHeight, paddingTop:2, paddingLeft:0}]}>
                              {this.props.reviewNum} Reviews
                          </Text>)
                      }
                  </View>
              </CardView>

              <View style={styles.descriptionView}>
                  <Text style={styles.normalText}>{this.props.description}</Text>
              </View>
          </View>
        );
    }
}

export default HotelDetailView;
