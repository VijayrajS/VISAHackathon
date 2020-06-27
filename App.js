import React from 'react';
import { Button, TextInput, StyleSheet, Text, View } from 'react-native';
import { Apploading } from 'expo';
import { useScreens } from 'react-native-screens';
import Constants from 'expo-constants';

import Navigator from './navigation/Navigator';


export default function App() {

  return <Navigator />;
}