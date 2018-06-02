import React, {Component} from 'react';
import {View, Text, TouchableOpacity, ScrollView, TextInput, FlatList} from 'react-native';
import Image from 'react-native-remote-svg';
import GuestFormRow from './GuestFormRow';
import styles from './styles';
import PropTypes from 'prop-types';

export default class GuestInfoForm extends Component {
    constructor(props) {
        super(props);

        this.onProceedClick = this.onProceedClick.bind(this);
        // Save guests array for dynamic form generation
        this.state = {
            arr : [],
            guestRecord : [{}]
        };
    }

    onProceedClick(key, value){
        console.log(key)
        this.state.guestRecord[key] = value;
        this.setState(
            {
                guestRecord : this.state.guestRecord
            }
        );
    }
    // Keys for flatlist
    _keyExtractor = (item, index) => item.key;

    render() {
        const {params} = this.props.navigation.state

        for (var i = 0; i < params.guests; i++){
            this.state.arr.push({
                key: 0,
                genderRepresentation: 'Mr',
                firstName: '',
                lastName: ''
            });
        }
        console.disableYellowBox = true
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
                                    <GuestFormRow guest={item}
                                    itemIndex={index}
                                    onProceedClick={this.onProceedClick}/>
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
        this.props.navigation.navigate('RoomDetailsReview', {'quoteId': params.roomDetail.quoteId,'guests': this.props.guestsArray.length, 'hotelDetails': params.hotelDetails, 'price': params.price, 'priceLOC': params.priceLOC, 'guestRecord': this.state.guestRecord});
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
