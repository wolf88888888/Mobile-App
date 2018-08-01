import {
    Keyboard,
    ListView,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import React, { Component } from 'react';

import BackButton from '../../atoms/BackButton';
import Image from 'react-native-remote-svg';
import PropTypes from 'prop-types';
import styles from './styles';

const ds = new ListView.DataSource({rowHasChanged:(row1,row2)=> row1 != row2});

class PropertyRules extends Component {
    static propTypes = {
        navigation: PropTypes.shape({
            navigate: PropTypes.func
        })
    }

    static defaultProps = {
        navigation: {
            navigate: () => {}
        }
    }

    constructor(){
      super();
      this.onClose = this.onClose.bind(this);
      this.state = {
        dataSource:ds.cloneWithRows([
            {name:"No smoking",},{name:"No parties or events",},{name:"Not safe or suitable for children {0-12 years} ",},{name:"Suitable for pets",}
        ]),
      }
    }

    renderRow(rowData){
        return(
            <View style={styles.item}>
                <View style={styles.ComponentView}>
                    <Text style={styles.text}>{rowData.name}</Text>
                </View>
                <View style={styles.lineStyle}/>
            </View>
        );
    }


    onClose() {
      this.props.navigation.goBack();
    }

    render() {
        const { navigate } = this.props.navigation;

        return (
            <View style={styles.container}>
                <BackButton onPress={this.onClose}/>
                <Text style={styles.title}>House Rules</Text>

                <ListView
                  style={styles.list}
                  dataSource={this.state.dataSource}
                  renderRow={this.renderRow}
               />
           </View>
        );
    }
}

export default PropertyRules;
