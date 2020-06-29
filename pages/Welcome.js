import React from 'react';
import { ActivityIndicator, Image, ImageBackground, TouchableOpacity, Button, TextInput, StyleSheet, Text, View } from 'react-native';
import { AppStyles } from '../src/AppStyles'
import AsyncStorage from '@react-native-community/async-storage'

import { FlatGrid } from 'react-native-super-grid';


// import { StyleSheet, View, Text } from 'react-native';

const Welcome = props => {

  const [zip, setZip] = React.useState("");
  const [email, setemail] = React.useState("NA");
  const [isHidden, setHidden] = React.useState(false);
  const [cardEnding, setcardEnding] = React.useState("NA");
  const [isLoading, setLoading] = React.useState(false);
  const [isError, setError] = React.useState(false);

  const chng1 = event => {
    setError(false);
    setZip(event);
    // console.log(props)
    // console.log(AsyncStorage.getItem('email'))
    // console.log(AsyncStorage.getItem('cardEnding'))
  };

  React.useEffect(() => {
    console.log('mount it!');
    setError(false);
    AsyncStorage.multiGet(['email', 'cardEnding']).then((data) => {
      var mailval = data[0][1];
      var cendval = data[1][1];
      console.log(mailval)
      console.log(cendval)
      setemail(mailval);
      setcardEnding(cendval);
    })

  }, []);

  const [items, setItems] = React.useState([
    { name: 'Restaurant Booking', code: '#1abc9c' },
    { name: 'Movie Booking', code: '#2ecc71' },
    { name: 'Cab Booking', code: '#3498db' },
    { name: 'Pay bills', code: '#9b59b6' }
  ]);


  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        <View style={styles.leftContainer}>
          <Text style={[styles.text, { textAlign: 'left' }]}>
            Welcome
                  </Text>
        </View>

        <View style={styles.rightContainer}>
          <Text style={[styles.text, { textAlign: 'right' }]}>
            CardNumber
                  </Text>
        </View>
      </View>
      <View style={styles.navBar}>
        <View style={styles.leftContainer}>
          <Text style={[styles.text, { textAlign: 'left' }]}>
            {email}
          </Text>
        </View>
        <View style={styles.rightContainer}>
          <Text style={[styles.text, { textAlign: 'right' }]}>
            **{cardEnding}
          </Text>
        </View>
      </View>


      <View
        style={{
          paddingTop: 15,
        }}
      />


      <View
        style={{
          width: 700,
          borderWidth: 5,
          borderTopColor: "#1a1f71",
          borderBottomColor: '#faaa13',
        }}
      />


      <Text style={[styles.title, styles.centreTitle]} >Welcome to Visa Conscierge Services</Text>

      <Image style={styles.img} source={{ uri: "https://i.ibb.co/ZJD8FXB/logo.jpg", height: 80, width: 200 }} />


      {/* <View style={styles.inputView} >
        <TextInput
          style={styles.inputText}
          placeholder="Zip code"
          placeholderTextColor="#003f5c"
          onChangeText={chng1}
        />
      </View>

      {isHidden ? (
        <Text style={styles.invlogin} >Zip Code Cannot be Empty</Text>
      ) : null
      } */}

      <FlatGrid
        itemDimension={130}
        data={items}
        style={styles.gridView}
        // staticDimension={300}
        // fixed
        spacing={10}
        renderItem={({ item }) => (
          <View style={[styles.itemContainer, { backgroundColor: item.code }]}
          >
            <Text style={styles.itemName}
              onPress={() => {
                // console.log("Hi");
                // setLoading(true);
                // setError(false);
                // if (zip == "") {
                //   console.log("empty");
                //   setLoading(false);
                //   setHidden(true);
                // } else 
                // setHidden(false);
                console.log("zip", zip);
                //todo fetch rest and pass it to next page
                fetch('https://polar-earth-85350.herokuapp.com/fetchRestaurantList', {
                  method: 'GET'
                })
                  .then((response) => response.json())
                  .then((responseJson) => {
                    console.log(responseJson);
                    if (responseJson) {
                      setLoading(false);
                      props.navigation.navigate('RestListings',
                        { myJSON: responseJson }
                      );
                    }
                    // else {
                    //   setError(true);
                    // }
                  })
                  .catch((error) => {
                    // console.error(error);
                    // setError(true);
                  });


              }
              }

            >{item.name}</Text>
            {/* <Text style={styles.itemCode}>{item.code}</Text> */}
          </View>
        )}
      />

    {/*  <TouchableOpacity onPress={props.navigate('PendingReservations')} style={styles.ButtonStyle}>
            <Text style={{fontWeight:'bold', color:"#192061"}}>Check pending reservations</Text></TouchableOpacity>*/}

    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#192061",
    justifyContent: 'center'
  },
  textinput: {
    color: 'black',
    backgroundColor: 'white'
  },
  txt2: {
    color: '#fc0',
    fontSize: 30
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
  inputView: {
    width: "80%",
    backgroundColor: "#465881",
    borderRadius: 25,
    height: 55,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20
  },
  img: {
    marginTop: 20,
    marginBottom: 40
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
  tl: {
    alignSelf: 'flex-end',
    marginTop: -5,
    color: "#faaa13",
  },
  tr: {
    alignSelf: 'flex-start',
    marginTop: -5,
    color: "#faaa13",
  },
  text: {
    color: "#faaa13",
  },

  navBar: {
    height: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    color: "#faaa13"
  },
  rightContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    color: "#faaa13"
  },
  invlogin: {
    fontSize: 10,
    alignItems: "center",
    color: "red",
    marginTop: 1,
    marginBottom: 1
  },
  container2: {
    // flex:1,
    paddingTop: 10,
    paddingBottom: 10,
    width: 700,
    backgroundColor: "#181c40",
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
    borderBottomColor: '#faaa13',
  },
  invlogin: {
    fontSize: 10,
    alignItems: "center",
    color: "red",
    marginTop: 1,
    marginBottom: 1
  },
  gridView: {
    marginTop: 1,
    // flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 80,
  },
  itemName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
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

export default Welcome;