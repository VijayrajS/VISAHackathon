// variable to store the list of restaurants that are returned as a list from
// the API call
var r_list = [];

// User's mail value will be stored here
var mailval = "";

const formatTime = (text) => {
  /*
    Input:
      text: <String> of the form %yyyy-%mm-%ddT%HH:%MMZ
    Output:
      <String> of the form %dd/%mm/%yyyy | Time: %HH:%MM
    Function:
      Formatting the string of the default date object to make it more readable
      to the user in the date and time field of the pending reservation.
  */
 
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


const navigateToInvoice = (obj, restaurant_name, offer_value) => {
  /*
    Input:
      obj: eference to the page object for navigation purposes
      restaurant_name: name of the restaurant
      offer_value: reference to the page object for navigation purposes
      
      Function:
        Passing the data to the invoice page and navigating to the same
  */
  obj.props.navigation.navigate('InvoicePage',
    {
      restname: restaurant_name,
      mailid: mailval,
      offer: offer_value
    }
  );

};


const PendingResObj = (data, index, thisObj) => {
  /*
    Input:
      Data: JSON data object of a reservation
      Index: Index of the JSON object in the list
      thisObj: reference to the page object for navigation purposes
    
      Output:
        A component containing details of a particular pending reservation, with
        a pay button, which redirects to the invoice of the reservation whose payment
        is pending
      
      Function:
        Generating the above described component
  */
 
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
        <Text style={{ color: '#454f66', height: 0 }}>-------------------------------------</Text>

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
  // Main class for the page to display the reservations whose payments are pending
  

  UNSAFE_componentWillMount() {
    // This gets executed before the components get mounted on the screen
    /*
      Before rendering the components on the page, this function loads the user's
      email from the local AsyncStorage, and gets the list of pending reservations
      via the backend API call
    */

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
              
              /*
                Renders the page again forcefully because the API call takes time
                and the page renders before the API call returns the result
              */
              
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
    // rendering function to render the components on screen
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

//stylesets
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
