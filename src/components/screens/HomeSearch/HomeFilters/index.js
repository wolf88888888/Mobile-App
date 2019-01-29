import React, {Component} from 'react';
import {View, Text, TouchableOpacity, ScrollView, FlatList} from 'react-native';
import Image from 'react-native-remote-svg';
import CheckBox from 'react-native-checkbox';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import styles from './styles';

export default class HomeFilters extends Component {
    
    constructor(props) {
        super(props);

        const { params } = this.props.navigation.state;

        console.log(params);
        this.state = {
            cities: params.cities,
            properties: params.properties,
            sliderValue: params.priceRange
        }
    }


    onBackPress = () => {
        this.props.navigation.goBack();
    }

    onFilter = () => {
        this.props.navigation.goBack();
        this.props.navigation.state.params.updateFilter(this.state);
    }

    onHandleCity = (index, isChecked) => {
        let cities = this.state.cities;
        cities[index].isChecked = isChecked;

        this.setState({cities: cities});
    }

    
    onHandleProperty = (index, isChecked) => {
        let properties = this.state.properties;
        properties[index].isChecked = isChecked;

        this.setState({properties: properties});
    }

    renderCityItems = ({item, index}) => {
        return (
            <CheckBox
                checkboxStyle={{height: 15, width:15, marginLeft: 15}}
                label={ item.text }
                checked={ item.isChecked != null && item.isChecked != undefined ? item.isChecked : false }
                onChange={(isChecked) => this.onHandleCity(index, !isChecked)}
            />
        );
    }

    renderPropertyTypeItems = ({item, index}) => {
        return (
            <CheckBox
                checkboxStyle={{height: 15, width: 15, marginLeft: 15}}
                label={ item.text }
                checked={ item.isChecked != null && item.isChecked != undefined ? item.isChecked : false }
                onChange={(isChecked) => this.onHandleProperty(index, !isChecked)}
            />
        );
    }

    render() {
        console.log("state", this.state);
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
                                <Image source={require('../../../../assets/png/Filters/check.png')} style={styles.tick}/>
                                <Image source={require('../../../../assets/png/Filters/home.png')} style={styles.headerIcons}/>
                            </TouchableOpacity>
                            <Text style={styles.residenceType}>Home</Text>
                        </View>

                        <View style={styles.subContainer}>
                           <Text style={styles.subtitleText}>Cities</Text>
                           <FlatList
                                data={this.state.cities}
                                keyExtractor={(item, index) => index}
                                extraData={this.state} 
                                renderItem={this.renderCityItems}
                            />
                        </View>
                        
                        <View style={styles.subContainer}>
                           <Text style={styles.subtitleText}>Property Type</Text>
                           <FlatList
                                data={this.state.properties}
                                keyExtractor={(item, index) => index}
                                extraData={this.state} 
                                renderItem={this.renderPropertyTypeItems}
                            />
                        </View>

                        <View style={styles.subContainer}>
                            <Text style={styles.subtitleText}>Price</Text>
                           
                            <View style={{flex:1, flexDirection: 'column', alignItems: 'center'}}>
                                <View style={{width: '80%', flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <Text>{params.currencySign} {this.state.sliderValue[0]}</Text>
                                    <Text>{params.currencySign} {this.state.sliderValue[1]}</Text>
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
                                    <Text>{params.currencySign} 0</Text>
                                    <Text>{params.currencySign} 5000</Text>
                                </View>
                            </View>
                        </View>

                        <TouchableOpacity onPress={this.onFilter}>
                            <View style={styles.searchButtonView}>
                                <Text style={styles.searchButtonText}>Apply Filters</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
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