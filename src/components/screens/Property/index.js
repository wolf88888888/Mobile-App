import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,ProgressBarAndroid,
    Keyboard,ListView,Button,ScrollView,TextInput,Dimensions,FlatList
    } from 'react-native';

import PropTypes from 'prop-types';
import Image from 'react-native-remote-svg';
import CloseButton from '../../atoms/CloseButton';

import styles from './styles';


const data = [
  {key : 'A'},{key : 'B'},{key : 'C'},{key : 'D'},{key : 'E'},{key : 'F'}
];
const numColumns = 6;
const ds = new ListView.DataSource({rowHasChanged:(row1,row2)=> row1 != row2});

class Property extends Component {

  renderItem = ({item,index}) => {
     return(
       <View style={styles.item}>
         <Text style={styles.itemText}>{item.key}</Text>
       </View>
     );
   };

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
              name:"Check-In Time",
              time:"2PM - 10PM",

          },{
              name:"Check-Out Time",
              time:"12PM(noon)",

          }
        ]),
      }
    }

    _renderRow(rowData){

      return(
        <View style={styles.ComponentView}>
           <Text style={styles.firstText}>{rowData.name}</Text>
           <Text style={styles.firstText}>{rowData.time}</Text>

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
              <ScrollView style={styles.scrollView}>
              <CloseButton style={{zIndex:1}} onPress={() => this.onClose()}/>

                  <View style={styles.logoContainer}>
                      <Image style={styles.logo} source = {require('../../../assets/image.jpg')} />
                  </View>

                  <View style={styles.textView}>
                      <Text style={styles.normalText}>In the historic quarter of Santo Spirito,on the left bank of the ricer Arno,studio apartment is perfect for those traveling alone or as a couple.To walk berween Santo Spirito,Pante Vecchio and Babali Gardens is a magical experience.</Text>
                      <Text style={styles.smallTitle}>The Space</Text>
                      <Text>On the third floor of a typical Flaenthine building.the apartment consists of an entrance with wardrobes and left with double bed..</Text>
                      <Text style={styles.redText}>read more</Text>

                      <View>
                        <Text style={styles.textTitle}>Room Facility</Text>

                        <FlatList
                          data={data}
                          style={styles.container}
                          renderItem={this.renderItem}
                          numColumns={numColumns}
                        />

                        <Text style={styles.textTitle}>Sleeping Arrangements</Text>

                        <FlatList
                          data={data}
                          style={styles.container}
                          renderItem={this.renderItem}
                          numColumns='3'
                        />

                        <ListView
                          dataSource={this.state.dataSource}
                          renderRow={this._renderRow}
                          />

                          <Text style={styles.smallTitle}>location</Text>
                          <Text>Jesse s home is located in Oia,South Aegean,Greece.The views from the terrace, the sun, being calm</Text>

                          <Text style={styles.smallTitle}>Transpotation</Text>
                          <Text>Geting around the island is possible either by bus transport, taxi or by rending a car or on ATV.</Text>
                      </View>
                      </View>




                      <View style={{}}>
                          <Image style={styles.logo} source = {require('../../../assets/image.jpg')} />
                      </View>

                        <View>
                          <Text style={styles.textTitle}>User Rating & Reviews</Text>

                          <View style={styles.sidebar}>

                              <TouchableOpacity>
                                  <View style={styles.sideViewFirst}>
                                  <Text style={styles.bigReviews}>4.1</Text>
                                  <Text style={styles.smallReviews}>7.3 reviews</Text>
                                  </View>
                              </TouchableOpacity>

                              <TouchableOpacity>
                                  <View style={styles.sideView}>
                                  <ProgressBarAndroid
                                    styleAttr="Horizontal"
                                    indeterminate={false}
                                    progress={0.1}
                                  />
                                  <Text style={styles.smallReviews}>7.3 reviews</Text>
                                <ProgressBarAndroid
                                  styleAttr="Horizontal"
                                  indeterminate={false}
                                  progress={0.3}
                                />
                                <Text style={styles.smallReviews}>7.3 reviews</Text>
                                <ProgressBarAndroid
                                  styleAttr="Horizontal"
                                  indeterminate={false}
                                  progress={0.8}
                                />
                                <Text style={styles.smallReviews}>7.3 reviews</Text>
                                  </View>
                              </TouchableOpacity>

                              <TouchableOpacity>
                                  <View style={styles.sideView}>


                                    <ProgressBarAndroid
                                      styleAttr="Horizontal"
                                      indeterminate={false}
                                      progress={0.5}
                                    />
                                    <Text style={styles.smallReviews}>7.3 reviews</Text>

                                    <ProgressBarAndroid
                                      styleAttr="Horizontal"
                                      indeterminate={false}
                                      progress={0.5}
                                    />
                                    <Text style={styles.smallReviews}>7.3 reviews</Text>

                                    <ProgressBarAndroid
                                      styleAttr="Horizontal"
                                      indeterminate={false}
                                      progress={0.5}
                                    />
                                    <Text style={styles.smallReviews}>7.3 reviews</Text>
                                  </View>
                              </TouchableOpacity>
                         </View>

                         <View style={styles.sidebar}>

                                 <View>
                                   <Image style={styles.circleImg} source = {require('../../../assets/image.jpg')} />
                                 </View>

                                 <View style={{marginLeft:20}}>
                                     <Text>Jesse - October 2017</Text>
                                     <Text>* * * * *</Text>
                                 </View>

                          </View>

                          <View style={{margin:20}}>
                            <Text style={{flexDirection:'row'}}>On the third floor of a typical Flaenthine building.the apartment consists of an entrance with wardrobes and left with double bed..</Text>
                            <Text style={styles.redText}>read more</Text>
                          </View>
                          <Text style={styles.redText}>read all 73 views</Text>

                          <Text style={styles.textTitle}>The Host</Text>
                        </View>

                        <View style={styles.sidebar}>

                                <View>
                                  <Image style={styles.circleImg} source = {require('../../../assets/image.jpg')} />
                                </View>

                                <View style={{marginLeft:20}}>
                                    <Text>Jesse - October 2017</Text>
                                    <Text>* * * * *</Text>
                                </View>

                         </View>

                         <ListView
                           dataSource={this.state.dataSource}
                           renderRow={this._renderRow}
                           />



                        <TouchableOpacity
                            onPress={() => navigate('PropertyFacilitesScreen')}>
                              <Text>Facilites</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => navigate('HouseRulesScreen')}>
                              <Text>House Rules</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => navigate('AdditionalPricesScreen')}>
                              <Text>Additional Prices</Text>
                        </TouchableOpacity>

                        <View style={styles.space}>

                        </View>



              </ScrollView>

              <View style={styles.footer}>
                  <View>
                    <Text style={styles.footerText}>85$ /per night</Text>
                    <Text style={styles.footerText}>0.56LOC/per night</Text>
                  </View>

                  <TouchableOpacity>
                      <View style={styles.searchButtonView}>
                          <Text style={styles.searchButtonText}>Check Availability</Text>
                      </View>
                  </TouchableOpacity>
             </View>
            </View>
        );
    }
}

export default Property;
