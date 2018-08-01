import { AsyncStorage } from 'react-native';
import NavTabBar from '../';
import { connect } from 'react-redux';
import requester from '../../../../initDependencies';
import { setLocRate } from '../../../../redux/common/actions';
import { toJS } from '../../../../utils/toJS';

const mapStateToPropst = ({ paymentInfo }) => ({
    paymentInfo
});

const mapDispatchToProps = dispatch => ({
    loadInitialData: ({ currency }) => {
        requester.getLocRateByCurrency(currency).then(res => {
            res.body.then(data => {
                dispatch(setLocRate(data[0][`price_${currency.toLowerCase()}`]));
            });
        });

        requester.getCurrencyRates().then(res => {
            res.body.then(data => {
                AsyncStorage.setItem('currencyRates', JSON.stringify(data));
            });
        });
    }
});

export default connect(mapStateToPropst, mapDispatchToProps)(toJS(NavTabBar));
