// User lands on this page when the payment of the service is successfull
// From this page, user has the option to either book a cab or proceed to HomePage

import * as React from 'react';
import { Text, View, StyleSheet, Image, Alert } from 'react-native';
import Constants from 'expo-constants';
import * as Linking from 'expo-linking';
import { HeaderStyleInterpolators } from 'react-navigation-stack';

export default class Payreceived extends React.Component {
    componentDidMount() {        
        /*
        This function displays an alert after the "payment successfull" animation complets.
        Option to redirect to cab service or to homePage.
        */
        
        console.log("this:::", this)
        var that = this;
        if (this) {
            setTimeout(function () {
                 Alert.alert(
                    "You have Paid Successfully",
                    "What to do now? ",
                    [
                        {
                            text: 'Proceed',
                            onPress: () => {
                                console.log('OK Pressed');
                                that.props.navigation.navigate('HomePage'); 
                            }
                        },
                        {
                            text: 'Book A Ride', onPress: () => {
                                console.log('Booking ride ');
                                // The following link is added to demo the cab booking feature
                                // Opens Uber app with pickup point "Little Nepal" restaurant and drop point Visa Global HQ
                                Linking.openURL('https://m.uber.com/ul/?action=setPickup&client_id=dXDKqDLDYWaBZxWsKHUOqvUdDLwmMht5&pickup[formatted_address]=925%20Cortland%20Avenue%2C%20San%20Francisco%2C%20CA%2C%20USA&pickup[latitude]=37.739128&pickup[longitude]=-122.413610&dropoff[formatted_address]=Visa%20Global%20HQ%2C%20Metro%20Center%20Boulevard%2C%20Foster%20City%2C%20CA%2C%20USA&dropoff[latitude]=37.559252&dropoff[longitude]=-122.276365');
                                that.props.navigation.navigate('HomePage'); 
                            }
                        },

                    ]
                );
         }, 1700);
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


