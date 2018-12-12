import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Text, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';

import { WebsocketClient } from '../../../utils/exchangerWebsocket';
import { removeLocAmount } from '../../../redux/action/locAmounts'
import { CurrencyConverter } from '../../../services/utilities/currencyConverter'
import { RoomsXMLCurrency } from '../../../services/utilities/roomsXMLCurrency';

import styles from './styles';

const DEFAULT_CRYPTO_CURRENCY = 'EUR';
const DEFAULT_QUOTE_LOC_ID = 'quote';
const DEFAULT_QUOTE_LOC_METHOD = 'quoteLoc';

class ConfirmBottomBar extends Component {
    static self;
    isQuoteLocRendered = false;

    constructor(props) {
        super(props);
        ConfirmBottomBar.self = this;
        
        this.isQuoteLocRendered = false;
        this.quoteLocSendAttempts = 0;
        if (this.props.params.bookingId !== "") {
            this.sendWebsocketMessage(null, null, this.props.params);
        }
    }
    
    componentWillReceiveProps(nextProps) {
        console.log("ConfirmBottomBar - componentWillUnmount", this.props.params);
        if (nextProps.isLocPriceWebsocketConnected && nextProps.isLocPriceWebsocketConnected !== this.props.isLocPriceWebsocketConnected) {
            if (this.props.params.bookingId !== "") {
                this.sendWebsocketMessage(null, null, this.props.params);
            }
        }
        else if (nextProps.params.bookingId !== "" && this.props.params.bookingId === "") {
            this.sendWebsocketMessage(null, null, nextProps.params);
        }
    }
    
    componentWillUnmount() {
        this.sendWebsocketMessage(null, 'unsubscribe');
        if (this.props.locAmount) {
            this.props.removeLocAmount(DEFAULT_QUOTE_LOC_ID);
        }
    }

    sendWebsocketMessage(id, method, params) {
        console.log("ConfirmBottomBar =- sendWebsocketMessage-------------", id, method, params);
        WebsocketClient.sendMessage(id || DEFAULT_QUOTE_LOC_ID, method || DEFAULT_QUOTE_LOC_METHOD, params);
    }

    redirectToHotelDetailsPage() {
        console.log("redirectToHotelDetailsPage -------------");
        // this.props.navigation.pop(3);
    }

    stopQuote = (preparedBookingId) => {
        WebsocketClient.sendMessage(DEFAULT_QUOTE_LOC_ID, 'approveQuote', { bookingId: preparedBookingId });
    }
    
    restartQuote = (preparedBookingId) => {
        WebsocketClient.sendMessage(DEFAULT_QUOTE_LOC_ID, 'quoteLoc', { bookingId: preparedBookingId });
    }

    render() {
        const {currency, currencySign, exchangeRates, locPriceUpdateTimer, fiat, locAmount, quoteLocError, daysDifference, onPress, titleBtn} = this.props;

        if (!this.isQuoteLocRendered && locAmount) {
            this.isQuoteLocRendered = true;
        }
        if (!this.isQuoteLocRendered && quoteLocError) {
            if (this.quoteLocSendAttempts === 10) {
                this.redirectToHotelDetailsPage();
            } else {
                this.quoteLocSendAttempts += 1;
                this.sendWebsocketMessage(null, null, params);
            }
        } else if (this.isQuoteLocRendered && quoteLocError) {
            this.redirectToHotelDetailsPage();
        }

        let priceInCurrency = exchangeRates.currencyExchangeRates && CurrencyConverter.convert(exchangeRates.currencyExchangeRates, RoomsXMLCurrency.get(), currency, fiat);

        return (
            <View style={styles.floatingBar}>
                <View style={styles.detailsView}>
                    <View style={styles.pricePeriodWrapper}>
                        <Text style={[styles.price, styles.fontFuturaMed]}>{currencySign} {priceInCurrency.toFixed(2)}</Text>
                        <Text style={[styles.period1, styles.fontFuturaStd]}> for {daysDifference} nights</Text>
                    </View>
                    <View style={styles.pricePeriodWrapper}>
                        <Text style={[styles.price, styles.fontFuturaStd]}>{locAmount} LOC</Text>
                        <Text style={[styles.period2, styles.fontFuturaStd]}> for {daysDifference} nights</Text>
                    </View>
                </View>
                
                <View style={styles.nextButtonView}>
                    <TouchableOpacity style={styles.nextButton} onPress={onPress}>
                        <Text style={styles.nextText}>{titleBtn}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

ConfirmBottomBar.propTypes = {
    onPress: PropTypes.func
};

ConfirmBottomBar.defaultProps = {
    onPress: () => {}
};

let mapStateToProps = (state, ownProps) => {
    const { fiat  } = ownProps;

    const { exchangerSocket, locAmounts, exchangeRates, currency, locPriceUpdateTimer } = state;

    let locAmount = locAmounts.locAmounts[DEFAULT_QUOTE_LOC_ID] && locAmounts.locAmounts[DEFAULT_QUOTE_LOC_ID].locAmount && (locAmounts.locAmounts[DEFAULT_QUOTE_LOC_ID].locAmount).toFixed(2);
    const quoteLocError = locAmounts.locAmounts[DEFAULT_QUOTE_LOC_ID] && locAmounts.locAmounts[DEFAULT_QUOTE_LOC_ID].error;
  
    if (!locAmount) {
        const fiatInEur = exchangeRates.currencyExchangeRates && CurrencyConverter.convert(exchangeRates.currencyExchangeRates, RoomsXMLCurrency.get(), DEFAULT_CRYPTO_CURRENCY, fiat );
    
        locAmount = (fiatInEur / exchangeRates.locEurRate).toFixed(2);
    }

    return {
        isLocPriceWebsocketConnected: exchangerSocket.isLocPriceWebsocketConnected,
        currency: currency.currency,
        currencySign: currency.currencySign,
        locAmount,
        exchangeRates,
        quoteLocError,
        locPriceUpdateTimer
    };
}

const mapDispatchToProps = dispatch => ({
    removeLocAmount: bindActionCreators(removeLocAmount, dispatch),
})

function mergeProps(stateProps, dispatchProps, ownProps) {
    return Object.assign({}, ownProps, stateProps, dispatchProps)
}

export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(ConfirmBottomBar);
