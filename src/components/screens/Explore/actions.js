import { SELECT_CHECK_IN_CHECK_OUT, SEARCH_VALUE } from './actionTypes';

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
