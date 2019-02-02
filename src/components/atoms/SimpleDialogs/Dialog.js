import React, { Component } from 'react'
import {
    Modal,
    View,
    ViewPropTypes,
    TouchableWithoutFeedback,
    Text,
    Platform
} from 'react-native'
const { OS } = Platform;

import PropTypes from 'prop-types';

class Dialog extends Component {

    renderContent() {
        const { children, contentStyle } = this.props;

        return (
            <View style={[{
                width: '100%',
                padding: 24,
                paddingTop: 20
            }, contentStyle]}>
                {children}
            </View>
        )
    }

    renderTitle() {
        const { title, titleStyle } = this.props;

        const textAlign = OS === 'ios' ? "center" : null;

        if (title)
            return (
                <Text style={[{
                    textAlign,
                    color: "#000000DD",
                    margin: 24,
                    marginBottom: 0,
                    fontFamily: 'FuturaStd-Medium',
                    fontSize: 20
                }, titleStyle]}>
                    {title}
                </Text>
            )
    }

    renderButtons() {
        const { buttons, buttonsStyle } = this.props;

        const containerStyle = OS === 'ios' ?
            {} :
            {
                width: '100%',
                paddingLeft: 24,
                paddingRight: 8,
                paddingTop: 8,
                paddingBottom: 8
            };

        if (buttons)
            return (
                <View style={[containerStyle, buttonsStyle]}>
                    {buttons}
                </View>
            )
    }

    _renderOutsideTouchable(onTouch) {
        const view = <View style={{ flex: 1, width: '100%' }} />

        if (!onTouch) return view;

        return (
            <TouchableWithoutFeedback onPress={onTouch} style={{ flex: 1, width: '100%' }}>
                {view}
            </TouchableWithoutFeedback>
        )
    }

    render() {
        const {
            dialogStyle, visible, animationType, onRequestClose, onDismiss, onShow,
            onOrientationChange, onTouchOutside, overlayStyle, supportedOrientations
        } = this.props;

        const dialogBackgroundColor = OS === 'ios' ? "#e8e8e8" : "#ffffff";
        const dialogBorderRadius = OS === 'ios' ? 5 : 1;

        return (
            <Modal
                animationType={animationType}
                transparent={true}
                visible={visible}
                onRequestClose={onRequestClose}
                onDismiss={onDismiss}
                onShow={onShow}
                onOrientationChange={onOrientationChange}
                supportedOrientations={supportedOrientations}
            >
                <View style={[{
                    flex: 1,
                    backgroundColor: "#000000AA",
                    padding: 24
                }, overlayStyle]}>

                    {this._renderOutsideTouchable(onTouchOutside)}

                    <View style={[{
                        backgroundColor: dialogBackgroundColor,
                        width: '100%',
                        shadowOpacity: 0.24,
                        borderRadius: dialogBorderRadius,
                        elevation: 4,
                        shadowOffset: {
                            height: 4,
                            width: 2
                        }
                    }, dialogStyle]}>

                        {this.renderTitle()}

                        {this.renderContent()}

                        {this.renderButtons()}

                    </View>

                    {this._renderOutsideTouchable(onTouchOutside)}

                </View>
            </Modal>
        )
    }
}

Dialog.propTypes = {
    dialogStyle: ViewPropTypes.style,
    contentStyle: ViewPropTypes.style,
    buttonsStyle: ViewPropTypes.style,
    overlayStyle: ViewPropTypes.style,
    buttons: PropTypes.element,
    visible: PropTypes.bool,
    animationType: PropTypes.string,
    onRequestClose: PropTypes.func,
    onDismiss: PropTypes.func,
    onShow: PropTypes.func,
    onOrientationChange: PropTypes.func,
    onTouchOutside: PropTypes.func,
    supportedOrientations: PropTypes.string,
    title: PropTypes.string,
    titleStyle: Text.propTypes.style
}

Dialog.defaultProps = {
    visible: false,
    onRequestClose: () => null,
    onDismiss: () => null,
    animationType: 'none'
};

export default Dialog;
