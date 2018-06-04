import React, { Component } from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import styles from './styles';
class Favorites extends Component {
    constructor() {
        super();
    }

    componentDidMount() {

    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.placeholderImageView}>
                    <Image
                        style={styles.placeholderImage}
                        source={require('../../../assets/placeholder_favorites.png')}
                    />
                </View>
                <Text style={styles.title}>You don't have any added destinations yet.</Text>
                <Text style={styles.subtext}>Explore thousands of locations and add your favorites here.</Text>
                <TouchableOpacity style={styles.buttonDiscover}>
                    <Text style={styles.discoverBtnText}>Discover your next experience</Text>
                </TouchableOpacity>
            </View>
        )
    }
}


export default Favorites;
