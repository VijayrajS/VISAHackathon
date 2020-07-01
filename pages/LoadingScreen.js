import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, Animated } from 'react-native';

import Logo from '../assets/visaLoading.png';
import LoginPage from './LoginPage';

class LoadingScreen extends Component {
    // Main class for the loading screen page
    
    state = {
        // state for the animated component (the logo )
        LogoAnime: new Animated.Value(0)
    }

    componentDidMount() {
        /*
         function to trigger the animation of the logo on the loading screen
         and redirect to the Login page
        */
        const { LogoAnime } = this.state;
        Animated.parallel([
            Animated.spring(LogoAnime, {
                toValue: 1,
                tension: 5,
                friction: 1,
                duration: 30000
            }).start(() => { this.props.navigation.replace('LoginPage') }),
        ]).start()
    }

    render() {
        // rendering function to render the components on screen
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
        backgroundColor: "#142165",
        justifyContent: 'center'
    },
    image: {
        width: 230,
        height: 100
    }
});

export default LoadingScreen;