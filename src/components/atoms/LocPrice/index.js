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
    isPause = false;
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
        const { fromParentType } = this.props;
        if (fromParentType === 0) { // hotel search
            if (!this.isPause && nextProps.nav.routes.length > 2 && this.props.nav.routes.length === 2 && this.props.nav.routes[1].routeName ==="HotelsSearchScreen") {
                this.pauseWebocket(nextProps);
            }
            else if (this.isPause && this.props.nav.routes.length > 2 && nextProps.nav.routes.length === 2 && nextProps.nav.routes[1].routeName ==="HotelsSearchScreen") {
                this.resumeWebsocket(nextProps);
            }
        }
        else if (fromParentType === 1) {//available room
            if (!this.isPause && nextProps.nav.routes.length > 3 && this.props.nav.routes.length === 3 && this.props.nav.routes[2].routeName ==="HotelDetails") {
                this.pauseWebocket(nextProps);
            }
            else if (this.isPause && this.props.nav.routes.length > 3 && nextProps.nav.routes.length === 3 && nextProps.nav.routes[2].routeName ==="HotelDetails") {
                this.resumeWebsocket(nextProps);
            }
        }
        else if (fromParentType === 2) {
            if (!this.isPause && nextProps.nav.routes.length > 2 && this.props.nav.routes.length === 2 && this.props.nav.routes[1].routeName ==="HomesSearchScreen") {
                this.pauseWebocket(nextProps);
            }
            else if (this.isPause && this.props.nav.routes.length > 2 && nextProps.nav.routes.length === 2 && nextProps.nav.routes[1].routeName ==="HomesSearchScreen") {
                this.resumeWebsocket(nextProps);
            }
        }
        else if (fromParentType === 3) {
            if (!this.isPause && nextProps.nav.routes.length > 4 && this.props.nav.routes.length === 4 && this.props.nav.routes[3].routeName ==="HomeReviewScreen") {
                this.pauseWebocket(nextProps);
            }
            else if (this.isPause && this.props.nav.routes.length > 4 && nextProps.nav.routes.length === 4 && nextProps.nav.routes[3].routeName ==="HomeReviewScreen") {
                this.resumeWebsocket(nextProps);
            }
        }
        else {
            if (this.isPause) {
                return;
            }
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
    }
    
    componentWillUnmount() {
        console.log("LocPrice - componentWillUnmount", this.state.fiatInEur);
        WebsocketClient.sendMessage(this.state.fiatInEur, 'unsubscribe');
        if (this.props.locAmount) {
            removeLocAmount(this.state.fiatInEur);
        }
    }

    resumeWebsocket() {
        console.log("LocPrice  resumeWebsocket");
        this.isPause = false;
        WebsocketClient.sendMessage(this.state.fiatInEur, null, { fiatAmount: this.state.fiatInEur });
    }

    pauseWebocket() {
        console.log("LocPrice  pauseWebocket");
        this.isPause = true;
        WebsocketClient.sendMessage(this.state.fiatInEur, 'unsubscribe');
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
    currencyCode: PropTypes.string,
    fromParentType : PropTypes.number
};

LocPrice.defaultProps = {
    hasBacket: true,
    currencyCode: '',
    fromParentType : -1 // 0: hotelsearch, 1: available_rooms
};

let mapStateToProps = (state, ownProps) => {
    let { fiat, currencyCode, fromParentType} = ownProps;

    const { exchangerSocket, locAmounts, exchangeRates, nav } = state;

    if (currencyCode === undefined || currencyCode === '') {
        currencyCode = RoomsXMLCurrency.get();
    }

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
        exchangeRates, 
        nav
    };
}

const mapDispatchToProps = dispatch => ({
    removeLocAmount: bindActionCreators(removeLocAmount, dispatch),
})
export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(LocPrice));