import { createAction } from 'redux-actions';
import requester from '../../../initDependencies';

const countryInfo = {
    SET_COUNTRIES: 'SET_COUNTRIES'
};

export const getCountries = () => {
    return dispatch => {
        requester.getCountries(true).then(res => {
            res.body.then(data => {
                dispatch(setCountries({countries:data}));
            });
        });
    }
};

export const setCountries = createAction(countryInfo.SET_COUNTRIES);