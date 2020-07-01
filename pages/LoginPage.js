import React, { useState } from 'react';
import { Image, ImageBackground, TouchableOpacity, Button, TextInput, StyleSheet, Text, View } from 'react-native';
import Navigator from '../navigation/Navigator';
import AsyncStorage from '@react-native-community/async-storage'
import Spinner from 'react-native-loading-spinner-overlay';

import VisaExpLogo from '../assets/visaLoading.png';


const FirstPage = props => {
  const [showspinner, setSpinner] = useState(false);
  const [email, setMail] = useState("");
  const [isHidden, setHidden] = useState(false);
  const [password, setPasswd] = useState("");
  const [isLoading, setLoading] = useState(false);
 const [isMailErr, setMailErr] = useState(false);
const [isPasswordEmpty, setPasswordEmpty] = useState(false);


const emialListener = event => {
    /* 
      Listen to change in mail also validates it and sets it value in state variable
    */
    setMail(event);
    setHidden(false);
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    if (reg.test(event) == false) 
    {
      setMailErr(true);
    }else{
      setMailErr(false);
    }
  };
const passwordListener = event => {
    /* 
      Listen to change in password also check if its empty and sets it value in state variable
    */
    setPasswd(event);
    setHidden(false);
    if(event==""){
      setPasswordEmpty(true);
    }else
    {
      setPasswordEmpty(false);
    }
}
return (
    <View style={styles.container}>
      <Spinner
        visible={showspinner}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />

      <View style={styles.img2}>
        <Image style={styles.imgin} source={VisaExpLogo} />
      </View>
      <View style={styles.inputView} >
        <TextInput
          style={styles.inputText}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          onChangeText={emialListener}
        />
      </View>
      {isMailErr ? (
        <Text style={styles.invlogin} >Invalid Email.Please Enter A valid mail id</Text>
      ) : null
      }

      <View style={styles.inputView} >
        <TextInput
          style={styles.inputText}
          placeholder="Password"
          secureTextEntry={true}
          placeholderTextColor="#003f5c"
          onChangeText={passwordListener}

        />
      </View>
      {isPasswordEmpty ? (
        <Text style={styles.invlogin} >Please Enter your Password.</Text>
      ) : null
      }

      {isHidden ? (
        <Text style={styles.invlogin} >Invalid Login, Try Again!</Text>
      ) : null
      }

      {isLoading && (<View>
        <Text style={styles.or}>Logging You In, Please Wait!</Text>
      </View>
      )}

      <TouchableOpacity style={styles.loginBtn}
      disabled={isMailErr || isPasswordEmpty}
        onPress={
          () => {
            setLoading(true);
            setSpinner(true);
            // console.log("user:", email)
            // console.log("passwd:", password)
            //call this api to check user's login credentials 
            fetch('https://visa-concierge-service.herokuapp.com/user/checkUserLogin', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                "email": email,
                "password": password,
              }),

            }).then(response => response.json())
              .then((responseJson) => {
                // console.log('getting data from fetch', responseJson)
                setLoading(false)
                if (responseJson && responseJson["result"] == true) {
                  setHidden(false);
                  AsyncStorage.multiSet([
                    ['cardEnding', responseJson["cardEnding"].toString()],
                    ['email', responseJson["email"]]
                  ]);
                  setSpinner(false);
                  //if creds correct navigate him to homepage , 
                  //also store his mail and card data to session storage
                  props.navigation.replace('HomePage');
                }
                setSpinner(false);

              })
              .catch(error => console.log(error))
            setTimeout(
              () => { setHidden(true), setSpinner(false) },
              3000
            )
          }
        }
      >
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>

      <Text style={styles.or}>OR</Text>


      <TouchableOpacity style={styles.signUpBtn}
        onPress={
          () => {
            props.navigation.navigate('Register');
          }
        }
      >
        <Text style={styles.signUpText}>Register</Text>
      </TouchableOpacity>

    </View>
  );

};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#142165",
    justifyContent: 'center'
  },

  signUpBtn: {
    color: "white",
    fontSize: 15
  },
  signUpText: {
    color: "#faaa13",
    fontSize: 20
  },

  or: {
    fontSize: 20,
    alignItems: "center",
    color: "white",
    marginTop: 5,
    marginBottom: 5
  },
  invlogin: {
    fontSize: 10,
    alignItems: "center",
    color: "red",
    marginTop: 1,
    marginBottom: 1
  },

  loginText: {
    color: "white"
  },


  inputView: {
    width: "80%",
    backgroundColor: "#B1B8E6",
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

  img2: {
    padding: 40
  },
  imgin: {
    height:118,
    width:250,
    overflow: "hidden",
  }
});


export default FirstPage;