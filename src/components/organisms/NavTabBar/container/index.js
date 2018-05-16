import { AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { setLocRate } from '../../../../redux/common/actions';
import { getLocRateInUserSelectedCurrency, getCurrencyRates } from '../../../../utils/requester';
import NavTabBar from '../';
import { toJS } from '../../../../utils/toJS';

const mapStateToPropst = ({ paymentInfo }) => ({
    paymentInfo
});

const mapDispatchToProps = dispatch => ({
    loadInitialData: ({ currency }) => {
        getLocRateInUserSelectedCurrency(currency)
            .then((data) => {
                dispatch(setLocRate(data[0][`price_${currency.toLowerCase()}`]));
            });

        getCurrencyRates().then((data) => {
            AsyncStorage.setItem('currencyRates', JSON.stringify(data));
        });
    }
});

export default connect(mapStateToPropst, mapDispatchToProps)(toJS(NavTabBar));
