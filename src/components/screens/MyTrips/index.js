import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
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
                <View style={styles.placeholderImageView}>
                    <Image
                        style={styles.placeholderImage}
                        source={require('../../../assets/placeholder_mytrips.png')}
                    />
                </View>
                <Text style={styles.title}>You have no upcoming trips</Text>
                <Text style={styles.subtext}>Discover your next experience</Text>
                <TouchableOpacity onPress={this.onStartExploring} style={styles.buttonExplore}>
                    <Text style={styles.exploreBtnText}>Start Exploring</Text>
                </TouchableOpacity>
            </View>
        )
    }
    onStartExploring = () =>{
        // this.props.navigation.navigate('AllMyTrips')
    }
}


export default MyTrips;
