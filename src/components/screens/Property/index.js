import { BackHandler, Platform, ScrollView, Text, TouchableOpacity, View, WebView } from 'react-native';
import { Icons } from 'react-native-fontawesome';
import React, { Component } from 'react';

import BackButton from '../../atoms/BackButton';
import Image from 'react-native-remote-svg';
import PropTypes from 'prop-types';
import SmallPropertyTile from '../../molecules/SmallPropertyTile';
import UUIDGenerator from 'react-native-uuid-generator';
import requester from '../../../initDependencies';
import styles from './styles';
import { withNavigation } from 'react-navigation';

var clientRef = '';
var utf8 = require('utf8');
var binaryToBase64 = require('binaryToBase64');
let uid = '';
let baseHomeUrl = 'https://beta.locktrip.com/homes/listings/?'
let baseHotelUrl = 'https://beta.locktrip.com/mobile/search?'

class Property extends Component {
    webViewRef = {
        canGoBack: false,
        ref: null,
    };
    static propTypes = {
        navigation: PropTypes.shape({
            navigate: PropTypes.func
        }),
        search: PropTypes.string,
        checkInDate: PropTypes.string,
        checkOutDate: PropTypes.string,
        topHomes: PropTypes.array, // eslint-disable-line
        onDatesSelect: PropTypes.func,
        onSearchChange: PropTypes.func,
        onAutocompleteSelect: PropTypes.func,
        autocomplete: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string
        })),
        load: PropTypes.func,
        propertyType: PropTypes.oneOf('hotels', 'homes'),
        searchedCity: PropTypes.string,
        searchedCityId: PropTypes.number,
        guests : PropTypes.number
    }

    static defaultProps = {
        navigation: {
            navigate: () => {}
        },
        load: () => {},
        search: '',
        checkInDate: '',
        checkOutDate: '',
        autocomplete: [],
        onAutocompleteSelect: () => {},
        topHomes: [],
        propertyType: 'homes',
        onDatesSelect: () => {},
        onSearchChange: () => {},
        searchedCity: 'Discover your next experience',
        searchedCityId: 0,
        guests : 0
    }

    constructor(props) {
        super(props);

        UUIDGenerator.getRandomUUID((uuid) => {
            uid = uuid;
        }); 
        console.disableYellowBox = true;
        this.handleReceiveSingleHotel = this.handleReceiveSingleHotel.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.updateData = this.updateData.bind(this);
        this.gotoGuests = this.gotoGuests.bind(this);
        this.gotoSettings = this.gotoSettings.bind(this);
        this.gotoSearch = this.gotoSearch.bind(this);
        this.renderAutocomplete = this.renderAutocomplete.bind(this);
        this.handleAutocompleteSelect = this.handleAutocompleteSelect.bind(this);
        this.onDatesSelect = this.onDatesSelect.bind(this);
        this.onSearchHandler = this.onSearchHandler.bind(this);
        this.generateSearchUrl = this.generateSearchUrl.bind(this);
        this.state = {
            search: '',
            checkInDate: '',
            checkOutDate: '',
            guests: 0,
            adults: 2,
            childrenBool: false,
            children: 1,
            infants: 0,
            topHomes: [],
            listings : [],
            listings2 : [],
            searchedCity: 'Discover your next experience',
            searchedCityId: 0,
            //these state are for paramerters in urlForService
            countryId: 0,
            regionId: '',
            currency: '',
            checkInDateFormated: '',
            checkOutDateFormated: '',
            roomsDummyData: [],
            urlForService:'',
            isLoading: true,
            noResultsFound: false,
            locRate: 0,
            currencyIcon : '',
            isHotelSelected: false,
            webViewUrl: '',
            isLoading: true,
            isAvailable: false,
            email:'',
            token:''
        };
        const { params } = this.props.navigation.state;
        this.state.searchedCity = params ? params.searchedCity : '';
        this.state.searchedCityId = params ? params.searchedCityId : 0;
        this.state.checkInDate = params ? params.checkInDate : '';
        this.state.checkOutDate = params ? params.checkOutDate : '';
        this.state.guests = params ? params.guests : 0;
        this.state.children = params ? params.children : 0;

        this.state.isHotelSelected = params? params.isHotelSelected : false;
        this.state.countryId = params ? params.countryId : 0;
        this.state.regionId = params ? params.regionId : 0;
        this.state.currency = params ? params.currency : 'USD';
        this.state.checkInDateFormated = params ? params.checkInDateFormated  : '';
        this.state.checkOutDateFormated = params ? params.checkOutDateFormated  : '';
        this.state.roomsDummyData = params ? params.roomsDummyData : [];
        this.state.locRate = params ? params.locRate : 0;
        this.state.currencyIcon = params ? params.currencyIcon: Icons.euro;
        this.state.email = params? params.email : '';
        this.state.token = params? params.token : '';
      
        this.state.urlForService = 'region='+this.state.regionId+'&currency='+this.state.currency+'&startDate='+this.state.checkInDateFormated+'&endDate='+this.state.checkOutDateFormated+'&rooms='+this.state.roomsDummyData;
        
        this.generateSearchUrl()

        console.log('Received Params', params)
    }

    componentWillMount(){
        if (Platform.OS === 'android') {
            BackHandler.addEventListener('hardwareBackPress', this.onAndroidBackPress);
        }
    }

    componentWillUnmount() {
        if (Platform.OS === 'android') {
            BackHandler.removeEventListener('hardwareBackPress');
        }
    }

    componentDidMount() {
        requester.getTopListings().then(res => {
            res.body.then(data => {
                const truncated = data.content.slice(0, 4);
                this.setState({ topHomes: truncated });
            });
        });
    }

    onChangeHandler(property) {
        return (value) => {
            this.setState({ [property]: value });
        };
    }

    onDatesSelect({ startDate, endDate }){
        this.setState({
            search : 'fuck',
            checkInDate : startDate,
            checkOutDate : endDate,
        });
    }

    onSearchHandler(value) {
        this.onSearchChange(value);
    }

    onSearchChange(value){
        setSearchValue({ value });
        clearSelected();
        requester.getRegionsBySearchParameter(value).then(res => {
            res.body.then(data => {
                setSearchRegions(data);
                setAutocomplete(value);
            });
        });
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

    updateData(data) {
        this.setState({ adults: data.adults, children: data.children, infants: data.infants});
    }

    gotoGuests() {
        if (clientRef) {
            clientRef.disconnect();
        }
        this.props.navigation.navigate('GuestsScreen', {adults: this.state.adults, children: this.state.children, infants: this.state.infants, updateData:this.updateData, childrenBool: this.state.childrenBool});
    }

    gotoSettings() {
        if (clientRef) {
            clientRef.disconnect();
        }
        this.props.navigation.navigate('FilterScreen');
    }

    gotoSearch() {
        if (clientRef) {
            clientRef.disconnect();
        }
      this.props.navigation.navigate('PropertyScreen');
    }

    handleAutocompleteSelect(id, name) {
        return () => {
            this.props.onAutocompleteSelect(id, name);
        };
    }

    onBackPress(){
        console.log('app back button pressed.');
        this.props.navigation.goBack();
    }
    
    gotoHotelDetailsPage = (item) =>{
        if (clientRef) {
            clientRef.disconnect();
        }
        this.props.navigation.navigate('HotelDetails', {guests : this.state.guests, hotelDetail: item, urlForService: this.state.urlForService, locRate: this.state.locRate, currencyIcon: this.state.currencyIcon});
    }

    renderAutocomplete() {
        return (
            <ScrollView
                contentContainerStyle={{ flex: 1 }}
            >
                {
                    this.props.autocomplete.map(result => (
                        <TouchableOpacity
                            key={result.id}
                            style={styles.autocompleteTextWrapper}
                            onPress={this.handleAutocompleteSelect(result.id, result.name)}
                        >
                            <Text style={styles.autocompleteText} >{result.name}</Text>
                        </TouchableOpacity>
                    ))
                }
            </ScrollView>
        );
    }

    renderLoader(){
        return(
            <View style={{ flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                marginBottom: 10}}>
                <Image style={{height:35, width: 35}} source={{uri: 'https://beta.locktrip.com/images/loader.gif'}} /> 
            </View>
        );
    }

    renderInfoTv(){
        return(
            <View style={{ flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                marginBottom: 10}}>
                <Text style={{width: '100%', height: 35, fontSize: 20, textAlign: 'center'}}>No Results Found</Text>
            </View>
        );
    }

    renderLog(){
        return(
            <View style={{ flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                marginBottom: 10}}>
                
            </View>
        );
    }

    generateSearchUrl(){
        var paramUrl = ''
        if ( !this.state.isHotelSelected ) {
            paramUrl = baseHomeUrl
            paramUrl += 'countryId=' + this.state.countryId
                     + '&startDate=' + this.state.checkInDateFormated
                     + '&endDate=' + this.state.checkOutDateFormated
                     + '&guests=' + this.state.guests
                     + '&priceMin=1&priceMax=5000'
                     + '&currency=' + this.state.currency
        } else {
            paramUrl = baseHotelUrl
            this.state.urlForService = 'region='+this.state.regionId+'&currency='+this.state.currency+'&startDate='+this.state.checkInDateFormated+'&endDate='+this.state.checkOutDateFormated+'&rooms='+this.state.roomsDummyData
            paramUrl += this.state.urlForService
        }
        paramUrl += '&authEmail=' + this.state.email + '&authToken=' + this.state.token.replace(' ', '%20')
        this.state.webViewUrl = paramUrl

        console.log("Propery - generateSearchUrl", paramUrl);
    }

    onAndroidBackPress = () => {
        if (this.webViewRef.canGoBack && this.webViewRef.ref) {
            console.log('android backbutton pressed in webview.....');
            this.webViewRef.ref.goBack();
            return true;
        }
        return false;
    }

    render() {
        const {
            adults, children, infants, search, checkInDate, checkOutDate, guests, topHomes, onDatesSelect, searchedCity, checkInDateFormated, checkOutDateFormated, roomsDummyData
        } = this.state;
        const { params } = this.props.navigation.state;
        let jsCode = `
            document.querySelector('.filter-box').style.display = 'none',
            document.querySelector('#footer').style.display = 'none',
            document.querySelector('#main-nav').style.display = 'none'
            document.querySelector('.hotel-info').style.width = '100%'
            document.querySelector('.hotel-chekin').style.width = '100%';
        `;
        const { navigate, goBack } = this.props.navigation;
        const { isLoading, isAvailable, email, token, urlForService } = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.titleConatiner}>
                    <BackButton style={styles.closeButton} onPress={() => this.onBackPress()}/>
                    <Text style={styles.btn_backText}>Modify Search</Text>
                </View>
                {/* <TouchableOpacity onPress={() => this.onBackPress()} style={styles.backButton}>
                    <Image style={styles.btn_backImage} source={require('../../../../src/assets/png/arrow-back.png')} />
                    <Text style={styles.btn_backText}>Modify Search</Text>
                </TouchableOpacity> */}
                <WebView
                    ref={(webViewRef) => { this.webViewRef.ref = webViewRef; }}
                    onNavigationStateChange={(navState) => { this.webViewRef.canGoBack = navState.canGoBack; }}
                    style = {styles.webView}
                    source = {{ 
                        uri: this.state.webViewUrl
                    }}
                    // injectedJavaScript={jsCode}
                    // javaScriptEnabled={true}
                />
            </View>
        );
    }

    //Search logic
    handleReceiveSingleHotel(response) {
        console.log('4');
        if (response.hasOwnProperty('allElements')) { 
            this.setState({
                isLoading: false,
            });        
            if(this.state.listings.length > 0){
                this.setState({
                    listings2 : this.state.listings,
                });
            }
            if(response.totalElements == 0){
                this.setState({noResultsFound: true})
            }
        } else { 
            this.setState(prevState => ({
                listings: [...prevState.listings, response]
              }));
        }
      }

      disconnected(){
        this.setState({
            isLoading: false,
            listings2 : this.state.listings,
        });
        if(clientRef){
            clientRef.disconnect();
        }
      }

      sendInitialWebsocketRequest() {
          console.log('1');
        let query = this.state.urlForService;
        const msg = {
          query: query,
          uuid: uid
        };
        this.setState({
            isLoading: true,
        });  
        if (clientRef) {
            console.log('2');
            clientRef.sendMessage(`/app/all/${uid}${binaryToBase64(utf8.encode(query))}`, JSON.stringify(msg));
        }
        else{
            console.log('3');
             //client ref is empty
        }
      }
}

function SeparatorDot(props) {
    return (
        <View style={{height: props.height, width: props.width, alignItems: 'center', justifyContent: 'center'}}>
            <View style={{height: 3, width: 3, backgroundColor: '#000', borderRadius: 1.5}}></View>
        </View>
    )
}


export default withNavigation(Property);
