import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { TextInputMask } from 'react-native-masked-text'
import FontAwesome, { Icons } from 'react-native-fontawesome';
import PropTypes from 'prop-types';

// TODO: move styles to separate file
const styles = StyleSheet.create({
    rightIconView: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 34,
        width: 34,
        borderRadius: 17,
        marginTop: 7,
        marginRight: 7,
        marginBottom: 7,
        backgroundColor: '#e4a193'
    },
    rightIconText: {
        color: '#DA7B61',
        fontSize: 11
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: '#e4a193',
        borderWidth: 1,
        borderRadius: 25,
        height: 50
    },
    input: {
        flex: 1,
        marginHorizontal: 20,
        color: '#fff',
        marginBottom: -4,
        fontSize: 17,
        fontFamily: 'FuturaStd-Light'
    }
});

class SmartInputCreditCard extends Component {
    static propTypes = {
        onRightPress: PropTypes.func,
        rightIcon: PropTypes.string
    }

    static defaultProps = {
        onRightPress: () => {},
        rightIcon: ''
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

    renderRightButton() {
        const { rightIcon, onRightPress } = this.props;
        let renderButton = null;

        if (rightIcon) {
            renderButton = (
                <View style={styles.rightIconView}>
                    <Text style={styles.rightIconText}>
                        <FontAwesome>{Icons[rightIcon]}</FontAwesome>
                    </Text>
                </View>
            );
        }

        if (rightIcon && onRightPress) {
            renderButton = (
                <TouchableOpacity onPress={() => onRightPress()}>{ renderButton }</TouchableOpacity>
            );
        }

        return renderButton;
    }

    render() {
        return (
            <View style={[styles.container]}>
                <TextInputMask
                    type={'custom'}
                    options={{
					    mask: '9999-9999-9999-9999'
				    }}
                    ref={(i) => { this.input = i; }}
                    style={styles.input}
                    underlineColorAndroid="rgba(0,0,0,0)"
                    selectionColor="white"
                    {...this.props}
                />

                { this.renderRightButton() }
            </View>
        );
    }
}

export default SmartInputCreditCard;
