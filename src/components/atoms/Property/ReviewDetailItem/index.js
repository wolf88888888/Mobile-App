import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    View,
    Text
} from 'react-native';

import LocPrice from '../../../atoms/LocPrice'
import { CurrencyConverter } from '../../../../services/utilities/currencyConverter'
import { RoomsXMLCurrency } from '../../../../services/utilities/roomsXMLCurrency'
import styles from './styles';

class ReviewDetailItem extends Component {
    render() {
        const {
            title,
            fiat,
            currencyCode,
            styleContainer,
            styleFirst,
            styleLast,
        } = this.props;
        const {
            exchangeRates,
            currency
        } = this.props
        console.log("ReviewDetailItem ---", this.props);

        const defaultPrice = CurrencyConverter.convert(exchangeRates.currencyExchangeRates, currencyCode, currency, fiat);

        return (
            <View style={[styles.container, styleContainer]}>
                <Text style={[styles.textFirst, styleFirst]}>{title}</Text>
                <View style={{flexDirection:'row'}}>
                    <Text style={[styles.textLast, styleLast]}>{this.props.currencySign + defaultPrice.toFixed(2)}</Text>
                    <LocPrice style={[styles.textLast, styleLast]} fiat={fiat} currencyCode={currencyCode} fromParentType={3}/>
                </View>
            </View>
        );
    }
}

ReviewDetailItem.defaulProps = {
    title: '',
    fiat:0,
    currencyCode: 'EUR' ,
    styleFirst: null,
    styleLast: null
};

let mapStateToProps = (state) => {
    return {
        currency: state.currency.currency,
        currencySign: state.currency.currencySign,
        exchangeRates: state.exchangeRates,
    };
}
export default connect(mapStateToProps, null)(ReviewDetailItem);
