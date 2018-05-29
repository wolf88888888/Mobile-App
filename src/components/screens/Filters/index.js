import React, {Component} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import Image from 'react-native-remote-svg';
import styles from './styles';


export default class Filters extends Component {
    constructor() {
        super();
        this.state = {
            isHotelSelected: false,
            selectedRating: 4,
            count: {
                beds: 2,
                bedrooms: 0,
                bathrooms: 0
            }
        }
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

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.closeView}>
                    <Image source={require('../../../assets/close.svg')} style={styles.closeSvg}/>
                </View>
                <View style={styles.header}>
                    <View style={styles.residenceView}>
                        <TouchableOpacity onPress={() => this.setState({isHotelSelected: false})} style={[styles.residence, !this.state.isHotelSelected? styles.selected: '']}>
                            {
                                !this.state.isHotelSelected &&
                                <Image source={require('../../../assets/svg/Filters/check.svg')} style={styles.tick}/>
                            }
                            <Image source={require('../../../assets/svg/Filters/home.svg')} style={styles.headerIcons}/>
                        </TouchableOpacity>
                        <Text style={styles.residenceType}>Home</Text>
                    </View>
                    <View style={styles.residenceView}>
                        <TouchableOpacity onPress={() => this.setState({isHotelSelected: true})} style={[styles.residence, this.state.isHotelSelected? styles.selected: '']}>
                            {
                                this.state.isHotelSelected &&
                                <Image source={require('../../../assets/svg/Filters/check.svg')} style={styles.tick}/>
                            }
                            <Image source={require('../../../assets/svg/Filters/hotel.svg')} style={styles.headerIcons}/>
                        </TouchableOpacity>
                        <Text style={styles.residenceType}>Hotel</Text>
                    </View>
                </View>
                <ScrollView>
                <View style={{height: '100%',}}>
                       <View style={styles.starRatingView}>
                           <Text style={styles.starRatingText}>Star Rating</Text>
                           <View style={styles.starView}>
                               <TouchableOpacity style={[styles.starBox, this.state.selectedRating === 1? styles.activeRating: '']} onPress={() => this.setState({selectedRating: 1})}>
                                   <Text style={[styles.ratingNumber, this.state.selectedRating === 1? styles.activeRatingText: '']}>0, 1</Text>
                                   <Image source={require('../../../assets/empty-star.svg')} style={styles.star}/>
                               </TouchableOpacity>
                               <TouchableOpacity style={[styles.starBox, this.state.selectedRating === 2? styles.activeRating: '']} onPress={() => this.setState({selectedRating: 2})}>
                                   <Text style={[styles.ratingNumber, this.state.selectedRating === 2? styles.activeRatingText: '']}>2</Text>
                                   <Image source={require('../../../assets/empty-star.svg')} style={styles.star}/>
                               </TouchableOpacity>
                               <TouchableOpacity style={[styles.starBox, this.state.selectedRating === 3? styles.activeRating: '']} onPress={() => this.setState({selectedRating: 3})}>
                                   <Text style={[styles.ratingNumber, this.state.selectedRating === 3? styles.activeRatingText: '']}>3</Text>
                                   <Image source={require('../../../assets/empty-star.svg')} style={styles.star}/>
                               </TouchableOpacity>
                               <TouchableOpacity style={[styles.starBox, this.state.selectedRating === 4? styles.activeRating: '']} onPress={() => this.setState({selectedRating: 4})}>
                                   <Text style={[styles.ratingNumber, this.state.selectedRating === 4? styles.activeRatingText: '']}>4</Text>
                                   <Image source={require('../../../assets/empty-star.svg')} style={styles.star}/>
                               </TouchableOpacity>
                               <TouchableOpacity style={[styles.starBox, this.state.selectedRating === 5? styles.activeRating: '']} onPress={() => this.setState({selectedRating: 5})}>
                                   <Text style={[styles.ratingNumber, this.state.selectedRating === 5? styles.activeRatingText: '']}>5</Text>
                                   <Image source={require('../../../assets/empty-star.svg')} style={styles.star}/>
                               </TouchableOpacity>
                           </View>
                       </View>

                       <View style={styles.pricingView}>
                           <Text style={styles.pricingText}>Pricing</Text>
                       </View>

                       <View style={styles.pricingView}>
                           <Text style={styles.pricingText}>Room & Beds</Text>
                       </View>
                       <View style={styles.set}>
                           <View style={[styles.group, styles.borderBottom]}>
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
                           </View>
                           <View style={[styles.group, styles.borderBottom]}>
                               <View style={styles.type}>
                                   <Text style={styles.typeText}>Bedrooms</Text>
                               </View>
                               <View style={styles.countView}>
                                   <TouchableOpacity style={[styles.minusButton, this.state.count.bedrooms === 0? styles.opacity: '']} onPess={() => this.subtractCount(1)}>
                                       <Text style={styles.minusText}>-</Text>
                                   </TouchableOpacity>
                                   <Text style={styles.countText}>{this.state.count.bedrooms}</Text>
                                   <TouchableOpacity style={styles.plusButton} onPess={() => this.addCount(1)}>
                                       <Text style={styles.plusText}>+</Text>
                                   </TouchableOpacity>
                               </View>
                           </View>
                           <View style={styles.group}>
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
                           </View>
                       </View>
                    </View>
                       
                </ScrollView>
                <View style={styles.bottomBar}>
                    <TouchableOpacity style={styles.doneButton}>
                        <Text style={styles.doneButtonText}>Show 345 Hotels</Text>
                    </TouchableOpacity>
                </View>

                
            </View>
        )
    }
}
