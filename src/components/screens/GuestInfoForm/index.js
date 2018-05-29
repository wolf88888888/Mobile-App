import React, {Component} from 'react';
import {View, Text, TouchableOpacity, ScrollView, TextInput, FlatList} from 'react-native';
import Image from 'react-native-remote-svg';
import GuestFormRow from './GuestFormRow';
import styles from './styles';
import PropTypes from 'prop-types';

export default class GuestInfoForm extends Component {
    constructor() {
        super();
        // Save guests array for dynamic form generation
        this.state = {
            
        };
    }
    // Keys for flatlist
    _keyExtractor = (item, index) => item.key;

    render() {
        const {params} = this.props.navigation.state

        console.disableYellowBox = true
        return (
            <View style={styles.container}>
                    <TouchableOpacity onPress={this.onBackPress} style={styles.backButton}>
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
                                <Text style={styles.hotelName}>{this.props.hotelName}</Text>
                                <Text style={styles.hotelPlace}>{this.props.hotelAddress}</Text>
                            </View>
                        </View>
                        <View style={styles.form}>
                            <FlatList
                                style={styles.flatList}
                                data={this.props.guests}
                                keyExtractor={this._keyExtractor}
                                renderItem={({ item, index }) => (
                                    <GuestFormRow guest={item}/>
                                )}
                            />
                        </View>
                    </View>

                {/*Bottom Bar*/}
                <View style={styles.floatingBar}>
                    <View style={styles.detailsView}>
                        <View style={styles.pricePeriodWrapper}>
                            <Text style={[styles.price, styles.bold400]}>${this.props.priceInUserCurreny}</Text>
                            <Text style={styles.period1}> for 1 nights</Text>
                        </View>
                        <View style={styles.pricePeriodWrapper}>
                            <Text style={[styles.price, styles.fontFuturaStd]}>{this.props.priceInLoc} LOC</Text>
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
        this.props.navigation.navigate('RoomDetailsReview', {'quoteId':params.roomDetail.quoteId,'guests': this.props.guests.length});
        
    }
}

GuestInfoForm.defaultProps = {
    hotelName: 'Test Hotel',
    hotelAddress: 'Kensington road',
    priceInUserCurreny : 457,
    priceInLoc : 49.3,
    quoteId: '249357191-0',
    roomDetail:{},
    guests: [
        {
            key: 0,
            genderRepresentation: 'Mr',
            firstName: '',
            lastName: ''
        },
        {
            key: 1,
            genderRepresentation: 'Mrs',
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
    // guests : PropTypes.array,
    quoteId: PropTypes.string,
    roomDetail: PropTypes.object
  };
