import { AsyncStorage, Image, Picker, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { Component } from 'react';

import Stomp from 'stompjs';
import { withNavigation } from 'react-navigation';

var utf8 = require('utf8');
var binaryToBase64 = require('binaryToBase64');
var base64 = require('base-64');

class StompTest extends Component{

    state = {
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
        regionId: '',
        currency: '',
        checkInDateFormated: '',
        checkOutDateFormated: '',
        roomsDummyData: [],
        urlForService:'',
        isLoading: true,
        noResultsFound: false,
        locRate: 0,
        currencyIcon : ''
    };

    constructor(props) {
        super(props);
        this.sendMessage = this.sendMessage.bind(this);

        const { params } = this.props.navigation.state;
        this.state.searchedCity = params ? params.searchedCity : '';
        this.state.searchedCityId = params ? params.searchedCityId : 0;
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

        this.state.urlForService = 'region='+this.state.regionId+'&currency='+this.state.currency+'&startDate='+this.state.checkInDateFormated+'&endDate='+this.state.checkOutDateFormated+'&rooms='+this.state.roomsDummyData;

        console.log(this.state.urlForService);
    }

    componentWillMount() {
        this.initStomp();
    }

    initStomp() {
        const uuid = 'ca7cd91e-79f8-11e8-adc0-fa7ae01bbebc';
        
        const login = null;
        const passcode = null;
        const receiveDestination = 'region=52612&currency=EUR&startDate=28/06/2018&endDate=29/06/2018&rooms=%5B%7B%22adults%22:2,%22children%22:%5B%5D%7D%5D' + uuid;
        const url = 'ws://159.89.8.109:61614';
        const client = Stomp.client(url);
        this.client = client;
        client.connect({}, function (frame) {
          console.log("connected to Stomp");
        //   client.subscribe(receiveDestination, function (message) {
        //     console.log(message);
        //     if(JSON.parse(message.body).allElements){
        //       console.log("ALL ELEMENTS");
        //       client.disconnect();
        //     }
        //   });
        }, (error) => {
            console.log('Error');
        });
    }

    sendMessage() {
        console.log("Sending message");
        const uuid = 'ca7cd91e-79f8-11e8-adc0-fa7ae01bbebc';
        let query = this.state.urlForService;
        const msg = {
            query: query,
            uuid: uuid
          };
    
        //const msg = JSON.stringify(msgObject);
    
        //const sendDestination = `/app/all/${uuid}${base64.encode(utf8.encode(query))}`;
        const sendDestination = `search`;
        
        const headers = {
          'content-length': false
        };
        this.client.send(`search`, {}, JSON.stringify(msg));
      }

    render(){
        return(
            <View style={{flex:1,flexDirection: 'column', justifyContent:'center', alignItems:'center'}}>
                <TouchableOpacity onPress={() => this.sendMessage()}><Text>Send Message</Text></TouchableOpacity>
            </View>
        );
    }
}

export default withNavigation(StompTest);