import React from 'react';
import {Button, TextInput,StyleSheet, Text, View } from 'react-native';
import { add } from 'react-native-reanimated';
import * as SQLite from 'expo-sqlite';


const db = SQLite.openDatabase("db.db");

const Register = props => {
  
  const [card, setCard] = React.useState(null)
  const [name, setName] = React.useState(null)
  const [address, setAddress] = React.useState('Telangana')



  addUser = (card, name, address) => {
    // is text is empty in any of the field?
    if (card === null || card === "") {
      return false;
    }

    if (name === null || name === "") {
      return false;
    }

    if (address === null || address === "") {
      return false;
    }

    db.transaction(
      tx => {
        tx.executeSql("insert into Users (card, name, address) values (?, ?, ?)", [card, name, address]);
        tx.executeSql("select * from Users", [], (_, { rows }) =>
          console.log(JSON.stringify(rows))
        );
      },
      null,
      null
    );
  }

    return (
      <View style={styles.container}>
        <Text style={styles.container2} >Register to Visa Conscierge Services</Text>

        <TextInput
          onChangeText={text => {
            setName(text);
          }
          }
          placeholder="Enter Name Here"
          style={styles.textinput}
          value = {name}
        />

        <TextInput
          onChangeText={text => {
            setCard(text);
          }
          }
          placeholder="Enter Card No Here"
          style={styles.textinput}
          value={card}
        />

        <Button
          title="Register"
          onPress={
            () => {
              
              addUser(card, name, address);
              setName(null);
              setCard(null);
              props.navigation.replace('Welcome');
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
    padding:100,
    // justifyContent: 'center',
    
  },
  container2: {
    justifyContent: 'center',
    color:'#fc0',
    width:300,
    fontSize : 20
  },
  textinput:{
    color:'black',
    backgroundColor:'white',
    fontSize : 20,
    width:300
  }
});

export default Register;