import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {
    View,
    Text,
    Dimensions
} from 'react-native';
import Dialog from './Dialog'
import ProgressBar from './ProgressBar'

const { width } = Dimensions.get('window');

class LineProgressDialog extends Component {
    render() {
        const {
            message, messageStyle
        } = this.props;

        return (
            <Dialog {...this.props} >
                <View style={{flexDirection: 'column'}} >
                    <Text style={[{ marginLeft: 0, marginRight: 10, fontSize: 15, color: "#000", fontFamily: 'FuturaStd-Light'}, messageStyle]}>{message}</Text>
                    <ProgressBar 
                        progress={this.props.progress} 
                        style={{marginTop: 10}} 
                        width={width - 96}
                        indeterminate={false}/>
                </View>
            </Dialog>
        )
    }
}

LineProgressDialog.propTypes = {
    ...Dialog.propTypes,
    message: PropTypes.string.isRequired,
    messageStyle: Text.propTypes.style,
    progress: PropTypes.number,
}

delete LineProgressDialog.propTypes.children;

export default LineProgressDialog
