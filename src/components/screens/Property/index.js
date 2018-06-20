import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
    FlatList,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    WebView,
    AsyncStorage
} from 'react-native';
import { withNavigation } from 'react-navigation';
import Image from 'react-native-remote-svg';
import BackButton from '../../atoms/BackButton';
import LoadingView from '../../atoms/LoadingView';
import { PUBLIC_URL, apiHost, imgHost, domainPrefix } from '../../../config';
import { getUserInfo } from '../../../utils/requester';
import styles from './styles';

class Property extends Component {
    static propTypes = {
        navigation: PropTypes.shape({
            navigate: PropTypes.func
        }),
    }

    static defaultProps = {
        navigation: {
            navigate: () => {}
        },
    }

    constructor(props) {
        super(props);
        this.onLoad = this.onLoad.bind(this);
        this.onLoadStart = this.onLoadStart.bind(this);
        this.onLoadEnd = this.onLoadEnd.bind(this);
        this.state = {
            searchedCity: 'Discover your next experience',
            checkInDate: '',
            checkOutDate: '',
            guests: 0,
            adults: 2,
            childrenBool: false,
            children: 0,
            infants: 0,
            //these state are for paramerters in urlForService
            regionId: '',
            currency: '',
            checkInDateFormated: '',
            checkOutDateFormated: '',
            roomsDummyData: [],
            urlForService:'',
            locRate: 0,
            currencyIcon : '',
            isLoading: true,
            isAvailable: false,
            email:'',
            token:''
        };

        const { params } = this.props.navigation.state;
        this.state.searchedCity = params ? params.searchedCity : '';
        this.state.checkInDate = params ? params.checkInDate : '';
        this.state.checkOutDate = params ? params.checkOutDate : '';
        this.state.guests = params ? params.guests : 0;
        this.state.children = params ? params.children : 0;

        this.state.regionId = params ? params.regionId : [];
        this.state.currency = params ? params.currency : [];
        this.state.checkInDateFormated = params ? params.checkInDateFormated  : '';
        this.state.checkOutDateFormated = params ? params.checkOutDateFormated  : '';
        this.state.roomsDummyData = params ? params.roomsDummyData : [];
        this.state.locRate = params ? params.locRate : 0;
        this.state.currencyIcon = params ? params.currencyIcon: Icons.euro;

        //this.state.urlForService = PUBLIC_URL + 'hotels/listings?' + 'region='+this.state.regionId+'&currency='+this.state.currency+'&startDate='+this.state.checkInDateFormated+'&endDate='+this.state.checkOutDateFormated+'&rooms='+this.state.roomsDummyData;
        this.state.urlForService = 'https://Google.com';//'https://alpha.locktrip.com/mobile/search?' + 'region='+this.state.regionId+'&currency='+this.state.currency+'&startDate='+this.state.checkInDateFormated+'&endDate='+this.state.checkOutDateFormated +'&rooms='+this.state.roomsDummyData;
        // this.state.urlForService = 'https://alpha.locktrip.com/mobile/hotels/listings?region=52612&currency=GBP&startDate=20/06/2018&endDate=21/06/2018&&rooms=%5B%7B"adults":2,"children":%5B%5D%7D%5D';
    }

    componentWillMount(){
    }

    async componentDidMount() {
        const token = await AsyncStorage.getItem(`${domainPrefix}.auth.lockchain`);
        const email = await AsyncStorage.getItem(`${domainPrefix}.auth.username`);
        console.log("token: " + token);
        console.log("email: " + email);
        const authToken = encodeURI(token);

        this.state.urlForService = 'https://alpha.locktrip.com/mobile/search?'
            + 'region='+this.state.regionId+'&currency='+this.state.currency
            +'&startDate='+this.state.checkInDateFormated+'&endDate='+this.state.checkOutDateFormated
            +'&rooms='+this.state.roomsDummyData
            +'&authEmail='+email+'&authToken='+authToken;

        this.setState({isAvailable: true, email: email, token:authToken});
    }

    onLoad(data) {
        // alert('load fired');
        console.log('On load fired!');
    }

    onLoadStart(data) {
        // alert('onLoadStart');
        console.log('onLoadStart!');
    }

    onLoadEnd(data) {
        // alert('onLoadEnd');
        console.log('onLoadEnd!');
        this.setState({isLoading: false});
    }

    renderLoading() {
        return (
            <LoadingView
                style={styles.loading}/>
        );
    }

    renderWebview() {
    const { urlForService} = this.state;
        return(
            <WebView
                source={{uri: urlForService}}
                style={styles.webview}
                onLoad={this.onLoad}
                onLoadStart={this.onLoadStart}
                onLoadEnd={this.onLoadEnd}/>
        );
    }

    render() {
        const { navigate, goBack } = this.props.navigation;
        const { isLoading, isAvailable, email, token, urlForService } = this.state;
        return (
            <View style={styles.container}>
                <BackButton onPress={() => goBack()}/>
                {isAvailable && this.renderWebview()}
                {isLoading && this.renderLoading()}
            </View>
        );
    }
}
export default withNavigation(Property);
