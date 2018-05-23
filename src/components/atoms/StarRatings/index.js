import React, { Component } from 'react';

import {
    View,
    StyleSheet,
    Dimensions,
    ViewPropTypes
} from 'react-native'

import Image from 'react-native-remote-svg';
import PropTypes from 'prop-types';
import StarView from '../StarView'
import styles from './styles';

const RNViewPropTypes = ViewPropTypes || View.propTypes;
const RNPropTypes = PropTypes || React.PropTypes;

class StarRatings extends Component {

    static propTypes = {
        maximumValue: RNPropTypes.number.isRequired, // 最大值
        minimumValue: RNPropTypes.number.isRequired, // 最小值
        value: RNPropTypes.number.isRequired, // 具体数值
        emptyStarImage: RNPropTypes.element, // 空星图片
        filledStarImage: RNPropTypes.element, // 实星图片
        spacing: RNPropTypes.number.isRequired,
        starStyle: RNViewPropTypes.style,
    };

    static defaultProps = {
        maximumValue: 5,
        minimumValue: 0,
        value: 0,
        spacing: 10,
        starStyle: {
                width: 16,
                height:16,
            },
        emptyStarImage: <Image style={{width:16, height:16}} source={require('../../../assets/empty-star.svg')}/>,
        filledStarImage: <Image style={{width:16, height:16}} source={require('../../../assets/empty-star-full.svg')}/>,
    };

    constructor(props) {
        super(props);
        this.state = {
            maximumValue: this._validMaximumValue(),
            minimumValue: this._validMinimumValue(),
            value: this._validValue(this.props.value),
        }
    }

    componentDidMount() {
    }

    render() {
        const {value} = this.state;
        const {spacing, starStyle, emptyStarImage, filledStarImage} = this.props;
        let stars = [];
        for (let idx = 0; idx < this._validMaximumValue(); idx++) {
            let highlighted = (idx+1 <= Math.ceil(value));
            let star = null;
                let progress = value - idx;
                star = <StarView
                    key={`StarView_id_${idx}`}
                    style={[starStyle, {marginRight: spacing}]}
                    starStyle={starStyle}
                    emptyStarImage={emptyStarImage}
                    filledStarImage={filledStarImage}
                    progress={progress}
                >
                </StarView>;
            stars.push(star);
        }

        return (
            <View style={[styles.starContainer, this.props.style]}>
                {stars}
            </View>
        );
    }

    // 有效最小值
    _validMinimumValue = (minimumValue) => {
        if (!minimumValue) {
            minimumValue = this.props.minimumValue;
        }
        return Math.floor(Math.max(0, minimumValue));
    }

    // 有效最大值
    _validMaximumValue = (maximumValue) => {
        if (!maximumValue) {
            maximumValue = this.props.maximumValue;
        }
        return Math.ceil(Math.max(this._validMinimumValue(), maximumValue));
    }

    // 有效值
    _validValue = (value) => {
        return Math.min(Math.max(value, this._validMinimumValue()), this._validMaximumValue());
    }
}

export default StarRatings;
