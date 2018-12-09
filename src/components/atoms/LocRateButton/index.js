import React, {Component} from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';

import { WebsocketClient } from '../../../utils/exchangerWebsocket';
import { CurrencyConverter } from '../../../services/utilities/currencyConverter'

import styles from './styles';

const DEFAULT_CRYPTO_CURRENCY = 'EUR';

class LocRateButton extends Component {
    constructor(props) {
        super(props);
        this.isSendMessage = false;
    }

    componentDidUpdate(prevProps) {
        console.log("LocRateButton - componentDidUpdate");
        // Typical usage (don't forget to compare props):
        const {currency, currencySign, isLocPriceWebsocketConnected, exchangeRates} = this.props;

        if (currency != prevProps.currency) {
            this.setState({ currency: currency, currencySign: currencySign });
        }

        if (!isLocPriceWebsocketConnected && this.isSendMessage) {
            this.isSendMessage = false;
        }
        if (isLocPriceWebsocketConnected && !this.isSendMessage) {
            this.isSendMessage = true;
            WebsocketClient.sendMessage(exchangeRates.locRateFiatAmount, null, { fiatAmount: exchangeRates.locRateFiatAmount });
        }
    }

    componentDidMount() {
    }


    render() {
        const {currency, exchangeRates, locAmounts} = this.props;
        
        const fiat = exchangeRates.currencyExchangeRates && CurrencyConverter.convert(exchangeRates.currencyExchangeRates, DEFAULT_CRYPTO_CURRENCY, currency, exchangeRates.locRateFiatAmount);
        let locAmount = locAmounts.locAmounts[exchangeRates.locRateFiatAmount] && locAmounts.locAmounts[exchangeRates.locRateFiatAmount].locAmount;
        if (!locAmount) {
            locAmount = exchangeRates.locRateFiatAmount / exchangeRates.locEurRate;
        }
        let locRate = fiat / locAmount;

        return (
            <TouchableWithoutFeedback onPress={this.props.onPress}>
                <View style={styles.fab}>
                {
                    locRate != 0 ? 
                        (<Text style={styles.fabText}>LOC/{currency} {parseFloat(locRate).toFixed(2)}</Text>)
                        :
                        (<Text style={styles.fabText}>LOC/{currency}    </Text>)
                }
                    
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

LocRateButton.propTypes = {
    onPress: PropTypes.func
};

LocRateButton.defaultProps = {
    onPress: () => {}
};

let mapStateToProps = (state) => {
    return {
        currency: state.currency.currency,
        currencySign: state.currency.currencySign,
        countries: state.country.countries,
        
        isLocPriceWebsocketConnected: state.exchangerSocket.isLocPriceWebsocketConnected,
        locAmounts: state.locAmounts,
        exchangeRates: state.exchangeRates,
    };
}

export default connect(mapStateToProps, null)(LocRateButton);
