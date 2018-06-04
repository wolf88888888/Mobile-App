import {
    SELECT_CHECK_IN_CHECK_OUT,
    SEARCH_VALUE, SEARCH_REGIONS,
    SET_TOP_HOMES,
    SET_COUNTRIES,
    CLEAR_AUTOCOMPLETE,
    CLEAR_SELECTED,
    SET_SELECTED,
    SET_AUTOCOMPLETE
} from './actionTypes';

export function setAutocomplete(searchValue) {
    return {
        type: SET_AUTOCOMPLETE,
        params: searchValue
    };
}

export function selectCheckInCheckout({ startDate, endDate }) {
    return {
        type: SELECT_CHECK_IN_CHECK_OUT,
        params: { startDate, endDate }
    };
}

export function setSearchValue({ value }) {
    return {
        type: SEARCH_VALUE,
        params: { value }
    };
}

export function setSearchRegions(autocompleteResult) {
    return {
        type: SEARCH_REGIONS,
        params: autocompleteResult
    };
}

export function setTopHomes(topHomes) {
    return {
        type: SET_TOP_HOMES,
        params: topHomes
    };
}

export function setCountries(params) {
    return {
        type: SET_COUNTRIES,
        params
    };
}

export function clearAutocomplete() {
    return {
        type: CLEAR_AUTOCOMPLETE
    };
}

export function clearSelected() {
    return {
        type: CLEAR_SELECTED
    };
}

export function setSelected(id, name) {
    return {
        type: SET_SELECTED,
        params: { id, name }
    };
}
