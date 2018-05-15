import React, { Component } from "react";

import {
    View,
    StyleSheet,
    Dimensions,
    ViewPropTypes
} from 'react-native'

import PropTypes from 'prop-types'
import Image from 'react-native-remote-svg';
import styles from './styles';

const RNViewPropTypes = ViewPropTypes || View.propTypes;
const RNPropTypes = PropTypes || React.PropTypes;

class StarView extends React.Component {
    static propTypes = {
        progress: RNPropTypes.number.isRequired, // 占比
        emptyStarImage: RNPropTypes.element, // 空星图片
        filledStarImage: RNPropTypes.element, // 实星图片
        starStyle: RNViewPropTypes.style,
    };

    static defaultProps = {
        progress: 0,
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
            progress: Math.min(Math.max(0, this.props.progress), 1),
        }
    }

    /* 组件的生命周期函数 */
    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {
        this._handleNextProps(nextProps);
    }

    /* 渲染组件 */
    render = () => {
        let {progress} = this.state;
        let {emptyStarImage, filledStarImage, starStyle} = this.props;

        return (
          <View style={styles.starContainer}>
              <View style={[styles.backgroundStarView, starStyle]}>
                  {emptyStarImage}
              </View>
              <View
                   /**
                   * removeClippedSubviews bool
                   * 这是一个特殊的性能相关的属性，由RCTView导出。在制作滑动控件时，如果控件有很多不在屏幕内的子视图，会非常有用。
                   * 要让此属性生效，首先要求视图有很多超出范围的子视图，并且子视图和容器视图（或它的某个祖先视图）都应该有样式overflow: hidden。
                   */
                  removeClippedSubviews={true} // 兼容Android
                  style={[styles.forgroundStarView, starStyle, {width: starStyle.width * progress}]}
                  >
                  {filledStarImage}
              </View>
          </View>
        );
    }
}

export default StarView;
