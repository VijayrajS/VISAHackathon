import React, { useState } from 'react';
import {ImageBackground, TouchableOpacity, Button, TextInput, StyleSheet, Text, View } from 'react-native';
import { AppStyles } from '../src/AppStyles'
import Navigator from '../navigation/Navigator';
import Spinner from 'react-native-loading-spinner-overlay';




const Register = props => {

  const [name, setName] = React.useState("");
  const [email, setMail] = React.useState("");
  const [card, setCard] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [iscarderr, setcarderr] = useState(false);
  const [ismailerr, setmailerr] = useState(false);


  const chng1 = event => {
    setName(event);
    setError(false);
  };
  const chng2 = event => {
    setMail(event);
    setError(false);
     var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    if (reg.test(event) == false) 
    {
      setmailerr(true);
    }else{
      setmailerr(false);
    }
  };
  const chng3 = event => {
    // console.log(event.length);
    setCard(event);
    setError(false);
    let isnum = /^\d+$/.test(event);
    let len=event.length;
    if(len==16 && isnum){
      console.log("valid card");
      setcarderr(false);
    }else{
      setcarderr(true);
    }
  };
  const chng4 = event => {
    setAddress(event);
    setError(false);
  };
  const chng5 = event => {
    setPassword(event);
    setError(false);
  };

  return (
    <View style={styles.container}>
      <Spinner
        visible={isLoading}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />
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
      {ismailerr ? (
        <Text style={styles.invlogin} >Invalid Email.Please Enter A valid mail id</Text>
      ) : null
      }

      <View style={styles.inputView} >
        <TextInput
          style={styles.inputText}
          placeholder="card"
          placeholderTextColor="#003f5c"
          onChangeText={chng3}
        />
      </View>
      {iscarderr ? (
        <Text style={styles.invlogin} >Invalid Card Number. Please Enter 16 digits Numeric value.</Text>
      ) : null
      }

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
          secureTextEntry={true}
          onChangeText={chng5}
        />
      </View>

      {isError ? (
        <Text style={styles.invlogin} >All Fields are Necessary.Email and Card needs to be valid</Text>
      ) : null
      }

      <TouchableOpacity style={styles.loginBtn}
      disabled={iscarderr || ismailerr}
        onPress={
          () => {
            setLoading(true)
            console.log("name:", name)
            console.log("mail:", email)
            console.log("card:", card)
            console.log("address:", address)
            console.log("passwd:", password)
            if (name == "" || email == "" || card == "" || password == "" || address == "") {
              setError(true);
              setLoading(false)
              return;
            }
            setError(false);

            fetch('https://visa-concierge-service.herokuapp.com/user/registerUser', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                "email": email,
                "name": name,
                "address": address,
                "cardNumber": card,
                "password": password
              }),

            }).then(response => response.json())
              .then((responseJson) => {
                console.log('getting data from fetch', responseJson)
                setLoading(false)
                if (responseJson && responseJson["result"] == true) {
                  console.log("resp json true");
                  setError(false)
                  setLoading(false)
                  props.navigation.navigate('LoginPage');
                } else {
                  console.log("resp json false");
                  setTimeout(
                    () => { setError(true); setLoading(false); },
                    3000
                  )
                }

              })
              .catch(error => console.log(error))
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
    backgroundColor: "#192061",
    justifyContent: 'center'
  }, container2: {
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
  inputView: {
    width: "80%",
    backgroundColor: "#465881",
    borderRadius: 25,
    height: 55,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#faaa13",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 10
  },
  loginText: {
    color: "white"
  },
  title: {
    fontSize: AppStyles.fontSize.title,
    fontWeight: "bold",
    color: AppStyles.color.tint,
    marginTop: 20,
    marginBottom: 20,
    color: "#fdbb0a"
  },
  leftTitle: {
    alignSelf: "stretch",
    textAlign: "left",
    marginLeft: 20
  },
  centreTitle: {
    alignSelf: "stretch",
    textAlign: "center",
    marginLeft: 20
  },
  invlogin: {
    fontSize: 10,
    alignItems: "center",
    color: "red",
    marginTop: 1,
    marginBottom: 1
  },
});

export default Register;