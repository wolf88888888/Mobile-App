/* eslint-disable */
import React, { Component } from 'react';
import { AsyncStorage, ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { getTopHomes } from '../../../utils/requester';
import DateAndGuestPicker from '../../organisms/DateAndGuestPicker';
import SearchBar from '../../molecules/SearchBar';
import SmallPropertyTile from '../../molecules/SmallPropertyTile';
import { withNavigation } from 'react-navigation';


// TODO: move styles in separate file
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#f0f1f3'
    },
    searchAreaView: {
        width: '100%',
        height: 105,
        backgroundColor: '#273842',
        paddingTop: 40,
        paddingLeft: 17,
        paddingRight: 17
    },
    sectionView: {
        width: '100%',
        paddingLeft: 17,
        paddingRight: 17
    },
    subtitleView: {
        width: '100%',
        paddingTop: 18,
        paddingBottom: 5,
        borderBottomWidth: 0.5,
        borderColor: '#d7d8d8'
    },
    subtitleText: {
        fontSize: 16,
        fontFamily: 'FuturaStd-Light'
    },
    tilesView: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    text: {
        color: '#000'
    }
});


class Explore extends Component {
    static propTypes = {
        navigation: PropTypes.shape({
            navigate: PropTypes.func
        })
    }

    static defaultProps = {
        navigation: {
            navigate: () => {}
        },
        search: '',
        checkInDate: '',
        checkOutDate: '',
        guests: 0,
        topHomes: [],
        onDatesSelect: () => {},
        onSearchChange: () => {}
    }
    constructor(props) {
        super(props);
        this.onSearchHandler = this.onSearchHandler.bind(this);
        this.onSearch = this.onSearch.bind(this);
    }

    componentDidMount() {
        getTopHomes().then((topHomes) => {
            const truncated = topHomes.content.slice(0, 4);
            this.setState({ topHomes: truncated });
        });
    }

    onSearchHandler(value) {
        this.props.onSearchChange(value);
    }

    onSearch() {
        this.props.navigation.navigate('EditUserProfile');
    }

    renderHomes() {
        return (
            <View style={styles.sectionView}>
                <View style={styles.subtitleView}>
                    <Text style={styles.subtitleText}>Popular Homes</Text>
                </View>

                <View style={styles.tilesView}>
                    { this.state.topHomes.map(listing => <SmallPropertyTile listingsType="homes" listing={listing} key={listing.id} />) }
                </View>
            </View>
        );
    }

    // TODO: a renderHotels method does not exist yet because backend does not yet have an endpoint to request popular hotels

    render() {
        const {
             search, checkInDate, checkOutDate, guests, topHomes, onDatesSelect
        } = this.props;

        return (
            <View style={styles.container}>
                <View style={styles.searchAreaView}>
                    <SearchBar
                        autoCorrect={false}
                        value={search}
                        onChangeText={this.onSearchHandler}
                        placeholder="Discover your next experience"
                        placeholderTextColor="#bdbdbd"
                        leftIcon="search"
                    />
                </View>

                <ScrollView showsHorizontalScrollIndicator={false} style={{ width: '100%' }}>
                    <DateAndGuestPicker
                        checkInDate={checkInDate}
                        checkOutDate={checkOutDate}
                        guests={guests}
                        onDatesSelect={onDatesSelect}
                        onSearch={this.onSearch}
                    />
                    { topHomes.length ? this.renderHomes() : null }
                </ScrollView>
            </View>
        );
    }
}

export default withNavigation(Explore);
