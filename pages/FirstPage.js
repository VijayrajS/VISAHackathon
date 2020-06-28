import React, { useState } from 'react';
import {ActivityIndicator ,ImageBackground,TouchableOpacity, Button, TextInput, StyleSheet, Text, View } from 'react-native';
import { add } from 'react-native-reanimated';
import {AppStyles } from '../src/AppStyles'
import Navigator from '../navigation/Navigator';
import AsyncStorage from '@react-native-community/async-storage'


const FirstPage = props => {
      const [email, setMail] = useState("");
      const [isHidden, setHidden] = useState(false);
      const [password, setPasswd] = useState("");
      const [isLoading, setLoading] = useState(false);

      const [testv, settestv] = useState(false);
      const [tstd, setTstd] = useState("hello2");
          const chng=event=>{
            setMail(event);
            setHidden(false)
          };
          const chng2=event=>{
            setPasswd(event);
            setHidden(false)
          }
    return (
        <View style={styles.container}>


            <Text style={[styles.title, styles.centreTitle]} >Welcome to Visa Conscierge Services</Text>
            
                    <View style={styles.inputView} >
                      <TextInput  
                        style={styles.inputText}
                        placeholder="email" 
                        placeholderTextColor="#003f5c"
                        onChangeText={chng}
                        />
                    </View>
                    <View style={styles.inputView} >
                      <TextInput  
                        style={styles.inputText}
                        placeholder="password" 
                        secureTextEntry={true}
                        placeholderTextColor="#003f5c"
                        onChangeText={chng2}

                        />
                    </View>

                  
                  {isHidden ? (
                  <Text style={styles.invlogin} >Invalid Login,Try Again!!!</Text>  
                  ) : null
                  }



                  {isLoading && (<View>
                  <Text style={styles.or}>Logging You In,Please Wait!</Text>
                 <ActivityIndicator
                       color = 'black'
                       size = "large"
                       style = {styles.activityIndicator}/>
                    </View>
                    )}

                <TouchableOpacity style={styles.loginBtn} 
                onPress={
                        () => {
                          setLoading(true)
                          console.log("user:",email)
                          console.log("passwd:",password)
                          
                          fetch('https://polar-earth-85350.herokuapp.com/user/checkUserLogin', {
                            method: 'POST',
                            headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                            "email": email,
                            "password": password,
                            }),

                            }).then(response => response.json())
                            .then((responseJson) => {
                                console.log('getting data from fetch', responseJson)
                                setLoading(false)
                                if(responseJson && responseJson["result"]==true){
                                   setHidden(false);
                                   AsyncStorage.multiSet([
                                      ['cardEnding', responseJson["cardEnding"].toString()],
                                      ['email', responseJson["email"]]
                                  ]);
                                   props.navigation.navigate('Welcome');
                                }
                                // else{
                                //   setTimeout(
                                //     () => { setHidden(true) },
                                //     3000
                                //   )
                                // }

                            })
                            .catch(error => console.log(error))
                                  setTimeout(
                                    () => { setHidden(true) },
                                    3000
                                  )                            
                          }
                      }
                  >
                        <Text style={styles.loginText}>LOGIN</Text>
                  </TouchableOpacity>
        
                <Text style={styles.or}>OR</Text>


                <TouchableOpacity style={styles.signUpBtn} 
                onPress={
                        () => {
                              props.navigation.navigate('Register');
                          }
                      }
                  >
                <Text style={styles.signUpText}>Register</Text>
                  </TouchableOpacity>


           
        </View>
    );

};



const styles = StyleSheet.create({
    container: {
    flex: 1,
    alignItems: "center",
    backgroundColor:"#192061",
    justifyContent: 'center'
  },
    image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  signUpBtn:{
    color:"white",
    fontSize:15
  },
  signUpText:{
    color:"#faaa13",
    fontSize:20
  },  
  logo:{
    fontWeight:"bold",
    fontSize:50,
    color:"#fdbb0a",
    marginBottom:40
  },
  or: {
    fontSize:20,
    alignItems:"center",
    color: "white",
    marginTop: 5,
    marginBottom: 5
  },
    invlogin: {
    fontSize:10,
    alignItems:"center",
    color: "red",
    marginTop: 1,
    marginBottom: 1
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
  content: {
    paddingLeft: 50,
    paddingRight: 50,
    textAlign: "center",
    fontSize: AppStyles.fontSize.content,
    color: AppStyles.color.text
  },
  loginContainer: {
    width: AppStyles.buttonWidth.main,
    backgroundColor: AppStyles.color.tint,
    borderRadius: AppStyles.borderRadius.main,
    padding: 10,
    marginTop: 30
  },
  loginText: {
    color: AppStyles.color.white
  },
  placeholder: {
    fontFamily: AppStyles.fontName.text,
    color: "red"
  },
  InputContainer: {
    width: AppStyles.textInputWidth.main,
    marginTop: 30,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: AppStyles.color.grey,
    borderRadius: AppStyles.borderRadius.main
  },
  body: {
    height: 42,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor:"white",
    color: AppStyles.color.text

  },
  facebookContainer: {
    width: AppStyles.buttonWidth.main,
    backgroundColor: AppStyles.color.facebook,
    borderRadius: AppStyles.borderRadius.main,
    padding: 10,
    marginTop: 30
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
  facebookText: {
    color: AppStyles.color.white
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
     activityIndicator: {
          position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
   }
});


export default  FirstPage;