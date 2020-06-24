import React from 'react';
import {Image,Button, TextInput,StyleSheet, Text, View } from 'react-native';


const Welcome = props => {
  
    return (
      <View style={styles.container}>
        <Text style={styles.container2} >Welcome to Visa Conscierge Services</Text>
                <Image source={{uri:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSaTo9xOUfrVYMqjtdOLEK9CTrMMM9MLer7FA&usqp=CAU",height:80,width:200}} />
         <Image source={{uri:'https://reactnative.dev/docs/assets/p_cat2.png'}}/>
         <TextInput   placeholder="Enter Zip No Here" style={styles.textinput}
         />
         <Button title="Search for Merchants" onPress={
          ()=> props.navigation.navigate('Restbooking')
         }></Button>
      </View>
    );
}



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
    color:'red',
    width:300,
    fontSize : 20
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

export default Welcome;