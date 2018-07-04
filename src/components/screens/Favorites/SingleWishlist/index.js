import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Image, StyleSheet, Text, View, FlatList,TouchableOpacity, ProgressBarAndroid } from 'react-native';
import styles from './styles';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import Icon from 'react-native-fontawesome';

const dot = <FontAwesome style={{fontSize: 5}}>{Icons.circle}</FontAwesome>
const starEmpty = <FontAwesome style={{fontSize: 15, color: '#8f9191'}}>{Icons.starO}</FontAwesome>;
const starFill = <FontAwesome style={{fontSize: 15, color: '#bacfc9'}}>{Icons.starO}</FontAwesome>;

const flastlst_data = [{
    title1: "ENTIRE APPARTMENT . 1 BEDROOM 1 BED 1.5 BATHS",
    title2: "Garden Loft Appartment",
    rating: "Excellent 4.1/5",
    reveiws: "73 Reviews",
    title4: "$350 (LOC 1.2) per night",
    image: require('../../../../assets/wishlist_images/img_1.png')
},
{
    title1: "ENTIRE APPARTMENT . 1 BEDROOM 1 BED 1.5 BATHS",
    title2: "Crazy Bright Studio Appartment",
    rating: "Excellent 4.1/5",
    reveiws: "73 Reviews",
    title4: "$350 (LOC 1.2) per night",
    image: require('../../../../assets/wishlist_images/img_2.png')
}
];
class SingleWishList extends Component {
    state = {
        isLoading: true,
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

    constructor() {
        super();
    }

    componentDidMount() {

    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={{flex: 1}}>
                <TouchableOpacity onPress={() => this.onBackPress()} style={styles.backButton}>
                    <Image style={styles.btn_backImage} source={require('../../../../assets/png/arrow-back.png')} />
                </TouchableOpacity>
                <Text style={styles.title}>Summer</Text>
                <Text style={styles.subtTitle}>Anytime <FontAwesome style={{fontSize: 5}}>{Icons.circle}</FontAwesome> 2 guests</Text>
                <View style={{width: '100%'}}>
                <FlatList style={styles.flatList}
                    data={flastlst_data}
                    renderItem={
                        ({item}) =>
                            <TouchableOpacity style={{flexDirection:'column', alignItems: 'center', marginTop: 10, marginBottom: 10, backgroundColor:'white'}}>
                                <View style={styles.viewForImage}>
                                    <Image
                                        style={styles.flatListItemImage}
                                        source={item.image}
                                    />
                                    <TouchableOpacity style={{height: 40, width: 30,position: 'absolute', alignSelf: 'flex-end', paddingRight: 50,paddingTop: 10}}>
                                        <Image
                                            style={{height: 30, width: 30,resizeMode:'contain'}}
                                            source={require('../../../../assets/wishlist_images/heart.png')}
                                        />
                                    </TouchableOpacity>
                                </View>
                                <View style={{flexDirection:'column', alignItems: 'flex-start', width:'100%'}}>
                                    <Text style={styles.title1}>{item.title1}</Text>
                                    <Text style={styles.title2}>{item.title2}</Text>
                                    <Text style={styles.title3}>{item.rating} {starFill} {starFill} {starFill} {starFill} {starEmpty} {item.reveiws}</Text>
                                    <Text style={styles.title4}>{item.title4}</Text>
                                </View>
                            </TouchableOpacity>
                        }
                    />
                </View>
            </View>
        )
    }
    onStartExploring = () =>{
    }
    onBackPress = () => {
        this.props.navigation.goBack();
    }
}

export default SingleWishList;
