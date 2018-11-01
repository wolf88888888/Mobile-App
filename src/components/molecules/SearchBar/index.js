import React, { Component } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import styles from './styles';


class SearchBar extends Component {
    static propTypes = {
        onLeftPress: PropTypes.func,
        leftIcon: PropTypes.string,
        editable: PropTypes.bool
    }
    static defaultProps = {
        onLeftPress: () => {},
        leftIcon: '',
        editable: true,
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
                        <Icon name={leftIcon} size={22} color="#000" />
                        {/* <FontAwesome>{Icons[leftIcon]}</FontAwesome> */}
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
                    style={this.props.editable? styles.input : styles.input_disable}
                    {...this.props}
                />
            </View>
        );
    }
}

export default SearchBar;
