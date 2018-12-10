import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Text } from 'react-native';

import { WebsocketClient } from '../../../utils/exchangerWebsocket';
import { CurrencyConverter } from '../../../services/utilities/currencyConverter'
import { RoomsXMLCurrency } from '../../../services/utilities/roomsXMLCurrency'
import { removeLocAmount } from '../../../redux/action/locAmounts'

import styles from './styles';

const DEFAULT_CRYPTO_CURRENCY = 'EUR';

class LocPrice extends Component {
    constructor(props) {
        super(props);
    
        let isLocPriceRendered = false;
        let fiatInEur;
    
        // if (this.props.exchangeRates.currencyExchangeRates) {
        //     fiatInEur = this.props.exchangeRates.currencyExchangeRates && CurrencyConverter.convert(this.props.exchangeRates.currencyExchangeRates, RoomsXMLCurrency.get(), DEFAULT_CRYPTO_CURRENCY, this.props.fiat);
        
        //     WebsocketClient.sendMessage(fiatInEur, null, { fiatAmount: fiatInEur });
        //     isLocPriceRendered = true;
        // }
    
        // this.state = {
        //     fiatInEur,
        //     isLocPriceRendered
        // };
    }
    
    // componentWillReceiveProps(nextProps) {
    //     if (nextProps.isLocPriceWebsocketConnected &&
    //         nextProps.isLocPriceWebsocketConnected !== this.props.isLocPriceWebsocketConnected) {
    //         WebsocketClient.sendMessage(this.state.fiatInEur, null, { fiatAmount: this.state.fiatInEur });
    //     }
    
    //     if (nextProps.exchangeRates.currencyExchangeRates && !this.state.isLocPriceRendered) {
    //         const fiatInEur = nextProps.exchangeRates.currencyExchangeRates && CurrencyConverter.convert(nextProps.exchangeRates.currencyExchangeRates, RoomsXMLCurrency.get(), DEFAULT_CRYPTO_CURRENCY, this.props.fiat);
        
    //         WebsocketClient.sendMessage(fiatInEur, null, { fiatAmount: fiatInEur });
    //         this.setState({
    //             isLocPriceRendered: true,
    //             fiatInEur
    //         });
    //     }
    // }
    
    // componentWillUnmount() {
    //     console.log("LocPrice - componentWillUnmount", this.state.fiatInEur);
    //     WebsocketClient.sendMessage(this.state.fiatInEur, 'unsubscribe');
    //     if (this.props.locAmount) {
    //         removeLocAmount(this.state.fiatInEur);
    //     }
    // }
    
    render() {
        const {locAmount} = this.props;

        return (
            <Text style={this.props.style} numberOfLines={1} ellipsizeMode="tail"> (LOC {locAmount}) </Text>
        );
    }
}

let mapStateToProps = (state, ownProps) => {
    const { fiat } = ownProps;

    const { exchangerSocket, locAmounts, exchangeRates } = state;

    const fiatInEur = exchangeRates.currencyExchangeRates && CurrencyConverter.convert(exchangeRates.currencyExchangeRates, RoomsXMLCurrency.get(), DEFAULT_CRYPTO_CURRENCY, fiat);

    // let locAmount = locAmounts.locAmounts[fiatInEur] && (locAmounts.locAmounts[fiatInEur].locAmount).toFixed(2);
    let locAmount = locAmounts.locAmounts[exchangeRates.locRateFiatAmount] 
        && (locAmounts.locAmounts[exchangeRates.locRateFiatAmount].locAmount * fiatInEur / exchangeRates.locRateFiatAmount).toFixed(2);

    if (!locAmount) {
        locAmount = (fiatInEur / exchangeRates.locEurRate).toFixed(2);
    }

    return {
        isLocPriceWebsocketConnected: exchangerSocket.isLocPriceWebsocketConnected,
        locAmount,
        exchangeRates
    };
}

const mapDispatchToProps = dispatch => ({
    removeLocAmount: bindActionCreators(removeLocAmount, dispatch),
})
export default connect(mapStateToProps, mapDispatchToProps)(LocPrice);
