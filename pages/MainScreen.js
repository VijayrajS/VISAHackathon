import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, Animated } from 'react-native';

import Logo from '../assets/visaLoading.png';
import FirstPage from './FirstPage';

class MainScreen extends Component {
    state = {
        LogoAnime: new Animated.Value(0)
    }

    componentDidMount() {
        const { LogoAnime } = this.state;
        Animated.parallel([
            Animated.spring(LogoAnime, {
                toValue: 1,
                tension: 5,
                friction: 1,
                duration: 30000
            }).start(() => { this.props.navigation.replace('FirstPage') }),
        ]).start()
    }

    render() {
        return (
            <View style={styles.container}>
                <Animated.View style={{
                    opacity: this.state.LogoAnime,
                    top: this.state.LogoAnime.interpolate({
                        inputRange: [0, 1],
                        outputRange: [200, 0]
                    }),
                }}>
                    <Image source={Logo} style={styles.image} />
                </Animated.View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#192061",
        justifyContent: 'center'
    },
    image: {
        width: 300,
        height: 200
    }
});

export default MainScreen;