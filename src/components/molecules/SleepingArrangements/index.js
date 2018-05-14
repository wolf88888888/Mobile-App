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
import FacilityView from '../../atoms/FacilityView'

import styles from './styles';

const dimensionWindows = Dimensions.get('window');
const containWidth = dimensionWindows.width / 3;

class SleepingArrangements extends Component {

    static get propTypes() {
        return {
        }
    };

    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(['row 1', 'row 2','row 1', 'row 2','row 1', 'row 2',]),
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
                    style={{marginLeft:20, marginRight:20}}
                    dataSource={this.state.dataSource}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    renderRow={(rowData) =>
                        <View style={{
                            width:containWidth,
                            height:70,
                            flexDirection:'column',
                            borderColor:'#cccccc',
                            backgroundColor:'#ffffff',
                            borderWidth:0.3,
                            marginLeft:5,
                            marginRight:5}}>
                            <Image source={require('../../../assets/Beds/Double.svg')} style={{height:30, marginTop:5}}/>
                            <Text style={{
                                marginLeft:10,
                                fontFamily: 'FuturaStd-Medium',
                                fontSize:12,}}>
                                {rowData}
                            </Text>
                            <Text  style={{
                                marginTop:2, marginLeft:10,
                                fontFamily: 'FuturaStd-Light',
                                fontSize:13,}}>
                                Test
                            </Text>
                        </View>
                    }
               />
           </View>
        );
    }
}

export default SleepingArrangements;
