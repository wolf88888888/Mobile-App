import { BackHandler, Platform, Text, View, WebView } from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import BackButton from '../../atoms/BackButton';
import UUIDGenerator from 'react-native-uuid-generator';
import styles from './styles';

import { basePath } from '../../../config'

let baseHomeUrl = basePath + 'homes/listings/?'
let baseHotelUrl = basePath + 'mobile/hotels/listings?'

class Property extends Component {
    webViewRef = {
        canGoBack: false,
        ref: null,
    };

    constructor(props) {
        super(props);

        UUIDGenerator.getRandomUUID((uuid) => {
            uid = uuid;
        }); 
        console.disableYellowBox = true;
        this.state = {
            guests: 0,
            //these state are for paramerters in urlForService
            countryId: 0,
            regionId: '',
            checkInDateFormated: '',
            checkOutDateFormated: '',
            roomsDummyData: [],
            urlForService:'',
            isHotelSelected: false,
            webViewUrl: '',
            email:'',
            token:''
        };
        const { params } = this.props.navigation.state;
        this.state.guests = params ? params.guests : 0;

        this.state.isHotelSelected = params? params.isHotelSelected : false;
        this.state.countryId = params ? params.countryId : 0;
        this.state.regionId = params ? params.regionId : 0;
        this.state.checkInDateFormated = params ? params.checkInDateFormated  : '';
        this.state.checkOutDateFormated = params ? params.checkOutDateFormated  : '';
        this.state.roomsDummyData = params ? params.roomsDummyData : [];
        this.state.email = params? params.email : '';
        this.state.token = params? params.token : '';
      
        this.state.urlForService = 'region='+this.state.regionId+'&currency='+this.props.currency+'&startDate='+this.state.checkInDateFormated+'&endDate='+this.state.checkOutDateFormated+'&rooms='+this.state.roomsDummyData;
        
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

    onBackPress(){
        console.log('app back button pressed.');
        this.props.navigation.goBack();
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
                     + '&currency=' + this.props.currency
        } else {
            paramUrl = baseHotelUrl
            this.state.urlForService = 'region='+this.state.regionId+'&currency='+this.props.currency+'&startDate='+this.state.checkInDateFormated+'&endDate='+this.state.checkOutDateFormated+'&rooms='+this.state.roomsDummyData
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
        return (
            <View style={styles.container}>
                <View style={styles.titleConatiner}>
                    <BackButton style={styles.closeButton} onPress={() => this.onBackPress()}/>
                    <Text style={styles.btn_backText}>Modify Search</Text>
                </View>
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
}

let mapStateToProps = (state) => {
    return {
        currency: state.currency.currency
    };
}
export default connect(mapStateToProps, null)(Property);
