import React from 'react';
import {Image,ImageBackground,TouchableOpacity, Button, TextInput, StyleSheet, Text, View } from 'react-native';
import {AppStyles } from '../src/AppStyles'
import AsyncStorage from '@react-native-community/async-storage'


const Welcome = props => {

    const [zip, setZip] = React.useState("");
    const [email, setemail] = React.useState("NA");
    const [isHidden, setHidden] = React.useState(false);
    const [cardEnding, setcardEnding] = React.useState("NA");
          const chng1=event=>{
            setZip(event);
            // console.log(props)
            // console.log(AsyncStorage.getItem('email'))
            // console.log(AsyncStorage.getItem('cardEnding'))
          };

              React.useEffect(() => {
                  console.log('mount it!');
                  AsyncStorage.multiGet(['email', 'cardEnding']).then((data) => {
                      var mailval = data[0][1];
                      var cendval= data[1][1];
                      console.log(mailval)
                      console.log(cendval)
                      setemail(mailval);
                      setcardEnding(cendval);
                    })
                    
              }, []);

    return (
      <View style={styles.container}>



      <View style={styles.navBar}>
      <View style={styles.leftContainer}>
        <Text style={[styles.text, {textAlign: 'left'}]}>
          Welcome
        </Text>
      </View>

      <View style={styles.rightContainer}>
        <Text style={[styles.text, {textAlign: 'right'}]}>
          CardNumber
        </Text>
      </View>
    </View>
     <View style={styles.navBar}>
      <View style={styles.leftContainer}>
        <Text style={[styles.text, {textAlign: 'left'}]}>
          {email}
        </Text>
      </View>
      <View style={styles.rightContainer}>
        <Text style={[styles.text, {textAlign: 'right'}]}>
          **{cardEnding}
        </Text>
      </View>
    </View>





              <Text style={[styles.title, styles.centreTitle]} >Welcome to Visa Conscierge Services</Text>
                
                <Image style={styles.img} source={{uri:"https://i.ibb.co/ZJD8FXB/logo.jpg",height:80,width:200} } />
         
         
               <View style={styles.inputView} >
                      <TextInput  
                        style={styles.inputText}
                        placeholder="Zip code" 
                        placeholderTextColor="#003f5c"
                        onChangeText={chng1}
                        />
                    </View>

                  {isHidden ? (
                  <Text style={styles.invlogin} >Zip Code Cannot be Empty!!!</Text>  
                  ) : null
                  }

   <TouchableOpacity style={styles.loginBtn} 
                onPress={
                        () => {
                          if(zip==""){
                            console.log("empty");
                            setHidden(true);
                          }else{
                            setHidden(false);
                            console.log("zip",zip);
                            //todo fetch rest and pass it to next page
                            props.navigation.navigate('Restbooking');
                          }
                              
                          }
                      }
                  >

                     <Text style={styles.loginText}>Search for Merchants</Text>
                  </TouchableOpacity>
      </View>
    );
}



const styles = StyleSheet.create({
    container: {
    flex: 1,
    alignItems: "center",
    backgroundColor:"#192061",
    justifyContent: 'center'
  },
    container2: {
    justifyContent: 'center',
    color:'#fc0',
    width:300,
    fontSize : 20
  },
  textinput:{
    color:'black',
    backgroundColor:'white'
  },
  txt2:{
    color:'#fc0',
     fontSize : 30
  },
      title: {
    fontSize: AppStyles.fontSize.title,
    fontWeight: "bold",
    color: AppStyles.color.tint,
    marginTop: 20,
    marginBottom: 20,
    color:"#fdbb0a"
  },
  leftTitle: {
    alignSelf: "stretch",
    textAlign: "left",
    marginLeft: 20
  },

  centreTitle:{
    alignSelf: "stretch",
    textAlign: "center",
    marginLeft: 20
  },
        inputView:{
    width:"80%",
    backgroundColor:"#465881",
    borderRadius:25,
    height:55,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  img:{
    marginTop:20,
    marginBottom:40
  },
       loginBtn:{
    width:"80%",
    backgroundColor:"#faaa13",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:20,
    marginBottom:10
  },
    loginText: {
    color:"white"
  },
    tl: {
    alignSelf: 'flex-end',
    marginTop: -5,
    color:"#faaa13",
  },
      tr: {
    alignSelf: 'flex-start',
    marginTop: -5,
    color:"#faaa13",
  },
    text: {
    color:"#faaa13",
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
    color:"#faaa13"
  },
  rightContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    color:"#faaa13"
  },
      invlogin: {
    fontSize:10,
    alignItems:"center",
    color: "red",
    marginTop: 1,
    marginBottom: 1
  },

});

export default Welcome;