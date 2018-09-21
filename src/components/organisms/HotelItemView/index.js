import React, { Component } from 'react';
import {
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import Image from 'react-native-remote-svg';
import CardView from 'react-native-cardview'
import PropTypes from 'prop-types';
import { imgHost } from '../../../config';
import styles from './styles';

const RNPropTypes = PropTypes || React.PropTypes;

class HotelItemView extends Component {
    static propTypes = {
        item: RNPropTypes.array,
        currencySign: RNPropTypes.object,
        locRate: RNPropTypes.number,
        gotoHotelDetailsPage: PropTypes.func.isRequired
    };

    static defaultProps = {
        item: [],
        currencySign: undefined,
        locRate: 0
    };

    constructor(props) {
        super(props);
        this.onFlatClick = this.onFlatClick.bind(this);
    }

    onFlatClick(item) {
        this.props.gotoHotelDetailsPage(item);
    }

    checkStars(count) {
        const indents = [];
        for (let i = 0; i < 5; i++) {
            if (count > 0) {
                indents.push(<Text style={{ color: '#a3c5c0' }}><FontAwesome>{Icons.star}</FontAwesome></Text>);
            } else {
                indents.push(<Text style={{ color: '#dddddd' }}><FontAwesome>{Icons.star}</FontAwesome></Text>);
            }
            count--;
        }
        return indents;
    }

    ratingTitle(count){
        if (count <= 1){
            return 'Poor'
        }
        else if (count > 1 && count <= 2){
            return 'Fair'
        }
        else if (count > 2 && count <= 3){
            return 'Good'
        }
        else if (count > 3 && count <= 4){
            return 'Very Good'
        }
        else if (count > 4 && count <= 5){
            return 'Excellent'
        }
    }

    render() {
        const {
            item, currencySign, locRate
        } = this.props;
        let urlThumbnail = Array.isArray(item.hotelPhoto) ? imgHost + item.hotelPhoto.url : imgHost + item.hotelPhoto;
        let stars = item.star;
        let isLoadingPricing = true;
        if (item.price != undefined && item.price != null) {
            isLoadingPricing = false;
        }
        return (
            <TouchableOpacity onPress={() => this.onFlatClick(item)}>
                <CardView 
                    style = {styles.card}
                    cardElevation = {0.5}
                    cardMaxElevation = {0.5}
                    cornerRadius = {0}>
                    <View style={styles.popularHotelsImage}>
                        <Image
                            source={{ uri: urlThumbnail }}
                            style={{flex:1}}
                        />
                    </View>

                    <TouchableOpacity style={styles.favoritesButton}>
                        <Image source={require('../../../assets/png/heart.png')} style={styles.favoriteIcon} />
                    </TouchableOpacity>

                    <View style={styles.cardContent}>

                        <Text style={styles.placeName} numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>

                        <View style={styles.aboutPlaceView}>
                            <Text style={styles.placeReviewText}>{this.ratingTitle(stars)}</Text>
                            <Text style={styles.placeReviewNumber}> {stars}/5 </Text>
                            <View style={styles.ratingIconsWrapper}>
                                {this.checkStars(stars)}
                            </View>
                            {/* <Text style={styles.totalReviews}> 73 Reviews </Text> */}
                        </View>

                        <View style={styles.costView}>
                            <Text style={styles.cost} numberOfLines={1} ellipsizeMode="tail">{currencySign}{item.price}</Text>
                            <Text style={styles.costLoc} numberOfLines={1} ellipsizeMode="tail"> (LOC {parseFloat(item.price/locRate).toFixed(2)}) </Text>
                            <Text style={styles.perNight}>per night</Text>
                        </View>
                    </View>
                </CardView>
            </TouchableOpacity>
        );
    }
}

export default HotelItemView;
