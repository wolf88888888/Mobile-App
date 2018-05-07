import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import moment from 'moment';

import {
    View,
    Text
} from 'react-native';

import styles from './styles';
import Day from '../../atoms/Day';
import { I18N_MAP } from './i18n';

export default class Month extends Component {
    static propTypes = {
        startDate: PropTypes.instanceOf(moment),
        endDate: PropTypes.instanceOf(moment),
        month: PropTypes.instanceOf(moment),
        today: PropTypes.instanceOf(moment),
        i18n: PropTypes.string,
        color: PropTypes.shape({
            mainColor: PropTypes.string,
            subColor: PropTypes.string
        })
    }

    static defaultProps = {
        startDate: undefined,
        endDate: undefined,
        month: undefined,
        today: undefined,
        i18n: 'en',
        color: {
            mainColor: '',
            subColor: ''
        }
    }
    constructor(props) {
        super(props);
        this.getDayList = this.getDayList.bind(this);
        this.renderDayRow = this.renderDayRow.bind(this);
        this.getMonthText = this.getMonthText.bind(this);
    }
    getMonthText() {
        const {
            month,
            i18n
        } = this.props;
        const y = month.year();
        const m = month.month();
        if (i18n === 'en') {
            return `${I18N_MAP[i18n][m]}, ${y}`;
        }
        return month.format('YYYY年M月');
    }
    getDayList(date) {
        let dayList;
        const month = date.month();
        let weekday = date.isoWeekday();
        if (weekday === 7) {
            dayList = [];
        } else {
            dayList = new Array(weekday).fill({
                empty: date.clone().subtract(1, 'h')
            });
        }
        while (date.month() === month) {
            dayList.push({
                date: date.clone()
            });
            date.add(1, 'days');
        }
        date.subtract(1, 'days');
        weekday = date.isoWeekday();
        if (weekday === 7) {
            return dayList.concat(new Array(6).fill({
                empty: date.clone().hour(1)
            }));
        }
        return dayList.concat(new Array(Math.abs(weekday - 6)).fill({
            empty: date.clone().hour(1)
        }));
    }
    renderDayRow(dayList, index) {
        return (
            <View style={styles.dayRow} key={`row${index}`}>
                {dayList.map(item =>
                    (<Day
                        date={item.date}
                        empty={item.empty}
                        {...this.props}
                        key={shortid.generate()}
                    />))}
            </View>
        );
    }
    render() {
        const {
            month,
            color
        } = this.props;
        const subColor = { color: color.subColor };
        const titleText = this.getMonthText();
        const dayList = this.getDayList(month.clone());
        const rowArray = new Array(dayList.length / 7).fill('');
        return (
            <View style={styles.month}>
                <View style={styles.monthTitle}>
                    <Text style={[styles.monthTitleText, subColor]}>{titleText}</Text>
                </View>
                <View style={styles.days}>
                    {rowArray.map((item, i) =>
                        this.renderDayRow(dayList.slice(i * 7, (i * 7) + 7), i))}
                </View>
            </View>
        );
    }
}
