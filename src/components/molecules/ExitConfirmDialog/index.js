import React, {Component} from 'react';
import { 
    Text
} from 'react-native';

import MaterialDialog from '../../atoms/MaterialDialog/MaterialDialog'
import styles from './styles';

class ExitConfirmDialog extends Component {

    state = {
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <MaterialDialog
                title={this.props.title}
                visible={this.props.visible}
                isVisibleBottomBar = {true}
                cancelLabel = {"No"}
                onCancel={ this.props.onCancel }
                cancelStyle = {{color:'#000', fontSize: 17}}
                okLabel = {"Yes"}
                onOk={ this.props.onOk }
                okStyle = {{color:'#000', fontSize: 17}}
            >
                <Text style={{fontSize: 17}}>
                    Are you sure to exit?
                </Text>
            </MaterialDialog>
            
        );
    }
};

export default ExitConfirmDialog;
