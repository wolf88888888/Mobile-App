import React, { Component } from 'react';
import { connect } from 'react-redux';
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
import _ from 'lodash';
import styles from './styles';
import FastImage from 'react-native-fast-image'
import { RoomsXMLCurrency } from '../../../services/utilities/roomsXMLCurrency';
import LocPrice from '../../atoms/LocPrice'

const RNPropTypes = PropTypes || React.PropTypes;

class HomeItemView extends Component {
    static propTypes = {
        item: RNPropTypes.object,
        currencySign: RNPropTypes.string,
        currency: RNPropTypes.string,
        gotoHomeDetailPage: PropTypes.func.isRequired,        
        daysDifference: RNPropTypes.number,
    };

    static defaultProps = {
        item: [],
        currencySign: '',
        currency: '',
        daysDifference : 1,
    };

    constructor(props) {
        super(props);
    }

    onFlatClick = (item) => {
        this.props.gotoHomeDetailPage(item);
    }

    renderStars = (count) => {
        const indents = [];
        for (let i = 0; i < count; i ++) {
            indents.push(<Text key = {`star - ${i}`} style={{ color: '#a3c5c0' }}><FontAwesome>{Icons.star}</FontAwesome></Text>);
        }
        for (let i = count; i < 5; i ++) {
            indents.push(<Text key = {`star - ${i}`} style={{ color: '#dddddd' }}><FontAwesome>{Icons.star}</FontAwesome></Text>);
        }
        return indents;
    }

    ratingTitle = (count) => {
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
            item, currencySign, currency
        } = this.props;
        
        let urlThumbnail = "";
        if (item.pictures != null) {
            let pictures = JSON.parse(item.pictures);
    
            if (pictures.length > 0) {
                urlThumbnail = imgHost + pictures[0].thumbnail;
            }
        }

        let stars = item.averageRating;

        const price = item.prices && currency === item.currency_code ? parseFloat(item.defaultDailyPrice, 10).toFixed() : parseFloat(item.prices[currency], 10).toFixed(2);
        //let price = item.defaultDailyPrice / this.props.daysDifference;
        const priceInRoomsCurrency = item.prices && item.prices[RoomsXMLCurrency.get()];
        
        return (
            <TouchableOpacity onPress={() => this.onFlatClick(item)}>
                <CardView 
                    style = {styles.card}
                    cardElevation = {0.5}
                    cardMaxElevation = {0.5}
                    cornerRadius = {0}>
                    <View style={styles.popularHotelsImage}>
                        {
                            urlThumbnail != null && urlThumbnail != "" &&
                            <FastImage
                                style={{flex:1}}
                                source={{
                                    uri: urlThumbnail,
                                    priority: FastImage.priority.high,
                                }}
                                resizeMode={FastImage.resizeMode.cover}
                            />
                        }
                        <TouchableOpacity style={styles.favoritesButton}>
                            <Image source={require('../../../assets/png/heart.png')} style={styles.favoriteIcon} resizeMode='contain'/>
                        </TouchableOpacity>
                    </View>


                    <View style={styles.cardContent}>

                        <Text style={styles.placeName} numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>

                        <View style={styles.aboutPlaceView}>
                            {/* <Text style={styles.placeReviewText}>{this.ratingTitle(stars)}</Text> */}
                            <Text style={styles.placeReviewNumber}> {stars}/5 </Text>
                            <View style={styles.ratingIconsWrapper}>
                                {this.renderStars(stars)}
                            </View>
                            {/* <Text style={styles.totalReviews}> 73 Reviews </Text> */}
                        </View>

                        <View style={styles.costView}>
                            <Text style={styles.cost} numberOfLines={1} ellipsizeMode="tail">{currencySign}{parseFloat(price).toFixed(2)}</Text>
                            {/* <Text style={styles.costLoc} numberOfLines={1} ellipsizeMode="tail"> (LOC {parseFloat(price/locRate).toFixed(2)}) </Text> */}
                            <LocPrice style= {styles.costLoc} fiat={priceInRoomsCurrency}/>
                            <Text style={styles.perNight}>per night</Text>
                        </View>
                    </View>
                </CardView>
            </TouchableOpacity>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        currency: state.currency.currency,
        currencySign: state.currency.currencySign,
    };
}

export default connect(mapStateToProps, null)(HomeItemView);
