// let rs = {
//       "restaurant": "MONTECRISTO REST",
//       "address": "6286 3RD ST",
//       "cuisine": "CHINESE",
//       "expense": "AVERAGE",
//       "offers": "10% off on total bill",
//       "waitTime": "10"
//     };
let rs={}

  let timeStyle = (time)=>{
    time = +time;
    if(time < 6){
      return {fontWeight:'bold', color: '#5fa'};
    }
    if(time < 11){
      return {fontWeight:'bold', color: '#eb3'};
    }
    return {fontWeight:'bold', color: '#f55'};
  }
  
  const titleCase = (text) => text[0].toUpperCase() + text.slice(1).toLowerCase();
  import AsyncStorage from '@react-native-community/async-storage';
  import React, { useState } from "react";
  // import React from "react";
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
      <View style={{alignItems:'center'}}>
        <TouchableOpacity style = {styles.ButtonStyle} onPress={showDatePicker}>
          <Text style = {{fontWeight:'bold', color:"#192061",}}>Select date and time</Text>
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
  
  const showAlert1 = (data) => {
  Alert.alert(data["name"], data["offers"], [
    {
      text: "Reserve",
      onPress: () => console.log("Reserving at " + data["name"]),
      style: "cancel",
    },
  ]);
  };

  export default class RestDetails extends React.Component {
      UNSAFE_componentWillMount() {

        newls=this.props.navigation.getParam("curRestData");
        console.log("Mounted lsistingsss");
        console.log("data",newls);
        rs=newls;
        this.forceUpdate();
        // props_temp=this.props;
        // set_r_list(newls);
        // this.setState({ lisr: false }); 
      }
    onChange(number, type) {
      console.log(number, type); // 1, + or -
      n_people = number;
    }
    
    render() {
    return (
      <View style={styles.container}>
        <View style={styles.container2}>
          
          <View style ={{flex:0.5, textAlign:'center', padding:10}}>
            <Text style={styles.textHead}>{rs['name']}</Text>
          </View>
          
          <View style = {{...styles.detailBox, fontSize:20}}>
            {/*Details of restaurant here*/}
            <Text style={{height:50, color:'#fff', alignItems:'flex-start', fontSize:20}}>{titleCase(rs['address'])}</Text>
            <Text style={{height:30, color:'#fff', alignItems:'flex-start', fontSize:20}}>
            <Text style={{fontWeight:'bold'}}>Cuisine: {titleCase(rs["cuisine"])}</Text></Text>
            <Text style={{color:'#fff', alignItems:'flex-start', fontWeight:'bold',height:30, fontSize:17}}>
            Wait time: <Text style={timeStyle(rs["waitTime"])}>{rs["waitTime"]} minutes</Text></Text>
            <Text style={{height:10}}>{'\n'}</Text>
            
            <View style = {{...styles.detailBox, backgroundColor:'#f00', fontSize:20, marginBottom:10}}>
              <Text style={{fontSize:17, fontWeight:'bold', color:'#fff'}}>OFFERS:{rs['offers']}</Text>
              
            </View>
            
          </View>
          <Text>{'\n'}</Text>
          
          <View style = {styles.detailBox}>
            {/*Registration form*/}
            <Text style={{fontSize:20, fontWeight:'bold', color:"#fff"}}>Make Reservation</Text>
            <Text style={{fontSize:15, color:"#faaa13",}}>Number of people</Text>
            <Counter 
              countTextStyle = {{color:'#faaa13'}}
              buttonStyle = {{color:'#faaa13'}}
              buttonTextStyle = {{color:'#faaa13'}}
              start={0} 
              onChange={this.onChange.bind(this)}
              />
            <Text style={{height:20}}>{'\n'}</Text>            
            <DateTime />
            <Text style={{height:10}}>{'\n'}</Text>
            <TouchableOpacity style = {{...styles.ButtonStyle, height:"20%", borderWidth:0}} onPress={undefined}
             onPress={
                        () => {
                          console.log("reserve clicked");
                          var mailval="";

                          AsyncStorage.multiGet(['email', 'cardEnding']).then((data) => {
                                mailval = data[0][1];
                                var cendval= data[1][1];
                                // console.log(mailval);
                                // console.log(cendval);
                              
                          // Alert.alert("alert!!!")
                          console.log("email:",mailval)
                          console.log("rest:",rs["name"])
                          console.log("numberOfPeople:",n_people)
                          console.log("time:",r_time)//Mon Jun 29 2020 00:48:00
                          if(n_people <= 0 || (!r_time)){
                            console.log("try again");
                            Alert.alert('Alert',  
                                'Please Select Date & Time and Atleast 1 Person ',  
                                [  
                                    {text: 'OK', onPress: () => console.log('OK Pressed')},  
                                ]  
                              )
                            return;
                          }

                          var c_time=""; //2020-06-29T05:44
                          var liss=r_time.split(" ");
                          c_time=c_time+liss[3];
                          c_time=c_time+"-";
                          if(liss[1]=='Jan'){
                            c_time=c_time+"01"+"-";
                          }
                          if(liss[1]=='Feb'){
                            c_time=c_time+"02"+"-";
                          }
                          if(liss[1]=='Mar'){
                            c_time=c_time+"03"+"-";
                          }
                          if(liss[1]=='Apr'){
                            c_time=c_time+"04"+"-";
                          }
                          if(liss[1]=='May'){
                            c_time=c_time+"05"+"-";
                          }
                          if(liss[1]=='Jun'){
                            c_time=c_time+"06"+"-";
                          }
                          if(liss[1]=='Jul'){
                            c_time=c_time+"07"+"-";
                          }
                          if(liss[1]=='Aug'){
                            c_time=c_time+"08"+"-";
                          }
                          if(liss[1]=='Sep'){
                            c_time=c_time+"09"+"-";
                          }
                          if(liss[1]=='Oct'){
                            c_time=c_time+"10"+"-";
                          }
                          if(liss[1]=='Nov'){
                            c_time=c_time+"11"+"-";
                          }
                          if(liss[1]=='Dec'){
                            c_time=c_time+"12"+"-";
                          }
                          c_time=c_time+liss[2]+"T"+liss[4];
                          console.log("timec:",c_time)

                          console.log("continue");

                          fetch('https://polar-earth-85350.herokuapp.com/reserve', {
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
                                console.log('getting data from fetch', responseJson)
                                console.log('getting data from fetch::::', responseJson["result"])
                                if(responseJson && responseJson["result"]=="true"){
                                   console.log("booking made!!!!!");
                                   console.log(responseJson["message"])
                                   Alert.alert("Congrats!!!",
                                    responseJson["message"],
                                    [  
                                        {
                                          text: 'Proceed to My Reservations', 
                                          onPress: () => {
                                            console.log('OK22 Pressed'); 
                                            this.props.navigation.navigate('PendingReservations');
                                          } 
                                        },  
                                    ]  
                                    );

                                }
                                else{
                                      Alert.alert("Booking Cannot be made!!",
                                         responseJson["message"]
                                        );

                                }

                            })
                            .catch(error => {
                              Alert.alert("Booking Cannot be made!!");
                              console.log(error)
                            })
                                  
                          
                          })
                     }
                   }

            >
              <Text style = {{fontWeight:'bold', alignSelf:'center', color:"#192061",}
                }>RESERVE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
  }
  
  const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection: 'column',

    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  container2: {
    height:"90%",
    width:"90%",
    margin:50,
    
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    color: "#faaa13",
    backgroundColor: "#faaa13",
    borderColor: "#faaa13",
    
    borderRadius:20,
    borderBottomWidth:20,
    shadowColor: "#000",
    shadowOffset: {
      width: 20,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    elevation: 24,
  },
  
  detailBox:{
    width:"90%",
    flex: 2,
    backgroundColor:'#192061',
    borderRadius:20,
    alignItems:'center',
    padding:10
  },
  
  textHead:{
    // position:'absolute',
    // top:20,
    fontSize: 22,
    textAlign:"center",
    fontWeight:'bold',
    color:"#192061",
  },
  ButtonStyle:{
    height: "10%",
    width : "60%",
    
    backgroundColor: "#faaa13",
    borderColor: "#faaa13",
    borderWidth: 15,
    paddingLeft:5,
    borderRadius:10,

    textAlign:"center",

    fontSize: 10,
    fontFamily:"sans-serif",
    justifyContent: 'center',

  },
  });
  
  const img = StyleSheet.create({
    container: {
    },
    stretch: {
      width: 20,
      height: 20,
      flex:2,
      flexDirection: 'column',
    },
  });
  
