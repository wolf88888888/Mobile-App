import React, { Component } from 'react';
import { AsyncStorage, ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { getTopHomes } from '../../../utils/requester';
import DateAndGuestPicker from '../../organisms/DateAndGuestPicker';
import SearchBar from '../../molecules/SearchBar';
import SmallPropertyTile from '../../molecules/SmallPropertyTile';


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
        }
    }
    constructor(props) {
        super(props);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.state = {
            search: '',
            checkInDate: 'Thu, 25 Jan',
            checkOutDate: 'Sat, 27 Jan',
            guests: 0,
            topHomes: null
        };
    }

    componentDidMount() {
        getTopHomes().then((topHomes) => {
            const truncated = topHomes.content.slice(0, 4);
            this.setState({ topHomes: truncated });
        });
    }

    onChangeHandler(property) {
        return (value) => {
            this.setState({ [property]: value });
        };
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
            search, checkInDate, checkOutDate, guests, topHomes
        } = this.state;

        return (
            <View style={styles.container}>
                <View style={styles.searchAreaView}>
                    <SearchBar
                        autoCorrect={false}
                        value={search}
                        onChangeText={this.onChangeHandler('search')}
                        placeholder="Discover your next experience"
                        placeholderTextColor="#bdbdbd"
                        leftIcon="search"
                    />
                </View>

                <ScrollView showsHorizontalScrollIndicator={false} style={{ width: '100%' }}>
                    <DateAndGuestPicker checkInDate={checkInDate} checkOutDate={checkOutDate} guests={guests} />
                    { topHomes ? this.renderHomes() : null }
                </ScrollView>

                <TouchableOpacity onPress={() => {
                    AsyncStorage.getAllKeys().then(keys => AsyncStorage.multiRemove(keys));
                    this.props.navigation.navigate('Login');
                }}
                >
                    <Text style={styles.text}>Log Out</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default Explore;
