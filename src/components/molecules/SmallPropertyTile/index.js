import { AsyncStorage, Image, Text, View } from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import requester from '../../../initDependencies';
import styles from './styles';
import { toJS } from '../../../utils/toJS';

// TODO: Separate component from container in the new containers dir
// components dir should contain only stateless components
// connected should be kept in containers dir.
// Will disable eslint on this file due to required refactoring
/* eslint-disable */
class SmallPropertyTile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            property: null,
            currencyConversion: null
        };
    }

    async componentDidMount() {
        const property = await requester.getListing(this.props.listing.id).then(res => res.body);
        let currencyRates = await AsyncStorage.getItem('currencyRates');
        currencyRates = JSON.parse(currencyRates);
        const { currency } = this.props.paymentInfo;
        const currencyConversion = currencyRates[property.currencyCode][currency];
        // TODO: Try to avoid setState in componentDidMount
        this.setState({ property, currencyConversion }); // eslint-disable-line
    }

    renderReviewText() {
        const { averageRating } = this.state.property;

        // Determine summary word
        let summary = '';
        if (averageRating >= 4) summary = 'Excellent';
        else if (averageRating >= 3) summary = 'Average';
        else summary = 'Below Average';

        // Determine stars
        const stars = [];
        const fullStar = key => (
            <Text style={{ color: '#acc6c1', fontSize: 7 }} key={key}>
                <FontAwesome>{Icons.starO}</FontAwesome>
            </Text>
        );
        const emptyStar = key => (
            <Text style={{ color: '#d8d8d8', fontSize: 7 }} key={key}>
                <FontAwesome>{Icons.starO}</FontAwesome>
            </Text>
        );
        for (let i = 0; i < averageRating; i++) stars.push(fullStar(i));
        for (let i = 0; i < 5 - averageRating; i++) stars.push(emptyStar(5 - i));

        // Return components to render
        return (
            <Text style={styles.reviewText}>
                {`${summary} ${averageRating}/5 `}
                { stars }
            </Text>
        );
    }

    // TODO: show a spinner while property is still null
    render() {
        const { property, currencyConversion } = this.state;
        const { listingsType, listing, paymentInfo } = this.props;
        const {
            prices, currencyCode, getDailyPrice, pictures, averageRating, hotelPhotos, star
        } = listing;
        const { currencySign, locRate } = paymentInfo;

        let listingPrice;
        let photos;
        let rating;
        if (listingsType === 'homes') {
            // listingPrice = (prices) && props.paymentInfo.currency === currencyCode ? parseInt(defaultDailyPrice, 10).toFixed(2) : parseInt(prices[props.paymentInfo.currency], 10).toFixed(2);
            photos = JSON.parse(pictures);
            rating = averageRating;
        } else if (listingsType === 'hotels') {
            listingPrice = 0.0;
            photos = hotelPhotos.map(x => ({ thumbnail: `http://roomsxml.com${x.externalThumbnailUrl}` }));
            rating = star;
        }
        return (
            <View style={styles.container}>
                <View style={styles.favoriteView}>
                    <Text style={styles.favoriteText}><FontAwesome>{Icons.heartO}</FontAwesome></Text>
                </View>

                <Image
                    style={{ width: 165, height: 100 }}
                    source={{ uri: photos[0].thumbnail }}
                />
                { property ?
                    <View>
                        <Text numberOfLines={1} style={styles.locationText}>
                            {`${property.city.name.toUpperCase()} · ${property.country.name.toUpperCase()}`}
                        </Text>

                        <Text numberOfLines={1} style={styles.nameText}>{property.name}</Text>

                        { this.renderReviewText() }

                        { currencyConversion ? <Text style={styles.costText}>{ `${currencySign}${(property.defaultDailyPrice * currencyConversion).toFixed(2)} (LOC ${(property.defaultDailyPrice * currencyConversion * locRate).toFixed(2)}) per night` }</Text> : null }
                    </View>
                    : null
                }
            </View>
        );
    }
}

SmallPropertyTile.propTypes = {
    listing: PropTypes.object
};

export default connect(mapStateToProps)(toJS(SmallPropertyTile));

function mapStateToProps(state) {
    const { paymentInfo } = state;
    return {
        paymentInfo
    };
}
