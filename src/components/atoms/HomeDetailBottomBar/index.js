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

class HomeDetailBottomBar extends Component {
    static self;
    isStop = false;
    constructor(props) {
        super(props);
        HomeDetailBottomBar.self = this;

        const {exchangeRates, price, currencyCode} = props;

        let isLocPriceRendered = false;
        let fiatInEur;
    
        if (exchangeRates.currencyExchangeRates) {
            fiatInEur = exchangeRates.currencyExchangeRates && CurrencyConverter.convert(exchangeRates.currencyExchangeRates, currencyCode, RoomsXMLCurrency.get(), price);
        
            console.log("HomeDetailBottomBar WebsocketClient.sendMessage0", fiatInEur);
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
        console.log("HomeDetailBottomBar  componentWillReceiveProps");
        if (nextProps.isLocPriceWebsocketConnected &&
            nextProps.isLocPriceWebsocketConnected !== this.props.isLocPriceWebsocketConnected) {
            WebsocketClient.sendMessage(this.state.fiatInEur, null, { fiatAmount: this.state.fiatInEur });
        }
    
        if (nextProps.exchangeRates.currencyExchangeRates && !this.state.isLocPriceRendered) {
            const fiatInEur = nextProps.exchangeRates.currencyExchangeRates && CurrencyConverter.convert(nextProps.exchangeRates.currencyExchangeRates, this.props.currencyCode, RoomsXMLCurrency.get(), this.props.price);
            // const fiatInEur = nextProps.exchangeRates.currencyExchangeRates && CurrencyConverter.convert(nextProps.exchangeRates.currencyExchangeRates, RoomsXMLCurrency.get(), DEFAULT_CRYPTO_CURRENCY, this.props.price);
        
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
        const {isLocPriceWebsocketConnected} = HomeDetailBottomBar.self.props;
        if (isLocPriceWebsocketConnected && !HomeDetailBottomBar.self.state.isLocPriceRendered) {
            HomeDetailBottomBar.self.state.isLocPriceRendered = true;
            WebsocketClient.sendMessage(HomeDetailBottomBar.self.state.fiatInEur, null, { fiatAmount: HomeDetailBottomBar.self.state.fiatInEur });
            console.log("HomeDetailBottomBar - _didFocus", HomeDetailBottomBar.self.props, HomeDetailBottomBar.self.state.fiatInEur);
        }
        HomeDetailBottomBar.self.isStop = false;
    }

    _willBlur() {
        console.log("HomeDetailBottomBar - _willBlur");
        const {isLocPriceWebsocketConnected} = HomeDetailBottomBar.self.props;
        if (isLocPriceWebsocketConnected && HomeDetailBottomBar.self.state.isLocPriceRendered) {
            console.log("HomeDetailBottomBar - _willBlur", HomeDetailBottomBar.self.props, HomeDetailBottomBar.self.state.isLocPriceRendered, HomeDetailBottomBar.self.state.fiatInEur);
            WebsocketClient.sendMessage(HomeDetailBottomBar.self.state.fiatInEur, 'unsubscribe');
            HomeDetailBottomBar.self.state.isLocPriceRendered = false;
        }
        HomeDetailBottomBar.self.isStop = true;
    }

    render() {
        const {currency, currencySign, exchangeRates, price, currencyCode, locAmount, daysDifference, onPress, titleBtn} = this.props;

    
        let priceInCurrency = exchangeRates.currencyExchangeRates &&  CurrencyConverter.convert(exchangeRates.currencyExchangeRates, currencyCode, currency, price);
        // let priceInCurrency = exchangeRates.currencyExchangeRates && CurrencyConverter.convert(exchangeRates.currencyExchangeRates, RoomsXMLCurrency.get(), currency, price);

        // let locRate = priceInCurrency * locAmount / price;

        return (
            <View style={styles.floatingBar}>
                <View style={styles.detailsView}>
                    <View style={styles.pricePeriodWrapper}>
                        <Text style={[styles.price, styles.fontFuturaMed]}>{currencySign} {priceInCurrency.toFixed(2)}</Text>
                        {
                            daysDifference == 1 ?
                                (<Text style={[styles.period1, styles.fontFuturaStd]}> /per night</Text>)
                            :
                                (<Text style={[styles.period1, styles.fontFuturaStd]}> for {daysDifference} nights</Text>)
                        }
                    </View>
                    <View style={styles.pricePeriodWrapper}>
                        <Text style={[styles.price, styles.fontFuturaStd]}>{locAmount} LOC</Text>
                        {
                            daysDifference == 1 ?
                                (<Text style={[styles.period2, styles.fontFuturaStd]}> /per night</Text>)
                            :
                                (<Text style={[styles.period2, styles.fontFuturaStd]}> for {daysDifference} nights</Text>)

                        }
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

HomeDetailBottomBar.propTypes = {
    onPress: PropTypes.func
};

HomeDetailBottomBar.defaultProps = {
    onPress: () => {}
};

let mapStateToProps = (state, ownProps) => {
    const { price, currencyCode} = ownProps;

    const { exchangerSocket, locAmounts, exchangeRates, currency } = state;

    let fiatInEur = exchangeRates.currencyExchangeRates && CurrencyConverter.convert(exchangeRates.currencyExchangeRates, currencyCode, RoomsXMLCurrency.get(), price);
    
    // const fiatInEur = exchangeRates.currencyExchangeRates && CurrencyConverter.convert(exchangeRates.currencyExchangeRates, RoomsXMLCurrency.get(), DEFAULT_CRYPTO_CURRENCY, price);
    let locAmount = locAmounts.locAmounts[fiatInEur] && (locAmounts.locAmounts[fiatInEur].locAmount).toFixed(2);
    // let locAmount = locAmounts.locAmounts[exchangeRates.locRateFiatAmount] && (locAmounts.locAmounts[exchangeRates.locRateFiatAmount].locAmount * fiatInEur / exchangeRates.locRateFiatAmount).toFixed(2);

    if (!locAmount) {
        locAmount = (fiatInEur / exchangeRates.locEurRate).toFixed(2);
    }

    return {
        isLocPriceWebsocketConnected: exchangerSocket.isLocPriceWebsocketConnected,
        currency: currency.currency,
        currencySign: currency.currencySign,
        locAmount,
        exchangeRates
    };
}

const mapDispatchToProps = dispatch => ({
    removeLocAmount: bindActionCreators(removeLocAmount, dispatch),
})
export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(HomeDetailBottomBar));