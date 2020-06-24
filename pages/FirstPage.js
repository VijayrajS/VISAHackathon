import React from 'react';
import { Button, TextInput, StyleSheet, Text, View } from 'react-native';
import { add } from 'react-native-reanimated';



const FirstPage = props => {
    return (
        <View style={styles.container}>
            <Text style={styles.container2} >Welcome to Visa Conscierge Services</Text>

            <View style={styles.buttonStyle}>
                <Button
                    title="Login"
                    onPress={
                        () => {
                            props.navigation.navigate('Login');
                        }
                    } />

                <Button
                    title="Register"
                    onPress={
                        () => {
                            props.navigation.navigate('Register');
                        }
                    } />
            </View>

        </View>
    );

};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',

        backgroundColor: '#192061',
        alignItems: 'center',
        padding: 100,
        // justifyContent: 'center',

    },
    container2: {
        justifyContent: 'center',
        color: 'red',
        width: 300,
        fontSize: 20
    },
    textinput: {
        color: 'black',
        backgroundColor: 'white',
        fontSize: 20,
        width: 300
    },
    buttonStyle: {
        justifyContent: 'center',
        alignContent: 'space-between',
        padding: 10,
        flex: 1
    }
});

export default FirstPage;