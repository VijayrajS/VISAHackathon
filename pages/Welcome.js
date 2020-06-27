import React from 'react';
import {Image,ImageBackground,TouchableOpacity, Button, TextInput, StyleSheet, Text, View } from 'react-native';
import {AppStyles } from '../src/AppStyles'


const Welcome = props => {

    const [zip, setZip] = React.useState("");
          chng1=event=>{
            setZip(event);
          };

    return (
      <View style={styles.container}>
      <Text style={styles.tr}>username</Text>
      <Text style={styles.tl}>cardend</Text>
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



   <TouchableOpacity style={styles.loginBtn} 
                onPress={
                        () => {
                              props.navigation.navigate('Restbooking');
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
  }
});

export default Welcome;