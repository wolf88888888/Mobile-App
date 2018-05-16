import React, { Component } from 'react';
import {
        Text,
        TouchableOpacity,
        View,
        ListView,
        Dimensions
      } from 'react-native';
import Image from 'react-native-remote-svg';
import PropTypes from 'prop-types';

import styles from './styles';

const dimensionWindows = Dimensions.get('window');
const containWidth = dimensionWindows.width / 3;

class SleepingArrangements extends Component {

    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows([{room:'Bedroom 1', description:'One double bed'}, {room:'Bedroom 2', description:'Two twin beds'}, {room:'Living Room', description:'One sofa bed'}]),
        };
    }

    componentDidMount() {
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Sleeping Arrangements</Text>
                <ListView
                    horizontal={true}
                    style={styles.list}
                    dataSource={this.state.dataSource}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    renderRow={(rowData) =>
                        <View style={styles.item}>
                            <Image source={require('../../../../assets/Beds/Double.svg')} style={{height:25, marginTop:5}}/>
                            <Text style={styles.room}>
                                {rowData.room}
                            </Text>
                            <Text  style={styles.description}>
                                {rowData.description}
                            </Text>
                        </View>
                    }
               />
           </View>
        );
    }
}

export default SleepingArrangements;
