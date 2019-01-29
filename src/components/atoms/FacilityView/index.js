import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';
import CardView from 'react-native-cardview'
import PropTypes from 'prop-types';
//import Image from 'react-native-remote-svg';

import styles from './styles';
const home_air_conditioning = require('../../../assets/facilities/homes/air_conditioning.png');
const home_bathtub = require('../../../assets/facilities/homes/bathtub.png')
const home_bbq_grill = require('../../../assets/facilities/homes/bbq_grill.png')
const home_breakfast = require('../../../assets/facilities/homes/breakfast.png')
const home_coffee_maker = require('../../../assets/facilities/homes/coffee_maker.png')
const home_essentials = require('../../../assets/facilities/homes/essentials.png')
const home_fireplace = require('../../../assets/facilities/homes/fireplace.png')
const home_first_aid_kit = require('../../../assets/facilities/homes/first_aid_kit.png')
const home_game_console = require('../../../assets/facilities/homes/game_console.png')
const home_gym = require('../../../assets/facilities/homes/gym.png')
const home_hair_dryer = require('../../../assets/facilities/homes/hair_dryer.png')
const home_hangers = require('../../../assets/facilities/homes/hangers.png')
const home_heating = require('../../../assets/facilities/homes/heating.png')
const home_iron = require('../../../assets/facilities/homes/iron.png')
const home_kitchen = require('../../../assets/facilities/homes/kitchen.png')
const home_parking = require('../../../assets/facilities/homes/parking.png')
const home_pool = require('../../../assets/facilities/homes/pool.png')
const home_toys = require('../../../assets/facilities/homes/toys.png')
const home_tv = require('../../../assets/facilities/homes/tv.png')
const home_wifi = require('../../../assets/facilities/homes/wifi.png')

const hotels_air_conditioning = require('../../../assets/facilities/hotels/air_conditioning.png')
const hotels_bicycle = require('../../../assets/facilities/hotels/bicycle.png')
const hotels_coffee_makcr = require('../../../assets/facilities/hotels/coffee_makcr.png')
const hotels_gym = require('../../../assets/facilities/hotels/gym.png')
const hotels_hair_dryer = require('../../../assets/facilities/hotels/hair_dryer.png')
const hotels_heating = require('../../../assets/facilities/hotels/heating.png')
const hotels_kitchen = require('../../../assets/facilities/hotels/kitchen.png')
const hotels_minibar = require('../../../assets/facilities/hotels/minibar.png')
const hotels_parking = require('../../../assets/facilities/hotels/parking.png')
const hotels_pets = require('../../../assets/facilities/hotels/pets.png')
const hotels_playground = require('../../../assets/facilities/hotels/playground.png')
const hotels_pool = require('../../../assets/facilities/hotels/pool.png')
const hotels_restaurant = require('../../../assets/facilities/hotels/restaurant.png')
const hotels_room_service = require('../../../assets/facilities/hotels/room_service.png')
const hotels_safe = require('../../../assets/facilities/hotels/safe.png')
const hotels_sauna = require('../../../assets/facilities/hotels/sauna.png')
const hotels_spa = require('../../../assets/facilities/hotels/spa.png')
const hotels_tennis = require('../../../assets/facilities/hotels/tennis.png')
const hotels_wifi = require('../../../assets/facilities/hotels/wifi.png')

const FacilityView = (props) => {
    let imgFacility = "";
    if (!props.isMore) {
        const path = props.image;
        const slash = path.lastIndexOf("/");
        const dot = path.lastIndexOf(".");
        const name = path.substring(slash + 1, dot);
        console.log("imgFacility", name);
        if (props.isHome) {
            if (name === "air_conditioning") {
                imgFacility = home_air_conditioning;
            }
            else if (name === "bathtub") {
                imgFacility = home_bathtub;
            }
            else if (name === "bbq_grill"){
                imgFacility = home_bbq_grill;
            }
            else if (name === "breakfast"){
                imgFacility = home_breakfast;
            }
            else if (name === "coffee_maker"){
                imgFacility = home_coffee_maker;
            }
            else if (name === "essentials"){
                imgFacility = home_essentials;
            }
            else if (name === "fireplace"){
                imgFacility = home_fireplace;
            }
            else if (name === "first_aid_kit"){
                imgFacility = home_first_aid_kit;
            }
            else if (name === "game_console"){
                imgFacility = home_game_console;
            }
            else if (name === "gym"){
                imgFacility = home_gym;
            }
            else if (name === "hair_dryer"){
                imgFacility = home_hair_dryer;
            }
            else if (name === "hangers"){
                imgFacility = home_hangers;
            }
            else if (name === "heating"){
                imgFacility = home_heating;
            }
            else if (name === "iron"){
                imgFacility = home_iron;
            }
            else if (name === "kitchen"){
                imgFacility = home_kitchen;
            }
            else if (name === "parking"){
                imgFacility = home_parking;
            }
            else if (name === "pool"){
                imgFacility = home_pool;
            }
            else if (name === "toys"){
                imgFacility = home_toys;
            }
            else if (name === "tv"){
                imgFacility = home_tv;
            }
            else if (name === "wifi"){
                imgFacility = home_wifi;
            }
        }
        else {
            if (name === "air_conditioning") {
                imgFacility = hotels_air_conditioning;
            }
            else if (name === "bicycle"){
                imgFacility = hotels_bicycle;
            }
            else if (name === "coffee_makcr"){
                imgFacility = hotels_coffee_makcr;
            }
            else if (name === "gym"){
                imgFacility = hotels_gym;
            }
            else if (name === "hair_dryer"){
                imgFacility = hotels_hair_dryer;
            }
            else if (name === "heating"){
                imgFacility = hotels_heating;
            }
            else if (name === "kitchen"){
                imgFacility = hotels_kitchen;
            }
            else if (name === "minibar"){
                imgFacility = hotels_minibar;
            }
            else if (name === "parking"){
                imgFacility = hotels_parking;
            }
            else if (name === "pets"){
                imgFacility = hotels_pets;
            }
            else if (name === "playground"){
                imgFacility = hotels_playground;
            }
            else if (name === "pool"){
                imgFacility = hotels_pool;
            }
            else if (name === "restaurant"){
                imgFacility = hotels_restaurant;
            }
            else if (name === "room_service" || name === "room service"){
                imgFacility = hotels_room_service;
            }
            else if (name === "safe"){
                imgFacility = hotels_safe;
            }
            else if (name === "sauna"){
                imgFacility = hotels_sauna;
            }
            else if (name === "spa"){
                imgFacility = hotels_spa;
            }
            else if (name === "tennis"){
                imgFacility = hotels_tennis;
            }
            else if (name === "wifi"){
                imgFacility = hotels_wifi;
            }
        }
    }
    console.log("imgFacility", imgFacility);
    // console.log("imgFacility", home_air_conditioning);
    return (
        <View style={[styles.container, props.style]}>
            {
                props.isMore == true?
                    props.more != 0 ?
                        <TouchableOpacity onPress={props.onPress}>
                            <Text style={styles.facilityMore}>+{props.more}</Text>
                        </TouchableOpacity>
                    :
                        <View/>
                :   
                    <CardView style={styles.imageBackground}
                        cardElevation={1}
                        cardMaxElevation={1}
                        cornerRadius={0}>
                    
                        <Image source={imgFacility} style={styles.facilityImage}/>
                        {/* <Image source={props.image} style={styles.facilityImage}/> */}
                    </CardView>
            }

        </View>
    );
}

FacilityView.propTypes = {
    more: PropTypes.number,
    isHome: PropTypes.bool,
    isMore: PropTypes.bool,
};

FacilityView.defaultProps = {
    more: 0,
    isHome: false,
    isMore: false,
};

export default FacilityView;
