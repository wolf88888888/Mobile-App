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

class LocPrice extends Component {
    isStop = false;
    constructor(props) {
        super(props);

        const {exchangeRates, fiat, currencyCode} = props;

        let isLocPriceRendered = false;
        let fiatInEur;
    
        if (exchangeRates.currencyExchangeRates) {
            fiatInEur = exchangeRates.currencyExchangeRates && CurrencyConverter.convert(exchangeRates.currencyExchangeRates, currencyCode, RoomsXMLCurrency.get(), fiat);
        
            console.log("LocPrice WebsocketClient.sendMessage0", fiatInEur);
            WebsocketClient.sendMessage(fiatInEur, null, { fiatAmount: fiatInEur });
            isLocPriceRendered = true;
        }
    
        this.state = {
            fiatInEur,
            isLocPriceRendered
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.isStop) {
            return;
        }
        console.log("LocPrice  componentWillReceiveProps");
        if (nextProps.isLocPriceWebsocketConnected &&
            nextProps.isLocPriceWebsocketConnected !== this.props.isLocPriceWebsocketConnected) {
            WebsocketClient.sendMessage(this.state.fiatInEur, null, { fiatAmount: this.state.fiatInEur });
        }
    
        if (nextProps.exchangeRates.currencyExchangeRates && !this.state.isLocPriceRendered) {
            const fiatInEur = nextProps.exchangeRates.currencyExchangeRates && CurrencyConverter.convert(nextProps.exchangeRates.currencyExchangeRates, this.props.currencyCode, RoomsXMLCurrency.get(), this.props.fiat);
            // const fiatInEur = nextProps.exchangeRates.currencyExchangeRates && CurrencyConverter.convert(nextProps.exchangeRates.currencyExchangeRates, RoomsXMLCurrency.get(), DEFAULT_CRYPTO_CURRENCY, this.props.fiat);
        
            WebsocketClient.sendMessage(fiatInEur, null, { fiatAmount: fiatInEur });
            this.setState({
                isLocPriceRendered: true,
                fiatInEur
            });
        }
    }

	componentWillMount() {
		this.list = [
			this.props.navigation.addListener('didFocus', this._didFocus),
			this.props.navigation.addListener('willBlur', this._willBlur)
		];
	}
    
    
    componentWillUnmount() {
        console.log("LocPrice - componentWillUnmount", this.state.fiatInEur);
        WebsocketClient.sendMessage(this.state.fiatInEur, 'unsubscribe');
        if (this.props.locAmount) {
            removeLocAmount(this.state.fiatInEur);
        }
        
		if (this.list !== undefined && this.list !== null) {
			this.list.forEach( item => item.remove() )
		}
    }

    _didFocus() {
        console.log("LocPrice - _didFocus");
    }

    _willBlur() {
        console.log("LocPrice - _willBlur");
    }

    render() {
        console.log("LOC Price render");
        const {locAmount, hasBacket} = this.props;

        // let priceInCurrency = exchangeRates.currencyExchangeRates && CurrencyConverter.convert(exchangeRates.currencyExchangeRates, RoomsXMLCurrency.get(), currency, price);

        // let locRate = priceInCurrency * locAmount / price;

        return (
            <Text style={this.props.style} numberOfLines={1} ellipsizeMode="tail"> 
            {
                hasBacket ?
                    "(LOC " + locAmount +")"
                :
                    "LOC " + locAmount
            }
            </Text>
        );
    }
}

LocPrice.propTypes = {
    hasBacket: PropTypes.bool,
    currencyCode: PropTypes.string
};

LocPrice.defaultProps = {
    hasBacket: true,
    currencyCode: ''
};

let mapStateToProps = (state, ownProps) => {
    let { fiat, currencyCode} = ownProps;

    if (currencyCode === undefined || currencyCode === '') {
        currencyCode = RoomsXMLCurrency.get();
    }

    const { exchangerSocket, locAmounts, exchangeRates } = state;

    let fiatInEur = exchangeRates.currencyExchangeRates && CurrencyConverter.convert(exchangeRates.currencyExchangeRates, currencyCode, DEFAULT_CRYPTO_CURRENCY, fiat);
    
    // const fiatInEur = exchangeRates.currencyExchangeRates && CurrencyConverter.convert(exchangeRates.currencyExchangeRates, RoomsXMLCurrency.get(), DEFAULT_CRYPTO_CURRENCY, price);
    let locAmount = locAmounts.locAmounts[fiatInEur] && (locAmounts.locAmounts[fiatInEur].locAmount).toFixed(2);
    // let locAmount = locAmounts.locAmounts[exchangeRates.locRateFiatAmount] && (locAmounts.locAmounts[exchangeRates.locRateFiatAmount].locAmount * fiatInEur / exchangeRates.locRateFiatAmount).toFixed(2);

    if (!locAmount) {
        locAmount = (fiatInEur / exchangeRates.locEurRate).toFixed(2);
    }

    return {
        isLocPriceWebsocketConnected: exchangerSocket.isLocPriceWebsocketConnected,
        currencyCode,
        locAmount,
        exchangeRates
    };
}

const mapDispatchToProps = dispatch => ({
    removeLocAmount: bindActionCreators(removeLocAmount, dispatch),
})
export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(LocPrice));