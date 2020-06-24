import React from "react";
import {
  Image,
  Button,
  TextInput,
  Alert,
  StyleSheet,
  Text,
  View,
} from "react-native";

const showAlert1 = (data) => {
  Alert.alert(data["restaurant"], data["offers"], [
    {
      text: "Register",
      onPress: () => console.log("Registering at " + data["restaurant"]),
      style: "cancel",
    },
  ]);
};

const Restaur = (data) => {
  let styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#00f",
      alignItems: "center",
      justifyContent: "center",
    },
  });

  return (
    <View styles={styles.container}>
      <Text onPress={() => showAlert1(data)}>{data["restaurant"]}</Text>
    </View>
  );
};

let json_d = require("./restaurants.json");
let r_list = json_d["merchantData"];

export default class Restbooking extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.container2}>Welcome to Restbooking Pages</Text>
        <View>{r_list.map((obj) => Restaur(obj))}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#192061",
    alignItems: "center",
    justifyContent: "center",
  },
  container2: {
    justifyContent: "center",
    color: "red",
    fontSize: 30,
  },
  textinput: {
    color: "black",
    backgroundColor: "white",
  },
  txt2: {
    color: "red",
    fontSize: 30,
  },
});
