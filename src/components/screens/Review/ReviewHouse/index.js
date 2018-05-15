import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Keyboard,ListView
    } from 'react-native';
import PropTypes from 'prop-types';
import Image from 'react-native-remote-svg';
import BackButton from '../../../atoms/BackButton';
import styles from './styles';
import ReviewTitle from '../../../molecules/ReviewTitle';
import ReviewImageItem from '../../../molecules/ReviewImageItem';
import ListItem from '../../../molecules/ListItem';

class ReviewHouse extends Component {
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
        this.onNext = this.onNext.bind(this);
    }

    onClose() {
        this.props.navigation.goBack();
    }

    onNext() {
        this.props.navigation.navigate('ReviewTripScreen');
    }

    render() {
        const { navigate } = this.props.navigation;

        return (
            <View style={styles.container}>
                <BackButton onPress={this.onClose}/>

                <ReviewTitle
                    text="Review your trip details"
                    pageNumber="STEP 1 OF 4 "
                    optional=""/>

                <ReviewImageItem
                    pageNumber="ENTIRE APARTMENT IN FLORENCE, ITALY"
                    text="Garden Loft Apartment"
                    optional="Hosted by Alexandra"/>

                <ListItem
                  textFirst="Dales"
                  textLast ="25 Jan - 27 Jan" />

                <ListItem
                  textFirst="Guests"
                  textLast ="2 guests" />

                <ListItem
                  textFirst="Cancellation Policy"
                  textLast ="Check"/>

                <View style={styles.footer}>
                    <View>
                      <Text style={styles.footerText1}>$170 <Text style={{fontSize:10}}>for 2 nights</Text></Text>
                      <Text style={styles.footerText2}>1.12 LOC <Text style={{fontSize:10}}> for 2 nights</Text></Text>
                    </View>

                    <TouchableOpacity onPress={this.onNext}>
                        <View style={styles.searchButtonView}>
                            <Text style={styles.searchButtonText}>Next</Text>
                        </View>
                    </TouchableOpacity>
               </View>
            </View>
        );
    }
}

export default ReviewHouse;
