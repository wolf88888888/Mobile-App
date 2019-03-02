import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
    View,
    Text,
    TouchableHighlight
} from 'react-native';

import Moment from 'moment';
import MonthList from '../../organisms/MonthList';
import { I18N_MAP } from './i18n';
import CloseButton from '../../atoms/CloseButton';

import styles from './styles';

export default class Calendar extends Component {
    static propTypes = {
        i18n: PropTypes.string,
        format: PropTypes.string,
        customI18n: PropTypes.object,
        color: PropTypes.object,
        minDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
        maxDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)])
    }

    static defaultProps = {
        format: 'YYYY-MM-DD',
        i18n: 'en',
        customI18n: {},
        color: {}
    }
    
    constructor (props) {
        super(props);
            this.state = {
        };
        this._today = Moment();
        this._year = this._today.year();
        this._getDateRange();

        console.log("this.props.navigation.state.params", this.props.navigation.state.params);
    }

    componentDidMount () {
        this._resetCalendar();
    }

    _i18n = (data, type) => {
        const {
            i18n,
            customI18n
        } = this.props;
        if (~['w', 'weekday', 'text'].indexOf(type)) {
            return (customI18n[type] || {})[data] || I18N_MAP[i18n][type][data];
        }
        if (type === 'date') {
            return data.format(customI18n[type] || I18N_MAP[i18n][type]);
        }
    }

    _resetCalendar = () => {
        const {
            startDate,
            endDate,
            format_input
        } = this.props.navigation.state.params;
        let start = Moment(startDate, format_input);
        let end = Moment(endDate, format_input);
        let isStartValid = start.isValid() && start >= this._minDate && start <= this._maxDate;
        let isEndValid = end.isValid() && end >= this._minDate && end <= this._maxDate;
        this.setState({
            startDate: isStartValid ? start : null,
            startDateText: isStartValid ? this._i18n(start, 'date') : '',
            startWeekdayText: isStartValid ? this._i18n(start.isoWeekday(), 'w') : '',
            endDate: isEndValid ? end: null,
            endDateText: isEndValid ? this._i18n(end, 'date') : '',
            endWeekdayText: isEndValid ? this._i18n(end.isoWeekday(), 'w') : ''
        });
    }

    _getDateRange = () => {
        const {
            maxDate,
            minDate,
            format_input 
        } = this.props.navigation.state.params;
        let max = Moment(maxDate, format_input);
        let min = Moment(minDate, format_input);
        let maxValid = max.isValid();
        let minValid = min.isValid();
        if (!maxValid && !minValid) {
            max = Moment().add(3, 'months');
            min = Moment();
        }
        if (!maxValid && minValid) {
            max = min.add(3, 'months');
        }
        if (maxValid && !minValid) {
            min = max.subtract(3, 'months');
        }
        if (min.isSameOrAfter(max)) return {};
        this._minDate = min;
        this._maxDate = max;
    }

    _onChoose = (day) => {
        const {
            startDate,
            endDate
        } = this.state;
        if ((!startDate && !endDate) || day < startDate || (startDate && endDate)) {
            this.setState({
            startDate: day,
            endDate: null,
            startDateText: this._i18n(day, 'date'),
            startWeekdayText: this._i18n(day.isoWeekday(), 'w'),
            endDateText: '',
            endWeekdayText: '',
            });
        } else if (startDate && !endDate && day > startDate) {
            this.setState({
            endDate: day,
            endDateText: this._i18n(day, 'date'),
            endWeekdayText: this._i18n(day.isoWeekday(), 'w')
            });
        }
    }

    cancel = () => {
        this.props.navigation.goBack();
        // this._resetCalendar();
    }

    clear = () => {
        this.setState({
            startDate: null,
            endDate: null,
            startDateText: '',
            startWeekdayText: '',
            endDateText: '',
            endWeekdayText: ''
        });
    }

    confirm = () => {
        const {
            startDate,
            endDate
        } = this.state;
        const {
            format_display
        } = this.props.navigation.state.params;
        let startMoment = startDate ? startDate.clone() : null;
        let endMoment = endDate ? endDate.clone() : null;
        this.props.navigation.state.params.onConfirm({
            startDate: startMoment ? startMoment.format(format_display) : null,
            endDate: endMoment ? endMoment.format(format_display) : null,
            startMoment,
            endMoment
        });
        this.props.navigation.goBack();
    }

    render () {
        const {
            startDate,
            endDate,
            startDateText,
            startWeekdayText,
            endDateText,
            endWeekdayText
        } = this.state;
        const {
            mainColor = '#f0f1f3',
            subColor = '#000',
            borderColor= '#1f2427',
            primaryColor = '#d87a61'
        } = this.props.color;
        let color = {mainColor, subColor, borderColor, primaryColor};
        let mainBack = {backgroundColor: mainColor};
        let subBack = {backgroundColor: subColor};
        let subFontColor = {color: subColor};
        const primaryFontColor = { color: primaryColor };
        let isValid = !startDate || endDate;
        let isClearVisible = startDate || endDate;
        return (
            <View style={[styles.container, mainBack]}>
            <View style={styles.ctrl}>
                <CloseButton onPress={this.cancel} />
                {isClearVisible && <TouchableHighlight
                underlayColor="transparent"
                activeOpacity={0.8}
                style={{marginRight:18, paddingBottom:10, alignItems:'flex-end', justifyContent:'flex-end'}}
                onPress={this.clear}>
                    <Text style={[styles.clearText, subFontColor]}>{this._i18n('clear', 'text')}</Text>
                </TouchableHighlight>}
            </View>
            <View style={styles.result}>
                <View style={styles.resultPart}>
                <Text style={[styles.resultText, styles.weekdayText, subFontColor]}>
                    {startWeekdayText || this._i18n('date', 'text')}
                </Text>
                <Text style={[styles.resultText, styles.dateText, primaryFontColor]}>
                    {startDateText || this._i18n('start', 'text')}
                </Text>
                </View>
                <View style={[styles.resultSlash, subBack]}/>
                <View style={styles.resultPart}>
                <Text style={[styles.resultText, styles.weekdayText, subFontColor]}>
                    {endWeekdayText || this._i18n('date', 'text')}
                </Text>
                <Text style={[styles.resultText, styles.dateText, primaryFontColor]}>
                    {endDateText || this._i18n('end', 'text')}
                </Text>
                </View>
            </View>
            <View style={styles.week}>
                {[7, 1, 2, 3, 4, 5, 6].map(item =>
                <Text style={[styles.weekText, subFontColor]}　key={item}>{this._i18n(item, 'w')}</Text>
                )}
            </View>
            <View style={styles.scroll}>
                <MonthList
                today={this._today}
                minDate={this._minDate}
                maxDate={this._maxDate}
                startDate={this.state.startDate}
                endDate={this.state.endDate}
                onChoose={this._onChoose}
                i18n={this.props.i18n}
                color={color}
                />
            </View>
            <View style={styles.btn}>
                {isValid ?
                <TouchableHighlight
                    underlayColor="rgba(255, 255, 255, 0.45)"
                    style={styles.confirmContainer}
                    onPress={this.confirm}>
                    <View style={styles.confirmBtn}>
                    <Text
                        ellipsisMode="tail" numberOfLines={1}
                        style={styles.confirmText}>
                        {this._i18n('save', 'text')}
                    </Text>
                    </View>
                </TouchableHighlight> :
                <View style={[styles.confirmContainer, styles.confirmContainerDisabled]}>
                    <View style={styles.confirmBtn}>
                    <Text
                        ellipsisMode="tail" numberOfLines={1}
                        style={[styles.confirmText, styles.confirmTextDisabled]}>
                        {this._i18n('save', 'text')}
                    </Text>
                    </View>
                </View>
                }
            </View>
            </View>
        );
    }
}
