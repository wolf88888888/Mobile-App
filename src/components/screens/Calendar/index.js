import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
    View,
    Text,
    TouchableHighlight
} from 'react-native';

import Moment from 'moment';
import styles from './styles';
import MonthList from '../../organisms/MonthList';
import { I18N_MAP } from './i18n';
import CloseButton from '../../atoms/CloseButton';

export default class Calendar extends Component {
    static propTypes = {
        color: PropTypes.shape({
            mainColor: PropTypes.string,
            subColor: PropTypes.string,
            borderColor: PropTypes.string,
            primaryColor: PropTypes.string
        }),
    }
    static defaultProps = {
        color: {
            mainColor: '#f0f1f3',
            subColor: '#000',
            borderColor: '#1f2427',
            primaryColor: '#d87a61'
        },
    }

    constructor(props) {
        super(props);
        this.state = {
        };
        this.today = Moment();
        this.year = this.today.year();
        this.i18n = this.i18n.bind(this);
        this.getDateRange = this.getDateRange.bind(this);
        this.onChoose = this.onChoose.bind(this);
        this.resetCalendar = this.resetCalendar.bind(this);
        this.cancel = this.cancel.bind(this);
        this.clear = this.clear.bind(this);
        this.confirm = this.confirm.bind(this);
        this.getDateRange();
    }
    componentDidMount() {
        this.resetCalendar();
    }

    onChoose(day) {
        const {
            startDate,
            endDate
        } = this.state;
        console.log("onChoose", startDate, endDate);
        if ((!startDate && !endDate) || day < startDate || (startDate && endDate)) {
            console.log("startDate", day);
            this.setState({
                startDate: day,
                endDate: null,
                startDateText: this.i18n(day, 'date'),
                startWeekdayText: this.i18n(day.isoWeekday(), 'w'),
                endDateText: '',
                endWeekdayText: ''
            });
        } else if (startDate && !endDate && day > startDate) {
            console.log("endDate", day);
            this.setState({
                endDate: day,
                endDateText: this.i18n(day, 'date'),
                endWeekdayText: this.i18n(day.isoWeekday(), 'w')
            });
        }
    }

    getDateRange() {
        const { 
            maxDate,
            minDate,
            format_input 
        } = this.props.navigation.state.params;

        let max = Moment(maxDate, format_input);
        let min = Moment(minDate, format_input);
        const maxValid = max.isValid();
        const minValid = min.isValid();
        if (!maxValid && !minValid) {
            max = Moment().add(12, 'months');
            min = Moment();
        }
        if (!maxValid && minValid) {
            max = min.add(12, 'months');
        }
        if (maxValid && !minValid) {
            min = max.subtract(12, 'months');
        }
        if (min.isSameOrAfter(max)) return {};
        this.minDate = min;
        this.maxDate = max;
        return {};
    }

    resetCalendar() {
        const { 
            startDate,
            endDate,
            format_input
        } = this.props.navigation.state.params;

        console.log("resetCalendar --", startDate, endDate, format_input);

        const start = Moment(startDate, format_input);
        const end = Moment(endDate, format_input);
        const isStartValid = start.isValid() && start >= this.minDate && start <= this.maxDate;
        const isEndValid = end.isValid() && end >= this.minDate && end <= this.maxDate;
        this.setState({
            startDate: isStartValid ? start : null,
            startDateText: isStartValid ? this.i18n(start, 'date') : '',
            startWeekdayText: isStartValid ? this.i18n(start.isoWeekday(), 'w') : '',
            endDate: isEndValid ? end : null,
            endDateText: isEndValid ? this.i18n(end, 'date') : '',
            endWeekdayText: isEndValid ? this.i18n(end.isoWeekday(), 'w') : ''
        });
    }

    i18n(data, type) {
        const i18n = 'en';
        const customI18n = {}
        if (~['w', 'weekday', 'text'].indexOf(type)) { // eslint-disable-line
            return (customI18n[type] || {})[data] || I18N_MAP[i18n][type][data];
        }
        if (type === 'date') {
            return data.format(customI18n[type] || I18N_MAP[i18n][type]);
        }
        return {};
    }

    cancel() {
        this.props.navigation.goBack();
        // this.resetCalendar();
    }
    
    clear() {
        this.setState({
            startDate: null,
            endDate: null,
            startDateText: '',
            startWeekdayText: '',
            endDateText: '',
            endWeekdayText: ''
        });
    }
    confirm() {
        const {
            startDate,
            endDate
        } = this.state;
        const startMoment = startDate ? startDate : null;
        const endMoment = endDate ? endDate : null;
        this.props.navigation.state.params.onConfirm({
            startDate: startMoment ? startMoment.format(this.props.navigation.state.params.format_display) : null,
            endDate: endMoment ? endMoment.format(this.props.navigation.state.params.format_display) : null,
            startMoment,
            endMoment
        });
        this.props.navigation.goBack();
    }
    render() {
        const {
            startDate,
            endDate,
            startDateText,
            startWeekdayText,
            endDateText,
            endWeekdayText
        } = this.state;

        const {
            mainColor,
            subColor,
            borderColor,
            primaryColor
        } = this.props.color;

        const color = {
            mainColor, subColor, borderColor, primaryColor
        };
        const mainBack = { backgroundColor: mainColor };
        const subBack = { backgroundColor: subColor };
        const subFontColor = { color: subColor };
        const primaryFontColor = { color: primaryColor };
        const isValid = !startDate || endDate;
        const isClearVisible = startDate || endDate;
        return (
            <View style={[styles.container, mainBack]}>
                <View style={{justifyContent: 'space-between', flexDirection: 'row',}}>
                    <CloseButton onPress={this.cancel} />
                    {
                        isClearVisible &&
                        <TouchableHighlight
                            underlayColor="transparent"
                            activeOpacity={0.8}
                            onPress={this.clear}
                            style={{marginTop: 45, marginRight:18, alignItems:'flex-end', justifyContent:'center'}}
                        >
                            <Text style={[styles.clearText, subFontColor]}>{this.i18n('clear', 'text')}</Text>
                        </TouchableHighlight>
                    }
                </View>
                
                <View style={styles.result}>
                    <View style={styles.resultPart}>
                        <Text style={[styles.resultText, styles.weekdayText, subFontColor]}>
                            {startWeekdayText || this.i18n('date', 'text')}
                        </Text>
                        <Text style={[styles.resultText, styles.dateText, primaryFontColor]}>
                            {startDateText || this.i18n('start', 'text')}
                        </Text>
                    </View>
                    <View style={[styles.resultSlash, subBack]} />
                    <View style={styles.resultPart}>
                        <Text style={[styles.resultText, styles.weekdayText, subFontColor]}>
                            {endWeekdayText || this.i18n('date', 'text')}
                        </Text>
                        <Text style={[styles.resultText, styles.dateText, primaryFontColor]}>
                            {endDateText || this.i18n('end', 'text')}
                        </Text>
                    </View>
                </View>
                <View style={styles.week}>
                    {[7, 1, 2, 3, 4, 5, 6].map(item =>
                        <Text style={[styles.weekText, subFontColor]} key={item}>{this.i18n(item, 'w')}</Text>)}
                </View>
                <View style={[styles.scroll]}>
                    <MonthList
                        today={this.today}
                        minDate={this.minDate}
                        maxDate={this.maxDate}
                        startDate={this.state.startDate}
                        endDate={this.state.endDate}
                        onChoose={this.onChoose}
                        i18n={this.props.i18n}
                        color={color}
                    />
                </View>
                <View style={styles.btn}>
                    {isValid ?
                        <TouchableHighlight
                            underlayColor={primaryColor}
                            style={styles.confirmContainer}
                            onPress={this.confirm}
                        >
                            <View style={styles.confirmBtn}>
                                <Text
                                    ellipsisMode="tail"
                                    numberOfLines={1}
                                    style={[styles.confirmText]}
                                >
                                    {this.i18n('save', 'text')}
                                </Text>
                            </View>
                        </TouchableHighlight> :
                        <View style={[styles.confirmContainer, styles.confirmContainerDisabled]}>
                            <View style={styles.confirmBtn}>
                                <Text
                                    ellipsisMode="tail"
                                    numberOfLines={1}
                                    style={[styles.confirmText, styles.confirmTextDisabled]}
                                >
                                    {this.i18n('save', 'text')}
                                </Text>
                            </View>
                        </View>
                    }
                </View>
            </View>
        );
    }
}
