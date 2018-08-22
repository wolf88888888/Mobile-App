import React, { Component } from 'react';
import {
    Text,
    TouchableOpacity,
    FlatList,
    View,
    ViewPropTypes
} from 'react-native';
import Image from 'react-native-remote-svg';
import PropTypes from 'prop-types';
import FacilityView from '../../atoms/FacilityView'
import { imgHost } from '../../../config';

import styles from './styles';

const RNViewPropTypes = ViewPropTypes || View.propTypes;
const RNPropTypes = PropTypes || React.PropTypes;
class FacilitiesView extends Component {

    static propTypes = {
        data: PropTypes.array
    };

    static defaultProps = {
        data: []
    };

    constructor(props) {
        super(props);
        this.onFacilityMore = this.onFacilityMore.bind(this);
        this.state = {
            more: this.props.data.length
        };
    }

    renderFacilitties(){
        var indents = [];
        for (var i =0; i < this.props.data.length; i++){
            indents.push(<FacilityView image={{uri : imgHost + this.props.data[i].picture}}/>);
            if (i == 4){
                indents.push(<FacilityView more={this.props.data.length - 5} isMore={true} onPress={this.onFacilityMore}/>);
                break;
            }
        }
        return indents;
    }


    onFacilityMore() {
        this.props.onFacilityMore();
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Room Facility</Text>
                <View style={{flexDirection: 'row'}}>
                    {this.renderFacilitties()}
                </View>
            </View>
        );
    }
}

export default FacilitiesView;