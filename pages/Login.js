import React from 'react';
import { Button, TextInput, StyleSheet, Text, View } from 'react-native';
import { add } from 'react-native-reanimated';
import * as SQLite from 'expo-sqlite';


const db = SQLite.openDatabase("db.db");

const Login = props => {
    const [name, setName] = React.useState(null)
    const [check, setCheck] = React.useState(true)

    const checkRows = (rows) => {
        jsonText = JSON.stringify(rows);
        var obj = JSON.parse(jsonText);
        console.log(jsonText);
        console.log(obj.length);
        if (obj.length === 0) {
            console.log("enterd");
            setCheck(false);
        }
    }

    const checkUser = (name) => {
        if (name === null || name === "") {
            return false;
        }
        db.transaction(
            tx => {
                // tx.executeSql("insert into Users (card, name, address) values (?, ?, ?)", [card, name, address]);
                tx.executeSql("select * from Users where name = ?", [name], (_, { rows }) =>
                    checkRows(rows)
                );
            },
            null,
            null
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.container2} >Login to Visa Conscierge Services</Text>

            <TextInput
                onChangeText={text => {
                    setName(text);
                }
                }
                placeholder="Please Enter Your Name Here"
                style={styles.textinput}
                value={name}
            />

            <Button
                title="Login"
                onPress={
                    () => {

                        checkUser(name);
                        setName(null);
                        console.log(check);
                        if (check) {
                            // props.navigation.pop();
                            props.navigation.replace('Welcome');
                        }
                        else {
                            props.navigation.replace('Login');
                            setCheck(true);
                        }
                    }
                } />

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
    }
});

export default Login;