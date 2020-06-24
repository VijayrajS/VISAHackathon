import React from 'react';
import { Button, TextInput, StyleSheet, Text, View } from 'react-native';
import { Apploading } from 'expo';
import { useScreens } from 'react-native-screens';
import Constants from 'expo-constants';
import * as SQLite from 'expo-sqlite';
import Navigator from './navigation/Navigator';

const db = SQLite.openDatabase("db.db");

export default function App() {
  React.useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        "create table if not exists Users (id integer primary key not null, card text, name text, address text);");
      tx.executeSql("create table if not exists merchantData (id integer primary key not null, restaurant text, address text, cuisine text, expense text, offers text); ");

    });
  }, []);



  return <Navigator />;
}