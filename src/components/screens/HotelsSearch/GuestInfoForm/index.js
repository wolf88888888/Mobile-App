import React, {Component} from 'react';
import {View, Text, TouchableOpacity, ScrollView, TextInput, FlatList, KeyboardAvoidingView} from 'react-native';
import Image from 'react-native-remote-svg';
import GuestFormRow from './GuestFormRow';
import styles from './styles';
import PropTypes from 'prop-types';
import Toast from 'react-native-easy-toast';
import { hasLetter } from '../../../../utils/validation';
import { userInstance } from '../../../../utils/userInstance';
import HotelDetailBottomBar from '../../../atoms/HotelDetailBottomBar'
import { imgHost } from '../../../../config'

let guestInfos = [];
var newElement = {};

class GuestInfoForm extends Component {
    constructor(props) {
        super(props);
        // Save guests array for dynamic form generation
        this.state = {
            isLoading: true,
            guests : [],
            guest: {
                title: 'Mr',
                firstName: '',
                lastName: ''
            },
            guestRecord : {},
            testGuestArray : [{}]
        };
    }
    // async componentDidMount(){
    //     console.disableYellowBox = true
    //     console.log("componentDidMount", this.state.guests);
    // }

    async componentWillMount() {
        console.log("GuestInfoForm componentWillMount", this.props.navigation.state.params.guests);
        let firstName = await userInstance.getFirstName();
        let lastName = await userInstance.getLastName();

        var guests = [];
        for (var i = 0; i < this.props.navigation.state.params.guests; i++){
            if (i == 0) {
                guests.push({
                    key: i,
                    genderRepresentation: 'Mr',
                    firstName: firstName,
                    lastName: lastName
                    }
                );

                this.handleFirstName(i, firstName == null ? '' : firstName);
                this.handleLastName(i, lastName == null ? '' : lastName);
            }
            else {
                guests.push({
                    key: i,
                    genderRepresentation: 'Mr',
                    firstName: '',
                    lastName: ''
                    }
                );
                this.handleFirstName(i, "Optional");
                this.handleLastName(i, "Optional");
            }
        }
        
        this.setState({guests: guests, isLoading: false});
    }

    handleFirstName(key,text){
        console.log('firstName----', key, text);

        if (text === "") {
            text = "Optional"
        }
        newElement = {};
        newElement['title'] = 'Mr';
        newElement['firstName'] = text;
        guestInfos[key] = newElement;
    }

    handleLastName(key,text){
        console.log('lastName----', key, text);
        if (text === "") {
            text = "Optional"
        }
        newElement['lastName'] = text;
        guestInfos[key] = newElement;
    }

    guestInfo(index, isFirstName, isLastName){
        if(isFirstName){
            this.state.guestRecord[index].firstName = this.state.guest.firstName;
            this.setState(
                {
                    guestRecord : this.state.guestRecord
                }
            );
        }
        else{
        }
    }
    
    onProceedPress = () => {
        if (this.state.isLoading) {
            return;
        }
        const {params} = this.props.navigation.state;
        var isValid = true;
        for (var i = 0; i < guestInfos.length; i ++) {
            isValid = hasLetter(guestInfos[i]['firstName']);
             if (!isValid) {
                 break;
             }
             isValid = hasLetter(guestInfos[i]['lastName']);
             if (!isValid) {
                 break;
             }
        }
        if (guestInfos.length != this.state.guests.length){
            this.refs.toast.show("Please enter details for all the guests", 2000);
        }
        else if (!isValid) {
            this.refs.toast.show("Names should be at least 1 characters long and contain only characters.", 2000);
        }
        else {
            this.props.navigation.navigate('RoomDetailsReview', {
                roomDetails : params.roomDetail, 
                quoteId: params.roomDetail.quoteId, 
                hotelDetails: params.hotelDetails, 
                price: params.price, 
                daysDifference: params.daysDifference,
                guests: guestInfos.length,
                guestRecord: guestInfos,
                searchString: params.searchString,
                hotelImg: params.hotelImg
            });
        }
        
    }

    render() {
        const {params} = this.props.navigation.state
        console.log("GuestInfoForm", params);
        const imgURL = params.hotelImg;
        return (
            <View style={styles.container}>
                <Toast
                    ref="toast"
                    style={{ backgroundColor: '#DA7B61' }}
                    position='bottom'
                    positionValue={150}
                    fadeInDuration={500}
                    fadeOutDuration={500}
                    opacity={1.0}
                    textStyle={{ color: 'white', fontFamily: 'FuturaStd-Light' }}
                />
                <TouchableOpacity onPress={() => {this.props.navigation.goBack()}}>
                    <Image style={styles.btn_backImage}
                            source={require('../../../../../src/assets/png/arrow-back.png')}/>
                </TouchableOpacity>
                
                <View style={styles.content}>
                    <Text style={styles.steps}>STEP 1 OF 2</Text>
                    <Text style={styles.heading}>Provide guest information</Text>
                    
                    
                    <View style={styles.hotelInfoContainer}>
                        <View style={styles.hotelThumbView}>
                            <Image source={{uri: imgHost + imgURL}} style={styles.hotelThumb} />
                        </View>
                        <View style={styles.hotelInfoView}>
                            <Text style={styles.hotelName}>{params.hotelDetails.name}</Text>
                            <Text style={styles.hotelPlace}>{params.hotelDetails.additionalInfo.mainAddress}</Text>
                        </View>
                    </View>
                    
                    <FlatList
                        style={styles.flatList}
                        data={this.state.guests}
                        
                        keyExtractor={(item, index) => item.key}
                        renderItem={({ item, index }) => (
                            <KeyboardAvoidingView keyboardVerticalOffset={-50} behavior="position" enabled>
                                <GuestFormRow
                                    guest={item}
                                    itemIndex={index}
                                    onFirstNameChange={(text) => this.handleFirstName(index, text)}
                                    onLastNameChange={(text) => this.handleLastName(index, text)}
                                />
                            </KeyboardAvoidingView>
                        )}
                    />
                </View>

                {/*Bottom Bar*/}
                <HotelDetailBottomBar 
                    price = {params.price}
                    daysDifference = {params.daysDifference}
                    titleBtn = {"Next"}
                    onPress = {this.onProceedPress}/>
                {/* <View style={styles.floatingBar}>
                    <View style={styles.detailsView}>
                        <View style={styles.pricePeriodWrapper}>
                            <Text style={[styles.price, styles.fontFuturaMed]}>{params.currencySign} {params.price}</Text>
                            <Text style={[styles.period1, styles.fontFuturaStd]}> for {params.daysDifference} nights</Text>
                        </View>
                        <View style={styles.pricePeriodWrapper}>
                            <Text style={[styles.price, styles.fontFuturaStd]}>{params.priceLOC} LOC</Text>
                            <Text style={[styles.period2, styles.fontFuturaStd]}> for {params.daysDifference} nights</Text>
                        </View>
                    </View>
                    
                    <View style={styles.nextButtonView}>
                        <TouchableOpacity style={styles.nextButton} onPress={this.onProceedPress}>
                            <Text style={styles.nextText}>Next</Text>
                        </TouchableOpacity>
                    </View>
                </View> */}
            </View>
            
        )
    }
}

GuestInfoForm.defaultProps = {
    hotelName: 'Test Hotel',
    hotelAddress: 'Kensington road',
    priceInUserCurreny : 457,
    priceInLoc : 49.3,
    quoteId: '249357191-0',
    roomDetail:{},
    guests : 0,
    guestsArray: [
        {
            key: 0,
            genderRepresentation: 'Mr',
            firstName: '',
            lastName: ''
        },
    ]
}

GuestInfoForm.propTypes = {
    hotelName: PropTypes.string,
    hotelAddress: PropTypes.string,
    priceInUserCurreny : PropTypes.number,
    priceInLoc : PropTypes.number,
    quoteId: PropTypes.string,
    roomDetail: PropTypes.object,
    guests : PropTypes.number
};


export default GuestInfoForm;