import { connect } from 'react-redux';
import Explore from '../../templates/Explore';
import { selectCheckInCheckout, setSearchValue } from './actions';

const mapStateToProps = state => ({
    search: state.book.get('search'),
    checkInDate: state.book.get('checkInDate'),
    checkOutDate: state.book.get('checkOutDate'),
    // TODO: bind guests from the proper place in state
    guests: 2
});
const mapDispatchToProps = dispatch => ({
    onDatesSelect: ({ startDate, endDate }) => {
        dispatch(selectCheckInCheckout({ startDate, endDate }));
    },
    onSearchChange: (value) => {
        dispatch(setSearchValue({ value }));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Explore);
