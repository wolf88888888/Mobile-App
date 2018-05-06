import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Keyboard,ListView
    } from 'react-native';
import PropTypes from 'prop-types';
import Image from 'react-native-remote-svg';
import CloseButton from '../../atoms/CloseButton';

import styles from './styles';

const ds = new ListView.DataSource({rowHasChanged:(row1,row2)=> row1 != row2});

class HouseRules extends Component {
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
      this.state = {
        dataSource:ds.cloneWithRows([
          {
              name:"No smoking",
          },{
              name:"No parties or events",
          },{
              name:"Not safe or suitable for children {0-12 years} ",
          },{
              name:"Suitable for pets",
          }
        ]),
      }
    }

    _renderRow(rowData){

      return(
        <View style={styles.View}>
           <Text style={styles.text}>{rowData.name}</Text>
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
              <CloseButton onPress={() => this.onClose()}/>
              <Text style={styles.textTitle}>House Rules</Text>

              <ListView
                dataSource={this.state.dataSource}
                renderRow={this._renderRow}
             />
            </View>
        );
    }
}

export default HouseRules;
