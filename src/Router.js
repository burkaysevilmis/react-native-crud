import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import Login from '../src/screen/Login';
import List from '../src/screen/List';
import Insert from '../src/screen/Insert';
import Update from '../src/screen/Update';
import InsertSql from '../src/screen/InsertSql';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
const {width, height} = Dimensions.get('window');

export default class Router extends Component {
  render() {
    return <AppContainer />;
  }
}
const AppNavigator = createStackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: {
        headerShown: false,
      },
    },
    List: {
      screen: List,
      navigationOptions: {
        headerLeft: null,
      },
    },
    Insert: {
      screen: Insert,
      navigationOptions: {
        headerTitle: 'Öğrenci Ekle',
      },
    },
    InsertSql: {
      screen: InsertSql,
      navigationOptions: {
        headerTitle: 'Sqlite DB Insert',
      },
    },
    Update: {
      screen: Update,
      navigationOptions: {
        headerTitle: 'Öğrenci Güncelle',
      },
    },
  },
  {
    headerLayoutPreset: 'center',
    initialRouteName: 'InsertSql',
  },
);
const AppContainer = createAppContainer(AppNavigator);
