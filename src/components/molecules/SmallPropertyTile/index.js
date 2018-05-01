import React, { Component } from 'react';
import { AsyncStorage, Image, StyleSheet, Text, View } from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPropertyById } from '../../../utils/requester';


// TODO: move styles in separate file
const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: 180,
        width: 165,
        marginTop: 12,
        backgroundColor: '#ffffff'
    },
    favoriteView: {
        position: 'absolute',
        top: 0,
        right: 0,
        padding: 6,
        zIndex: 1
    },
    favoriteText: {
        color: '#fff',
        fontSize: 18
    },
    locationText: {
        fontSize: 8.5,
        fontFamily: 'FuturaStd-Light',
        padding: 5,
        paddingBottom: 0
    },
    nameText: {
        fontSize: 15.5,
        fontFamily: 'FuturaStd-Light',
        padding: 5,
        paddingBottom: 0
    },
    reviewText: {
        fontSize: 9,
        fontFamily: 'FuturaStd-Light',
        padding: 5,
        paddingTop: 0
    },
    costText: {
        fontSize: 10.5,
        fontFamily: 'FuturaStd-Light',
        padding: 5
    }
});

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
        const property = await getPropertyById(this.props.listing.id);
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

export default connect(mapStateToProps)(SmallPropertyTile);

function mapStateToProps(state) {
    const { paymentInfo } = state;
    return {
        paymentInfo
    };
}
