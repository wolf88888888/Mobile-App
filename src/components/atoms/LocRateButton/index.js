import React, {Component} from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';

import { WebsocketClient } from '../../../utils/exchangerWebsocket';
import { CurrencyConverter } from '../../../services/utilities/currencyConverter'

import styles from './styles';

const DEFAULT_CRYPTO_CURRENCY = 'EUR';

class LocRateButton extends Component {
    static self;
    isSendMessage = false;
    isStop = false;
    constructor(props) {
        super(props);
        console.log("LocRateButton - constructor", props);
        LocRateButton.self = this;
    }

    componentDidUpdate(prevProps) {
        if (this.isStop) {
            return;
        }
        const {isLocPriceWebsocketConnected, exchangeRates} = this.props;
        if (!isLocPriceWebsocketConnected && this.isSendMessage) {
            this.isSendMessage = false;
        }
        if (isLocPriceWebsocketConnected && !this.isSendMessage) {
            this.isSendMessage = true;
            WebsocketClient.sendMessage(exchangeRates.locRateFiatAmount, null, { fiatAmount: exchangeRates.locRateFiatAmount });
        }
    }

	componentWillMount() {
		this.list = [
			this.props.navigation.addListener('didFocus', this._didFocus),
			this.props.navigation.addListener('willBlur', this._willBlur)
		];
	}
    
    componentWillUnmount() {
        const { exchangeRates } = this.props;
        WebsocketClient.sendMessage(exchangeRates.locRateFiatAmount, 'unsubscribe');
        
		if (this.list !== undefined && this.list !== null) {
			this.list.forEach( item => item.remove() )
		}
    }
      
    _didFocus() {
        console.log("LocRateButton - _didFocus", LocRateButton.self.props);
        const {isLocPriceWebsocketConnected, exchangeRates} = LocRateButton.self.props;
        if (isLocPriceWebsocketConnected && !LocRateButton.self.isSendMessage) {
            LocRateButton.self.isSendMessage = true;
            WebsocketClient.sendMessage(exchangeRates.locRateFiatAmount, null, { fiatAmount: exchangeRates.locRateFiatAmount });
        }
        LocRateButton.self.isStop = false;
    }

    _willBlur() {
        console.log("LocRateButton - _willBlur", LocRateButton.self.props, LocRateButton.self.isSendMessage);
        const {isLocPriceWebsocketConnected, exchangeRates} = LocRateButton.self.props;
        if (isLocPriceWebsocketConnected && LocRateButton.self.isSendMessage) {
            WebsocketClient.sendMessage(exchangeRates.locRateFiatAmount, 'unsubscribe');
            LocRateButton.self.isSendMessage = false;
        }
        LocRateButton.self.isStop = true;
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
        
        isLocPriceWebsocketConnected: state.exchangerSocket.isLocPriceWebsocketConnected,
        locAmounts: state.locAmounts,
        exchangeRates: state.exchangeRates,
    };
}

export default connect(mapStateToProps, null)(withNavigation(LocRateButton));
