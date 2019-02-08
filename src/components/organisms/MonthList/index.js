import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    ListView,
    Dimensions
} from 'react-native';
import Moment from 'moment';
import Month from '../../molecules/Month';

const { width } = Dimensions.get('window');
export default class MonthList extends Component {
    static propTypes = {
        minDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Moment)]),
        startDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Moment)]),
        endDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Moment)])
    }

    static defaultProps = {
        minDate: '',
        startDate: '',
        endDate: ''
    }

    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r2.shouldUpdate
        });
        this.monthList = [];
        this.state = {
            dataSource: this.ds.cloneWithRows(this.getMonthList())
        };
        this.renderMonth = this.renderMonth.bind(this);
        this.shouldUpdate = this.shouldUpdate.bind(this);
        this.checkRange = this.checkRange.bind(this);
        this.getWeekNums = this.getWeekNums.bind(this);
        this.scrollToSelecetdMonth = this.scrollToSelecetdMonth.bind(this);
    }

    componentDidMount() {
        if (this.props.startDate) {
            this.scrollToSelecetdMonth();
        }
    }

    componentWillReceiveProps(nextProps) {
        const isDateUpdated = ['startDate', 'endDate', 'minDate', 'maxDate'].reduce((prev, next) => {
            if (prev || nextProps[next] !== this.props[next]) {
                return true;
            }
            return prev;
        }, false);
        if (isDateUpdated) {
            this.setState({
                dataSource:
          this.state.dataSource.cloneWithRows(this.getMonthList(nextProps))
            });
        }
    }

    getMonthList(props) {
        const minDate = (props || this.props).minDate.clone().date(1);
        const maxDate = (props || this.props).maxDate.clone();
        const monthList = [];
        if (!maxDate || !minDate) return monthList;
        while (maxDate > minDate || (
            maxDate.year() === minDate.year() &&
      maxDate.month() === minDate.month()
        )) {
            const month = {
                date: minDate.clone()
            };
            month.shouldUpdate = this.shouldUpdate(month, props);
            monthList.push(month);
            minDate.add(1, 'month');
        }
        return monthList;
    }
    getWeekNums(start, end) {
        const clonedMoment = Moment(start);
        let date;
        let day;
        let num;
        let y;
        let m;
        let total = 0;
        while (!clonedMoment.isSame(end, 'months')) {
            y = clonedMoment.year();
            m = clonedMoment.month();
            date = new Date(y, m, 1);
            day = date.getDay();
            num = new Date(y, m + 1, 0).getDate();
            total += Math.ceil((num + day) / 7);
            clonedMoment.add(1, 'months');
        }
        return total;
    }

    shouldUpdate(month, props) {
        if (!props) return false;
        const {
            startDate,
            endDate
        } = props;
        const {
            date
        } = month;
        const next = this.checkRange(date, startDate, endDate);
        const prev = this.checkRange(date, this.props.startDate, this.props.endDate);
        if (prev || next) return true;
        return false;
    }

    checkRange(date, start, end) {
        if (!date || !start) return false;
        if (!end) return date.year() === start.year() && date.month() === start.month();
        if (date.year() < start.year() || (date.year() === start.year() && date.month() < start.month())) return false;
        if (date.year() > end.year() || (date.year() === end.year() && date.month() > end.month())) return false;
        return true;
    }

    scrollToSelecetdMonth() {
        const {
            startDate,
            minDate
        } = this.props;
        const monthOffset = ((12 * (startDate.year() - minDate.year())) + startDate.month()) - minDate.month();
        const weekOffset = this.getWeekNums(minDate, startDate);
        setTimeout(() => {
            let moveY = (monthOffset * (24 + 25)) + (monthOffset ? weekOffset * Math.ceil((width / 7) + 10) : 0);
            if (moveY === 0) {
                moveY = 1;
            }
            this.list.scrollTo({
                x: 0,
                y: moveY,
                animated: true
            });
        }, 500);
    }

    renderMonth(month) {
        return (
            <Month
                month={month.date || {}}
                {...this.props}
            />
        );
    }

    render() {
        return (
            <ListView
                ref={(list) => { this.list = list; }}
                style={{flex: 1}}
                dataSource={this.state.dataSource}
                renderRow={this.renderMonth}
                pageSize={12}
                initialListSize={12}
                showsVerticalScrollIndicator={false}
            />
        );
    }
}
