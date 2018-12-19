import React, {Component} from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import Image from 'react-native-remote-svg';
import PropTypes from 'prop-types';

import { CurrencyConverter } from '../../../services/utilities/currencyConverter'

import styles from './styles';

const DEFAULT_CRYPTO_CURRENCY = 'EUR';

class ProfileWalletCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {currency, exchangeRates, locAmounts, currencySign} = this.props;
        
        const fiat = exchangeRates.currencyExchangeRates && CurrencyConverter.convert(exchangeRates.currencyExchangeRates, DEFAULT_CRYPTO_CURRENCY, currency, exchangeRates.locRateFiatAmount);
        let locAmount = locAmounts.locAmounts[exchangeRates.locRateFiatAmount] && locAmounts.locAmounts[exchangeRates.locRateFiatAmount].locAmount;
        if (!locAmount) {
            locAmount = exchangeRates.locRateFiatAmount / exchangeRates.locEurRate;
        }
        let locRate = fiat / locAmount;

        const {walletAddress, locBalance, ethBalance} = this.props;

        let price = locBalance * locRate;
        let displayPrice = currencySign;
        if (locBalance == 0 || price != 0)
            displayPrice += " " + price.toFixed(2);

        return (
            <View style={styles.cardBox}>
                <Image
                    source={require('../../../assets/splash.png')}
                    style={styles.logo} />
                <View style={{ width: '100%' }}>
                    <Text style={styles.walletAddres}>{walletAddress}</Text>
                </View>
                <Text style={styles.balanceLabel}>Current Balance</Text>
                <View style={{ width: '100%' }}>
                    <Text style={styles.balanceText}>{locBalance.toFixed(6)} LOC / {displayPrice}</Text>
                </View>
                <Text style={styles.balanceLabel}>ETH Balance</Text>
                <View style={{ width: '100%' }}>
                    <Text style={styles.balanceText}>{parseFloat(ethBalance).toFixed(6)}</Text>
                </View>
                <Image
                    source={require('../../../assets/splash.png')}
                    style={styles.logoBackground} />
                {
                    (walletAddress == null || walletAddress == '') &&
                    (
                        <TouchableOpacity onPress={this.props.createWallet} style={styles.addMore}>
                            <FontAwesome style={styles.addMorePlus}>{Icons.plus}</FontAwesome>
                        </TouchableOpacity>
                    )
                }
            </View>
        );
    }
}

ProfileWalletCard.propTypes = {
    walletAddress: PropTypes.string,
    locBalance: PropTypes.number,
    ethBalance: PropTypes.number,
    createWallet: PropTypes.func
};

ProfileWalletCard.defaultProps = {
    walletAddress: "",
    locBalance: 0.0,
    ethBalance: 0.0,
    createWallet: () => {}
};

let mapStateToProps = (state) => {
    return {
        currency: state.currency.currency,
        currencySign: state.currency.currencySign,
        
        locAmounts: state.locAmounts,
        exchangeRates: state.exchangeRates,
    };
}

export default connect(mapStateToProps, null)(ProfileWalletCard);
