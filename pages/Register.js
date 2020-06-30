import React, { useState } from 'react';
import { ActivityIndicator, ImageBackground, TouchableOpacity, Button, TextInput, StyleSheet, Text, View } from 'react-native';
import { AppStyles } from '../src/AppStyles'
import Navigator from '../navigation/Navigator';




const Register = props => {

  const [name, setName] = React.useState("");
  const [email, setMail] = React.useState("");
  const [card, setCard] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [isHidden, setHidden] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const chng1 = event => {
    setName(event);
    setHidden(false);
  };
  const chng2 = event => {
    setMail(event);
    setHidden(false);
  };
  const chng3 = event => {
    setCard(event);
    setHidden(false);
  };
  const chng4 = event => {
    setAddress(event);
    setHidden(false);
  };
  const chng5 = event => {
    setPassword(event);
    setHidden(false);
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
          secureTextEntry={true}
          onChangeText={chng5}
        />
      </View>

      {isHidden ? (
        <Text style={styles.invlogin} >All Fields are Necessary and Email needs to be valid</Text>
      ) : null
      }

      <TouchableOpacity style={styles.loginBtn}
        onPress={
          () => {
            setLoading(true)
            console.log("name:", name)
            console.log("mail:", email)
            console.log("card:", card)
            console.log("address:", address)
            console.log("passwd:", password)
            if (name == "" || email == "" || card == "" || password == "" || address == "") {
              setHidden(true);
              setLoading(false)
              return;
            }
            setHidden(false);

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
                  setHidden(false)
                  setLoading(false)
                  props.navigation.navigate('FirstPage');
                } else {
                  setTimeout(
                    () => { setHidden(true); setLoading(false); },
                    3000
                  )
                }

              })
              .catch(error => console.log(error))
            setTimeout(
              () => { setHidden(true); setLoading(false); },
              3000
            )
          }
        }

      >

        {isLoading && (<View>

          <ActivityIndicator
            color='black'
            size="large"
            style={styles.activityIndicator} />
        </View>
        )}

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