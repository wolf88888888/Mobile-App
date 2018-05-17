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
import ReviewListItem from '../../../atoms/Property/ReviewListItem';
import Footer from '../../../atoms/Footer';

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
                    pageNumber="STEP 1 OF 4 "/>

                <ReviewImageItem
                    info="ENTIRE APARTMENT IN FLORENCE, ITALY"
                    text="Garden Loft Apartment"
                    description="Hosted by Alexandra"/>

                <ReviewListItem
                    textFirst="Dales"
                    textLast ="25 Jan - 27 Jan" />

                <ReviewListItem
                    textFirst="Guests"
                    textLast ="2 guests" />

                <ReviewListItem
                    textFirst="Cancellation Policy"
                    textLast ="Check"/>

                <Footer style={styles.footer} info0={'$170'} unit0={'for 2 nights'} info1={'1.12 LOC'} unit1={'for 2 nights'} button={'Next'} onClick={this.onNext}/>
            </View>
        );
    }
}

export default ReviewHouse;
