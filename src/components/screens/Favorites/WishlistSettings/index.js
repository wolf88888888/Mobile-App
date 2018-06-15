import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Image, StyleSheet, Text, View, FlatList,TouchableOpacity } from 'react-native';
import styles from './styles';


class WishlistSettings extends Component {
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
                               <Text style={styles.title}>Wishlist Settings</Text>
                 </View>
    
                        <View>

                                    {/*<View style={{flex: 1, flexDirection: 'row'}}>
                                   
                                        <View>
                                           <Text style={styles.subtext}>Dates</Text>
                                           <Text style={styles.subtext}>Guests</Text>
                                        </View>
                                        <View>
                                            <Text style={styles.subtext}>Change</Text>
                                           <Text style={styles.subtext}>2 guest</Text>
                                           
                                        </View>
                                    </View>*/}
                                </View>
                     
            </View>
        )
    }
    onStartExploring = () =>{
    }
    onBackPress = () => {
        this.props.navigation.navigate('EXPLORE');
    }
}


export default WishlistSettings;
