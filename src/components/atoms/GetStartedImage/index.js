import React from 'react';
import { View, Image } from 'react-native';
import styles from './styles';

const GetStartedImage = () => (
    <View style={styles.lowOpacity}>
            <Image
                source={require('../../../assets/vector.png')}
                style={styles.getStartedImage}
            />
    </View>
);

export default GetStartedImage;
