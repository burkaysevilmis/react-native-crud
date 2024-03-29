import React, {Component} from 'react';
import {Dimensions} from 'react-native';
import Login from '../src/screen/Login';
import List from '../src/screen/List';
import Insert from '../src/screen/Insert';
import Update from '../src/screen/Update';
import InsertSql from '../src/screen/InsertSql';
import WebViewScreen from '../src/screen/WebViewScreen';
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
        headerTitle: 'List',
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
    WebViewScreen: {
      screen: WebViewScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    headerLayoutPreset: 'center',
    initialRouteName: 'Login',
  },
);
const AppContainer = createAppContainer(AppNavigator);
