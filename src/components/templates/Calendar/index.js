import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
    View,
    Text,
    Modal,
    TouchableHighlight
} from 'react-native';

import Image from 'react-native-remote-svg';
import Moment from 'moment';
import styles from './styles';
import MonthList from '../../organisms/MonthList';
import { I18N_MAP } from './i18n';

export default class Calendar extends Component {
    static propTypes = {
        startDate: PropTypes.string,
        endDate: PropTypes.string,
        i18n: PropTypes.string,
        format: PropTypes.string,
        customI18n: PropTypes.object, // eslint-disable-line
        color: PropTypes.shape({
            mainColor: PropTypes.string,
            subColor: PropTypes.string,
            borderColor: PropTypes.string,
            primaryColor: PropTypes.string
        }),
        minDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
        maxDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
        onConfirm: PropTypes.func
    }
    static defaultProps = {
        startDate: '',
        endDate: '',
        format: 'YYYY-MM-DD',
        i18n: 'en',
        customI18n: {},
        color: {
            mainColor: '#f0f1f3',
            subColor: '#1f2427',
            borderColor: '#1f2427',
            primaryColor: '#d87a61'
        },
        minDate: '',
        maxDate: '',
        onConfirm: () => {}
    }

    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false
        };
        this.today = Moment();
        this.year = this.today.year();
        this.i18n = this.i18n.bind(this);
        this.getDateRange = this.getDateRange.bind(this);
        this.onChoose = this.onChoose.bind(this);
        this.resetCalendar = this.resetCalendar.bind(this);
        this.close = this.close.bind(this);
        this.cancel = this.cancel.bind(this);
        this.open = this.open.bind(this);
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
        if ((!startDate && !endDate) || day < startDate || (startDate && endDate)) {
            this.setState({
                startDate: day,
                endDate: null,
                startDateText: this.i18n(day, 'date'),
                startWeekdayText: this.i18n(day.isoWeekday(), 'weekday'),
                endDateText: '',
                endWeekdayText: ''
            });
        } else if (startDate && !endDate && day > startDate) {
            this.setState({
                endDate: day,
                endDateText: this.i18n(day, 'date'),
                endWeekdayText: this.i18n(day.isoWeekday(), 'weekday')
            });
        }
    }

    getDateRange() {
        const {
            maxDate,
            minDate,
            format
        } = this.props;
        let max = Moment(maxDate, format);
        let min = Moment(minDate, format);
        const maxValid = max.isValid();
        const minValid = min.isValid();
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
        this.minDate = min;
        this.maxDate = max;
        return {};
    }

    resetCalendar() {
        const {
            startDate,
            endDate,
            format
        } = this.props;

        const start = Moment(startDate, format);
        const end = Moment(endDate, format);
        const isStartValid = start.isValid() && start >= this.minDate && start <= this.maxDate;
        const isEndValid = end.isValid() && end >= this.minDate && end <= this.maxDate;
        this.setState({
            startDate: isStartValid ? start : null,
            startDateText: isStartValid ? this.i18n(start, 'date') : '',
            startWeekdayText: isStartValid ? this.i18n(start.isoWeekday(), 'weekday') : '',
            endDate: isEndValid ? end : null,
            endDateText: isEndValid ? this.i18n(end, 'date') : '',
            endWeekdayText: isEndValid ? this.i18n(end.isoWeekday(), 'weekday') : ''
        });
    }

    i18n(data, type) {
        const {
            i18n,
            customI18n
        } = this.props;
        if (~['w', 'weekday', 'text'].indexOf(type)) { // eslint-disable-line
            return (customI18n[type] || {})[data] || I18N_MAP[i18n][type][data];
        }
        if (type === 'date') {
            return data.format(customI18n[type] || I18N_MAP[i18n][type]);
        }
        return {};
    }

    cancel() {
        this.close();
        this.resetCalendar();
    }
    close() {
        this.setState({
            isModalVisible: false
        });
    }
    open() {
        this.setState({
            isModalVisible: true
        });
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
        const startMoment = startDate ? startDate.clone() : null;
        const endMoment = endDate ? endDate.clone() : null;
        this.props.onConfirm({
            startDate: startMoment ? startMoment.toDate() : null,
            endDate: endMoment ? endMoment.toDate() : null,
            startMoment,
            endMoment
        });
        this.close();
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
            <Modal
                animationType="slide"
                visible={this.state.isModalVisible}
                onRequestClose={this.close}
            >
                <View style={[styles.container, mainBack]}>
                    <View style={styles.ctrl}>
                        <TouchableHighlight
                            underlayColor="transparent"
                            onPress={this.cancel}
                        >
                            <Image
                                style={styles.closeIcon}
                                source={require('../../../assets/svg/close.svg')}
                                resizeMode="contain"
                            />
                        </TouchableHighlight>
                        {
                            isClearVisible &&
                            <TouchableHighlight
                                underlayColor="transparent"
                                activeOpacity={0.8}
                                onPress={this.clear}
                            >
                                <Text style={[styles.clearText, subFontColor]}>{this.i18n('clear', 'text')}</Text>
                            </TouchableHighlight>
                        }
                    </View>
                    <View style={styles.result}>
                        <View style={styles.resultPart}>
                            <Text style={[styles.resultText, styles.startText, subFontColor]}>
                                {startDateText || this.i18n('start', 'text')}
                            </Text>
                            <Text style={[styles.resultText, styles.startText, primaryFontColor]}>
                                {startWeekdayText || this.i18n('date', 'text')}
                            </Text>
                        </View>
                        <View style={[styles.resultSlash, subBack]} />
                        <View style={styles.resultPart}>
                            <Text style={[styles.resultText, styles.endText, subFontColor]}>
                                {endDateText || this.i18n('end', 'text')}
                            </Text>
                            <Text style={[styles.resultText, styles.endText, primaryFontColor]}>
                                {endWeekdayText || this.i18n('date', 'text')}
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
            </Modal>
        );
    }
}
