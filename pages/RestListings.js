let r_list = []

let timeStyle = (time) => {
  time = +time;
  if (time < 6) {
    return { fontWeight: 'bold', color: '#5fa' };
  }
  if (time < 11) {
    return { fontWeight: 'bold', color: '#eb3' };
  }
  return { fontWeight: 'bold', color: '#f55' };
}
const titleCase = (text) => text[0].toUpperCase() + text.slice(1).toLowerCase();

import React from "react";
import {
  Image,
  Button,
  TextInput,
  Alert,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";


const Restaur = (data, index, props_t) => {
  let top_padding = (index == 0) ? { paddingTop: 70 } : {}

  return (
    <View key={index} style={{ ...boxstyles.MainContainer, ...top_padding }}>
      <View style={boxstyles.TextViewStyle}>
        <Text style={boxstyles.TextTitle}>{data["name"]}</Text>
        <TouchableOpacity style={boxstyles.ButtonStyle}
          onPress={() => {
              props_t.props.navigation.navigate('RestDetails',
                { curRestData: data }
              );
            }
          }
        >
          <Text style={boxstyles.ButtonText} >See Details</Text>
        </TouchableOpacity>
        <Text style={{ color: '#454f66', height: 0 }}>-------------------------------------</Text>

        <View style={{ alignItems: 'flex-start' }}>
          <Text style={{ color: '#fff', alignItems: 'flex-start', fontWeight: 'bold', height: 30 }}>
            <Image source={require('../src/images/wait.png')} style={img.stretch} />
            Wait time: <Text style={timeStyle(data["waitTime"])}>{data["waitTime"]} minutes</Text>
          </Text>
          <Text style={{ height: 30, color: '#fff', alignItems: 'flex-start' }}>
            <Image source={require('../src/images/cuisine.png')} style={img.stretch} />
            <Text style={{ fontWeight: 'bold' }}>Cuisine: {titleCase(data["cuisine"])}</Text>
          </Text>
        </View>
      </View>
    </View>
  );
};


export default class RestListings extends React.Component {

  UNSAFE_componentWillMount() {

    newls = this.props.navigation.getParam("myJSON")["restaurants"];
    newls.sort((a, b) => (a.waitTime > b.waitTime) ? 1 : -1)
    r_list = newls;
    this.forceUpdate();
  }


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.container2}>Search Results</Text>
        <ScrollView
          style={{ paddingBottom: 100 }}
          scrollEnabled={true}>
          {r_list.map((obj, ind) => Restaur(obj, ind, this))}
        </ScrollView>
      </View>
    );
  }
}

//stylesets

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: "#192061",
    alignItems: "center",
    justifyContent: "center",
  },
  container2: {
    paddingTop: 10,
    paddingBottom: 10,
    width: 700,
    justifyContent: "center",
    textAlign: "center",
    alignContent: "center",
    color: "#faaa13",
    fontSize: 25,

    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 20,
    },
    borderWidth: 5,
    borderTopColor: "#1a1f71",
    borderBottomColor: '#faaa13',
  },

  textinput: {
    color: "white",
    backgroundColor: "white",
  },
});

const boxstyles = StyleSheet.create(
  {
    MainContainer:
    {
      flexDirection: 'column',
      width: "100%",
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: "3.5%",
      justifyContent: "center",
      color: "#fff",
      fontSize: 25,
    },
    TextTitle:
    {
      textAlign: 'left',
      color: '#fdbb0a',
      fontWeight: 'bold',
      fontSize: 15

    },
    ButtonStyle: {
      width: "30%",
      backgroundColor: "#faaa13",
      padding: 8,
      paddingLeft:13,
      borderRadius: 20,
      position: 'absolute',
      right: "2%",
      top: "10%",
      textAlign: "center",

      fontSize: 10,
      fontFamily: "sans-serif",
      justifyContent: 'center',

    },

    ButtonText: {
      color: "#1a216d",
      fontWeight: 'bold',
      fontSize: 12

    },
    TextViewStyle:
    {
      borderWidth: 2,
      borderBottomWidth: 7,
      borderRadius: 20,
      borderColor: '#1e232e',
      width: '100%',
      padding: 15,
      backgroundColor: '#454f66',
      shadowColor: '#1b2230',
      shadowOffset: {
        width: 1,
        height: 4,
      },
    },
  });

const img = StyleSheet.create({
  stretch: {
    width: 20,
    height: 20,
    paddingRight: 10,
    resizeMode: 'stretch',
    flex: 10,
    flexDirection: 'column',
  },
});

