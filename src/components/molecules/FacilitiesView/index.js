import React, { Component } from 'react';
import {
    Text,
    View
} from 'react-native';
import FacilityView from '../../atoms/FacilityView';
import styles from './styles';

class FacilitiesView extends Component {

    constructor(props) {
        super(props);
    }

    renderFacilitties() {
        const indents = [];
        for (let i = 0; i < this.props.data.length; i++) {
            const imgUrl = this.props.data[i].picture;
            if (imgUrl != null && imgUrl !== undefined && imgUrl !== '') {
                indents.push();
                if (i === 4) {
                    indents.push(<FacilityView more={this.props.data.length - 5} isMore onPress={this.props.onFacilityMore} />);
                    break;
                }
            }
        }
        return indents;
    }

    render() {
        if (!this.props.data || this.props.data.length === 0) {
            return null;
        }
        const mostPopularFacilities = this.props.data.filter(a => a.picture != null).splice(0, 5);
        const otherFacilities = this.props.data.filter(a => !mostPopularFacilities.includes(a));

        return (
            <View style={styles.container}>
                <Text style={styles.title}>Room Facility</Text>
                {
                    mostPopularFacilities && mostPopularFacilities.length > 0 &&
                    (
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            {
                                mostPopularFacilities.map((item, i) => {
                                    return (
                                        item.picture != null &&
                                            (
                                                // <FacilityView image={{ uri: imgHost + item.picture }} />
                                                <FacilityView image={item.picture} isHome={this.props.isHome}/>
                                            )
                                    )
                                })
                            }
                            <FacilityView more={otherFacilities.length} isMore onPress={this.props.onFacilityMore} />
                        </View>
                    )
                }
                {/* {this.renderFacilitties()} */}
            </View>
        );
    }
}

export default FacilitiesView;
