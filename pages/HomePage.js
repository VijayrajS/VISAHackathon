import React from 'react';
import { ActivityIndicator, Image, ImageBackground, TouchableOpacity, Button, TextInput, StyleSheet, Text, View } from 'react-native';
import { AppStyles } from '../src/AppStyles'
import AsyncStorage from '@react-native-community/async-storage'
import Spinner from 'react-native-loading-spinner-overlay';
import { FlatGrid } from 'react-native-super-grid';
import Logo from '../assets/visaLoading.png';



const HomePage = props => {
  const [showspinner, setSpinner] = React.useState(false);
  const [zip, setZip] = React.useState("");
  const [email, setemail] = React.useState("NA");
  const [isHidden, setHidden] = React.useState(false);
  const [cardEnding, setcardEnding] = React.useState("NA");
  const [isLoading, setLoading] = React.useState(false);
  const [isError, setError] = React.useState(false);

  
  const navigateToPendingReserv = () =>
  {
    props.navigation.navigate("PendingReservations");
  }


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
    { name: 'Golf Course', code: '#3498db' },
    { name: 'Lifestyle', code: '#9b59b6' }
  ]);


  return (
    <View style={styles.container}>
      <Spinner
        visible={showspinner}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />

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

      <View style={styles.img2}>
        <Image style={styles.imgin} source={Logo} />
      </View>

      <FlatGrid
        itemDimension={130}
        data={items}
        style={styles.gridView}
        // staticDimension={300}
        // fixed
        spacing={10}
        renderItem={({ item }) => (
          <View style={[styles.itemContainer, { backgroundColor: "#B1B8E6" }]}
          >
            <Text style={styles.itemName}
              onPress={
                () => {
                  console.log(item.name), "- Clicked ";
                  if(item.name!="Restaurant Booking")
                  {
                    return;
                  }
                  setSpinner(true);

                  fetch('https://visa-concierge-service.herokuapp.com/fetchRestaurantList', {
                    method: 'GET'
                  })
                    .then((response) => response.json())
                    .then((responseJson) => {
                      console.log(responseJson);
                      if (responseJson) {
                        setLoading(false);
                        setSpinner(false);
                        props.navigation.navigate('RestListings',
                          { myJSON: responseJson }
                        );
                      }
                    })
                    .catch((error) => {
                      setSpinner(false);
                    });

                }
              }

            >
              {item.name}
            </Text>

          </View>
        )
        }
      />

      <View style={styles.PendingBtnView}>
       <TouchableOpacity onPress= {navigateToPendingReserv} style={styles.ButtonStyle}>
            <Text style={{fontSize:17, fontWeight:'bold', color:"#192061",textAlign:"center"}}>
              Check pending reservations
              </Text>
              </TouchableOpacity>
        </View>
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
  PendingBtnView:
  {
    paddingTop:20,
    textAlign:"center"
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
    paddingTop:10,
    marginTop: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 80
  },
  itemName: {
    flex: 1,
    fontSize: 20,
    color: 'black',
    fontWeight: '600',
    textAlign:"center",
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
  ButtonStyle: {
    height: "20%",
    width: "70%",
    backgroundColor: "#faaa13",
    padding:25,
    borderRadius: 10,

    textAlign: "center",

    fontSize: 10,
    fontFamily: "sans-serif",
    justifyContent: 'center',

  },
  img2: {
    padding: 40
  },
  imgin: {
    height:118,
    width:250,
    overflow: "hidden",
  },
  spinnerTextStyle: {
    color: '#FFF'
  }
});

export default HomePage;