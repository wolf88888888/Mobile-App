import React, {Component} from 'react';
import {View, Text, TouchableOpacity, ScrollView, TextInput, FlatList} from 'react-native';
import Image from 'react-native-remote-svg';
import GuestFormRow from './GuestFormRow';
import styles from './styles';
import PropTypes from 'prop-types';
import thunk from 'redux-thunk';

var testingArray = [{}];

export default class GuestInfoForm extends Component {
    constructor(props) {
        super(props);
        //console.log(props.navigation.state.params.guests);
        this.onProceedClick = this.onProceedClick.bind(this);
        // Save guests array for dynamic form generation
        this.state = {
            arr : [],
            guestRecordArray : [{}],
            guest: {
                title: 'Mr',
                firstName: '',
                lastName: ''
            },
            guestRecord : {},
            testGuestArray : [{}]
        };
    }

    onProceedClick(key, value){
        console.log(value);
        // this.state.guestRecord[key] = value;
        // this.setState(
        //     {
        //         guestRecord : this.state.guestRecord
        //     }
        // );
        // console.log(this.state.guestRecord);
    }

    handleFirstName(key,text){
        this.state.guest.firstName = text;
        var fname = this.state.guest;
        testingArray[key] = fname;

        console.log(testingArray);

        // this.state.testGuestArray[key] = this.state.guest;
        // this.setState(
        //     {
        //         testGuestArray : this.state.testGuestArray
        //     }
        // );
        // let guest = Object.assign([], this.state.guest);
        // guest.firstName = text;
        // this.setState({guest})
        // this.state.guestRecord[key] = value;
        // this.setState(
        //     {
        //         guestRecord : this.state.guestRecord
        //     }
        // );
    }

    handleLastName(key,text){
        this.state.guest.lastName = text;
        var fname = this.state.guest;
        testingArray[key] = fname;
        console.log(testingArray);
        //testingArray[key] = this.state.guest;

        // this.state.testGuestArray[key] = this.state.guest;
        // this.setState(
        //     {
        //         testGuestArray : this.state.testGuestArray
        //     }
        // );
        // let guest = Object.assign([], this.state.guest);
        // guest.lastName = text;
        // this.setState({guest})
        // this.state.guestRecord[key] = value;
        // this.setState(
        //     {
        //         guestRecord : this.state.guestRecord
        //     }
        // );
    }

    guestInfo(index, isFirstName, isLastName){
        if(isFirstName){
            this.state.guestRecord[index].firstName = this.state.guest.firstName;
            this.setState(
                {
                    guestRecord : this.state.guestRecord
                }
            );
            console.log("Guestoona");
        }
        else{
            console.log("Guestoonafuck");
        }
        // console.log(firstName)
        // this.setState(
        //     {
        //         guestRecord :{
        //             "title": "Sexy Beast",
        //             "firstName": this.state.guest.firstName,
        //             "lastName": this.state.guest.lastName
        //         }
        //     }
        // );
        
    }
    // Keys for flatlist
    _keyExtractor = (item, index) => item.key;

    componentDidMount(){
        console.disableYellowBox = true
        for (var i = 0; i < this.props.navigation.state.params.guests; i++){
            this.state.arr.push({
                key: i,
                genderRepresentation: 'Mr',
                firstName: '',
                lastName: ''
                }
            );
        }
    }

    render() {
        const {params} = this.props.navigation.state
        return (
            <View style={styles.container}>
                    <TouchableOpacity onPress={() => {this.props.navigation.goBack()}} style={styles.backButton}>
                        <Image style={styles.btn_backImage}
                               source={require('../../../../src/assets/svg/arrow-back.svg')}/>
                    </TouchableOpacity>
                    <View style={styles.content}>
                        <Text style={styles.steps}>STEP 1 OF 2</Text>
                        <Text style={styles.heading}>Provide Guest Information</Text>
                        <View style={styles.hotelInfoContainer}>
                            <View style={styles.hotelThumbView}>
                                <Image source={require('../../../../src/assets/apartment.png')} style={styles.hotelThumb} />
                            </View>
                            <View style={styles.hotelInfoView}>
                                <Text style={styles.hotelName}>{params.hotelDetails.name}</Text>
                                <Text style={styles.hotelPlace}>{params.hotelDetails.additionalInfo.mainAddress}</Text>
                            </View>
                        </View>
                        <View style={styles.form}>
                            <FlatList
                                style={styles.flatList}
                                data={this.state.arr}
                                keyExtractor={this._keyExtractor}
                                renderItem={({ item, index }) => (
                                    <GuestFormRow 
                                        guest={item}
                                        itemIndex={index}
                                        onFirstNameChange={(key, text) => this.handleFirstName(index, text)}
                                        onLastNameChange={(key, text) => this.handleLastName(index, text)}
                                    />
                                )}
                            />
                        </View>
                    </View>

                {/*Bottom Bar*/}
                <View style={styles.floatingBar}>
                    <View style={styles.detailsView}>
                        <View style={styles.pricePeriodWrapper}>
                            <Text style={[styles.price, styles.bold400]}>${params.price}</Text>
                            <Text style={styles.period1}> for 1 nights</Text>
                        </View>
                        <View style={styles.pricePeriodWrapper}>
                            <Text style={[styles.price, styles.fontFuturaStd]}>{params.priceLOC} LOC</Text>
                            <Text style={styles.period2}> for 1 nights</Text>
                        </View>
                    </View>
                    <View style={styles.nextButtonView}>
                        <TouchableOpacity style={styles.nextButton} onPress={this.onProceedPress}>
                            <Text style={styles.nextText}>Proceed</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
    onProceedPress = () => {
        const {params} = this.props.navigation.state
        console.log(testingArray);
        this.props.navigation.navigate('RoomDetailsReview', {'roomDetails' : params.roomDetail, 'quoteId': params.roomDetail.quoteId,'guests': testingArray.length, 'hotelDetails': params.hotelDetails, 'price': params.price, 'priceLOC': params.priceLOC, 'guestRecord': testingArray});
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
