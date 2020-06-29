import * as React from 'react';
import { Text, View, StyleSheet, Button, Alert, SafeAreaView } from 'react-native';
import Constants from 'expo-constants';
import * as Linking from 'expo-linking';


// npm install react-native-table-component

import { DataTable } from 'react-native-paper';

export default class InvoicePage extends React.Component {

    render() {
        return (

            <SafeAreaView style={styles.container}>

                <View style={styles.titleView}>
                    <Text style={styles.title}>  Invoice</Text>
                </View>


                <View style={styles.invoiceTable}>
                    <DataTable style={{ backgroundColor: 'floralwhite' }}>
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
                            <DataTable.Cell> Water </DataTable.Cell>
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
                            <DataTable.Cell > <Text style={{ fontWeight: "bold", fontSize: 20 }}>Total </Text> </DataTable.Cell>
                            <DataTable.Cell numeric>Rs. 975 </DataTable.Cell>

                        </DataTable.Row>


                    </DataTable>
                </View>

                <View style={styles.payBtn}>
                    <Button
                        title="Pay"
                        onPress={() => {
                            var restname = this.props.navigation.getParam("restname");
                            var mailid = this.props.navigation.getParam("mailid");
                            console.log("!!!!!!!!restname",restname);
                            console.log("restname",restname);
                            console.log("restname",this);
                            // https://polar-earth-85350.herokuapp.com/pay  email:restaurant:
                                fetch('https://polar-earth-85350.herokuapp.com/pay', {
                                        method: 'POST',
                                        headers: {
                                          Accept: 'application/json',
                                          'Content-Type': 'application/json',
                                        },
                                        body: JSON.stringify({
                                          "email": mailid,
                                          "restaurant":restname
                                        }),
                                        }).then((response) => response.json())
                                        .then((responseJson) => {
                                           console.log("PayResponse:",responseJson);
                                           // if(responseJson){
 
                                           //  }else{
                                           //    setError(true);
                                           //  }
                                        })
                                        .catch((error) => {
                                        });

                            Alert.alert(
                            "You have Paid Successfully",
                            "What to do now ? ",
                            [
                              {
                                text: 'Proceed',
                                onPress: () => {
                                  console.log('OK22 Pressed');
                                  this.props.navigation.navigate('Payreceived'); 
                                }
                              },
                              {
                                text: 'Book A Ride', onPress: () => {
                                  console.log('Booking ride ');
                                  Linking.openURL('https://olawebcdn.com/assets/ola-universal-link.html?');
                                }
                              },  

                            ]
                          );
                            
                            }}
                    />
                </View>
            </SafeAreaView>

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
        // alignItems: "center",
        backgroundColor: "#192061",
        justifyContent: 'center'
    },
    payBtn: {
        textAlign: 'center',
        marginVertical: 15,
        color: "green",
        alignSelf: 'flex-end',
        marginRight: 15,
        width: "25%"
        // main: "70%"

    },
    invoiceTable: {
        // borderRadius: 
    },
    titleView: {
        // borderRadius: AppStyles.borderRadius.main
    },
    title: {
        fontSize: AppStyles.fontSize.title,
        fontWeight: "bold",
        color: AppStyles.color.white,
        marginTop: 20,
        marginBottom: 10,
        textAlign: 'left',

        // color:"white",
        // alignSelf: "stretch",
    }
});
