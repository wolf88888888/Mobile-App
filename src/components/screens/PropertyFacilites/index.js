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

class PropertyFacilites extends Component {
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
              name:"TV",

          },{
              name:"Kitchen",

          },{
              name:"Air Conditioning ",

          },{
              name:"Pool",

          },{
              name:"Bathtub",

          },{
              name:"Landry",

          }
        ]),
      }
    }

    _renderRow(rowData){

      return(
        <View style={styles.ComponentView}>
           <Text style={styles.firstText}>{rowData.name}</Text>
           <Image source={require('../../../assets/tv.png')} style={styles.ImageStyle}/>
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
              <Text style={styles.textStyle}>Room Facilities</Text>
              <ListView
                dataSource={this.state.dataSource}
                renderRow={this._renderRow}
                />

            </View>
        );
    }
}

export default PropertyFacilites;
