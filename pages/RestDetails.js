
let rs = {}
import * as Linking from 'expo-linking';

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
import AsyncStorage from '@react-native-community/async-storage';
import React, { useState } from "react";

import {
  Image,
  Button,
  TextInput,
  Alert,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView
} from "react-native";

import Counter from "react-native-counters";
import DateTimePickerModal from "react-native-modal-datetime-picker";

let r_time = undefined;
let n_people = 0;

const DateTime = (props) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = (props) => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (time, func) => {
    r_time = time + '';
    // Format : Thu Jun 25 2020 17:00:00 GMT+0530 (IST)
    console.warn("A time has been picked: ", r_time);
    hideDatePicker();
  };

  return (
    <View style={{ alignItems: 'center' }}>
      <TouchableOpacity style={styles.ButtonStyle} onPress={showDatePicker}>
        <Text style={{ fontWeight: 'bold', color: "#192061", }}>Select Date and Time</Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};
export default class RestDetails extends React.Component {
  UNSAFE_componentWillMount() {

    newls = this.props.navigation.getParam("curRestData");
    console.log("Mounted lsistingsss");
    console.log("data", newls);
    rs = newls;
    this.forceUpdate();
  }
  
  onChange(number, type) {
    n_people = number;
  }
  makeReservation(){
    // Function to change the date format according to the format stored in the 
    // backend database, and make a reservation (through appropriate API calls)

    var mailval = "";

    AsyncStorage.multiGet(['email', 'cardEnding']).then((data) => {
      mailval = data[0][1];
      var cendval = data[1][1];

      if (n_people <= 0 || (!r_time)) {
        console.log("try again");
        Alert.alert('Alert',
          'Please Select Date & Time and Atleast 1 Person ',
          [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ]
        )
        return;
      }

      var c_time = ""; 
      // c_time will be a date string of the format
      // %yyyy-%mm-%ddT%HH:%MM
      
      var liss = r_time.split(" ");
      c_time = c_time + liss[3] + "-";
      
      month_str_to_num = {
        'Jan':'01-', 'Feb':'02-', 'Mar':'03-', 'Apr':'04-',
        'May':'05-', 'Jun':'06-', 'Jul':'07-', 'Aug':'08-',
        'Sep':'09-', 'Oct':'10-', 'Nov':'11-', 'Dec':'12-',
      }
      
      c_time = c_time + month_str_to_num[liss[1]] + liss[2]
      c_time = c_time + "T" + liss[4];

      fetch('https://visa-concierge-service.herokuapp.com/reserve', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "email": mailval,
          "restaurant": rs["name"],
          "numberOfPeople": n_people,
          "time": c_time
        }),

      }).then(response => response.json())
        .then((responseJson) => {
          if (responseJson && responseJson["result"] == "true") {
            // console.log("booking made!!");
            Alert.alert(
              "Congrats!",
              responseJson["message"],
              [
                {
                  text: 'Proceed to My Reservations',
                  onPress: () => {
                    this.props.navigation.navigate('PendingReservations');
                  }
                },
                {
                  text: 'Book A Ride', onPress: () => {
                    console.log('Booking ride ');
                    Linking.openURL('https://m.uber.com/ul/?action=setPickup&client_id=dXDKqDLDYWaBZxWsKHUOqvUdDLwmMht5&pickup[formatted_address]=Visa%20Global%20HQ%2C%20Metro%20Center%20Boulevard%2C%20Foster%20City%2C%20CA%2C%20USA&pickup[latitude]=37.559252&pickup[longitude]=-122.276365&dropoff[formatted_address]=925%20Cortland%20Avenue%2C%20San%20Francisco%2C%20CA%2C%20USA&dropoff[latitude]=37.739128&dropoff[longitude]=-122.413610');
                  }
                },  
              ]
            );

          }
          else {
            Alert.alert("Booking Cannot be made!",
              responseJson["message"]
            );

          }

        })
        .catch(error => {
          Alert.alert("Booking Cannot be made!");
          console.log(error)
        })
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.container2}>

          <View style={{ flex: 0.5, textAlign: 'center', padding: 10 }}>
            <Text style={styles.textHead}>{rs['name']}</Text>
          </View>

          <View style={{ ...styles.detailBox, fontSize: 20 }}>
            {/*Details of restaurant here*/}
            <Text style={{ height: 30, color: '#fff', alignItems: 'flex-start', fontSize: 20 }}>{titleCase(rs['address'])}</Text>
            <Text style={{ height: 30, color: '#fff', alignItems: 'flex-start', fontSize: 20 }}>
              <Text style={{ fontWeight: 'bold' }}>Cuisine: {titleCase(rs["cuisine"]) + '\n'}</Text>
        
            </Text>
            <Text style={{ fontWeight: 'bold', color:"white", fontSize:17 }}>Expense: <Text style = {{color: '#5fa'}}>{'$'.repeat(rs["expense"])}</Text></Text>
            <Text style={{ color: '#fff', alignItems: 'flex-start', fontWeight: 'bold', height: 30, fontSize: 17 }}>
              Wait time: <Text style={timeStyle(rs["waitTime"])}>{rs["waitTime"]} minutes</Text></Text>
            <Text style={{ height: 10 }}>{'\n'}</Text>

            <View style={{ ...styles.detailBox, backgroundColor: '#f00', fontSize: 20, marginBottom: 10 }}>
              <Text style={{ fontSize: 17, fontWeight: 'bold', color: '#fff', textAlign:"center" }}>OFFERS! {'\n'} {rs['offers']}</Text>

            </View>

          </View>
          <Text>{'\n'}</Text>

          <View style={styles.detailBox}>
            {/*Registration form*/}
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: "#fff" }}>Make Reservation</Text>
            <Text style={{ fontSize: 15, color: "#faaa13", }}>Number of people</Text>
            <Counter
              countTextStyle={{ color: '#faaa13' }}
              buttonStyle={{ color: '#faaa13' }}
              buttonTextStyle={{ color: '#faaa13' }}
              start={0}
              onChange={this.onChange.bind(this)}
            />
            <Text style={{ height: 20 }}>{'\n'}</Text>
            <DateTime />
            <Text style={{ height: 10 }}>{'\n'}</Text>
            <TouchableOpacity style={{ ...styles.ButtonStyle, height: "20%", borderWidth: 0 }} 
              onPress={this.makeReservation.bind(this)}>
              <Text style={{ fontWeight: 'bold', alignSelf: 'center', color: "#192061",}}>RESERVE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',

    backgroundColor: "#1a1f71",
    alignItems: "center",
    justifyContent: "center",
  },
  container2: {
    height: "90%",
    width: "90%",
    margin: 50,

    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    color: "#faaa13",
    backgroundColor: "#faaa13",
    borderColor: "#faaa13",

    borderRadius: 20,
    borderBottomWidth: 20,
    shadowColor: "#fff",
    shadowOffset: {
      width: 20,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    elevation: 24,
  },

  detailBox: {
    width: "90%",
    flex: 2,
    backgroundColor: '#192061',
    borderRadius: 20,
    alignItems: 'center',
    padding: 10
  },

  textHead: {
    fontSize: 22,
    textAlign: "center",
    fontWeight: 'bold',
    color: "#192061",
  },
  ButtonStyle: {
    height: "10%",
    width: "60%",

    backgroundColor: "#faaa13",
    borderColor: "#faaa13",
    borderWidth: 15,
    paddingLeft: 5,
    borderRadius: 10,

    textAlign: "center",

    fontSize: 10,
    fontFamily: "sans-serif",
    justifyContent: 'center',

  },
});

const img = StyleSheet.create({
  container: {
  },
  stretch: {
    width: 20,
    height: 20,
    flex: 2,
    flexDirection: 'column',
  },
});

