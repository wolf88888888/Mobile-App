import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
} from 'react-native';

import PropTypes from 'prop-types';
import styles from './styles';


class Textarea extends PureComponent<Props, State> {
    static propTypes = {
        containerStyle: View.propTypes.style,
        value: PropTypes.number,
        maxLength: PropTypes.number,
        onPress: (text: string) => {},
    }

    static defaultProps = {
        maxLength: 0,
    }

    constructor(props) {
        super(props);
        this.state = {
            count: 0,
        };
    }

    _onChangeText = (text) => {
        const { onChangeText, } = this.props;

        this.setState({ count: text.length });

        if (onChangeText) onChangeText(text);
    }

    _renderCount() {
        const { maxLength, } = this.props;
        const { count, } = this.state;

        if (!maxLength) return null;

        return (
            <Text style={styles.count}>
                {`${count}/${maxLength}`}
            </Text>
        );
    }

    render() {
        const { containerStyle, maxLength, ...rest } = this.props;
        return (
            <View style={[styles.container, containerStyle]}>
                <TextInput multiline {...rest} onChangeText={this._onChangeText} />
                {this._renderCount()}
            </View>
        );
    }
}

export default Textarea
