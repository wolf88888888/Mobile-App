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

class AdditionalPrices extends Component {
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
              name:"Cleaning Fee",
              money:'52',

          },{
              name:"Security Deposit",
              money:'202',

          },{
              name:"Weekend Price ",
              money:'356/night',

          }
        ]),
      }
    }

    _renderRow(rowData){

      return(
        <View style={styles.View}>
           <Text style={styles.textStyle}>{rowData.name}</Text>
           <Text style={styles.textStyle}>${rowData.money}</Text>
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
              <Text style={styles.textTitle}>Additional Prices</Text>

              <ListView
                dataSource={this.state.dataSource}
                renderRow={this._renderRow}
             />
            </View>
        );
    }
}

export default AdditionalPrices;
