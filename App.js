import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Button } from 'react-native';
import Constants from 'expo-constants';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("db.db");

function Items({ done: doneHeading, onPressItem }) {
  const [items, setItems] = React.useState(null);

  React.useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        `select * from items where done = ?;`,
        [doneHeading ? 1 : 0],
        (_, { rows: { _array } }) => setItems(_array)
      );
    });
  }, []);

  const heading = doneHeading ? "Completed" : "Todo";

  if (items === null || items.length === 0) {
    return null;
  }

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionHeading}>{heading}</Text>
      {items.map(({ id, done, value }) => (
        <TouchableOpacity
          key={id}
          onPress={() => onPressItem && onPressItem(id)}
          style={{
            backgroundColor: done ? "#1c9963" : "#fff",
            borderColor: "#000",
            borderWidth: 1,
            padding: 8
          }}
        >
          <Text style={{ color: done ? "#fff" : "#000" }}>{value}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

export default function App() {
  const [card, setCard] = React.useState(null)
  const [name, setName] = React.useState(null)
  const [address, setAddress] = React.useState(null)
  const [flag, setFlag] = React.useState(false) 
  const [merchantName, setMerchantName] = React.useState(null)

  // const [forceUpdate, forceUpdateId] = useForceUpdate()

  React.useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        "create table if not exists Users (id integer primary key not null, card text, name text, address text);");
      tx.executeSql("create table if not exists merchantData (id integer primary key not null, restaurant text, address text, cuisine text, expense text, offers text); ");
      
      });
  }, []);

  const add = (card, name, address) => {
    // is text is empty in any of the field?
    if (card === null || card === "") {
      return false;
    }

    if (name === null || name === "") {
      return false;
    }

    if (address === null || address === "") {
      return false;
    }

    db.transaction(
      tx => {
        tx.executeSql("insert into Users (card, name, address) values (?, ?, ?)", [card, name, address]);
        tx.executeSql("select * from Users", [], (_, { rows }) =>
          console.log(JSON.stringify(rows))
        );
      },
      null,
      null
    );
  }

  const checkUser = (name) => {
    if (name === null || name === "") { 
      return false;
    }
    db.transaction(
      tx => {
        // tx.executeSql("insert into Users (card, name, address) values (?, ?, ?)", [card, name, address]);
        tx.executeSql("select * from Users where name = ?", [name], (_, { rows }) =>
          console.log(JSON.stringify(rows))
        );
      },
      null,
      null
    );
  }


  const checkMerchantName = (name) => {
    if (name === null || name === "") {
      return false;
    }
    db.transaction(
      tx => {
        // tx.executeSql("insert into Users (card, name, address) values (?, ?, ?)", [card, name, address]);
        tx.executeSql("select * from merchantData where restaurant = ?", [name], (_, { rows }) =>
          console.log(JSON.stringify(rows))
        );
      },
      null,
      null
    );
  }
  

  const addMerchantData = () => {
    console.log("merchant data called");
    db.transaction(
      tx => {
        tx.executeSql("insert into merchantData (restaurant, address, cuisine, expense, offers) values('MONTECRISTO REST','6286 3RD ST','CHINESE','AVERAGE','10 % off on total bill');");
        tx.executeSql("insert into merchantData (restaurant, address, cuisine, expense, offers) values('LAUGHING MONK BREWING','expense1439 EGBERT AVE','CONTINENTAL','HIGH','1 + 1 on drinks');");
        tx.executeSql("insert into merchantData (restaurant, address, cuisine, expense, offers) values('TAQUERIA LA IGUANA AZUL','928 GENEVA AVE','ITALIAN','HIGH','10 % off on visa card payments');");
        tx.executeSql("insert into merchantData (restaurant, address, cuisine, expense, offers) values('PATIO ESPANOL RESTAURANT','2850 ALEMANY BLVD','SPANISH','AVERAGE','10 % off on total bill');");
        tx.executeSql("insert into merchantData (restaurant, address, cuisine, expense, offers) values('LITTLE NEPAL RESTAURANT','925 CORTLAND AVE','NEPALESE','LOW','20 % off on buffet');");
          //  checking if the merchant database updated or not
          tx.executeSql("select * from merchantData", [], (_, { rows }) =>
          console.log(JSON.stringify(rows))
          );
      },
      null,
      null
    );
  }

  const getMerchantData = () => { 
    var data;
    db.transaction(
      tx => {
        //  get the merchant data from the database
        tx.executeSql("select * from merchantData", [], (_, { rows }) => {
          data = JSON.stringify(rows);
          console.log(data);
        }
        );
      },
      null,
      null
    );
    return data;
  }



  return (
    <View style={styles.container}>
      <Text style={styles.heading}>SQLite </Text>
      {/* add the user to our database */}
      <View >
        <TextInput
          onChangeText={text => {
            setCard(text);
          }}
          placeholder="please enter your Card"
          value={card}
        />

      </View>

      <View >
        <TextInput
          onChangeText={text => {
            setName(text);
          }}
          placeholder="please enter your name"
          value={name}
        />
      </View>

      <View >
        <TextInput
          onChangeText={text => {
            setAddress(text);
          }}
          placeholder="please enter your address"
          value={address}
        />

      </View>

      <View style={styles.viewStyle}> 
        <Button
          onPress={() => { 
            add(card, name, address);
            if (flag) {

            }
            else { 
              addMerchantData();  
              setFlag(true);
            }
            setName(null);
            setAddress(null);
            setCard(null);
          }}
          title="add User"
          color="#841584"
        />
      </View>


          {/* check if the user exists or not by giving user name */}
      <View >
        <TextInput
          onChangeText={text => {
            setName(text);
          }}
          placeholder="please enter your name"
          value={name}
        />
      </View>

      <View style={styles.viewStyle}>
        <Button
          onPress={() => {
            checkUser(name);
            setName(null);
          }}
          title="Check User"
          color="#841584"
        />
      </View>


          {/* get the whole merchant data */}
      <View style={styles.viewStyle}>
        <Button
          onPress={() => {
            getMerchantData();
          }}
          title="get merchant data"
          color="#841584"
        />
      </View>


      {/* check if merchant exists by name */}
      <View >
        <TextInput
          onChangeText={text => {
            setMerchantName(text);
          }}
          placeholder="please enter the name of the merchant"
          value={merchantName}
        />
      </View>

      <View style={styles.viewStyle}>
        <Button
          onPress={() => {
            checkMerchantName(merchantName);
            setMerchantName(null);
          }}
          title="Check User"
          color="#841584"
        />
      </View>

    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    paddingTop: Constants.statusBarHeight
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center"
  },
  flexRow: {
    flexDirection: "row"
  },
  input: {
    // borderColor: "#4630eb",
    borderRadius: 1,
    borderWidth: 1,
    flex: 1,
    height: 48,
    margin: 16,
    padding: 8
  },
  listArea: {
    backgroundColor: "#f0f0f0",
    flex: 1,
    paddingTop: 16
  },
  sectionContainer: {
    marginBottom: 16,
    marginHorizontal: 16
  },
  sectionHeading: {
    fontSize: 18,
    marginBottom: 8
  },
  viewStyle: {
    padding: 10
  }
});
