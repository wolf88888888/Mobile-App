import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,ProgressBarAndroid,
    Keyboard,ListView,Button,ScrollView,TextInput,Dimensions,FlatList
    } from 'react-native';

import PropTypes from 'prop-types';
import Image from 'react-native-remote-svg';
import CardView from 'react-native-cardview'

import WhiteBackButton from '../../atoms/WhiteBackButton';
import FacilityView from '../../atoms/FacilityView'
import RoomFacility from '../../molecules/Property/RoomFacility'
import SleepingArrangements from '../../molecules/Property/SleepingArrangements'
import CheckIn_OutView from '../../molecules/Property/CheckIn_OutView'
import LocationView from '../../molecules/Property/LocationView'
import RatingView from '../../molecules/Property/RatingView'
import ContactHostView from '../../molecules/Property/ContactHostView'
import SimilarHomes from '../../molecules/SimilarHomes'

import styles from './styles';

import PropertySummaryView from '../../molecules/Property/PropertySummaryView'

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
        this.props.navigation.navigate('HouseRulesScreen');
    }

    onAdditionalPrice() {
        this.props.navigation.navigate('AdditionalPricesScreen');
    }

    onCheck() {
        this.props.navigation.navigate('ReviewHouseScreen');
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <ScrollView style={styles.scrollView}>
                    <WhiteBackButton style={styles.WhiteBackButton} onPress={this.onClose}/>
                    <View style={styles.body}>
                        <PropertySummaryView />

                        <View style={[styles.lineStyle, {marginLeft:20, marginRight:20, marginTop:0}]} />

                        <RoomFacility style={styles.roomfacility} onFacilityMore={this.onFacilityMore}/>

                        <SleepingArrangements/>

                        <View style={[styles.lineStyle, {marginLeft:20, marginRight:20, marginTop:15, marginBottom:15}]} />

                        <CheckIn_OutView />

                        <View style={[styles.lineStyle, {marginLeft:20, marginRight:20, marginTop:15, marginBottom:15}]} />

                        <LocationView />

                        <RatingView />

                        <View style={[styles.lineStyle, {marginLeft:20, marginRight:20, marginTop:15, marginBottom:15}]} />

                        <ContactHostView />

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

                <View style={styles.footer}>
                    <View style={{flexDirection:'column', justifyContent:'center', marginLeft:15}}>
                        <View style={{flexDirection:'row'}}>
                            <Text style={styles.amount}>$85</Text>
                            <Text style={styles.unit}> /per night</Text>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <Text style={styles.size}>0.56 LOC</Text>
                            <Text style={styles.unit}> /per night</Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress={this.onCheck}>
                        <View style={styles.ButtonView}>
                            <Text style={styles.ButtonText}>Check Availability</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default Property;
