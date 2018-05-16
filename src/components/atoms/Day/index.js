import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import {
    View,
    Text,
    TouchableHighlight
} from 'react-native';
import styles from './styles';

export default class Day extends Component {
    static propTypes = {
        onChoose: PropTypes.func,
        date: PropTypes.instanceOf(moment),
        color: PropTypes.shape({
            mainColor: PropTypes.string,
            subColor: PropTypes.string,
            borderColor: PropTypes.string,
            primaryColor: PropTypes.string
        })
    }

    static defaultProps = {
        onChoose: () => {},
        date: undefined,
        color: {
            mainColor: '#f0f1f3',
            subColor: '#1f2427',
            borderColor: '#1f2427',
            primaryColor: '#d87a61'
        }
    }

    constructor(props) {
        super(props);
        this.chooseDay = this.chooseDay.bind(this);
        this.statusCheck = this.statusCheck.bind(this);
        this.statusCheck();
    }

    shouldComponentUpdate(nextProps) {
        const prevStatus = this.isFocus;
        const nextStatus = this.statusCheck(nextProps);
        if (prevStatus || nextStatus) return true;
        return false;
    }
    statusCheck(props) {
        const {
            startDate,
            endDate,
            today,
            date = null,
            minDate,
            maxDate,
            empty
        } = props || this.props;
        this.isToday = today.isSame(date, 'd');
        this.isValid = date &&
      (date >= minDate || date.isSame(minDate, 'd')) &&
      (date <= maxDate || date.isSame(maxDate, 'd'));
        this.isMid = ((date > startDate) && (date < endDate)) ||
      (!date && empty >= startDate && empty <= endDate);
        this.isStart = date && date.isSame(startDate, 'd');
        this.isStartPart = this.isStart && endDate;
        this.isEnd = date && date.isSame(endDate, 'd');
        this.isFocus = this.isMid || this.isStart || this.isEnd;
        return this.isFocus;
    }

    chooseDay() {
        this.props.onChoose(this.props.date);
    }
    render() {
        const {
            date,
            color
        } = this.props;
        const text = date ? date.date() : '';
        const mainColor = { color: color.mainColor };
        const subColor = { color: color.subColor };
        const subBack = { backgroundColor: color.primaryColor };
        return (
            <View
                style={[
                    styles.dayContainer,
                    this.isMid && subBack,
                    this.isStartPart && styles.startContainer,
                    this.isEnd && styles.endContainer,
                    (this.isStartPart || this.isEnd) && subBack
                ]}
            >
                {this.isValid ?
                    <TouchableHighlight
                        style={[styles.day, this.isToday && styles.today, this.isFocus && subBack]}
                        underlayColor="rgba(255, 255, 255, 0.35)"
                        onPress={this.chooseDay}
                    >
                        <Text style={[styles.dayText, subColor, this.isFocus && mainColor]}>{text}</Text>
                    </TouchableHighlight> :
                    <View style={[styles.day, this.isToday && styles.today]}>
                        <Text style={styles.dayTextDisabled}>{text}</Text>
                    </View>
                }
            </View>
        );
    }
}
