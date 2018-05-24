import { connect } from 'react-redux';
import Explore from '../../templates/Explore';
import { selectCheckInCheckout, setSearchValue, setSearchRegions, setTopHomes, setCountries, clearSelected, setSelected, setAutocomplete } from './actions';
import { getRegionsBySearchParameter, getTopHomes, getCountriesWithListings } from '../../../utils/requester';
import { toJS } from '../../../utils/toJS';

const mapStateToProps = state => ({
    search: state.explore.get('search'),
    checkInDate: state.explore.get('checkInDate'),
    checkOutDate: state.explore.get('checkOutDate'),
    countries: state.explore.get('countries'),
    topHomes: state.explore.get('topHomes'),
    selected: state.explore.get('selected'),
    propertyType: state.explore.get('propertyType'),
    autocomplete: state.explore.get('autocomplete')
});
const mapDispatchToProps = dispatch => ({
    load: async () => {
        const topHomes = await getTopHomes();
        const countries = await getCountriesWithListings();
        dispatch(setCountries(countries));
        dispatch(setTopHomes(topHomes));
    },
    onDatesSelect: ({ startDate, endDate }) => {
        dispatch(selectCheckInCheckout({ startDate, endDate }));
    },
    onSearchChange: (value) => {
        dispatch(setSearchValue({ value }));
        dispatch(clearSelected());
        getRegionsBySearchParameter(value).then((res) => {
            dispatch(setSearchRegions(res));
            dispatch(setAutocomplete(value));
        });
    },
    onAutocompleteSelect: (id, name) => {
        dispatch(clearSelected());
        dispatch(setSearchValue({ value: name }));
        dispatch(setAutocomplete(''));
        dispatch(setSelected(id, name));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(toJS(Explore));
