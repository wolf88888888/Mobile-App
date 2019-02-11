import React, { Component } from 'react'
import PropTypes from "prop-types"
import {
    Alert,
    ActivityIndicator,
    Platform,
    Text,
    ViewPropTypes,
    View,
} from 'react-native';

import Dialog from './Dialog'

class ProgressDialog extends Component {

    componentDidUpdate(prevProps) {
        const {
            isAlert, alertMessage
        } = this.props;
        if (!this.props.visible && isAlert && Platform.OS === 'android') {
            Alert.alert(alertMessage);
        }
    }

    onDismiss = () => {
        const {
            isAlert, alertMessage
        } = this.props;

        if (isAlert) {
            Alert.alert(alertMessage);
        }
    }

    render() {
        const {
            message, messageStyle, activityIndicatorColor, activityIndicatorSize, activityIndicatorStyle
        } = this.props;

        return (
            <Dialog {...this.props} onDismiss = {this.onDismiss} >
                <View style={{ flexDirection: 'row', alignItems: 'center'}} >
                    <ActivityIndicator animating={true} color={activityIndicatorColor} size={activityIndicatorSize} style={activityIndicatorStyle} />
                    <Text style={[{ marginLeft: 15, marginRight: 10, fontSize: 16, color: "#00000089", fontFamily: 'FuturaStd-Light'}, messageStyle]}>{message}</Text>
                </View>
            </Dialog>
        )
    }
}

ProgressDialog.propTypes = {
    ...Dialog.propTypes,
    message: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
    messageStyle: Text.propTypes.style,
    isAlert: PropTypes.bool,
    alertMessage: PropTypes.string,
    activityIndicatorColor: PropTypes.string,
    activityIndicatorSize: PropTypes.string,
    activityIndicatorStyle: ViewPropTypes.style
}
ProgressDialog.defaultProps = {
    title:"",
    isAlert: false,
    alertMessage: '',
  };

delete ProgressDialog.propTypes.children;

export default ProgressDialog
