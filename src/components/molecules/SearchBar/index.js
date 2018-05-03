import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import PropTypes from 'prop-types';

// TODO: move styles in saparate file
const styles = StyleSheet.create({
    leftIconView: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 50
    },
    leftIconText: {
        color: '#5a5a5c',
        fontSize: 20
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#fff',
        height: 50
    },
    input: {
        flex: 1,
        marginLeft: -3,
        marginRight: 20,
        color: '#000',
        fontSize: 17,
        fontFamily: 'FuturaStd-Light'
    }
});


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
                    underlineColorAndroid="#bdbdbd"
                    style={styles.input}
                    {...this.props}
                />
            </View>
        );
    }
}

export default SearchBar;
