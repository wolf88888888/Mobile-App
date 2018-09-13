import React, { Component } from 'react';
import {
    Text,
    View
} from 'react-native';
import PropTypes from 'prop-types';
import FacilityView from '../../atoms/FacilityView';
import { imgHost } from '../../../config';

import styles from './styles';


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

    onFacilityMore() {
        this.props.onFacilityMore();
    }

    renderFacilitties() {
        const indents = [];
        for (let i = 0; i < this.props.data.length; i++) {
            const imgUrl = this.props.data[i].picture;
            if (imgUrl != null && imgUrl !== undefined && imgUrl !== '') {
                indents.push(<FacilityView image={{ uri: imgHost + imgUrl }} />);
                if (i === 4) {
                    indents.push(<FacilityView more={this.props.data.length - 5} isMore onPress={this.onFacilityMore} />);
                    break;
                }
            }
        }
        return indents;
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Room Facility</Text>
                <View style={{ flexDirection: 'row' }}>
                    {this.renderFacilitties()}
                </View>
            </View>
        );
    }
}

export default FacilitiesView;
