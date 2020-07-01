import * as React from 'react';
import { Text, View, StyleSheet, Button, Alert, SafeAreaView, TouchableOpacity} from 'react-native';
import Constants from 'expo-constants';
import * as Linking from 'expo-linking';
import { Dimensions } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

const win = Dimensions.get('window');


import { DataTable } from 'react-native-paper';

export default class InvoicePage extends React.Component {
        state = {
        showloader: '',
      }

    offer = this.props.navigation.getParam("offer");
    offerPercentage = parseFloat((this.offer).substr(0,this.offer.indexOf('%')))
    discount = 975 * ((this.offerPercentage) / 100);
    total = 975 - this.discount;


    render() {
        return (

            <View style={styles.container}>
            <Spinner
                visible={ (this.state.showloader == "true")} 
                textContent={'Loading...'}
                textStyle={styles.spinnerTextStyle}
              />

            <Text style={styles.container2}>Invoice</Text>


                <View style={styles.invoiceTable}>
                    <DataTable style={{ backgroundColor: 'floralwhite', fontSize:20}}>
                        <DataTable.Header >
                            <DataTable.Title ></DataTable.Title>
                            <DataTable.Title numeric>Quantity</DataTable.Title>
                            <DataTable.Title numeric>Price</DataTable.Title>
                            <DataTable.Title numeric>Cost</DataTable.Title>
                        </DataTable.Header>
                        <DataTable.Row>
                            <DataTable.Cell borderRight flex={2} > Lasagna </DataTable.Cell>
                            <DataTable.Cell numeric>2</DataTable.Cell>
                            <DataTable.Cell numeric>350</DataTable.Cell>
                            <DataTable.Cell numeric>700</DataTable.Cell>
                        </DataTable.Row>

                        <DataTable.Row>
                            <DataTable.Cell>Ice cream </DataTable.Cell>
                            <DataTable.Cell numeric>1</DataTable.Cell>
                            <DataTable.Cell numeric>100</DataTable.Cell>
                            <DataTable.Cell numeric>100</DataTable.Cell>
                        </DataTable.Row>



                        <DataTable.Row>
                            <DataTable.Cell>Water </DataTable.Cell>
                            <DataTable.Cell numeric>3</DataTable.Cell>
                            <DataTable.Cell numeric>25</DataTable.Cell>
                            <DataTable.Cell numeric>75</DataTable.Cell>
                        </DataTable.Row>


                        <DataTable.Row>
                            <DataTable.Cell>Salad </DataTable.Cell>
                            <DataTable.Cell numeric>1</DataTable.Cell>
                            <DataTable.Cell numeric>100</DataTable.Cell>
                            <DataTable.Cell numeric>100</DataTable.Cell>
                        </DataTable.Row>

                        <DataTable.Row>
                            <DataTable.Cell> </DataTable.Cell>
                            <DataTable.Cell >Discount</DataTable.Cell>
                            <DataTable.Cell >  ({this.offerPercentage}%) </DataTable.Cell>
                            <DataTable.Cell numeric><Text>{this.discount}</Text></DataTable.Cell>
                        </DataTable.Row>

                        <DataTable.Row>
                            <DataTable.Cell > <Text style={{ fontWeight: "bold", fontSize: 20 }}>Total </Text> </DataTable.Cell>
                            <DataTable.Cell numeric>Rs. {this.total} </DataTable.Cell>

                        </DataTable.Row>


                    </DataTable>
                </View>


                <View style={styles.PendingBtnView}>
       <TouchableOpacity style={styles.ButtonStyle} 
       
             onPress={() => {
                            this.setState({showloader: 'true'});
                            var restname = this.props.navigation.getParam("restname");
                            var mailid = this.props.navigation.getParam("mailid");
                            console.log("restname", restname);
                            fetch("https://visa-concierge-service.herokuapp.com/pushPayment",{method: 'GET'});

                            fetch('https://visa-concierge-service.herokuapp.com/pay', {
                                method: 'POST',
                                headers: {
                                    Accept: 'application/json',
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    "email": mailid,
                                    "restaurant": restname
                                }),
                            }).then((response) => response.json())
                                .then((responseJson) => {
                                    console.log("PayResponse:", responseJson);
                                    this.props.navigation.navigate('Payreceived');
                                    this.setState({showloader: 'false'});
                                })
                                .catch((error) => {
                                    this.setState({showloader: 'false'});
                                    console.log("error!!!");
                                    // console.log("PayResponse:", responseJson);
                                    Alert.alert(
                                        "Error",
                                        "Payment not made Successfully ",
                                        [
                                            {
                                                text: 'Close',
                                                onPress: () => {
                                                    console.log('OK22 Pressed');
                                                }
                                            },
                                        ]
                                    );
                                });

                           this.setState({showloader: 'false'});
                        }}
       
       >
            <Text style={{fontSize:17, fontWeight:'bold', color:"#192061",textAlign:"center"}}>
              Pay
              </Text>
              </TouchableOpacity>
        </View>

            </View>

            // </View>
        );
    }
}




export const AppStyles = {
    color: {
        main: "#5ea23a",
        text: "#696969",
        title: "#464646",
        subtitle: "#545454",
        categoryTitle: "#161616",
        tint: "#ff5a66",
        description: "#bbbbbb",
        filterTitle: "#8a8a8a",
        starRating: "#2bdf85",
        location: "#a9a9a9",
        white: "white",
        facebook: "#4267b2",
        grey: "grey",
        greenBlue: "#00aea8",
        placeholder: "#a0a0a0",
        background: "#f2f2f2",
        blue: "#3293fe"
    },
    fontSize: {
        title: 30,
        content: 20,
        normal: 16
    },
    textInputWidth: {
        main: "80%"
    },
    fontName: {
        main: "Noto Sans",
        bold: "Noto Sans"
    },
    borderRadius: {
        main: 25,
        small: 5
    }
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        // alignItems: "center",
        backgroundColor: "#192061",
        justifyContent: 'center'
    },
    PendingBtnView:
  {
    paddingTop:20,
    textAlign:"center"
  },
  ButtonStyle: {
    height: "15%",
    width: "30%",
    backgroundColor: "#faaa13",
    padding:25,
    borderRadius: 30,

    alignItems:"center",
    textAlign: "center",

    fontSize: 10,
    fontFamily: "sans-serif",
    justifyContent: 'center',

    alignSelf: 'flex-end',
    marginRight: 15,

  },
    invoiceTable: {
        paddingTop:20
    },
    title: {
        fontSize: AppStyles.fontSize.title,
        fontWeight: "bold",
        color: AppStyles.color.white,
        marginTop: 20,
        marginBottom: 10,
        textAlign: 'left',
    },
    container2: {
    paddingTop: 0,
    paddingBottom: 10,
    width: win.width,
    textAlign: "center",
    color: "#faaa13",
    fontSize: 35,
    borderWidth: 5,
    borderLeftColor:"#192061",
    borderRightColor:"#192061",
    borderTopColor: "#192061",
    borderBottomColor: '#faaa13',
  },

});
