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

class HotelDetailBottomBar extends Component {
    static self;
    isStop = false;
    constructor(props) {
        super(props);
        HotelDetailBottomBar.self = this;

        const {exchangeRates, price} = props;

        let isLocPriceRendered = false;
        let fiatInEur;
    
        if (exchangeRates.currencyExchangeRates) {
            fiatInEur = exchangeRates.currencyExchangeRates && CurrencyConverter.convert(exchangeRates.currencyExchangeRates, RoomsXMLCurrency.get(), DEFAULT_CRYPTO_CURRENCY, price);
        
            console.log("HotelDetailBottomBar WebsocketClient.sendMessage0", fiatInEur);
            WebsocketClient.sendMessage(fiatInEur, null, { fiatAmount: fiatInEur }, true);
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
        console.log("HotelDetailBottomBar  componentWillReceiveProps");
        if (nextProps.isLocPriceWebsocketConnected &&
            nextProps.isLocPriceWebsocketConnected !== this.props.isLocPriceWebsocketConnected) {
            WebsocketClient.sendMessage(this.state.fiatInEur, null, { fiatAmount: this.state.fiatInEur }, true);
        }
    
        if (nextProps.exchangeRates.currencyExchangeRates && !this.state.isLocPriceRendered) {
            const fiatInEur = nextProps.exchangeRates.currencyExchangeRates && CurrencyConverter.convert(nextProps.exchangeRates.currencyExchangeRates, RoomsXMLCurrency.get(), DEFAULT_CRYPTO_CURRENCY, this.props.price);
        
            WebsocketClient.sendMessage(fiatInEur, null, { fiatAmount: fiatInEur }, true);
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
        WebsocketClient.sendMessage(this.state.fiatInEur, 'unsubscribe', null, true);
        if (this.props.locAmount) {
            removeLocAmount(this.state.fiatInEur);
        }
        
		if (this.list !== undefined && this.list !== null) {
			this.list.forEach( item => item.remove() )
		}
    }

    _didFocus() {
        const {isLocPriceWebsocketConnected} = HotelDetailBottomBar.self.props;
        if (isLocPriceWebsocketConnected && !HotelDetailBottomBar.self.state.isLocPriceRendered) {
            HotelDetailBottomBar.self.state.isLocPriceRendered = true;
            WebsocketClient.sendMessage(HotelDetailBottomBar.self.state.fiatInEur, null, { fiatAmount: HotelDetailBottomBar.self.state.fiatInEur }, true);
            console.log("HotelDetailBottomBar - _didFocus", HotelDetailBottomBar.self.props, HotelDetailBottomBar.self.state.fiatInEur);
        }
        HotelDetailBottomBar.self.isStop = false;
    }

    _willBlur() {
        console.log("HotelDetailBottomBar - _willBlur");
        const {isLocPriceWebsocketConnected} = HotelDetailBottomBar.self.props;
        if (isLocPriceWebsocketConnected && HotelDetailBottomBar.self.state.isLocPriceRendered) {
            console.log("HotelDetailBottomBar - _willBlur", HotelDetailBottomBar.self.props, HotelDetailBottomBar.self.state.isLocPriceRendered, HotelDetailBottomBar.self.state.fiatInEur);
            WebsocketClient.sendMessage(HotelDetailBottomBar.self.state.fiatInEur, 'unsubscribe', null, true);
            HotelDetailBottomBar.self.state.isLocPriceRendered = false;
        }
        HotelDetailBottomBar.self.isStop = true;
    }

    render() {
        const {currency, currencySign, exchangeRates, price, locAmount, daysDifference, onPress, titleBtn} = this.props;

        let priceInCurrency = exchangeRates.currencyExchangeRates && CurrencyConverter.convert(exchangeRates.currencyExchangeRates, RoomsXMLCurrency.get(), currency, price);

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

HotelDetailBottomBar.propTypes = {
    onPress: PropTypes.func
};

HotelDetailBottomBar.defaultProps = {
    onPress: () => {}
};

let mapStateToProps = (state, ownProps) => {
    const { price } = ownProps;

    const { exchangerSocket, locAmounts, exchangeRates, currency } = state;

    const fiatInEur = exchangeRates.currencyExchangeRates && CurrencyConverter.convert(exchangeRates.currencyExchangeRates, RoomsXMLCurrency.get(), DEFAULT_CRYPTO_CURRENCY, price);
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
export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(HotelDetailBottomBar));