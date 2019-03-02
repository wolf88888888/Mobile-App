import React, {Component} from 'react';
import {
  FlatList,
  Dimensions
} from 'react-native';
import Moment from 'moment';
import styles from './styles';
import Month from '../../molecules/Month';

const {scale, width, height} = Dimensions.get('window');

export default class MonthList extends Component {
    constructor (props) {
        super(props);
        let monthList = this._getMonthList()
        this.isScrolled = false;
        this.state = {
        monthList: monthList
        };
    }

    componentWillReceiveProps (nextProps) {
        let isDateUpdated = ['startDate', 'endDate', 'minDate', 'maxDate'].reduce((prev, next) => {
            if (prev || nextProps[next] !== this.props[next]) {
                return true;
            }
            return prev;
        }, false);
        if (isDateUpdated) {
            let monthList = this._getMonthList(nextProps);
            this.setState({
                monthList: monthList
            });
        }
    }

    _keyExtractor = (item, index) => {
        return (index.toString());
    }
    
    _renderMonth = ({item}) => {
        return (
            <Month
                month={item.date || {}}
                {...this.props}
            />
        );
    }

    _checkRange = (date, start, end) => {
        if (!date || !start) return false;
        if (!end) return date.year() === start.year() && date.month() === start.month();
        if (date.year() < start.year() || (date.year() === start.year() && date.month() < start.month())) return false;
        if (date.year() > end.year() || (date.year() === end.year() && date.month() > end.month())) return false;
        return true;
    }

    _shouldUpdate = (month, props) => {
        if (!props) return false;
        const {
            startDate,
            endDate
        } = props;
        const {
            date
        } = month;
        let next = this._checkRange(date, startDate, endDate);
        let prev = this._checkRange(date, this.props.startDate, this.props.endDate);
        if (prev || next) return true;
        return false;
    }

    _getMonthList = (props) => {
        let minDate = (props || this.props).minDate.clone().date(1);
        let maxDate = (props || this.props).maxDate.clone();
        let monthList = [];
        if (!maxDate || !minDate) return monthList;
        while (maxDate > minDate || (
            maxDate.year() === minDate.year() &&
            maxDate.month() === minDate.month()
        )) {
            let month = {
                date: minDate.clone()
            };
            month.shouldUpdate = this._shouldUpdate(month, props);
            monthList.push(month);
            minDate.add(1, 'month');
        }
        return monthList;
    }

    _getWeekNums = (start, end) => {
        let clonedMoment = Moment(start), date, day, num, y, m, total = 0;
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

    _scrollToSelecetdMonth = () => {
        const {
        startDate,
        minDate
        } = this.props;
        let monthOffset = 12 * (startDate.year() - minDate.year()) + startDate.month() - minDate.month();
        let weekOffset = this._getWeekNums(minDate, startDate);

        let paddingH = 30;
        let dayWidth = (width - paddingH) / 7;
        const mod = (scale * (width - paddingH)) % 7;
        if (mod) {
            dayWidth = (((7 - mod) / scale) + (width - paddingH)) / 7;
        }

        console.log("_scrollToSelecetdMonth: ", monthOffset, weekOffset)
        this.flatList && this.flatList.scrollToOffset({
            offset: monthOffset * (20 + 10) + (monthOffset ? weekOffset * dayWidth : 0),
            animated: true
        });
    }

    onContentSizeChange = (contentWidth, contentHeight) => {
        if (contentHeight > height && !this.isScrolled) {
            this.props.startDate && this._scrollToSelecetdMonth();
            this.isScrolled = true;
        }
    }

    render () {
        return (
            <FlatList
                ref={(list) => this.flatList = list}
                style={styles.scrollArea}
                data={this.state.monthList}
                extraData={this.state}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderMonth}
                onContentSizeChange={this.onContentSizeChange}
                initialNumToRender={2}
                maxToRenderPerBatch={2}
            />
        );
    }
}
