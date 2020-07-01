
var r_list = [];
var mailval = "";

const formatTime = (text) => {
  let date = text.split('T')[0].split('-').reverse().join('/');
  let time = text.split(/[TZ]/)[1];
  time = time.split(':')[0] + ':' + time.split(':')[1]

  return date + ' | Time: ' + time;
}
import AsyncStorage from '@react-native-community/async-storage';
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


const navigateToInvoice = (obj, restnm, offer1) => {
  obj.props.navigation.navigate('InvoicePage',
    {
      restname: restnm,
      mailid: mailval,
      offer: offer1
    }
  );

};


const PendingResObj = (data, index, thisObj) => {
  let top_padding = (index == 0) ? { paddingTop: 70 } : {}
  return (
    <View key={index} style={{ ...boxstyles.MainContainer, ...top_padding }}>
      <View style={boxstyles.TextViewStyle}>
        <Text style={boxstyles.TextTitle}>{data["restaurant"]}</Text>
        <TouchableOpacity style={boxstyles.ButtonStyle}
        onPress={() => navigateToInvoice(thisObj, data["restaurant"],data["offers"])}
        >
          <Text style={{ ...boxstyles.ButtonText, textAlign: 'center' }} >Pay</Text>
        </TouchableOpacity>
        <Text style={{ color: '#454f66', height: 0 }}>LoremLoremLoremLoremLoremLoremLoremLo</Text>

        <View style={{ alignItems: 'flex-start' }}>
          <Text style={{ color: '#fff', alignItems: 'flex-start', fontWeight: 'bold', height: 30 }}>
            Number of people: <Text>{data["numberOfPeople"]}</Text></Text>
          <Text style={{ height: 30, color: '#fff', alignItems: 'flex-start' }}>
            <Text style={{ fontWeight: 'bold' }}>Date: {formatTime(data["time"])}</Text></Text>
        </View>
      </View>
    </View>
  );
};


export default class PendingReservations extends React.Component {


  UNSAFE_componentWillMount() {
    AsyncStorage.getItem("email").then((value) => {
      mailval = value;
    })
      .then(res => {
        console.log("MAILVAL:::", mailval);
        fetch('https://visa-concierge-service.herokuapp.com/fetchPendingReservations', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "email": mailval,
          }),
        }).then(response => response.json())
          .then((responseJson) => {
            console.log('getting data pendres', responseJson)
            if (responseJson && responseJson["result"] == "true") {
              console.log("assiging!");
              var newls = responseJson["reservations"];
              
              r_list = newls;
              this.forceUpdate();

            }
            else {
              console.log("No data!");
            }

          })
          .catch(error => {
            console.log("No data!");
            console.log(error);
            r_list = [];
            this.forceUpdate();
          })

      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.container2}>Pending reservations</Text>
        <ScrollView
          style={{ paddingBottom: 100 }}
          scrollEnabled={true}>
          {r_list.map((obj, ind) => PendingResObj(obj, ind, this))}
        </ScrollView>

        <View style={styles.PendingBtnView}>
       <TouchableOpacity style={styles.ButtonStyle} onPress={() => {this.props.navigation.navigate("HomePage");} }>
            <Text style={{fontSize:17, fontWeight:'bold', color:"#192061",textAlign:"center"}}>
              Home Page
              </Text>
              </TouchableOpacity>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: "#192061",
    alignItems: "center",
    justifyContent: "center",
  },
  PendingBtnView:
  {
    paddingTop:20,
    textAlign:"center"
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
  ButtonStyle: {
    height: "13%",
    width: "70%",
    backgroundColor: "#faaa13",
    padding:25,
    borderRadius: 30,

    textAlign: "center",

    fontSize: 10,
    fontFamily: "sans-serif",
    justifyContent: 'center',

  }
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
