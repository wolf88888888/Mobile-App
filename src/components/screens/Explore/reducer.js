import immutable from 'immutable';
import { SEARCH_VALUE, SELECT_CHECK_IN_CHECK_OUT, SEARCH_REGIONS, SET_TOP_HOMES, SET_COUNTRIES, CLEAR_SELECTED, SET_SELECTED, SET_AUTOCOMPLETE } from './actionTypes';
import { PROPERTY_TYPE } from './constants';

const initialState = {
    propertyType: PROPERTY_TYPE.HOMES
};

export default function explore(state = immutable.fromJS(initialState), action) {
    switch (action.type) {
    case SEARCH_VALUE:
        return state
            .set('search', action.params.value);

    case SELECT_CHECK_IN_CHECK_OUT:
        return state
            .set('checkInDate', action.params.startDate.toString())
            .set('checkOutDate', action.params.endDate.toString());

    case SEARCH_REGIONS:
        return state
            .set('regions', immutable.fromJS(action.params));

    case SET_TOP_HOMES:
        return state
            .set('topHomes', immutable.fromJS(action.params.content.slice(0, 4)));

    case SET_COUNTRIES:
        return state
            .set('countries', immutable.fromJS(action.params));

    case CLEAR_SELECTED:
        return state
            .set('selected', undefined);

    case SET_SELECTED:
        return state
            .set('selected', immutable.fromJS(action.params));

    case SET_AUTOCOMPLETE:
        if (state.get('propertyType') === PROPERTY_TYPE.HOMES) {
            return state.set('autocomplete', state.getIn(['countries', 'content'])
                .filter((country) => {
                    if (!action.params || state.get('selected')) {
                        return false;
                    }
                    if (country.get('name').substr(0, action.params && action.params.length).toUpperCase() === action.params.toUpperCase()) {
                        return country;
                    }
                    return false;
                })
                .map(country => immutable.fromJS({
                    id: country.get('id'),
                    name: country.get('name')
                })));
        } else if (state.get('propertyType') === PROPERTY_TYPE.HOTELS) {
            return state.set('autocomplete', state.get('regions')
                .filter((region) => {
                    const name = region.get('query');
                    if (!action.params || state.get('selected')) {
                        return false;
                    }
                    if (name
                        .replace(/\s+/g, '')
                        .split(',')[1]
                        .substr(0, action.params && action.params.length)
                        .toUpperCase() === action.params.toUpperCase()) {
                        return region;
                    }
                    return false;
                })
                .map(region => (immutable.fromJS({
                    id: region.get('id'),
                    name: region.get('query')
                }))));
        }
        return state;
    default:
        return state;
    }
}
