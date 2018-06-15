import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Image, StyleSheet, Text, View, FlatList,TouchableOpacity } from 'react-native';
import styles from './styles';


class Favorites extends Component {
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
                    <Text style={styles.title}>Wishlists</Text>                             
                </View>
                <View>
                   <FlatList style={styles.flatList}
                    data="none"
                    renderItem={
                        ({item}) =>
                            <View style={styles.Listcontainer} >
                                <View style={styles.flatList}> 
                                    <View style={styles.placeholderImageView}>
                                        <Image
                                            style={styles.placeholderImage}
                                            source={require('../../../assets/apartment.png')}
                                        />
                                        <View>
                                           <Text style={styles.subtitle}>Summer .<Text  style={styles.subtext}> 4 Listings </Text></Text>                                           
                                        </View>                                   
                                    </View>
                                </View>
                            </View> 
                        }
                    />
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

export default Favorites;
