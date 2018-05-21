import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,ProgressBarAndroid,
    Keyboard,ListView,Button,ScrollView,TextInput,Dimensions,FlatList
  } from 'react-native';

import PropTypes from 'prop-types';
import Image from 'react-native-remote-svg';
import CardView from 'react-native-cardview';

import WhiteBackButton from '../../atoms/WhiteBackButton';
import LikeButton from '../../atoms/LikeButton';
import FacilityView from '../../atoms/FacilityView';
import RoomFacility from '../../molecules/Property/RoomFacility';
import SleepingArrangements from '../../molecules/Property/SleepingArrangements';
import CheckIn_OutView from '../../atoms/Property/CheckIn_OutView';
import LocationView from '../../atoms/Property/LocationView';
import RatingView from '../../molecules/Property/RatingView';
import ContactHostView from '../../molecules/Property/ContactHostView';
import Footer from '../../atoms/Footer';
import SimilarHomes from '../../molecules/SimilarHomes';

import styles from './styles';

import PropertySummaryView from '../../molecules/Property/PropertySummaryView';

class Property extends Component {

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

    constructor(){
        super();
        this.onClose = this.onClose.bind(this);
        this.onFacilityMore = this.onFacilityMore.bind(this);
        this.onHouseRules = this.onHouseRules.bind(this);
        this.onAdditionalPrice = this.onAdditionalPrice.bind(this);
        this.onCheck = this.onCheck.bind(this);
        this.onLike = this.onLike.bind(this);
        this.state = {
        }
    }

    onClose() {
        this.props.navigation.goBack();
    }

    onFacilityMore() {
        this.props.navigation.navigate('PropertyFacilitesScreen');
    }

    onHouseRules() {
        this.props.navigation.navigate('PropertyRulesScreen');
    }

    onAdditionalPrice() {
        this.props.navigation.navigate('PropertyPricesScreen');
    }

    onCheck() {
        this.props.navigation.navigate('ReviewHouseScreen');
    }

    onLike(like) {
        console.log("onLike");
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <ScrollView style={styles.scrollView}>
                    <View style={styles.topButtonContainer}>
                        <WhiteBackButton onPress={this.onClose}/>
                        <LikeButton like={false} onLike={this.onLike}/>
                    </View>
                    <View style={styles.body}>
                        <PropertySummaryView
                            logo = {require('../../../assets/temple/overview.jpg')}
                            title = {'Garden Loft Apartment'}
                            rateExp = {"Excellent"}
                            rateVal = {4.1}
                            reviewNum = {73}
                            guests = {4} size = {85} bathroom = {1} bedroom = {1}
                            description = {'In the historic quarter of Santo Spirito, on the left bank of the ricer Arno,studio apartment is perfect for those traveling alone or as a couple.To walk berween Santo Spirito,Pante Vecchio and Babali Gardens is a magical experience.'}
                            space = {'On the third floor of a typical Florentine building, the apartment of an entrance with wardrobes and loft with double bed, the third floor of a typical Florentine building, the apartment of an entrance with wardrobes and loft with double bed, the third floor of a typical Florentine building, the apartment of an entrance with wardrobes and loft with double bed, the third floor of a typical Florentine building, the apartment of an entrance with wardrobes and loft with double bed'}
                            />

                        <View style={[styles.lineStyle, {marginLeft:20, marginRight:20, marginTop:0}]} />

                        <RoomFacility
                            facility0 = {require('../../../assets/Facilities/Homes/TV.svg')}
                            facility1 = {require('../../../assets/Facilities/Homes/Fireplace.svg')}
                            facility2 = {require('../../../assets/Facilities/Homes/Pool.svg')}
                            facility3 = {require('../../../assets/Facilities/Homes/Air_Conditioning.svg')}
                            facility4 = {require('../../../assets/Facilities/Homes/BathTub.svg')}
                            more = {23}
                            style = {styles.roomfacility}
                            onFacilityMore = {this.onFacilityMore}/>

                        <SleepingArrangements/>

                        <View style={[styles.lineStyle, {marginLeft:20, marginRight:20, marginTop:15, marginBottom:15}]} />

                        <CheckIn_OutView checkin={'2PM - 10PM'} checkout={'12PM (noon)'}/>

                        <View style={[styles.lineStyle, {marginLeft:20, marginRight:20, marginTop:15, marginBottom:15}]} />

                        <LocationView
                            detail={"Jesse s home is located in Oia,South Aegean,Greece.The views from the terrace, the sun, being calm"}
                            transpotation={"Geting around the island is possible either by bus transport, taxi or by rending a car or on ATV."}
                            location={"Florence, Italy"}
                            description={"The exact location will be provided after booking."}
                            lat={43.769562}
                            lon={11.255814}
                            radius={200}/>

                        <RatingView
                            rateTotalVal={4.1}
                            reviewNum={73}
                            rateTitle0={"Value for money"} rateVal0={4.8}
                            rateTitle1={"Communication"} rateVal1={4.6}
                            rateTitle2={"Location"} rateVal2={4.5}
                            rateTitle3={"Check In"} rateVal3={2.3}
                            rateTitle4={"Cleanliness"} rateVal4={3.8}
                            rateTitle5={"Accuracy"} rateVal5={1.6}
                            avatar={require('../../../assets/temple/avatar.png')}
                            name={"Jesse"}
                            date={"October 2017"}
                            clientRate={4.2}
                            clientDescription={"The apartment was in a good location and we were able to park our car a 5 minute walk away for a fair price! The apartment was clean and had everything.The apartment was in a good location and we were ableto park our car a 5 minute walk away for a fair price!The apartment was clean and had everything.The apartment was in a good location and we were ableto park our car a 5 minute walk away for a fair price!"}/>

                        <View style={[styles.lineStyle, {marginLeft:20, marginRight:20, marginTop:15, marginBottom:15}]} />

                        <ContactHostView
                            avatar={require('../../../assets/temple/avatar.png')}
                            name={"Britney"}
                            detail={"Oia, Greece • Joined in May 2011"}/>

                        <View style={[styles.lineStyle, {marginLeft:20, marginRight:20, marginTop:15, marginBottom:15}]} />

                        <View style={styles.etcContaner}>
                            <Text style={styles.etcName}>House Rules</Text>
                            <TouchableOpacity onPress={this.onHouseRules}>
                                <Text style={styles.etcButton}>Read</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={[styles.lineStyle, {marginLeft:20, marginRight:20, marginTop:15, marginBottom:15}]} />

                        <View style={styles.etcContaner}>
                            <Text style={styles.etcName}>Cancellation Policy</Text>
                            <TouchableOpacity onPress={this.onHouseRules}>
                                <Text style={styles.etcButton}>Flexible</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={[styles.lineStyle, {marginLeft:20, marginRight:20, marginTop:15, marginBottom:15}]} />

                        <View style={styles.etcContaner}>
                            <Text style={styles.etcName}>Additional Prices</Text>
                            <TouchableOpacity onPress={this.onAdditionalPrice}>
                                <Text style={styles.etcButton}>Check</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={[styles.lineStyle, {marginLeft:20, marginRight:20, marginTop:15, marginBottom:15}]} />
                        <SimilarHomes/>
                    </View>
                </ScrollView>

                <Footer info0={'$85'} unit0={'/ per night'} info1={'0.56 LOC'} unit1={'/ per night'} button={'Check Availability'} onClick={this.onCheck}/>
            </View>
        );
    }
}

export default Property;
