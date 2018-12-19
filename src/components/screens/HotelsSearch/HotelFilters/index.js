import React, {Component} from 'react';
import { connect } from 'react-redux';
import {View, Text, TouchableOpacity, ScrollView, TextInput, StyleSheet} from 'react-native';
import Image from 'react-native-remote-svg';
import styles from './styles';
import PropTypes from 'prop-types';
import CheckBox from 'react-native-checkbox';
import RNPickerSelect from 'react-native-picker-select';
import MultiSlider from '@ptomasroos/react-native-multi-slider';


class HotelFilters extends Component {
    static propTypes = {
        navigation: PropTypes.shape({
            navigate: PropTypes.func
        }),
    }
    static defaultProps = {
        navigation: {
            navigate: () => {}
        },
    }
    constructor(props) {
        super(props);

        this.state = {
            isHotelSelected: true,
            selectedRating: 4,
            showUnAvailable: false,
            hotelName: '',
            count: {
                beds: 2,
                bedrooms: 0,
                bathrooms: 0
            },
            rooms : [{ adults: 2, children: [] }],
            priceSort: 'rank,desc',//'priceForSort,asc',
            selectedRating: [false,false,false,false,false],
            sliderValue: [1,5000],
            priceItems: [
                {
                    label: 'Rank',
                    value: 'rank,desc'
                },
                {
                    label: 'Lowest price',
                    value: 'priceForSort,asc'
                },
                {
                    label: 'Highest price',
                    value: 'priceForSort,desc'
                }
            ]
        }
        const { params } = this.props.navigation.state
        this.state.selectedRating = params.selectedRating
        this.state.showUnAvailable = params.showUnAvailable
        this.state.hotelName = params.hotelName
        //this.state.count = params.count
    }

    handleRatingChange(index, status){
        console.log(status);
        const items = this.state.selectedRating;
        items[index] = status;

        // update state
        this.setState({
            items,
        });
    }

    multiSliderValuesChange = (values) => {
        this.setState({
            sliderValue: values,
        });
      }

    addCount(type) {
        let count = Object.assign({}, this.state.count);
        if(type === 0) {
            count.beds++;
            this.setState({
                count
            });
        } else if(type === 1) {
            count.bedrooms++;
            this.setState({
                count
            });
        } else if(type === 2) {
            count.bathrooms++;
            this.setState({
                count
            });
        }
    }

    subtractCount(type) {
        let count = Object.assign({}, this.state.count);
        if(type === 0) {
            if(count.beds === 0) return;
            count.beds--;
            this.setState({
                count
            });
        } else if(type === 1) {
            if(count.bedrooms === 0) return;
            count.bedrooms--;
            this.setState({
                count
            });
        } else if(type === 2) {
            if(count.bathrooms === 0) return;
            count.bathrooms--;
            this.setState({
                count
            });
        }
    }

    onBackPress = () => {
        this.props.navigation.goBack();
    }

    onFilter = () => {
        this.props.navigation.goBack();
        this.props.navigation.state.params.updateFilter(this.state);
    }

    render() {
        const { params } = this.props.navigation.state;
        return (
            <View style={styles.container}>
                <View style={styles.backButton}>
                    <TouchableOpacity onPress={this.onBackPress}>
                        <Image style={styles.btn_backImage} source={require('../../../../assets/close.png')}/>
                    </TouchableOpacity>
                    <Text style={styles.titleText}>Filters</Text>
                </View>
                <ScrollView>

                <View style={{height: '100%',}}>
                    <View style={styles.residenceView}>
                        <TouchableOpacity style={[styles.residence, this.state.isHotelSelected? styles.selected: '']}>
                            {
                                this.state.isHotelSelected &&
                                <Image source={require('../../../../assets/png/Filters/check.png')} style={styles.tick}/>
                            }
                            <Image source={require('../../../../assets/png/Filters/hotel.png')} style={styles.headerIcons}/>
                        </TouchableOpacity>
                        <Text style={styles.residenceType}>Hotel</Text>
                    </View>

                    <View style= {this.state.isHotelSelected ? styles.pricingView :styles.emptyPricingView}>
                       <Text style={styles.pricingText}>Name</Text>
                    </View>                                
                    <TextInput
                        value={this.state.hotelName}
                        ref={(i) => { this.input = i; }}
                        underlineColorAndroid={'transparent'}
                        onChangeText={(text) => this.setState({hotelName: text})}
                        style={{height: 40, margin: 15, borderColor: 'grey', borderWidth: 1, borderRadius: 5, paddingLeft: 5}}
                    />
                    <View style= {this.state.isHotelSelected ? styles.pricingView :styles.emptyPricingView}>
                       <Text style={styles.pricingText}>Availability</Text>
                    </View>
                    <CheckBox
                        checkboxStyle={{height: 15, width: 15, marginLeft: 15}}
                        label='Show Unavailable'
                        checked={this.state.showUnAvailable}
                        onChange={(checked) => this.setState({showUnAvailable: !checked})}
                    />
                    <View style= {this.state.isHotelSelected ? styles.pricingView :styles.emptyPricingView}>
                       <Text style={styles.pricingText}>Order By</Text>
                    </View>
                    <View style={styles.SearchAndPickerwarp}>
                    <View style={styles.pickerWrap}>
                        <RNPickerSelect
                            items={this.state.priceItems}
                            onValueChange={(value) => {
                                //console.log(value);
                                this.setState({priceSort: value})
                            }}
                            value={this.state.priceSort}
                            style={{ ...pickerSelectStyles }}
                        >
                        </RNPickerSelect>
                    </View>
                    </View>
                    <View style={styles.starRatingView}>

                           <Text style={styles.starRatingText}>Star Rating</Text>
                           
                           <View style={styles.starView}>
                               <TouchableOpacity style={[styles.starBox, this.state.selectedRating[0] === true ? styles.activeRating: '']} 
                                onPress={() => this.handleRatingChange(0, this.state.selectedRating[0] ? false : true)}>
                                   <Text style={[styles.ratingNumber, this.state.selectedRating[0] === true ? styles.activeRatingText: '']}>1</Text>
                                   <Image source={require('../../../../assets/png/empty-star.png')} style={styles.star}/>
                               </TouchableOpacity>

                               <TouchableOpacity style={[styles.starBox, this.state.selectedRating[1] === true ? styles.activeRating: '']} 
                               onPress={() => this.handleRatingChange(1, this.state.selectedRating[1] ? false : true)}>
                                   <Text style={[styles.ratingNumber, this.state.selectedRating[1] === true ? styles.activeRatingText: '']}>2</Text>
                                   <Image source={require('../../../../assets/png/empty-star.png')} style={styles.star}/>
                               </TouchableOpacity>

                               <TouchableOpacity style={[styles.starBox, this.state.selectedRating[2] === true ? styles.activeRating: '']} 
                               onPress={() => this.handleRatingChange(2, this.state.selectedRating[2] ? false : true)}>
                                   <Text style={[styles.ratingNumber, this.state.selectedRating[2] === true ? styles.activeRatingText: '']}>3</Text>
                                   <Image source={require('../../../../assets/png/empty-star.png')} style={styles.star}/>
                               </TouchableOpacity>

                               <TouchableOpacity style={[styles.starBox, this.state.selectedRating[3] === true ? styles.activeRating: '']} 
                               onPress={() => this.handleRatingChange(3, this.state.selectedRating[3] ? false : true)}>
                                   <Text style={[styles.ratingNumber, this.state.selectedRating[3] === true ? styles.activeRatingText: '']}>4</Text>
                                   <Image source={require('../../../../assets/png/empty-star.png')} style={styles.star}/>
                               </TouchableOpacity>

                               <TouchableOpacity style={[styles.starBox, this.state.selectedRating[4] === true ? styles.activeRating: '']} 
                               onPress={() => this.handleRatingChange(4, this.state.selectedRating[4] ? false : true)}>
                                   <Text style={[styles.ratingNumber, this.state.selectedRating[4] === true ? styles.activeRatingText: '']}>5</Text>
                                   <Image source={require('../../../../assets/png/empty-star.png')} style={styles.star}/>
                               </TouchableOpacity>
                           </View>
                       </View>

                        <View style= {this.state.isHotelSelected ? styles.pricingView :styles.emptyPricingView}>
                            <Text style={styles.pricingText}>Pricing</Text>
                        </View>
                        
                        <View style={{flex:1, flexDirection: 'column', alignItems: 'center'}}>
                            <View style={{width: '80%', flexDirection: 'row', justifyContent: 'space-between'}}>
                                <Text>{this.props.currencySign} {this.state.sliderValue[0]}</Text>
                                <Text>{this.props.currencySign} {this.state.sliderValue[1]}</Text>
                            </View>
                            <MultiSlider
                            isMarkersSeparated={true}
                            selectedStyle={{
                                backgroundColor: '#cc8068',
                            }}
                            unselectedStyle={{
                                backgroundColor: 'silver',
                            }}
                            values={[this.state.sliderValue[0], this.state.sliderValue[1]]}
                            min={1}
                            max={5000}
                            step={1}
                            onValuesChangeFinish={this.multiSliderValuesChange}
                            />
                            <View style={{width: '80%', flexDirection: 'row', justifyContent: 'space-between'}}>
                                <Text>{this.props.currencySign} 0</Text>
                                <Text>{this.props.currencySign} 5000</Text>
                            </View>
                        </View>



                       {/* <View style={styles.pricingView}>
                           <Text style={styles.pricingText}>Pricing</Text>
                       </View> */}

                       {/* <View style= {this.state.isHotelSelected ? styles.pricingView :styles.emptyPricingView}>
                           <Text style={styles.pricingText}>Room</Text>
                       </View> */}
                       {/* <View style={this.state.isHotelSelected ? styles.set : styles.emptyPricingView}> */}
                           {/* <View style={[styles.group, styles.borderBottom]}>
                               <View style={styles.type}>
                                   <Text style={styles.typeText}>Beds</Text>
                               </View>
                               <View style={styles.countView}>
                                   <TouchableOpacity style={[styles.minusButton, this.state.count.beds === 0? styles.opacity: '']} onPess={() => this.subtractCount(1)} onPess={() => this.subtractCount(0)}>
                                       <Text style={styles.minusText}>-</Text>
                                   </TouchableOpacity>
                                   <Text style={styles.countText}>{this.state.count.beds}</Text>
                                   <TouchableOpacity style={styles.plusButton} onPess={() => this.addCount(0)}>
                                       <Text style={styles.plusText}>+</Text>
                                   </TouchableOpacity>
                               </View>
                           </View> */}
                           {/* <View style={this.state.isHotelSelected ? [styles.group, styles.borderBottom]:styles.emptyPricingView}>
                               <View style={styles.type}>
                                   <Text style={styles.typeText}>Rooms</Text>
                               </View>
                               <View style={styles.countView}>
                                   <TouchableOpacity style={[styles.minusButton, this.state.count.bedrooms === 0? styles.opacity: '']} onPress={() => this.subtractCount(1)}>
                                       <Text style={styles.minusText}>-</Text>
                                   </TouchableOpacity>
                                   <Text style={styles.countText}>{this.state.count.bedrooms}</Text>
                                   <TouchableOpacity style={styles.plusButton} onPress={() => this.addCount(1)}>
                                       <Text style={styles.plusText}>+</Text>
                                   </TouchableOpacity>
                               </View>
                           </View> */}
                           {/* <View style={styles.group}>
                               <View style={styles.type}>
                                   <Text style={styles.typeText}>Bathrooms</Text>
                               </View>
                               <View style={styles.countView}>
                                   <TouchableOpacity style={[styles.minusButton, this.state.count.bathrooms === 0? styles.opacity: '']} onPess={() => this.subtractCount(1)} onPess={() => this.subtractCount(2)}>
                                       <Text style={styles.minusText}>-</Text>
                                   </TouchableOpacity>
                                   <Text style={styles.countText}>{this.state.count.bathrooms}</Text>
                                   <TouchableOpacity style={styles.plusButton} onPess={() => this.addCount(2)}>
                                       <Text style={styles.plusText}>+</Text>
                                   </TouchableOpacity>
                               </View>
                           </View> */}
                       {/* </View> */}
                       <TouchableOpacity onPress={this.onFilter}>
                            <View style={styles.searchButtonView}>
                                <Text style={styles.searchButtonText}>Apply Filters</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                       
                </ScrollView>
                {/* <View style={styles.bottomBar}>
                    <TouchableOpacity style={styles.doneButton} onPress={this.onSearchPress.bind(this)}>
                        <Text style={styles.doneButtonText}>Show Hotels</Text>
                    </TouchableOpacity>
                </View> */}

                
            </View>
        )
    }

    onSearchPress(){
        const { params } = this.props.navigation.state;

        var countArray = []
        var counts = {};
        var arrayRooms = new Array(this.state.count.bedrooms);
        if (params.adults < this.state.count.bedrooms){
            alert('Adults are less than rooms selected');
        }
        else {
            var j = 0;
            while(params.adults != 0){
                arrayRooms.push(
                    j
                );
                params.adults -= 1
                j += 1
                if (j == this.state.count.bedrooms){
                    j = 0
                }
            }
            arrayRooms = arrayRooms.filter(function(n){ return n != undefined }); 
            for (var i = 0; i < arrayRooms.length; i++) {
                var num = arrayRooms[i];
                counts[num] = counts[num] ? counts[num] + 1 : 1;
            }
            this.state.rooms = []
            for (var k = 0; k < this.state.count.bedrooms; k++){
                this.state.rooms.push(
                    { adults: counts[k], children: [] }
                )
            }
        }
        
        console.log(this.state.rooms);
        this.props.navigation.navigate('PropertyScreen', {
            searchedCity: params.search, 
            searchedCityId: 72, 
            checkInDate : params.checkInDate, 
            checkOutDate : params.checkOutDate, 
            guests: params.guests, 
            children: params.children, 
            //these props are for paramerters in the next class
            regionId: params.regionId,
            currency: params.currency,
            checkOutDateFormated: params.checkOutDateFormated,
            checkInDateFormated: params.checkInDateFormated, 
            roomsDummyData: encodeURI(JSON.stringify(this.state.rooms))
        });
    }
}

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        height: 50,
        fontSize: 16,
        paddingTop: 13,
        paddingHorizontal: 10,
        paddingBottom: 12,
        color: 'black'
    }
});


let mapStateToProps = (state) => {
    return {
        currency: state.currency.currency,
        currencySign: state.currency.currencySign
    };
}

export default connect(mapStateToProps, null)(HotelFilters);