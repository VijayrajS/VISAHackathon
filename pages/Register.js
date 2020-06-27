import React, { useState } from 'react';
import {ImageBackground,TouchableOpacity, Button, TextInput, StyleSheet, Text, View } from 'react-native';
import {AppStyles } from '../src/AppStyles'
import Navigator from '../navigation/Navigator';




const Register = props => {

  const [name, setName] = React.useState("");
  const [card, setCard] = React.useState("");
  const [email, setMail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [address, setAddress] = React.useState("");
          chng1=event=>{
            setMail(event);
          };
          chng2=event=>{
            setMail(event);
          };
          chng3=event=>{
            setMail(event);
          };
          chng4=event=>{
            setMail(event);
          };
          chng5=event=>{
            setMail(event);
          };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, styles.centreTitle]} >Register to Visa Conscierge Services</Text>

      <View style={styles.inputView} >
                      <TextInput  
                        style={styles.inputText}
                        placeholder="name" 
                        placeholderTextColor="#003f5c"
                        onChangeText={chng1}
                        />
                    </View>

            <View style={styles.inputView} >
                      <TextInput  
                        style={styles.inputText}
                        placeholder="email" 
                        placeholderTextColor="#003f5c"
                        onChangeText={chng2}
                        />
                    </View>


                    <View style={styles.inputView} >
                      <TextInput  
                        style={styles.inputText}
                        placeholder="card" 
                        placeholderTextColor="#003f5c"
                        onChangeText={chng3}
                        />
                    </View>

                    <View style={styles.inputView} >
                      <TextInput  
                        style={styles.inputText}
                        placeholder="address" 
                        placeholderTextColor="#003f5c"
                        onChangeText={chng4}
                        />
                    </View>

                    <View style={styles.inputView} >
                      <TextInput  
                        style={styles.inputText}
                        placeholder="password"
                        type="password" 
                        placeholderTextColor="#003f5c"
                        onChangeText={chng5}
                        />
                    </View>

   <TouchableOpacity style={styles.loginBtn} 
                onPress={
                        () => {
                              props.navigation.navigate('FirstPage');
                          }
                      }
                  >

                     <Text style={styles.loginText}>Register</Text>
                  </TouchableOpacity>


    </View>
  );

};



const styles = StyleSheet.create({
    container: {
    flex: 1,
    alignItems: "center",
    backgroundColor:"#192061",
    justifyContent: 'center'
  },  container2: {
    justifyContent: 'center',
    color: '#fc0',
    width: 300,
    fontSize: 20
  },
  textinput: {
    color: 'black',
    backgroundColor: 'white',
    fontSize: 20,
    width: 300
  },
      inputView:{
    width:"80%",
    backgroundColor:"#465881",
    borderRadius:25,
    height:55,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
     loginBtn:{
    width:"80%",
    backgroundColor:"#faaa13",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:20,
    marginBottom:10
  },
    loginText: {
    color:"white"
  },
    title: {
    fontSize: AppStyles.fontSize.title,
    fontWeight: "bold",
    color: AppStyles.color.tint,
    marginTop: 20,
    marginBottom: 20,
    color:"#fdbb0a"
  },
  leftTitle: {
    alignSelf: "stretch",
    textAlign: "left",
    marginLeft: 20
  },
  centreTitle:{
    alignSelf: "stretch",
    textAlign: "center",
    marginLeft: 20
  },
});

export default Register;