import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import { apiHost, imgHost } from '../../../config';

import PropTypes from 'prop-types';
import React from 'react';
import SearchBar from '../../molecules/SearchBar';
import requester from '../../../initDependencies';
import styles from './styles';
import { withNavigation } from 'react-navigation';

class PropertyList extends React.Component {
    state = {
        countryId: 0,
        countryName: '',
        startDate: undefined,
        endDate: undefined,
        guests: 2,
        page: 1,
        homes: [],
        isLoading: false,
        status: 'on',
        json: "loading",
        urlForHomes: '',
        locRate: 0,
        currencyIcon: '',
        currency: "EUR",
    };

    static propTypes = {
        navigation: PropTypes.shape({
            navigate: PropTypes.func
        })
    }

    static defaultProps = {
        navigation: {
            navigate: () => { }
        }
    }

    constructor(props) {
        super(props);
        const { params } = this.props.navigation.state;
        this.state.countryId = params ? params.countryId : '';
        this.state.countryName = params ? params.countryName : '';
        this.state.startDate = params ? params.startDate : '';
        this.state.endDate = params ? params.endDate : '';
        this.state.guests = params ? params.guests : 2;
        this.state.locRate = params ? params.locRate : 0;
        this.state.currencyIcon = params ? params.currencyIcon : Icons.euro;
        this.state.currency = params ? params.currency : 'EUR';

        let urlForHomes = [];
        urlForHomes.push(`countryId=${params.countryId}`, `startDate=${params.startDate}`, `endDate=${params.endDate}`, `guests=${params.guests}`, 'priceMin=0', 'priceMax=5000')
        this.state.urlForHomes = urlForHomes;
    }

    loadHomes = () => {
        const { homes, page } = this.state;
        //const searchTerms = "countryId=1&startDate=23/06/2018&endDate=24/06/2018&guests=2&priceMin=0&priceMax=5000";
        this.setState({ isLoading: true });
        requester.getListingsByFilter(this.state.urlForHomes).then(res => {
            res.body.then(data => {
                this.setState({
                    homes: data.filteredListings.content,
                    isLoading: false,
                });
            });
        }).catch(err => {
            this.setState({ isLoading: false, json: err.message });
        });
    };

    componentDidMount() {
        this.loadHomes();
    }

    onBackPress() {
        this.props.navigation.goBack();
    }

    renderLoader() {
        return (
            <View style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                marginBottom: 10
            }}>
                <Image style={{ height: 35, width: 35 }} source={{ uri: 'https://beta.locktrip.com/images/loader.gif' }} />
            </View>
        );
    }

    renderCurrency(eur, usd, gbp) {
        if (this.state.currency == "EUR") {
            return (
                <Text style={styles.cost} numberOfLines={1} ellipsizeMode="tail"><FontAwesome>{Icons.euro}</FontAwesome> EUR {eur} LOC {parseFloat(eur / this.state.locRate).toFixed(2)} </Text>
            );
        }
        else if (this.state.currency == "USD") {
            return (
                <Text style={styles.cost} numberOfLines={1} ellipsizeMode="tail"><FontAwesome>{Icons.usd}</FontAwesome> USD {usd} LOC {parseFloat(usd / this.state.locRate).toFixed(2)} </Text>
            );
        }
        else if (this.state.currency == "GBP") {
            return (
                <Text style={styles.cost} numberOfLines={1} ellipsizeMode="tail"><FontAwesome>{Icons.gbp}</FontAwesome> GBP {gbp} LOC {parseFloat(gbp / this.state.locRate).toFixed(2)} </Text>
            );
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => this.onBackPress()} style={styles.backButton}>
                    <Image style={styles.btn_backImage} source={require('../../../../src/assets/png/arrow-back.png')} />
                </TouchableOpacity>

                <View style={styles.searchAreaView}>
                    <SearchBar
                        autoCorrect={false}
                        value={this.state.search}
                        onChangeText={this.onSearchHandler}
                        placeholder={`${this.state.countryName} . Homes`}
                        placeholderTextColor="#000"
                        leftIcon="search"
                        onLeftPress={this.gotoSearch}
                    />
                    {this.state.isLoading && this.renderLoader()}
                </View>
                <FlatList style={styles.flatList}
                    data={this.state.homes}
                    renderItem={
                        ({ item }) =>
                            <TouchableOpacity>
                                <View style={styles.card}>
                                    <Image
                                        source={{ uri: imgHost + JSON.parse(item.pictures)[0].thumbnail }}
                                        style={styles.popularHotelsImage} />
                                    <TouchableOpacity style={styles.favoritesButton}>
                                        <Image source={require('../../../assets/png/heart.png')} style={styles.favoriteIcon} />
                                    </TouchableOpacity>
                                    <View style={styles.cardContent}>
                                        <Text style={styles.placeName} numberOfLines={10} ellipsizeMode="tail">{item.name}</Text>
                                        <View style={styles.aboutPlaceView}>
                                            <Text style={styles.placeReviewText}>Excellent</Text>
                                            <Text style={styles.placeReviewNumber}>{item.averageRating}/5 </Text>
                                            <View style={styles.ratingIconsWrapper}>
                                                <Image source={require('../../../assets/png/empty-star.png')} style={styles.star} />
                                                <Image source={require('../../../assets/png/empty-star.png')} style={styles.star} />
                                                <Image source={require('../../../assets/png/empty-star.png')} style={styles.star} />
                                                <Image source={require('../../../assets/png/empty-star.png')} style={styles.star} />
                                                <Image source={require('../../../assets/png/empty-star.png')} style={styles.star} />
                                            </View>
                                            <Text style={styles.totalReviews}>73 Reviews</Text>
                                        </View>
                                        <View style={styles.costView}>
                                            {this.renderCurrency(parseFloat(item.prices.EUR).toFixed(2), parseFloat(item.prices.USD).toFixed(2), parseFloat(item.prices.GBP).toFixed(2))}
                                            <Text style={styles.perNight}>per night</Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                    }
                />
                {/* 
                <Text style={{fontSize: 36}}>{this.state.status}</Text> */}
            </View>
        );
    }
}

export default withNavigation(PropertyList);