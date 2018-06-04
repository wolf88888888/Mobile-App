import React, { Component } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import PropTypes from 'prop-types';
import styles from './styles';


class SearchBar extends Component {
    static propTypes = {
        onLeftPress: PropTypes.func,
        leftIcon: PropTypes.string
    }
    static defaultProps = {
        onLeftPress: () => {},
        leftIcon: ''
    }
    constructor() {
        super();
        this.input = {
            focus: () => {}
        };
    }
    focus() {
        this.input.focus();
    }

    renderLeftButton() {
        const { leftIcon, onLeftPress } = this.props;
        let renderButton = null;

        if (leftIcon) {
            renderButton = (
                <View style={styles.leftIconView}>
                    <Text style={styles.leftIconText}>
                        <FontAwesome>{Icons[leftIcon]}</FontAwesome>
                    </Text>
                </View>
            );
        }

        if (leftIcon && onLeftPress) {
            renderButton = (
                <TouchableOpacity onPress={() => onLeftPress()}>{ renderButton }</TouchableOpacity>
            );
        }

        return renderButton;
    }

    render() {
        return (
            <View style={[styles.container]}>
                { this.renderLeftButton() }

                <TextInput
                    ref={(i) => { this.input = i; }}
                    underlineColorAndroid="#ffffff"
                    style={styles.input}
                    {...this.props}
                />
            </View>
        );
    }
}

export default SearchBar;
