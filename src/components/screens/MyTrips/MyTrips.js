import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Image, StyleSheet, Text, View, FlatList,TouchableOpacity } from 'react-native';
import styles from './styles';


class MyTrips extends Component {
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
            <View style={styles.container}>
               <View style={styles.chatToolbar}>
                                <TouchableOpacity onPress={this.onBackPress}>
                                    <Image style={styles.btn_backImage} source={require('../../../../src/assets/icons/icon-back-white.png')}/>
                                </TouchableOpacity>
                               <Text style={styles.title}>Your Trip</Text>
                 </View>
            
                <FlatList style={styles.flatList}
                data="none"
                renderItem={
                    ({item}) =>       
                        <View>
                            <View style={{flex: 1, flexDirection: 'row'}}>
                                <View style={styles.img_round}><Text style={{alignItems: 'center'}}>26</Text></View>                                                
                                <View> 
                                    <View>
                                        <Text style={styles.subtext}>2:00pm</Text>
                                        <Text style={styles.subtitle}>Check into Garden Loft Apartment</Text> 
                                    </View>
                                    <View style={styles.placeholderImageView}>
                                        <Image
                                            style={styles.placeholderImage}
                                            source={require('../../../assets/apartment.png')}
                                        />
                                    </View>
                                    <View style={{flex: 1, flexDirection: 'row'}}>
                                   
                                        <View>
                                           <Text style={styles.subtext}>Bargo Pinti 50121</Text>
                                           <Text style={styles.subtext}>Firenze Italy</Text>
                                        </View>
                                        <View>
                                           <Image style={styles.senderImage} source={require('../../../../src/assets/icons/senderImages.png')}/>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View> 

                        }
                    />
            </View>
        )
    }
    onStartExploring = () =>{
    }
    onBackPress = () => {
        this.props.navigation.navigate('EXPLORE');
    }
}


export default MyTrips;
