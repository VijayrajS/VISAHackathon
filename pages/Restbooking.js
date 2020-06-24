import React from 'react';
import {Image,Button, TextInput,StyleSheet, Text, View } from 'react-native';


export default class Restbooking extends React.Component{
  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.container2} >Welcome to Restbooking Pages</Text>
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#192061',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container2: {
    justifyContent: 'center',
    color:'red',
    fontSize : 30
  },
  textinput:{
    color:'black',
    backgroundColor:'white'
  },
  txt2:{
    color:'red',
     fontSize : 30
  }
});
