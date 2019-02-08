import React, { Component } from 'react'
import PropTypes from "prop-types"
import {
    View,
    ActivityIndicator,
    Text,
    ViewPropTypes
} from 'react-native';

import Dialog from './Dialog'

class ProgressDialog extends Component {
    render() {
        const {
            message, messageStyle, activityIndicatorColor, activityIndicatorSize, activityIndicatorStyle
        } = this.props;

        return (
            <Dialog {...this.props} >
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
    activityIndicatorColor: PropTypes.string,
    activityIndicatorSize: PropTypes.string,
    activityIndicatorStyle: ViewPropTypes.style
}

delete ProgressDialog.propTypes.children;

export default ProgressDialog
