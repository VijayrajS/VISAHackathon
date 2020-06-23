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

  const [forceUpdate, forceUpdateId] = useForceUpdate()

  React.useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        "create table if not exists Users (id integer primary key not null, card text, name text, address text);"
      );
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

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>SQLite Example</Text>
      
      <View >
        <TextInput
          onChangeText={text => {
            setCard(text);
            console.log(card);
          }}
          placeholder="please enter your card details"
          // style={styles.input}
          value={card}
        />

      </View>

      <View >
        <TextInput
          onChangeText={text => {
            setName(text);
            console.log(name);
          }}
          placeholder="please enter your name"
          // style={styles.input}
          value={name}
        />

      </View>

      <View >
        <TextInput
          onChangeText={text => {
            setAddress(text);
            console.log(address);
          }}
          placeholder="please enter your address"
          // style={styles.input}
          value={address}
        />

      </View>

      <View> 
        <Button
          onPress={() => { 
            console.log(card);
            console.log(name);
            console.log(address);
            add(card, name, address);
            setName(null);
            setAddress(null);
            setCard(null);
          }}
          title="Add User"
          color="#841584"
        />
      </View>
      {/* <ScrollView style={styles.listArea}>
        <Items
          key={`forceupdate-todo-${forceUpdateId}`}
          done={false}
          onPressItem={id =>
            db.transaction(
              tx => {
                tx.executeSql(`update items set done = 1 where id = ?;`, [
                  id
                ]);
              },
              null,
              forceUpdate
            )
          }
        />
        <Items
          done
          key={`forceupdate-done-${forceUpdateId}`}
          onPressItem={id =>
            db.transaction(
              tx => {
                tx.executeSql(`delete from items where id = ?;`, [id]);
              },
              null,
              forceUpdate
            )
          }
        />
      </ScrollView> */}
    </View>
  );

}

function useForceUpdate() {
  const [value, setValue] = useState(0);
  return [() => setValue(value + 1), value];
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
  }
});
