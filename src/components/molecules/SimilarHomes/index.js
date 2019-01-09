import React, { Component } from 'react';
import {
        Text,
        View,
        ListView,
        Dimensions
      } from 'react-native';
import Image from 'react-native-remote-svg';
import StarRatings from '../../atoms/StarRatings';
import LikeButton from '../../atoms/LikeButton';

import styles from './styles';

const dimensionWindows = Dimensions.get('window');

class SimilarHomes extends Component {

    static get propTypes() {
        return {
        }
    };

    constructor(props) {
        super(props);
        this.onLike = this.onLike.bind(this);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows([{info:'ENTIRE APARTMENT • 1 BEDROOM  • 1 BED • 1.5 BATHS', name:'Garden Loft Apartment', rateName:'Excellent', rate:4.1, reviews:73, price:'$350 (LOC 1.2) per night'},
                {info:'ENTIRE APARTMENT • 1 BEDROOM  • 1 BED • 1.5 BATHS', name:'Garden Loft Apartment', rateName:'Excellent', rate:4.1, reviews:73, price:'$350 (LOC 1.2) per night'},
                {info:'ENTIRE APARTMENT • 1 BEDROOM  • 1 BED • 1.5 BATHS', name:'Garden Loft Apartment', rateName:'Excellent', rate:4.1, reviews:73, price:'$350 (LOC 1.2) per night'},
                {info:'ENTIRE APARTMENT • 1 BEDROOM  • 1 BED • 1.5 BATHS', name:'Garden Loft Apartment', rateName:'Excellent', rate:4.1, reviews:73, price:'$350 (LOC 1.2) per night'},
                {info:'ENTIRE APARTMENT • 1 BEDROOM  • 1 BED • 1.5 BATHS', name:'Garden Loft Apartment', rateName:'Excellent', rate:4.1, reviews:73, price:'$350 (LOC 1.2) per night'}]),
        };
    }

    componentDidMount() {
    }

    onLike() {

    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Similar Homes</Text>
                <ListView
                    horizontal={true}
                    style={{marginLeft:20, marginRight:20}}
                    dataSource={this.state.dataSource}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    renderRow={(rowData) =>
                        <View style={styles.listItem}>
                            <LikeButton like={false} onLike={this.onLike} ButtonViewStyle={{top: 15, right:15, width: 22, height: 22, alignSelf: 'flex-end'}} ButtonStyle={{width:22, height:22}}/>
                            <Image style={styles.logoImage} source = {require('../../../assets/temple/overview.jpg')} />
                            <Text style={styles.info}>
                                {rowData.info}
                            </Text>
                            <Text style={styles.name}>
                                {rowData.name}
                            </Text>
                            <View style={[styles.rateViewContainer, {height:15}]}>
                                <Text style={[styles.rateText, {height:15, paddingTop:2}]}>
                                    Excellent 4.1/5
                                </Text>
                                <StarRatings
                                    maximumValue = {5}
                                    minimumValue = {0}
                                    value = {4.2}
                                    style = {{width:60, height:15, paddingTop:2, marginLeft:5}}
                                    starStyle={{width:9, height:9,}}
                                    emptyStarImage={<Image style={{width:9, height:9,}} source={require('../../../assets/empty-star.png')}/>}
                                    filledStarImage={<Image style={{width:9, height:9,}} source={require('../../../assets/empty-star-full.png')}/>}/>

                                <Text style={[styles.rateText, {height:15, paddingTop:2}]}>
                                    73 Reviews
                                </Text>
                            </View>
                            <Text style={styles.price}>
                                {rowData.price}
                            </Text>
                        </View>
                    }
               />
           </View>
        );
    }
}

export default SimilarHomes;
