import React, {Component} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import Image from 'react-native-remote-svg';
import styles from './styles';
import PropTypes from 'prop-types';

export default class Filters extends Component {
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
            isHotelSelected: false,
            selectedRating: 4,
            count: {
                beds: 2,
                bedrooms: 0,
                bathrooms: 0
            },
            rooms : [{ adults: 2, children: [] }]
        }
        const { params } = this.props.navigation.state
        this.state.isHotelSelected = params.isHotelSelected
        //this.state.count = params.count
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
        this.props.navigation.state.params.updateFilter(this.state);
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.onBackPress}>
                    <View style={styles.closeView}>
                        <Image source={require('../../../assets/close.png')} style={styles.closeSvg}/>
                    </View>
                </TouchableOpacity>
                <View style={styles.header}>
                    <View style={styles.residenceView}>
                        <TouchableOpacity onPress={() => this.setState({isHotelSelected: false})} style={[styles.residence, !this.state.isHotelSelected? styles.selected: '']}>
                            {
                                !this.state.isHotelSelected &&
                                <Image source={require('../../../assets/png/Filters/check.png')} style={styles.tick}/>
                            }
                            <Image source={require('../../../assets/png/Filters/home.png')} style={styles.headerIcons}/>
                        </TouchableOpacity>
                        <Text style={styles.residenceType}>Home</Text>
                    </View>
                    <View style={styles.residenceView}>
                        <TouchableOpacity onPress={() => this.setState({isHotelSelected: true})} style={[styles.residence, this.state.isHotelSelected? styles.selected: '']}>
                            {
                                this.state.isHotelSelected &&
                                <Image source={require('../../../assets/png/Filters/check.png')} style={styles.tick}/>
                            }
                            <Image source={require('../../../assets/png/Filters/hotel.png')} style={styles.headerIcons}/>
                        </TouchableOpacity>
                        <Text style={styles.residenceType}>Hotel</Text>
                    </View>
                </View>
                <ScrollView>
                <View style={{height: '100%',}}>
                       {/* <View style={styles.starRatingView}>
                           <Text style={styles.starRatingText}>Star Rating</Text>
                           <View style={styles.starView}>
                               <TouchableOpacity style={[styles.starBox, this.state.selectedRating === 1? styles.activeRating: '']} onPress={() => this.setState({selectedRating: 1})}>
                                   <Text style={[styles.ratingNumber, this.state.selectedRating === 1? styles.activeRatingText: '']}>0, 1</Text>
                                   <Image source={require('../../../assets/empty-star.png')} style={styles.star}/>
                               </TouchableOpacity>
                               <TouchableOpacity style={[styles.starBox, this.state.selectedRating === 2? styles.activeRating: '']} onPress={() => this.setState({selectedRating: 2})}>
                                   <Text style={[styles.ratingNumber, this.state.selectedRating === 2? styles.activeRatingText: '']}>2</Text>
                                   <Image source={require('../../../assets/empty-star.png')} style={styles.star}/>
                               </TouchableOpacity>
                               <TouchableOpacity style={[styles.starBox, this.state.selectedRating === 3? styles.activeRating: '']} onPress={() => this.setState({selectedRating: 3})}>
                                   <Text style={[styles.ratingNumber, this.state.selectedRating === 3? styles.activeRatingText: '']}>3</Text>
                                   <Image source={require('../../../assets/empty-star.png')} style={styles.star}/>
                               </TouchableOpacity>
                               <TouchableOpacity style={[styles.starBox, this.state.selectedRating === 4? styles.activeRating: '']} onPress={() => this.setState({selectedRating: 4})}>
                                   <Text style={[styles.ratingNumber, this.state.selectedRating === 4? styles.activeRatingText: '']}>4</Text>
                                   <Image source={require('../../../assets/empty-star.png')} style={styles.star}/>
                               </TouchableOpacity>
                               <TouchableOpacity style={[styles.starBox, this.state.selectedRating === 5? styles.activeRating: '']} onPress={() => this.setState({selectedRating: 5})}>
                                   <Text style={[styles.ratingNumber, this.state.selectedRating === 5? styles.activeRatingText: '']}>5</Text>
                                   <Image source={require('../../../assets/empty-star.png')} style={styles.star}/>
                               </TouchableOpacity>
                           </View>
                       </View> */}

                       {/* <View style={styles.pricingView}>
                           <Text style={styles.pricingText}>Pricing</Text>
                       </View> */}

                       <View style= {this.state.isHotelSelected ? styles.pricingView :styles.emptyPricingView}>
                           <Text style={styles.pricingText}>Room Options</Text>
                       </View>
                       <View style={this.state.isHotelSelected ? styles.set : styles.emptyPricingView}>
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
                           <View style={this.state.isHotelSelected ? [styles.group, styles.borderBottom]:styles.emptyPricingView}>
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
                           </View>
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
                       </View>
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
