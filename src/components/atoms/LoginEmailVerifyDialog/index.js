import React, { Component } from 'react';
import { StyleSheet} from 'react-native';

import PropTypes from 'prop-types';
import { TextInput } from 'react-native';

import MaterialDialog from '../MaterialDialog/MaterialDialog';
import Toast from 'react-native-simple-toast';
import styles from './styles'

class LoginEmailVerifyDialog extends Component {
    static propTypes = {
        title: PropTypes.string,
        titleColor: PropTypes.string,
        colorAccent: PropTypes.string,
        onOk: PropTypes.func.isRequired,
        okLabel: PropTypes.string,
    }

    static defaultProps = {
        onOk: () => {},
        title: undefined,
        titleColor: undefined,
        colorAccent: '#000',
        okLabel: undefined,
    }

    constructor(props) {
        super(props);
        this.state = {
            emailToken: ''
        };
    }

    componentWillMount() {
    }

    render() {
        return (
            <MaterialDialog
                title= {this.props.title}
                titleColor={this.props.titleColor}
                colorAccent={this.props.colorAccent}
                okLabel={this.props.okLabel}
                cancelLabel={this.props.cancelLabel}
                isVisibleBottomBar = {true}
                visible={this.props.visible}
                onCancel = {()=>this.props.onCancel()}
                onOk={() => {
                    if (this.state.emailToken == '') {
                        Toast.showWithGravity('Please Input Token.', Toast.SHORT, Toast.BOTTOM);
                        return;
                    }
                    this.props.onOk(this.state.emailToken)}
                }
                >
                <TextInput
                    autoFocus={true}
                    multiline={false}
                    blurOnSubmit={false}
                    style={styles.editInput}
                    value={this.state.emailToken}
                    onChangeText={(emailToken) => this.setState({emailToken})}
                />
            </MaterialDialog>
        )
    }
}

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingTop: 13,
        paddingHorizontal: 10,
        paddingBottom: 12,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        backgroundColor: 'white',
        color: 'black',
    },
});

export default LoginEmailVerifyDialog;