
// let r_list = [
//     {
//       "restaurant": "LITTLE NEPAL",
//       "numberOfPeople": 4,
//       "time": "2020-06-19T23:02:00Z"
//   },
//   {
//     "restaurant": "MEDIUM NEPAL",
//     "numberOfPeople": 42,
//     "time": "2020-06-19T23:02:00Z"
//   },
//   {
//     "restaurant": "BIG NEPAL",
//     "numberOfPeople": 420,
//     "time": "2020-06-19T23:02:00Z"
//   },
// ];


// r_list = [...r_list,...r_list,...r_list,...r_list,...r_list,]
var r_list = [];
var mailval = "";
// let r_list=[];

const titleCase = (text) => {
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

// const showAlert1 = (data, obj) => {
//   Alert.alert(data["restaurant"], data["offers"], [
//     {
//       text: "Reserve",
//       onPress: () => obj.props.navigation.navigate('InvoicePage'),
//       // console.log("Reserving at " + data["restaurant"]),
//       style: "cancel",
//     },
//   ]);
// };


const navigateToInvoice = (obj, restnm) => {
  console.log("Restnm:", restnm);
  obj.props.navigation.navigate('InvoicePage',
    {
      restname: restnm,
      mailid: mailval,
      offerPercentage: "20"
    }
  );

};


const Restaur2 = (data, index, thisObj) => {
  // console.log("in func!!!!!!")
  let top_padding = (index == 0) ? { paddingTop: 70 } : {}
  return (
    <View key={index} style={{ ...boxstyles.MainContainer, ...top_padding }}>
      <View style={boxstyles.TextViewStyle}>
        <Text style={boxstyles.TextTitle}>{data["restaurant"]}</Text>
        <TouchableOpacity style={boxstyles.ButtonStyle}
        onPress={() => navigateToInvoice(thisObj, data["restaurant"])}
        >
          <Text style={{ ...boxstyles.ButtonText, textAlign: 'center' }} >Pay</Text>
        </TouchableOpacity>
        <Text style={{ color: '#454f66', height: 0 }}>LoremLoremLoremLoremLoremLoremLoremLo</Text>

        <View style={{ alignItems: 'flex-start' }}>
          <Text style={{ color: '#fff', alignItems: 'flex-start', fontWeight: 'bold', height: 30 }}>
            Number of people: <Text>{data["numberOfPeople"]}</Text></Text>
          <Text style={{ height: 30, color: '#fff', alignItems: 'flex-start' }}>
            <Text style={{ fontWeight: 'bold' }}>Date: {titleCase(data["time"])}</Text></Text>
        </View>
      </View>
    </View>
  );
};


export default class PendingReservations extends React.Component {


  UNSAFE_componentWillMount() {
    // AsyncStorage.multiGet(['email', 'cardEnding']).then((data) => {

    AsyncStorage.getItem("email").then((value) => {
      mailval = value;
    })
      .then(res => {
        console.log("MAILVAL:::", mailval);
        // var mailval = "pradeep@gmail.com";
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
            // console.log('getting data pendres', responseJson["result"])
            if (responseJson && responseJson["result"] == "true") {
              console.log("assiging!!!");
              var newls = responseJson["reservations"];
              r_list = newls;
              this.forceUpdate();
              // console.log("r_lis:::",r_list)

            }
            else {
              console.log("no data!!!");
            }

          })
          .catch(error => {
            console.log("no data!!!");
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
          {r_list.map((obj, ind) => Restaur2(obj, ind, this))}
        </ScrollView>
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
  container2: {
    // flex:1,
    paddingTop: 10,
    paddingBottom: 10,
    width: 700,
    // backgroundColor: "#181c40",
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
      // padding:1,
      width: "100%",
      justifyContent: 'center',
      alignItems: 'center',
      // padding:"3%",
      paddingBottom: "3.5%",
      justifyContent: "center",
      color: "#fff",
      fontSize: 25,
    },
    TextTitle:
    {
      textAlign: 'left',
      // padding: 10,
      color: '#fdbb0a',
      fontWeight: 'bold',
      fontSize: 15

    },
    ButtonStyle: {
      // height: "20%",
      width: "30%",

      backgroundColor: "#faaa13",
      // borderColor: "#faaa13",
      // borderWidth: 15,
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

    TextStyle:
    {
      textAlign: 'center',

      color: '#fff',
      padding: 10,

    }

  });



const img = StyleSheet.create({
  container: {
  },
  stretch: {
    width: 20,
    height: 20,
    paddingRight: 10,
    resizeMode: 'stretch',
    flex: 10,
    flexDirection: 'column',
  },
});
