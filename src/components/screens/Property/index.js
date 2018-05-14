import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,ProgressBarAndroid,
    Keyboard,ListView,Button,ScrollView,TextInput,Dimensions,FlatList
    } from 'react-native';

import PropTypes from 'prop-types';
import Image from 'react-native-remote-svg';
import CardView from 'react-native-cardview'
import WhiteBackButton from '../../atoms/WhiteBackButton';
import StarView from '../../atoms/StarView';
import StarRatings from '../../atoms/StarRatings';
import DetailView from '../../atoms/DetailView';
import ReadMoreView from '../../atoms/ReadMoreView'
import FacilityView from '../../atoms/FacilityView'
import RoomFacility from '../../molecules/RoomFacility'
import SleepingArrangements from '../../molecules/SleepingArrangements'

import styles from './styles';
const data = [
  {key : 'A'},{key : 'B'},{key : 'C'},{key : 'D'},{key : 'E'},{key : 'F'}
];
const numColumns = 6;
const ds = new ListView.DataSource({rowHasChanged:(row1,row2)=> row1 != row2});

class Property extends Component {

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
        this.onFacilityMore = this.onFacilityMore.bind(this);
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

    onClose() {
        this.props.navigation.goBack();
    }

    onFacilityMore() {
        this.props.navigation.navigate('PropertyFacilitesScreen');
    }

    _handleTextReady = () => {
        console.log('ready!');
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <ScrollView style={styles.scrollView}>
                    <WhiteBackButton style={styles.WhiteBackButton} onPress={this.onClose}/>
                    <View style={styles.body}>
                        <Image style={styles.logoImage} source = {require('../../../assets/temple/overview.jpg')} />
                        <CardView style={styles.titleView}
                            cardElevation={1.5}
                            cardMaxElevation={1.5}
                            cornerRadius={0}>
                            <Text style={styles.topTitleText}>
                                Garden Loft Apartment
                            </Text>
                            <View style={[styles.rateViewContainer, {height:15}]}>
                                <Text style={[styles.rateText, {height:15, paddingTop:2}]}>
                                    Excellent 4.1/5
                                </Text>
                                <StarRatings
                                    maximumValue = {5}
                                    minimumValue = {0}
                                    value = {4.2}
                                    style = {{width:60, height:15, paddingTop:2}}
                                    starStyle={{width:11, height:11,}}
                                    emptyStarImage={<Image style={{width:11, height:11,}} source={require('../../../assets/empty-star.svg')}/>}
                                    filledStarImage={<Image style={{width:11, height:11,}} source={require('../../../assets/full-star.svg')}/>}/>

                                <Text style={[styles.rateText, {height:15, paddingTop:2}]}>
                                    73 Reviews
                                </Text>
                            </View>

                            <View style={styles.lineStyle} />

                            <View style={styles.detailsStyle}>
                                <DetailView image={require('../../../assets/home.svg')} detail={'Entire Home'}/>
                                <DetailView image={require('../../../assets/guests.svg')} detail={'Guest ×4'}/>
                                <DetailView image={require('../../../assets/size.svg')} detail={'85 m'} supText={'2'}/>
                                <DetailView image={require('../../../assets/bathroom.svg')} detail={'1 Bathroom'}/>
                                <DetailView image={require('../../../assets/bedroom.svg')} detail={'2 Bedroom'}/>
                            </View>
                        </CardView>
                        <View style={styles.descriptionView}>
                            <Text style={styles.normalText}>In the historic quarter of Santo Spirito,on the left bank of the ricer Arno,studio apartment is perfect for those traveling alone or as a couple.To walk berween Santo Spirito,Pante Vecchio and Babali Gardens is a magical experience.</Text>
                            <Text style={styles.smallTitle}>The Space</Text>
                            <ReadMoreView
                                numberOfLines={2}
                                onReady={this._handleTextReady}>
                                <Text style={styles.normalText}>
                                     Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                     eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                                     enim ad minim veniam, quis nostrud exercitation ullamco laboris
                                     nisi ut aliquip ex ea commodo consequat.  Duis aute irure dolor
                                     in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                                     nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                                     sunt in culpa qui officia deserunt mollit anim id est laborum
                                 </Text>
                            </ReadMoreView>
                        </View>
                        <View style={[styles.lineStyle, {marginLeft:20, marginRight:20}]} />
                        <RoomFacility onFacilityMore={this.onFacilityMore}/>
                        <SleepingArrangements onFacilityMore={this.onFacilityMore}/>


                        <View style={{flexDirection:'column'}}>
                            <View style={{flexDirection:'row', justifyContent: 'space-between', margin:20}}>
                                <Text style={{fontFamily: 'FuturaStd-Light',fontSize:15,color:'#000000'}}>Check-In Time</Text>
                                <Text style={{fontFamily: 'FuturaStd-Light',fontSize:15,color:'#000000'}}>2PM - 10PM</Text>
                            </View>
                            <View style={{flexDirection:'row', justifyContent: 'space-between', margin:20}}>
                                <Text style={{fontFamily: 'FuturaStd-Light',fontSize:15,color:'#000000'}}>Check-Out Time</Text>
                                <Text style={{fontFamily: 'FuturaStd-Light',fontSize:15,color:'#000000'}}>12PM(noon)</Text>
                            </View>
                        </View>

                        <View style={{flexDirection:'column'}}>
                          <View style={{marginLeft:20, marginRight:20, flexDirection:'column'}}>
                              <Text style={{fontFamily: 'FuturaStd-Medium',fontSize:13,color:'#000000'}}>location</Text>
                              <Text style={{fontFamily: 'FuturaStd-Light',fontSize:12,color:'#000000'}}>Jesse s home is located in Oia,South Aegean,Greece.The views from the terrace, the sun, being calm</Text>

                              <Text style={{fontFamily: 'FuturaStd-Medium',fontSize:12,color:'#000000', marginTop:10}}>Transpotation</Text>
                              <Text style={{fontFamily: 'FuturaStd-Light',fontSize:12,color:'#000000'}}>Geting around the island is possible either by bus transport, taxi or by rending a car or on ATV.</Text>
                          </View>
                          <Image source={require('../../../assets/temple/location.jpg')} style={styles.map} />
                        </View>

                        <View style={{flexDirection:'column'}}>
                            <Text>User Rating & Review</Text>
                            <View style={styles.sidebar}>

                              <View style={{
                                    width: 80,
                                    height:80,
                                    backgroundColor: '#a2c5bf',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginLeft:2,
                                    marginRight:2
                              }}>
                                  <Text style={{fontSize:25, color: '#fff', fontFamily: 'FuturaStd-Light',}}>4.1</Text>
                                  <Text style={{fontSize:10, color: '#fff', fontFamily: 'FuturaStd-Light',}}>73 reviews</Text>
                              </View>

                              <View style={styles.sideView}>
                                  <View style={{flexDirection:'column', justifyContent:'space-between'}}>
                                  <Text>Value for money</Text>
                                  <Text>4.8</Text>
                                  </View>
                                  </View>
                                  <View style={[props.style, {width:150, height:2.5, backgroundColor:'#ffffff'}]}>
                                      <View style={{width:100, height:2.5, backgroundColor:'#a2c5bf'}}>
                                      </View>
                                  </View>
                              </View>
                          </View>


                      </View>
                    </View>
                </ScrollView>
                <View style={styles.footer}>
                    <View>
                        <Text style={styles.footerText}>85$ /per night</Text>
                        <Text style={styles.footerText}>0.56LOC/per night</Text>
                    </View>
                    <TouchableOpacity>
                        <View style={styles.ButtonView}>
                            <Text style={styles.ButtonText}>Check Availability</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default Property;
