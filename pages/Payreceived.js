import * as React from 'react';
import { Text, View, StyleSheet, Image, Alert } from 'react-native';
import Constants from 'expo-constants';



export default class Payreceived extends React.Component {



    // const componentDidMount = () => {
    //     // Start counting when the page is loaded
    //     this.timeoutHandle = setTimeout(() => {
    //         // Add your logic for the transition
    //         console.log("use redirect logic here!");

    //         // this.props.nagivate('Welcome');
    //     }, 2000);
    // };

    // const componentWillUnmount = () => {
    //     clearTimeout(this.timeoutHandle); // This is just necessary in the case that the screen is closed before the timeout fires, otherwise it would cause a memory leak that would trigger the transition regardless, breaking the user experience.
    // }


    // componentDidMount();

    // componentWillUnmount();
    componentDidMount(){
        setTimeout(function(){this.props.navigation.navigate('Welcome')}, 2000);
    }

    render(){
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


