import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import Image from 'react-native-remote-svg';

import styles from './styles';

const RNViewPropTypes = ViewPropTypes || View.propTypes;
const RNPropTypes = PropTypes || React.PropTypes;

class LikeButton extends React.Component {
    static propTypes = {
        like: PropTypes.bool.isRequired,
        ButtonViewStyle: RNViewPropTypes.style,
        ButtonStyle: RNViewPropTypes.style,
    };

    static defaultProps = {
        like: true,
        ButtonViewStyle: {
            top: 40,
            right:18,
            width: 24,
            height: 24,
        },
        ButtonStyle: {
            width: 24,
            height: 24,
        },
    };

    constructor(props) {
        super(props);
        this.onChangeState = this.onChangeState.bind(this);
        this.state = {
            like : props.like,
        };
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {
    }

    onChangeState() {
        this.setState({
            like: !this.state.like
        });
        this.props.onLike(!this.state.like);
    }

    render = () => {
        return (
          <View style={styles.container}>
              <TouchableOpacity style={[styles.ButtonView, this.props.ButtonViewStyle]} onPress={this.onChangeState}>
                  {
                      this.state.like?
                          <Image source={require('../../../assets/liked.svg')} style={[styles.ButtonImage, this.props.ButtonStyle]}/>
                      :
                          <Image source={require('../../../assets/like.svg')} style={styles.ButtonImage, this.props.ButtonStyle}/>
                  }
              </TouchableOpacity>
          </View>
        );
    }
}

export default LikeButton;
