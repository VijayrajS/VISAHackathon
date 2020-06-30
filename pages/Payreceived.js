import * as React from 'react';
import { Text, View, StyleSheet, Image, Alert } from 'react-native';
import Constants from 'expo-constants';



export default class Payreceived extends React.Component {


    componentDidMount() {
        console.log("this:::", this)
        var that = this;
        if (this) {
            setTimeout(function () { that.props.navigation.navigate('Welcome'); }, 1700);
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.animation} source={require('../assets/success.gif')} />

                <Text style={styles.message}> Payment successfull! </Text>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#1a1f71',
        padding: 8,
    },
    animation: {
        height: 130,
        width: 130,
    },
    message:
        { color: "#fdbb0a", marginTop: 20, fontWeight: "bold", fontSize: 20 }
});


