import React from 'react';
import { ActivityIndicator, Image, ImageBackground, TouchableOpacity, Button,  StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import Spinner from 'react-native-loading-spinner-overlay';
import { FlatGrid } from 'react-native-super-grid';
import Logo from '../assets/visaLoading.png';



const HomePage = props => {
  const [showspinner, setSpinner] = React.useState(false);
  const [email, setemail] = React.useState("NA");
  const [cardEnding, setcardEnding] = React.useState("NA");

  
  const navigateToPendingReserv = () =>
  {
    /* 
      navigate to Pending reservations page
    */
    props.navigation.navigate("PendingReservations");
  }

  React.useEffect(() => {
    /*
    This function executes on starting of component load so calling this function  
      to get mail id and card ending from session(async) storage
       as they are needed in api calls
    */
    AsyncStorage.multiGet(['email', 'cardEnding']).then((data) => {
      var mailval = data[0][1];
      var cendval = data[1][1];
      // console.log(mailval)
      // console.log(cendval)
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
        spacing={10}
        renderItem={({ item }) => (
          <View style={[styles.itemContainer, { backgroundColor: "#B1B8E6" }]}
          >
            <Text style={styles.itemName}
              onPress={
                () => {
                  // console.log(item.name), "- Clicked ";
                  if(item.name!="Restaurant Booking")
                  {
                    return;
                  }
                  setSpinner(true);

                  // api to fetch restaurants list near user
                  fetch('https://visa-concierge-service.herokuapp.com/fetchRestaurantList', {
                    method: 'GET'
                  })
                    .then((response) => response.json())
                    .then((responseJson) => {
                      // console.log(responseJson);
                      if (responseJson) {
                        setSpinner(false);
                        //navigate to restaurant listing on succesful fetch
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

  PendingBtnView:
  {
    paddingTop:20,
    textAlign:"center"
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