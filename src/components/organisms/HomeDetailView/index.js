import React, { Component } from 'react';
import {
        Text,
        View,
      } from 'react-native';
import Image from 'react-native-remote-svg';
import PropTypes from 'prop-types'
import CardView from 'react-native-cardview'
import StarRatings from '../../atoms/StarRatings';
import RoomInfoBox from '../../atoms/RoomInfoBox';
import styles from './styles';
import ReadMoreView from '../../atoms/ReadMoreView'

const RNPropTypes = PropTypes || React.PropTypes;

class HomeDetailView extends Component {

    static propTypes = {
        title: RNPropTypes.string.isRequired,
        rateExp: RNPropTypes.string.isRequired,
        rateVal: RNPropTypes.number.isRequired,
        reviewNum: RNPropTypes.number.isRequired,
        address: RNPropTypes.string.isRequired,
    };

    static defaultProps = {
        title: '',
        rateExp: '',
        rateVal: 0,
        reviewNum: 0,
        address: '',
    };

    constructor(props) {
        super(props);
        this.state = {
            position: 0,
            interval: null,
        };
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
    }

    componentWillUnmount() {
        clearInterval(this.state.interval);
    }

    
    _handleTextReady = () => {
        console.log('ready!');
    }


    render() {
        const ratingHeight = 12;
        const ratingSize = 9;
        
        const { property_type,
            guests,
            size,
            bathroom,
            bedrooms } = this.props.roomDetails;
        const hasSpaceDetails = property_type || guests || size || bathroom || bedrooms;
        return (
          <View style={styles.container}>
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
                        <Text style={[styles.rateText, {fontSize:ratingSize, height:ratingHeight, paddingTop:2}]}>
                            {this.props.rateExp} {this.props.rateVal}/5
                        </Text>
                        <StarRatings
                            maximumValue = {5}
                            minimumValue = {0}
                            value = {this.props.rateVal}
                            style = {{width:60, height:ratingHeight, paddingTop:3}}
                            starStyle={{width:ratingSize, height:ratingSize,}}
                            emptyStarImage={<Image style={{width:ratingSize, height:ratingSize,}} source={require('../../../assets/png/empty-star.png')}/>}
                            filledStarImage={<Image style={{width:ratingSize, height:ratingSize,}} source={require('../../../assets/png/empty-star-full.png')}/>}/>

                        <Text style={[styles.rateText, {fontSize:ratingSize, height:ratingHeight, paddingTop:2, paddingLeft:0, paddingLeft:20}]}>
                            {this.props.reviewNum} Reviews
                        </Text>
                    </View>
                    {
                        hasSpaceDetails && (
                            <View style={{marginTop: 7, marginLeft:10, marginRight:10}}>
                                <RoomInfoBox
                                    property_type = {property_type}
                                    guests = {guests}
                                    size = {size}
                                    bathroom = {bathroom}
                                    bedrooms = {bedrooms} />
                            </View>
                        )
                    }
                </CardView>
                <View style={styles.descriptionView}>
                    <ReadMoreView
                        numberOfLines={8}
                        style={styles.rateText}
                        onReady={this._handleTextReady}
                        buttonStyle={styles.readmore}>
                        <Text style={styles.normalText}>
                            {`${this.props.description}`.replace(/<(?:.|\n)*?>/gm, '')}
                        </Text> 
                    </ReadMoreView>
                  {/* <Text style={styles.normalText}>{`${this.props.description}`.replace(/<(?:.|\n)*?>/gm, '')}</Text> */}
                </View>
          </View>
        );
    }
}

export default HomeDetailView;
